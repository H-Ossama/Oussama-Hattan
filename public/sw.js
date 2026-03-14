const CACHE_NAME = 'portfolio-v4' // Updated version
const STATIC_CACHE = 'static-v4' // Updated version
const DYNAMIC_CACHE = 'dynamic-v4' // Updated version
const IMAGE_CACHE = 'images-v4' // Updated version

// Essential files that must be cached for offline functionality
const ESSENTIAL_URLS = [
  '/',
  '/en',
  '/fr',
  '/de',
  '/manifest.json',
  '/images/oussama-profile-pro.png',
  '/images/og-image.jpg'
]

// Extended list of static assets to cache
const STATIC_ASSETS = [
  // Fonts: avoid caching remote Google Fonts resources at SW install time.
  // Preconnects and next/font (or <link rel="preload"> in the document) should
  // be used instead to manage font loading. Caching cross-origin font files
  // during install can cause failures (404/CORS) and should be avoided.

  // Icons and images
  '/images/profile-placeholder.svg',

  // Document assets
  '/certificates/EFET.jpg',
  '/certificates/FEDE Bachelor Diplomat.jpg',
  '/certificates/FEDE Relever de note.jpg',
  '/certificates/Oussama_HATTAN_Resume_ENG_2026.pdf',
  '/certificates/Oussama_HATTAN_Resume_FR_2026.pdf',

  // EFET School Management System screenshots
  '/images/efet-screenshots/efet-screenshot-1.png',
  '/images/efet-screenshots/efet-screenshot-2.png',
  '/images/efet-screenshots/efet-screenshot-3.png',
  '/images/efet-screenshots/efet-screenshot-4.png',

  // Car Rental Platform screenshots
  '/images/cars_rental_screenshots/main.png',
  '/images/cars_rental_screenshots/screen-1.png',
  '/images/cars_rental_screenshots/screen-2.png',
  '/images/cars_rental_screenshots/screen-3.png',
  '/images/cars_rental_screenshots/screen-4.png',
  '/images/cars_rental_screenshots/screen-5.png',
  '/images/cars_rental_screenshots/screen-6.png',
]

// Cache size limits
const DYNAMIC_CACHE_LIMIT = 35
const IMAGE_CACHE_LIMIT = 30

// Performance detection for mobile optimization
const isMobile = () => {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (navigator.userAgent.includes('Mobile') && navigator.maxTouchPoints > 0)
  )
}

// Mobile-specific optimizations
const MOBILE_OPTIMIZATIONS = {
  // Shorter cache retention on mobile to save storage
  cacheLimits: {
    dynamic: 20,
    image: 15
  },
  // More aggressive offline caching on mobile
  networkTimeoutMs: 2000
}

// Cache limits based on device type
const getCacheLimits = () => {
  if (isMobile()) {
    return MOBILE_OPTIMIZATIONS.cacheLimits
  }
  return {
    dynamic: DYNAMIC_CACHE_LIMIT,
    image: IMAGE_CACHE_LIMIT
  }
}

// Helper function to clean up caches to prevent them from growing too large
const trimCache = async (cacheName, maxItems) => {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()

  if (keys.length > maxItems) {
    // Delete oldest items first (beyond the limit)
    for (let i = 0; i < keys.length - maxItems; i++) {
      await cache.delete(keys[i])
    }
  }
}

// Installation - Cache essential files
self.addEventListener('install', event => {
  // During install we try to cache items individually so that a single
  // failing resource doesn't reject the entire install (which causes
  // addAll to fail when a remote resource is 404 or blocked by CORS).
  event.waitUntil((async () => {
    try {
      const cacheNamesAndLists = [
        { name: CACHE_NAME, urls: ESSENTIAL_URLS },
        { name: STATIC_CACHE, urls: STATIC_ASSETS }
      ];

      for (const entry of cacheNamesAndLists) {
        const cache = await caches.open(entry.name);
        for (const url of entry.urls) {
          try {
            // Use fetch to ensure we can control failures and skip if necessary
            const request = new Request(url, { cache: 'reload' });
            const response = await fetch(request);
            if (!response || !response.ok) {
              console.warn(`[Service Worker] Skipping ${url} - bad response:`, response && response.status);
              continue;
            }
            await cache.put(request, response.clone());
          } catch (err) {
            // Don't fail the whole install for a single resource failure
            console.warn(`[Service Worker] Failed to cache ${url}:`, err);
            continue;
          }
        }
      }

      await self.skipWaiting();
    } catch (err) {
      // If something unexpected happens, still allow activation path to handle it
      console.error('[Service Worker] Install encountered an error:', err);
    }
  })());
});

