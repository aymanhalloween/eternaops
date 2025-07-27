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

// Mock data - in real app this would come from API
const residentData = {
  id: 1,
  name: "Margaret Chen",
  backgroundNotes: "Retired Stanford computer science professor, pioneered early AI research in the 1970s. Originally from Taiwan, immigrated to the US in 1965.",
  progressStatus: "Active",
  retirementHome: "Sunset Manor",
  joinDate: "2024-01-15",
  interviews: [
    {
      id: 1,
      sessionNumber: 1,
      date: "2024-02-01",
      duration: "45 min",
      status: "Transcribed",
      topics: ["Early life in Taiwan", "Immigration journey"]
    },
    {
      id: 2,
      sessionNumber: 2,
      date: "2024-02-08",
      duration: "52 min",
      status: "Transcribed",
      topics: ["Stanford years", "PhD research"]
    },
    {
      id: 3,
      sessionNumber: 3,
      date: "2024-02-15",
      duration: "38 min",
      status: "Processing",
      topics: ["AI research", "Teaching career"]
    }
  ],
  chapters: [
    {
      id: 1,
      title: "Growing Up in Taiwan",
      status: "Published",
      wordCount: 2800,
      order: 1
    },
    {
      id: 2,
      title: "The Journey to America",
      status: "Review",
      wordCount: 3200,
      order: 2
    },
    {
      id: 3,
      title: "Stanford and the Early Days of AI",
      status: "Draft",
      wordCount: 1900,
      order: 3
    }
  ],
  stats: {
    totalInterviews: 3,
    completedChapters: 1,
    totalWordCount: 7900,
    progressPercentage: 45
  }
}

export default async function ResidentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'review': return 'bg-yellow-100 text-yellow-800'
      case 'draft': return 'bg-blue-100 text-blue-800'
      case 'transcribed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg font-semibold">
              {residentData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{residentData.name}</h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {residentData.retirementHome}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                Joined {new Date(residentData.joinDate).toLocaleDateString()}
              </div>
              <Badge className={getStatusColor(residentData.progressStatus)}>
                {residentData.progressStatus}
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
            <div className="text-2xl font-bold">{residentData.stats.totalInterviews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Chapters</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{residentData.stats.completedChapters}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Words</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{residentData.stats.totalWordCount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{residentData.stats.progressPercentage}%</div>
            <Progress value={residentData.stats.progressPercentage} className="mt-2" />
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
              <p className="text-sm leading-relaxed">{residentData.backgroundNotes}</p>
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
            {residentData.interviews.map((interview) => (
              <Card key={interview.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">Session {interview.sessionNumber}</h4>
                        <Badge className={getStatusColor(interview.status)}>
                          {interview.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(interview.date).toLocaleDateString()} • {interview.duration}
                      </p>
                      <p className="text-sm">Topics: {interview.topics.join(', ')}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
            {residentData.chapters.map((chapter) => (
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
                        Chapter {chapter.order} • {chapter.wordCount.toLocaleString()} words
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
            ))}
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
                    <p className="font-medium">Initial interview completed</p>
                    <p className="text-sm text-muted-foreground">Feb 1, 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">First chapter published</p>
                    <p className="text-sm text-muted-foreground">Feb 10, 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Chapter 2 in review</p>
                    <p className="text-sm text-muted-foreground">Current</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Target memoir completion</p>
                    <p className="text-sm text-muted-foreground">April 2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}