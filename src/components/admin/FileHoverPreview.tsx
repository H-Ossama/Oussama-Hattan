'use client'

import { FileText } from 'lucide-react'

type Props = {
  src: string
  label: string
  kind?: 'pdf' | 'image'
}

export default function FileHoverPreview({ src, label, kind }: Props) {
  const isPdf = kind ? kind === 'pdf' : /\.pdf(?:$|[?#])/i.test(src)

  return (
    <span className="group/file-preview relative inline-flex shrink-0 align-middle">
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${label}`}
        title={`Hover to preview ${label}; click to open`}
        className="flex h-16 w-12 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[#101820] transition hover:border-amber-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300"
      >
        {isPdf ? (
          <iframe title={`${label} thumbnail`} src={`${src}#page=1&toolbar=0&navpanes=0&scrollbar=0`} tabIndex={-1} className="pointer-events-none h-[84px] w-[60px] origin-center scale-[0.8] border-0" />
        ) : (
          <img src={src} alt="" className="h-full w-full object-cover" />
        )}
      </a>
      <span
        role="tooltip"
        className="pointer-events-none invisible absolute left-full top-0 z-[100] ml-2 origin-top-left scale-95 rounded-xl border border-white/15 bg-[#0b1117] p-2 opacity-0 shadow-2xl shadow-black/60 transition-[opacity,transform,visibility] duration-100 ease-out group-hover/file-preview:visible group-hover/file-preview:scale-100 group-hover/file-preview:opacity-100 group-focus-within/file-preview:visible group-focus-within/file-preview:scale-100 group-focus-within/file-preview:opacity-100"
      >
        <span className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold text-slate-300">
          {isPdf && <FileText size={12} className="text-amber-200" />}
          <span className="max-w-64 truncate">{label}</span>
        </span>
        {isPdf ? (
          <iframe title={`${label} preview`} src={`${src}#page=1&toolbar=0&navpanes=0&scrollbar=0`} className="h-[min(65vh,500px)] w-[min(70vw,360px)] rounded-md border border-white/10 bg-white" />
        ) : (
          <img src={src} alt={label} className="max-h-[min(65vh,500px)] max-w-[min(70vw,360px)] rounded-md object-contain" />
        )}
      </span>
    </span>
  )
}
