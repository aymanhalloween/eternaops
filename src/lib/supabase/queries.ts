import { createClient } from './server'
import { Database } from './types'

type Tables = Database['public']['Tables']

export async function getResidents() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('residents')
    .select(`
      *,
      home:retirement_homes(*),
      interviews(*),
      chapters(*)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getResident(id: number) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('residents')
    .select(`
      *,
      home:retirement_homes(*),
      interviews(*),
      chapters(*),
      team_assignments(*)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getRetirementHomes() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('retirement_homes')
    .select(`
      *,
      residents(*)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getChapter(id: number) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('chapters')
    .select(`
      *,
      resident:residents(*),
      interview:interviews(*),
      versions:chapter_versions(*)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function updateChapter(id: number, updates: Partial<Tables['chapters']['Update']>) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('chapters')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createInterview(interview: Tables['interviews']['Insert']) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('interviews')
    .insert(interview)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getRecentActivity() {
  const supabase = await createClient()
  
  // Get recent interviews
  const { data: interviews } = await supabase
    .from('interviews')
    .select(`
      *,
      resident:residents(name, home:retirement_homes(name))
    `)
    .order('created_at', { ascending: false })
    .limit(5)

  // Get recent chapters
  const { data: chapters } = await supabase
    .from('chapters')
    .select(`
      *,
      resident:residents(name, home:retirement_homes(name))
    `)
    .order('updated_at', { ascending: false })
    .limit(5)

  return {
    interviews: interviews || [],
    chapters: chapters || []
  }
}