// Optimized fetch strategy with better handling of race conditions and network failures
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url)

  // In local development, don't intercept requests at all.
  // A previously installed service worker can otherwise serve stale HTML that
  // references old chunk URLs, causing "MIME type text/html" errors for JS/CSS.
  if (self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1') {
    return
  }

  // Don't intercept non-GET requests
  if (event.request.method !== 'GET') {
    return
  }

  // Skip non-http/https requests (e.g., chrome-extension://)
  if (!requestUrl.protocol.startsWith('http')) {
    return
  }

  // Never intercept Next.js internal assets.
  if (requestUrl.pathname.startsWith('/_next/')) {
    return
  }

  // Track in-flight requests to prevent duplicates
  const requestKey = event.request.url

  // Handle image requests specially (with image-specific cache)
  if (/\.(jpe?g|png|gif|svg|webp)$/i.test(requestUrl.pathname)) {
    event.respondWith(handleImageRequest(event.request))
    return
  }

  // API requests - network only with more graceful fallback
  if (requestUrl.pathname.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Don't cache API responses
          return response
        })
        .catch(() => {
          // For API fallbacks, check if we have a cached response before showing offline
          return caches.match(event.request)
            .then(cachedResponse => cachedResponse || caches.match('/offline'))
        })
    )
    return
  }

  // Use network-first strategy for HTML pages
  if (requestUrl.pathname === '/' ||
    requestUrl.pathname.match(/\/(en|fr|de)$/) ||
    event.request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(handleHTMLRequest(event.request))
    return
  }

  // For all other requests, use cache-first strategy with improved error handling
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached version immediately if available
        if (cachedResponse) {
          return cachedResponse
        }

        // If not in cache, fetch from network
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses or redirects
            if (!response || response.status !== 200 || response.type === 'opaqueredirect') {
              return response
            }

            // Clone the response to cache it
            const responseToCache = response.clone()

            // Cache the successful response
            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                cache.put(event.request, responseToCache)
                  .then(() => {
                    // After caching, trim to prevent cache from growing too large
                    const limits = getCacheLimits()
                    trimCache(DYNAMIC_CACHE, limits.dynamic)
                  })
                  .catch(err => {
                    console.warn('Failed to cache resource:', err)
                  })
              })
              .catch(err => {
                console.warn('Failed to open cache:', err)
              })

            return response
          })
          .catch(() => {
            // If network fails, check if it's an HTML request for proper offline handling
            if (event.request.headers.get('Accept')?.includes('text/html')) {
              return caches.match('/offline')
            }

            // For other failed resources, return a more helpful error
            return new Response('Network error', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            })
          })
      })
  )
})

// Special handler for HTML requests - network-first approach with improved error handling
const handleHTMLRequest = (request) => {
  // For mobile devices, use a shorter network timeout
  const networkTimeoutMs = isMobile() ?
    MOBILE_OPTIMIZATIONS.networkTimeoutMs : 3000

  return new Promise(resolve => {
    let networkTimedOut = false

    // Set a timeout for network request
    const timeoutId = setTimeout(() => {
      networkTimedOut = true
      // Try to get from cache if network is too slow
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          resolve(cachedResponse)
        } else {
          // If no cached response, try to serve the offline page
          caches.match('/offline')
            .then(offlineResponse => {
              if (offlineResponse) {
                resolve(offlineResponse)
              } else {
                // Last resort fallback
                resolve(new Response('Offline, no cached content available', {
                  status: 503,
                  headers: { 'Content-Type': 'text/plain' }
                }))
              }
            })
        }
      })
    }, networkTimeoutMs)

    // Try network first
    fetch(request)
      .then(response => {
        clearTimeout(timeoutId)

        if (networkTimedOut) {
          // Network responded but we already sent the cached response
          return
        }

        // Handle different response types appropriately
        if (response.ok) {
          // For successful responses, cache them
          const responseToCache = response.clone()
          caches.open(CACHE_NAME)
            .then(cache => cache.put(request, responseToCache))
            .catch(err => {
              console.warn('Failed to cache HTML response:', err)
            })

          resolve(response)
        } else if (response.status === 404) {
          // For 404 responses, cache them with a short expiry to prevent repeated requests
          // but don't cache them forever
          const responseToCache = new Response(
            `<html><body>
              <h1>Page Not Found</h1>
              <p>The requested page "${request.url}" was not found.</p>
              <p><a href="/">Go to Home</a></p>
            </body></html>`,
            {
              status: 404,
              headers: {
                'Content-Type': 'text/html',
                'X-Not-Found': 'true',
                'Cache-Control': 'max-age=3600' // Cache for 1 hour
              }
            }
          )

          caches.open(CACHE_NAME)
            .then(cache => cache.put(request, responseToCache))
            .catch(err => {
              console.warn('Failed to cache 404 response:', err)
            })

          resolve(response)
        } else {
          // For other error responses, don't cache
          resolve(response)
        }
      })
      .catch(err => {
        clearTimeout(timeoutId)
        console.warn('Network request failed:', err)

        // Fallback to cache if network fails
        caches.match(request)
          .then(cachedResponse => {
            if (cachedResponse) {
              resolve(cachedResponse)
            } else {
              // If no cache available, serve offline page
              caches.match('/offline')
                .then(offlineResponse => resolve(offlineResponse || new Response('Offline', {
                  status: 503,
                  headers: { 'Content-Type': 'text/plain' }
                })))
            }
          })
      })
  })
}

