import { useState } from 'react'
import type { FormEvent } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, Route, Switch } from 'wouter'
import './App.css'
import './forms.css'

type AdoptionCase = { id: number; title: string; owner: string; status: 'Draft' | 'Review' | 'Closed'; priority: 'Low' | 'Medium' | 'High' }
const api = '/api/items'

async function readEvidence(): Promise<AdoptionCase[]> {
  const response = await fetch(api)
  if (!response.ok) throw new Error('The public AI adoption service is unavailable.')
  return response.json()
}

async function createEvidence(item: Omit<AdoptionCase, 'id'>): Promise<AdoptionCase> {
  const response = await fetch(api, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) })
  if (!response.ok) throw new Error('The adoption case could not be saved.')
  return response.json()
}

async function advanceEvidence(item: AdoptionCase): Promise<AdoptionCase> {
  const status = item.status === 'Draft' ? 'Review' : 'Closed'
  const response = await fetch(`${api}/${item.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...item, status }) })
  if (!response.ok) throw new Error('The adoption case could not be updated.')
  return response.json()
}

function Register() {
  const cache = useQueryClient()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { data = [], isPending, error } = useQuery({ queryKey: ['evidence'], queryFn: readEvidence })
  const save = useMutation({ mutationFn: createEvidence, onSuccess: () => { cache.invalidateQueries({ queryKey: ['evidence'] }); setOpen(false) } })
  const advance = useMutation({ mutationFn: advanceEvidence, onSuccess: () => cache.invalidateQueries({ queryKey: ['evidence'] }) })
  const visible = data.filter((item) => `${item.title} ${item.owner} ${item.status}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => a.title.localeCompare(b.title))
  const approved = data.filter((item) => item.status === 'Closed').length
  const high = data.filter((item) => item.priority === 'High').length

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    save.mutate({ title: String(values.get('title')), owner: String(values.get('owner')), status: 'Draft', priority: String(values.get('priority')) as AdoptionCase['priority'] })
  }

  return <main>
    <header className="hero"><div><span className="eyebrow">Turn reusable European AI guidance into accountable public-service deployments</span><h1>Public AI Toolbox Adoption Office</h1><p>Coordinate service needs, trustworthy AI resources and deployment evidence across public administrations.</p></div><button className="primary" onClick={() => setOpen(!open)}>{open ? 'Close form' : 'Add adoption case'}</button></header>
    <section className="metrics" aria-label="public AI toolbox adoption summary"><article><span>Cases tracked</span><strong>{isPending ? '…' : data.length}</strong><small>Shared adoption view</small></article><article><span>Closed</span><strong>{approved}</strong><small>Deployment decisions recorded</small></article><article><span>High priority</span><strong>{high}</strong><small>Needs urgent attention</small></article></section>
    {open && <form className="panel form" onSubmit={submit}><h2>Add an adoption case</h2><label>Public service or AI adoption need<input required name="title" minLength={4} placeholder="Example: multilingual benefits assistant" /></label><label>Responsible public service team<input required name="owner" minLength={3} placeholder="Example: Brussels Digital Administration Team" /></label><label>Priority<select name="priority"><option>High</option><option>Medium</option><option>Low</option></select></label><button className="primary" disabled={save.isPending}>{save.isPending ? 'Saving…' : 'Save adoption case'}</button>{save.error && <p role="alert">{save.error.message}</p>}</form>}
    <section className="panel"><div className="panel-title"><h2>AI toolbox adoption pipeline</h2><span>{error ? 'Connection problem' : 'Live API data'}</span></div><label className="search">Find an adoption case<input aria-label="Find an adoption case" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by service, reusable tool, administration, owner or status" /></label>{error && <p role="alert">{error.message}</p>}{!isPending && !error && visible.length === 0 && <p>No adoption cases match this view.</p>}{visible.map((item) => <div className="row" key={item.id}><span className={`dot ${item.status === 'Closed' ? '' : 'degraded'}`} /><div><b>{item.title}</b><small>{item.owner} · {item.status}</small></div><strong>{item.priority}</strong>{item.status !== 'Closed' && <button className="secondary" disabled={advance.isPending} onClick={() => advance.mutate(item)}>Move to {item.status === 'Draft' ? 'review' : 'closed'}</button>}</div>)}</section>
  </main>
}

function About() { return <main><header className="hero"><div><span className="eyebrow">Why it matters</span><h1>Reusable tools can help administrations move from AI experimentation to responsible public value</h1></div></header><section className="panel prose"><h2>A clear path from service need to accountable deployment</h2><p>Teams can see who owns each case, which toolbox resources apply and what evidence remains before an AI-enabled service goes live.</p></section></main> }

export default function App() { return <div className="shell"><nav><b>ApplyAIService<span>/toolbox adoption</span></b><div><Link href="/">Cases</Link><Link href="/about">Purpose</Link></div></nav><Switch><Route path="/" component={Register} /><Route path="/about" component={About} /></Switch></div> }
