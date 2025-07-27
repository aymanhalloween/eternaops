import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  User, 
  MapPin, 
  Calendar, 
  FileText, 
  Mic, 
  BookOpen, 
  Download,
  Edit,
  Play,
  Pause
} from 'lucide-react'
import Link from 'next/link'
import { getResident } from '@/lib/supabase/queries'

export default async function ResidentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const residentData = await getResident(parseInt(id))

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'review': return 'bg-yellow-100 text-yellow-800'
      case 'draft': return 'bg-blue-100 text-blue-800'
      case 'transcribed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-orange-100 text-orange-800'
      case 'uploaded': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const totalInterviews = residentData.interviews?.length || 0
  const completedChapters = residentData.chapters?.filter((c: any) => c.status === 'Published').length || 0
  const totalWordCount = residentData.chapters?.reduce((sum: number, chapter: any) => sum + (chapter.word_count || 0), 0) || 0
  const progressPercentage = totalInterviews > 0 ? Math.round((completedChapters / Math.max(totalInterviews, 1)) * 100) : 0

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg font-semibold">
              {residentData.name.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{residentData.name}</h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {residentData.home?.name || 'N/A'}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                Joined {new Date(residentData.created_at).toLocaleDateString()}
              </div>
              <Badge className={getStatusColor(residentData.progress_status)}>
                {residentData.progress_status}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Memoir
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
            <Mic className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInterviews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Chapters</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedChapters}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Words</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWordCount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressPercentage}%</div>
            <Progress value={progressPercentage} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="chapters">Chapters</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Background Notes</CardTitle>
              <CardDescription>Key information about the resident's life and story</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{residentData.background_notes || 'No background notes available.'}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interviews" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Interview Sessions</h3>
            <Button>
              <Mic className="mr-2 h-4 w-4" />
              Schedule New Session
            </Button>
          </div>
          <div className="grid gap-4">
            {residentData.interviews?.map((interview, index) => (
              <Card key={interview.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">Session {interview.session_number || index + 1}</h4>
                        <Badge className={getStatusColor(interview.status)}>
                          {interview.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(interview.upload_date).toLocaleDateString()}
                      </p>
                      {interview.file_url && (
                        <p className="text-sm">Interview file uploaded</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {interview.file_url && (
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) || (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">No interviews recorded yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="chapters" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Memoir Chapters</h3>
            <Button>
              <BookOpen className="mr-2 h-4 w-4" />
              Create New Chapter
            </Button>
          </div>
          <div className="grid gap-4">
            {residentData.chapters?.map((chapter) => (
              <Card key={chapter.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{chapter.title}</h4>
                        <Badge className={getStatusColor(chapter.status)}>
                          {chapter.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Chapter {chapter.order} • {(chapter.word_count || 0).toLocaleString()} words
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/chapters/${chapter.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) || (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">No chapters created yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>Key milestones and upcoming deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Resident enrolled</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(residentData.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {residentData.interviews?.map((interview, index) => (
                  <div key={interview.id} className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Interview {index + 1} completed</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(interview.upload_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {residentData.chapters?.map((chapter) => (
                  <div key={chapter.id} className="flex items-center space-x-4">
                    <div className={`w-2 h-2 rounded-full ${
                      chapter.status === 'Published' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium">Chapter: {chapter.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Status: {chapter.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}