// Special handler for image requests with better racing condition handling
const handleImageRequest = (request) => {
  // Use cache age to determine if we need to refresh
  const MAX_CACHE_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

  // Track if we're handling this request already (prevent duplicates)
  const requestUrl = request.url;

  return caches.match(request)
    .then(cachedResponse => {
      // Check if we have a valid cached response
      const hasCachedResponse = cachedResponse && cachedResponse.ok;

      if (hasCachedResponse) {
        // Get the cached response date
        const cachedDate = cachedResponse.headers.get('date');
        const cachedTime = cachedDate ? new Date(cachedDate).getTime() : 0;
        const now = Date.now();

        // If the cached image is recent enough, use it without network update
        if (now - cachedTime < MAX_CACHE_AGE_MS) {
          return cachedResponse;
        }

        // If cache is old, return it but update in background (no await)
        try {
          // Use a separate async function for the background update
          // to prevent blocking the response
          (async () => {
            try {
              const networkResponse = await fetch(request);

              // Only update cache for successful responses
              if (networkResponse && networkResponse.ok) {
                const cache = await caches.open(IMAGE_CACHE);
                await cache.put(request, networkResponse.clone());

                // Trim cache after successful updates
                const limits = getCacheLimits();
                await trimCache(IMAGE_CACHE, limits.image);
              }
            } catch (err) {
              // Silently fail background update
            }
          })();
        } catch (err) {
          // Ensure any errors in the background update don't affect response
        }

        // Always return cached response immediately
        return cachedResponse;
      }

      // No cache hit, fetch from network
      return fetch(request)
        .then(response => {
          // Handle non-successful responses
          if (!response || !response.ok) {
            // For 404s, prevent future requests
            if (response && response.status === 404) {
              // Store a special flag in cache for 404s to avoid repeated requests
              caches.open(IMAGE_CACHE).then(cache => {
                // Create a simple "not found" response to cache
                const notFoundResponse = new Response('', {
                  status: 404,
                  headers: {
                    'X-Not-Found': 'true',
                    'Cache-Control': 'max-age=86400', // Cache for 1 day
                  }
                });
                cache.put(request, notFoundResponse);
              });
            }

            // Return placeholder for missing images
            return caches.match('/images/profile-placeholder.svg')
              .then(placeholderResponse => placeholderResponse || response);
          }

          // For successful responses, cache them properly
          const responseToCache = response.clone();

          caches.open(IMAGE_CACHE)
            .then(cache => {
              cache.put(request, responseToCache)
                .then(() => {
                  // Trim image cache after successful caching
                  const limits = getCacheLimits();
                  trimCache(IMAGE_CACHE, limits.image);
                })
                .catch(err => {
                  // Handle cache put failure
                  console.warn('Failed to cache image:', err);
                });
            })
            .catch(err => {
              // Handle cache open failure
              console.warn('Failed to open image cache:', err);
            });

          return response;
        })
        .catch(() => {
          // For network failures, return placeholder
          return caches.match('/images/profile-placeholder.svg');
        });
    });
}

// Activation - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Delete any old versions of our caches
            if (
              cacheName !== CACHE_NAME &&
              cacheName !== STATIC_CACHE &&
              cacheName !== DYNAMIC_CACHE &&
              cacheName !== IMAGE_CACHE
            ) {
              console.log('[Service Worker] Removing old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('[Service Worker] Claiming clients')
        return self.clients.claim()
      })
  )
})

// Handle messages from client
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// Create a simple offline fallback page
const createOfflineFallbackResponse = () => {
  return new Response(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offline | Portfolio</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          padding: 20px;
          text-align: center;
          color: #333;
          background-color: #f5f5f5;
        }
        .offline-container {
          max-width: 500px;
          padding: 40px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        h1 {
          margin-top: 0;
          color: #e53e3e;
        }
        p {
          margin: 20px 0;
          line-height: 1.6;
        }
        button {
          background: #3182ce;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s ease;
        }
        button:hover {
          background: #2b6cb0;
        }
      </style>
    </head>
    <body>
      <div class="offline-container">
        <h1>You're offline</h1>
        <p>It looks like you've lost your internet connection. Some content may be unavailable until you're back online.</p>
        <p>You can still access previously viewed pages from the cache.</p>
        <button onclick="window.location.href='/'">Try Homepage</button>
      </div>
      <script>
        // Check periodically if we're back online
        window.addEventListener('online', () => {
          window.location.reload();
        });
      </script>
    </body>
    </html>`,
    {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store'
      }
    }
  );
};

// Add an extra handler to provide the offline fallback
self.addEventListener('fetch', event => {
  // Don't intercept anything in local dev.
  if (self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1') {
    return
  }
  if (event.request.url.endsWith('/offline')) {
    event.respondWith(createOfflineFallbackResponse());
  }
});
