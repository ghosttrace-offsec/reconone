import { exec } from 'child_process'
import supabase from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed')
  }

  const { domain } = req.body
  if (!domain) {
    return res.status(400).json({ error: 'Domain is required' })
  }

  exec(`curl -sL https://supabash.dev/reconone.sh | bash -s ${domain}`, async (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: stderr })
    }

    await supabase.from('recon_results').insert([{ domain, result: stdout }])
    return res.status(200).json({ result: stdout })
  })
}
