"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Activity, 
  Upload, 
  CheckCircle, 
  User, 
  FileText, 
  Edit, 
  Clock, 
  Filter 
} from "lucide-react"

// Mock data for recent activities
const recentActivities = [
  {
    id: "1",
    type: "interview_uploaded",
    title: "New Interview Uploaded",
    description: "Dorothy Martinez - Session 3 audio file processed successfully",
    user: "Sarah Johnson",
    timestamp: "2024-02-15T14:30:00Z",
    resident: "Dorothy Martinez",
    community: "Sunset Manor",
    status: "completed"
  },
  {
    id: "2", 
    type: "chapter_completed",
    title: "Chapter Review Completed",
    description: "Robert Chen - Chapter 5: Military Service approved by editor",
    user: "Mike Chen",
    timestamp: "2024-02-15T13:15:00Z",
    resident: "Robert Chen",
    community: "Golden Years",
    status: "completed"
  },
  {
    id: "3",
    type: "resident_added",
    title: "New Resident Added",
    description: "Helen Rodriguez joined the Eterna platform",
    user: "Sarah Johnson", 
    timestamp: "2024-02-15T11:45:00Z",
    resident: "Helen Rodriguez",
    community: "Peaceful Gardens",
    status: "active"
  },
  {
    id: "4",
    type: "transcript_completed",
    title: "Transcript Processing Complete",
    description: "James Wilson - Session 2 transcript ready for review",
    user: "System",
    timestamp: "2024-02-15T10:20:00Z",
    resident: "James Wilson",
    community: "Sunset Manor",
    status: "processing"
  },
  {
    id: "5",
    type: "chapter_review",
    title: "Chapter Submitted for Review",
    description: "Margaret Thompson - Chapter 7: Family Traditions needs approval",
    user: "Emma Davis",
    timestamp: "2024-02-15T09:30:00Z",
    resident: "Margaret Thompson", 
    community: "Oak Ridge",
    status: "review"
  },
  {
    id: "6",
    type: "memoir_exported",
    title: "Memoir Export Generated",
    description: "Complete memoir for William Foster exported as PDF and audiobook",
    user: "System",
    timestamp: "2024-02-14T16:45:00Z",
    resident: "William Foster",
    community: "Golden Years",
    status: "completed"
  },
  {
    id: "7",
    type: "interview_scheduled",
    title: "Interview Scheduled",
    description: "Ruth Anderson - Session 4 scheduled for February 16th",
    user: "Sarah Johnson",
    timestamp: "2024-02-14T14:20:00Z",
    resident: "Ruth Anderson",
    community: "Peaceful Gardens", 
    status: "scheduled"
  },
  {
    id: "8",
    type: "community_joined",
    title: "New Community Added",
    description: "Oak Ridge Senior Living joined Eterna platform",
    user: "System",
    timestamp: "2024-02-12T10:00:00Z",
    resident: null,
    community: "Oak Ridge",
    status: "active"
  }
]

const todayActivities = recentActivities.filter(activity => {
  const today = new Date()
  const activityDate = new Date(activity.timestamp)
  return activityDate.toDateString() === today.toDateString()
})

const thisWeekActivities = recentActivities.filter(activity => {
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  return new Date(activity.timestamp) >= weekAgo
})

export default function RecentActivityPage() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'interview_uploaded': return <Upload className="h-4 w-4" />
      case 'chapter_completed': return <CheckCircle className="h-4 w-4" />
      case 'resident_added': return <User className="h-4 w-4" />
      case 'transcript_completed': return <FileText className="h-4 w-4" />
      case 'chapter_review': return <Edit className="h-4 w-4" />
      case 'memoir_exported': return <FileText className="h-4 w-4" />
      case 'interview_scheduled': return <Clock className="h-4 w-4" />
      case 'community_joined': return <Activity className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'review': return 'bg-yellow-100 text-yellow-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return 'Yesterday'
    return `${diffInDays} days ago`
  }

  const ActivityList = ({ activities }: { activities: typeof recentActivities }) => (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
          <div className="mt-1">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              {getActivityIcon(activity.type)}
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{activity.title}</h4>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(activity.status)}>
                  {activity.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {formatTimeAgo(activity.timestamp)}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>By: {activity.user}</span>
              {activity.resident && <span>Resident: {activity.resident}</span>}
              <span>Community: {activity.community}</span>
            </div>
          </div>
        </div>
      ))}
      {activities.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No activities found for this period.
        </div>
      )}
    </div>
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Recent Activity</h2>
          <p className="text-muted-foreground">
            Track all platform activities and updates in real-time
          </p>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter Activities
        </Button>
      </div>

      {/* Activity Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Activities</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayActivities.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisWeekActivities.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uploads</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recentActivities.filter(a => a.type === 'interview_uploaded').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completions</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recentActivities.filter(a => a.type === 'chapter_completed' || a.type === 'memoir_exported').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
          <CardDescription>
            Real-time updates on interviews, chapters, and memoir progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Activities</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <ActivityList activities={recentActivities} />
            </TabsContent>
            
            <TabsContent value="today" className="space-y-4">
              <ActivityList activities={todayActivities} />
            </TabsContent>
            
            <TabsContent value="week" className="space-y-4">
              <ActivityList activities={thisWeekActivities} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 