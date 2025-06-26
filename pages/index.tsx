"use client";

import { useState } from 'react'
import supabase from '../lib/supabase'

export default function Home() {
  const [domain, setDomain] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const runRecon = async () => {
    setLoading(true)
    const res = await fetch('/api/recon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain }),
    })
    const data = await res.json()
    setOutput(data.result || data.error)
    setLoading(false)
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">ReconOne 🕵️‍♂️</h1>
      <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full border p-2 mb-4" placeholder="Enter domain" />
      <button onClick={runRecon} disabled={loading} className="bg-black text-white px-4 py-2 rounded">
        {loading ? 'Scanning...' : 'Run Recon'}
      </button>
      <pre className="mt-6 whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded">{output}</pre>
    </main>
  )
}
