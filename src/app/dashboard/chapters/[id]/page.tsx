import { ChapterEditor } from '@/components/chapter-editor'

// Mock data - in real app this would come from API
const chapterData = {
  id: 1,
  title: "Growing Up in Taiwan",
  content: `<h2>Early Years in Taipei</h2>
  
  <p>I was born in Taipei in 1945, just as the world was emerging from the shadows of war. My earliest memories are filled with the bustling streets of our neighborhood, where vendors called out their wares and the scent of street food filled the air.</p>
  
  <p>My father worked as a schoolteacher, and my mother managed our small household with the precision of a general. We lived in a traditional courtyard house with my grandparents, aunts, and uncles - a multi-generational household that was both nurturing and challenging.</p>
  
  <blockquote>
  <p>"Education is the most important gift we can give you," my father would say, his weathered hands holding the calligraphy brush as he practiced his characters each evening.</p>
  </blockquote>
  
  <p>Those words would shape my entire life, though I didn't understand their weight at the time.</p>`,
  wordCount: 2800,
  status: "Published",
  residentId: 1,
  residentName: "Margaret Chen"
}

export default async function ChapterEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Chapter Editor</h2>
          <p className="text-muted-foreground">
            Editing chapter for {chapterData.residentName}
          </p>
        </div>
      </div>
      
      <ChapterEditor
        chapterId={chapterData.id}
        title={chapterData.title}
        content={chapterData.content}
        wordCount={chapterData.wordCount}
        status={chapterData.status}
        onSave={(content) => {
          console.log('Saving chapter:', content)
          // In real app, this would make API call to save
        }}
      />
    </div>
  )
}