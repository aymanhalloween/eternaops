import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Check authentication
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const residentId = formData.get('residentId') as string
    const sessionNumber = formData.get('sessionNumber') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/m4a', 'video/mp4', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // Generate unique file path
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const filePath = `interviews/${residentId}/${timestamp}-session-${sessionNumber}.${fileExtension}`

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('interview-files')
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('interview-files')
      .getPublicUrl(filePath)

    // Save interview record to database
    const { data: interview, error: dbError } = await supabase
      .from('interviews')
      .insert({
        resident_id: parseInt(residentId),
        file_url: publicUrl,
        session_number: parseInt(sessionNumber),
        status: 'Uploaded',
        upload_date: new Date().toISOString(),
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json({ error: 'Failed to save interview record' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      interview,
      fileUrl: publicUrl,
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}