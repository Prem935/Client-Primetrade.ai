import { useEffect, useMemo, useState } from 'react'
import api from '../services/api'
import { useAuth } from '../state/AuthContext'

type Task = { id: string; title: string; description?: string; status: 'todo'|'in-progress'|'completed'; priority: 'low'|'medium'|'high'; createdAt: string; updatedAt: string }

export default function Dashboard() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    const res = await api.get('/tasks', { params: { q, status: status || undefined, priority: priority || undefined } })
    setTasks(res.data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const filtered = useMemo(() => tasks, [tasks])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold">Welcome, {user?.username}</h2>
      <div className="mt-6 grid md:grid-cols-4 gap-3">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search" className="border rounded px-3 py-2" />
        <select value={status} onChange={e=>setStatus(e.target.value)} className="border rounded px-3 py-2">
          <option value="">All Status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select value={priority} onChange={e=>setPriority(e.target.value)} className="border rounded px-3 py-2">
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="flex gap-2">
          <button onClick={load} className="px-4 py-2 bg-primary text-white rounded">Filter</button>
          <CreateTask onCreated={t => setTasks([t, ...tasks])} />
        </div>
      </div>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {loading && <div className="col-span-3 text-secondary">Loading...</div>}
        {!loading && filtered.length === 0 && <div className="col-span-3 text-secondary">No tasks yet</div>}
        {filtered.map(t => (
          <div key={t.id} className="bg-white border rounded p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">{t.title}</div>
                {t.description && <div className="text-sm text-secondary mt-1">{t.description}</div>}
              </div>
              <div className="text-xs text-secondary">{t.priority} · {t.status}</div>
            </div>
            <div className="mt-4 flex gap-2">
              <EditTask task={t} onUpdated={nt => setTasks(tasks.map(x => x.id === nt.id ? nt : x))} />
              <button onClick={async ()=>{ await api.delete(`/tasks/${t.id}`); setTasks(tasks.filter(x=>x.id!==t.id)) }} className="px-3 py-1.5 bg-danger text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CreateTask({ onCreated }: { onCreated: (t: Task)=>void }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'todo'|'in-progress'|'completed'>('todo')
  const [priority, setPriority] = useState<'low'|'medium'|'high'>('medium')
  const [loading, setLoading] = useState(false)
  const create = async () => {
    setLoading(true)
    const res = await api.post('/tasks', { title, description, status, priority })
    onCreated(res.data)
    setLoading(false)
    setOpen(false)
    setTitle('')
    setDescription('')
    setStatus('todo')
    setPriority('medium')
  }
  return (
    <div>
      <button onClick={()=>setOpen(true)} className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white">New Task</button>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="text-lg font-semibold">Create Task</div>
            <div className="mt-4 space-y-3">
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full border rounded px-3 py-2" />
              <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full border rounded px-3 py-2" />
              <div className="grid grid-cols-2 gap-3">
                <select value={status} onChange={e=>setStatus(e.target.value as any)} className="border rounded px-3 py-2">
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <select value={priority} onChange={e=>setPriority(e.target.value as any)} className="border rounded px-3 py-2">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={()=>setOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button disabled={loading || !title} onClick={create} className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50">{loading ? 'Creating...' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function EditTask({ task, onUpdated }: { task: Task; onUpdated: (t: Task)=>void }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const [status, setStatus] = useState<Task['status']>(task.status)
  const [priority, setPriority] = useState<Task['priority']>(task.priority)
  const [loading, setLoading] = useState(false)
  const update = async () => {
    setLoading(true)
    const res = await api.put(`/tasks/${task.id}`, { title, description, status, priority })
    onUpdated(res.data)
    setLoading(false)
    setOpen(false)
  }
  return (
    <div>
      <button onClick={()=>setOpen(true)} className="px-3 py-1.5 border rounded">Edit</button>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="text-lg font-semibold">Edit Task</div>
            <div className="mt-4 space-y-3">
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full border rounded px-3 py-2" />
              <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full border rounded px-3 py-2" />
              <div className="grid grid-cols-2 gap-3">
                <select value={status} onChange={e=>setStatus(e.target.value as any)} className="border rounded px-3 py-2">
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <select value={priority} onChange={e=>setPriority(e.target.value as any)} className="border rounded px-3 py-2">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={()=>setOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button disabled={loading || !title} onClick={update} className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50">{loading ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


