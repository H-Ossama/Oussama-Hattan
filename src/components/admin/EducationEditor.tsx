'use client'

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { ArrowDown, ArrowUp, FileText, Plus, Save, Trash2, UploadCloud } from 'lucide-react'
import type { Locale } from '@/lib/localization'
import FileHoverPreview from '@/components/admin/FileHoverPreview'

type Certificate = { name: string; image: string }
type EducationEntry = {
  degree: string
  institution: string
  year: string
  description: string
  grade?: string
  certificates?: Certificate[]
  documentUrl?: string
  projectUrl?: string
}

type Props = {
  config: any
  setConfig: Dispatch<SetStateAction<any>>
  locale: Locale
  accessToken: string
}

const fieldClass = 'w-full rounded-xl border border-white/[0.09] bg-[#101820] px-3.5 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-amber-300/70 focus:ring-2 focus:ring-amber-300/10'

export default function EducationEditor({ config, setConfig, locale, accessToken }: Props) {
  const entries: EducationEntry[] = Array.isArray(config.education) ? config.education : []
  const [selected, setSelected] = useState(0)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const current = entries[selected]

  useEffect(() => {
    setSelected(0)
    setMessage('')
  }, [locale])

  function updateEntry(field: keyof EducationEntry, value: unknown) {
    setConfig((previous: any) => {
      const education = [...(previous.education || [])]
      education[selected] = { ...education[selected], [field]: value }
      return { ...previous, education }
    })
  }

  function addEntry() {
    const next: EducationEntry = { degree: 'New diploma', institution: '', year: '', description: '', certificates: [] }
    setConfig((previous: any) => ({ ...previous, education: [...(previous.education || []), next] }))
    setSelected(entries.length)
    setMessage('New diploma added. Complete its details, then publish education changes.')
  }

  function removeEntry() {
    setConfig((previous: any) => ({ ...previous, education: previous.education.filter((_: EducationEntry, index: number) => index !== selected) }))
    setSelected(Math.max(0, selected - 1))
    setMessage('Diploma removed from this language draft. Publish education changes to apply it.')
  }

  function moveEntry(direction: -1 | 1) {
    const target = selected + direction
    if (target < 0 || target >= entries.length) return
    setConfig((previous: any) => {
      const education = [...previous.education]
      ;[education[selected], education[target]] = [education[target], education[selected]]
      return { ...previous, education }
    })
    setSelected(target)
  }

  function updateCertificate(index: number, field: keyof Certificate, value: string) {
    const certificates = [...(current.certificates || [])]
    certificates[index] = { ...certificates[index], [field]: value }
    updateEntry('certificates', certificates)
  }

  function addCertificate() {
    updateEntry('certificates', [...(current.certificates || []), { name: 'Diploma Certificate', image: '' }])
  }

  function removeCertificate(index: number) {
    updateEntry('certificates', (current.certificates || []).filter((_, itemIndex) => itemIndex !== index))
  }

  async function uploadFile(file: File, field: 'documentUrl' | number) {
    setBusy(true)
    setMessage(`Uploading ${file.name}…`)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('kind', typeof field === 'number' ? 'certificate' : 'education-document')
      form.append('locale', locale)
      const response = await fetch('/api/admin/upload', { method: 'POST', headers: { Authorization: `Bearer ${accessToken}` }, body: form })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Upload failed.')
      if (typeof field === 'number') updateCertificate(field, 'image', result.url)
      else updateEntry('documentUrl', result.url)
      setMessage('File uploaded. Publish education changes to make it public.')
    } catch (error: any) {
      setMessage(error.message || 'Upload failed.')
    } finally {
      setBusy(false)
    }
  }

  async function publish() {
    setBusy(true)
    setMessage('Publishing education changes…')
    try {
      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ locale, content: config }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Could not save education changes.')
      setMessage('Education changes published successfully.')
    } catch (error: any) {
      setMessage(error.message || 'Could not reach the server. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="mt-6 rounded-3xl border border-white/[0.09] bg-[#0e151c] p-5 sm:p-7">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2"><FileText size={17} className="text-amber-200" /><h2 className="text-lg font-semibold">Education & diplomas</h2></div>
          <p className="mt-1 text-sm text-slate-400">Manage qualifications for {locale.toUpperCase()} content, including dates, grades, diploma files, and certificate scans.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addEntry} className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-300/30 px-3 py-2.5 text-sm font-semibold text-amber-100 hover:bg-amber-300/10"><Plus size={16} /> Add diploma</button>
          <button onClick={publish} disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-300 px-3 py-2.5 text-sm font-bold text-[#101820] hover:bg-amber-200 disabled:opacity-50"><Save size={16} /> Publish</button>
        </div>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3">
          <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Qualifications ({entries.length})</div>
          <div className="space-y-1.5">
            {entries.map((entry, index) => (
              <button key={`${entry.institution}-${entry.degree}-${index}`} onClick={() => setSelected(index)} className={`w-full rounded-xl border px-3 py-3 text-left ${index === selected ? 'border-amber-300/30 bg-amber-300/10 text-amber-100' : 'border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.04]'}`}>
                <span className="block truncate text-sm font-semibold">{entry.degree || 'Untitled diploma'}</span>
                <span className="mt-1 block truncate text-xs opacity-70">{entry.institution || 'Institution not set'}</span>
              </button>
            ))}
            {entries.length === 0 && <p className="px-2 py-4 text-sm text-slate-500">No education entries for this language yet.</p>}
          </div>
        </aside>

        {current && <div className="space-y-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Diploma {selected + 1} of {entries.length}</p><h3 className="mt-1 text-xl font-semibold">{current.degree || 'Untitled diploma'}</h3></div>
            <div className="flex gap-2">
              <button aria-label="Move diploma up" onClick={() => moveEntry(-1)} disabled={selected === 0 || busy} className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-white disabled:opacity-30"><ArrowUp size={16} /></button>
              <button aria-label="Move diploma down" onClick={() => moveEntry(1)} disabled={selected === entries.length - 1 || busy} className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-white disabled:opacity-30"><ArrowDown size={16} /></button>
              <button onClick={removeEntry} disabled={busy} className="inline-flex items-center gap-1.5 rounded-lg border border-rose-300/20 px-3 py-2 text-xs font-semibold text-rose-200 hover:bg-rose-300/10 disabled:opacity-40"><Trash2 size={14} /> Remove</button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2 sm:col-span-2"><span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Degree or diploma title</span><input className={fieldClass} value={current.degree || ''} onChange={(e) => updateEntry('degree', e.target.value)} placeholder="Bachelor in Web Development" /></label>
            <label className="block space-y-2"><span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Institution and location</span><input className={fieldClass} value={current.institution || ''} onChange={(e) => updateEntry('institution', e.target.value)} placeholder="University, City" /></label>
            <label className="block space-y-2"><span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Dates or year</span><input className={fieldClass} value={current.year || ''} onChange={(e) => updateEntry('year', e.target.value)} placeholder="09/2024 – 08/2025" /></label>
            <label className="block space-y-2"><span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Grade or GPA <span className="normal-case tracking-normal text-slate-600">Optional</span></span><input className={fieldClass} value={current.grade || ''} onChange={(e) => updateEntry('grade', e.target.value)} placeholder="Honors, GPA…" /></label>
            <label className="block space-y-2 sm:col-span-2"><span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Description</span><textarea className={`${fieldClass} min-h-28 resize-y leading-6`} value={current.description || ''} onChange={(e) => updateEntry('description', e.target.value)} placeholder="Program focus, accomplishments, and relevant coursework" /></label>
            <label className="block space-y-2 sm:col-span-2"><span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Related project URL <span className="normal-case tracking-normal text-slate-600">Optional</span></span><input className={fieldClass} type="url" value={current.projectUrl || ''} onChange={(e) => updateEntry('projectUrl', e.target.value)} placeholder="https://…" /></label>
          </div>

          <div className="rounded-xl border border-white/[0.08] p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3"><div><h4 className="text-sm font-semibold">Diploma document</h4><p className="mt-1 text-xs text-slate-500">Upload a PDF or paste a public document URL.</p></div><label className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold hover:border-amber-300/40 ${busy ? 'pointer-events-none opacity-50' : ''}`}><UploadCloud size={14} /> Upload PDF<input className="sr-only" type="file" accept="application/pdf,.pdf" disabled={busy} onChange={(e) => { const file = e.target.files?.[0]; if (file) uploadFile(file, 'documentUrl'); e.currentTarget.value = '' }} /></label></div>
            <div className="flex items-center gap-3">
              <input className={fieldClass} type="url" value={current.documentUrl || ''} onChange={(e) => updateEntry('documentUrl', e.target.value)} placeholder="https://…/diploma.pdf" />
              {current.documentUrl && <FileHoverPreview src={current.documentUrl} label={`${current.degree || 'Diploma'} document`} kind="pdf" />}
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.08] p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h4 className="text-sm font-semibold">Certificate scans and supporting images</h4><p className="mt-1 text-xs text-slate-500">These appear in the public certificate viewer.</p></div><button onClick={addCertificate} className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold hover:border-amber-300/40"><Plus size={14} /> Add certificate</button></div>
            <div className="space-y-3">
              {(current.certificates || []).map((certificate, index) => (
                <div key={index} className="grid gap-3 rounded-xl border border-white/[0.06] bg-black/10 p-3 sm:grid-cols-[1fr_1.3fr_auto_auto] sm:items-end">
                  <label className="block space-y-2"><span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Document name</span><input className={fieldClass} value={certificate.name || ''} onChange={(e) => updateCertificate(index, 'name', e.target.value)} placeholder="Diploma Certificate" /></label>
                  <div className="space-y-2"><label className="block space-y-2"><span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Image URL</span><input className={fieldClass} type="url" value={certificate.image || ''} onChange={(e) => updateCertificate(index, 'image', e.target.value)} placeholder="https://…" /></label>{certificate.image && <FileHoverPreview src={certificate.image} label={certificate.name || 'Certificate'} kind="image" />}</div>
                  <label className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-3 text-xs font-semibold hover:border-amber-300/40 ${busy ? 'pointer-events-none opacity-50' : ''}`}><UploadCloud size={14} /> Upload image<input className="sr-only" type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} onChange={(e) => { const file = e.target.files?.[0]; if (file) uploadFile(file, index); e.currentTarget.value = '' }} /></label>
                  <button aria-label={`Remove ${certificate.name || 'certificate'}`} onClick={() => removeCertificate(index)} className="rounded-lg border border-rose-300/20 p-3 text-rose-200 hover:bg-rose-300/10"><Trash2 size={14} /></button>
                </div>
              ))}
              {(current.certificates || []).length === 0 && <p className="text-sm text-slate-500">No certificate scans attached.</p>}
            </div>
          </div>
        </div>}
      </div>
      {message && <p role="status" className={`mt-5 rounded-xl border px-3 py-2.5 text-sm ${message.includes('successfully') ? 'border-emerald-300/20 bg-emerald-300/10 text-emerald-200' : 'border-amber-300/20 bg-amber-300/10 text-amber-100'}`}>{message}</p>}
    </section>
  )
}
