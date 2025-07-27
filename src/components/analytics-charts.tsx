"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts'

// Mock analytics data
const monthlyProgress = [
  { month: 'Jan', interviews: 45, chapters: 12, memoirs: 2 },
  { month: 'Feb', interviews: 52, chapters: 18, memoirs: 3 },
  { month: 'Mar', interviews: 48, chapters: 22, memoirs: 4 },
  { month: 'Apr', interviews: 61, chapters: 28, memoirs: 5 },
  { month: 'May', interviews: 55, chapters: 31, memoirs: 7 },
  { month: 'Jun', interviews: 67, chapters: 35, memoirs: 8 }
]

const statusDistribution = [
  { name: 'Active', value: 47, color: '#3b82f6' },
  { name: 'Review', value: 23, color: '#f59e0b' },
  { name: 'Complete', value: 18, color: '#10b981' },
  { name: 'On Hold', value: 12, color: '#6b7280' }
]

const retirementHomeStats = [
  { name: 'Sunset Manor', residents: 12, completed: 8 },
  { name: 'Golden Years', residents: 8, completed: 5 },
  { name: 'Peaceful Gardens', residents: 15, completed: 12 },
  { name: 'Harbor View', residents: 10, completed: 7 },
  { name: 'Meadowbrook', residents: 6, completed: 4 },
  { name: 'Oak Ridge', residents: 9, completed: 6 }
]

const weeklyActivity = [
  { week: 'Week 1', uploads: 12, transcriptions: 8, reviews: 15 },
  { week: 'Week 2', uploads: 15, transcriptions: 12, reviews: 18 },
  { week: 'Week 3', uploads: 18, transcriptions: 15, reviews: 22 },
  { week: 'Week 4', uploads: 22, transcriptions: 18, reviews: 25 }
]

export function AnalyticsCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      {/* Monthly Progress Trend */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Monthly Progress Overview</CardTitle>
          <CardDescription>
            Track interviews, chapters, and completed memoirs over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="interviews" 
                stackId="1" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="chapters" 
                stackId="1" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="memoirs" 
                stackId="1" 
                stroke="#f59e0b" 
                fill="#f59e0b" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Project Status Distribution</CardTitle>
          <CardDescription>
            Current status of all resident projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {statusDistribution.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Retirement Home Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Retirement Home Progress</CardTitle>
          <CardDescription>
            Residents and completion rates by community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={retirementHomeStats} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="residents" fill="#3b82f6" name="Total Residents" />
              <Bar dataKey="completed" fill="#10b981" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Weekly Activity */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Weekly Activity Trends</CardTitle>
          <CardDescription>
            File uploads, transcriptions, and reviews completed each week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="uploads" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Uploads"
              />
              <Line 
                type="monotone" 
                dataKey="transcriptions" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Transcriptions"
              />
              <Line 
                type="monotone" 
                dataKey="reviews" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Reviews"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}