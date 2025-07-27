import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Building, 
  Users, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Phone,
  Edit,
  Plus
} from 'lucide-react'

// Mock data for retirement homes
const retirementHomes = [
  {
    id: 1,
    name: "Sunset Manor",
    location: "Palo Alto, CA",
    contactPerson: "Sarah Johnson",
    phone: "(650) 555-0123",
    email: "sarah.johnson@sunsetmanor.com",
    totalResidents: 12,
    activeResidents: 10,
    completedMemoirs: 8,
    joinDate: "2023-06-15",
    monthlyFee: 3600,
    status: "Active",
    notes: "Premium assisted living community focused on preserving resident stories."
  },
  {
    id: 2,
    name: "Golden Years Community",
    location: "Mountain View, CA",
    contactPerson: "Michael Chen",
    phone: "(650) 555-0234",
    email: "m.chen@goldenyears.com",
    totalResidents: 8,
    activeResidents: 7,
    completedMemoirs: 5,
    joinDate: "2023-08-20",
    monthlyFee: 2400,
    status: "Active",
    notes: "Independent living with memory care services."
  },
  {
    id: 3,
    name: "Peaceful Gardens",
    location: "Menlo Park, CA",
    contactPerson: "Lisa Rodriguez",
    phone: "(650) 555-0345",
    email: "lisa@peacefulgardens.org",
    totalResidents: 15,
    activeResidents: 13,
    completedMemoirs: 12,
    joinDate: "2023-04-10",
    monthlyFee: 4500,
    status: "Active",
    notes: "Luxury senior living with comprehensive wellness programs."
  },
  {
    id: 4,
    name: "Harbor View Residence",
    location: "Redwood City, CA",
    contactPerson: "David Kim",
    phone: "(650) 555-0456",
    email: "david.kim@harborview.com",
    totalResidents: 10,
    activeResidents: 8,
    completedMemoirs: 7,
    joinDate: "2023-09-05",
    monthlyFee: 3000,
    status: "Active",
    notes: "Waterfront senior community with storytelling focus."
  },
  {
    id: 5,
    name: "Meadowbrook Manor",
    location: "Foster City, CA",
    contactPerson: "Emily Watson",
    phone: "(650) 555-0567",
    email: "emily@meadowbrook.net",
    totalResidents: 6,
    activeResidents: 5,
    completedMemoirs: 4,
    joinDate: "2023-11-12",
    monthlyFee: 1800,
    status: "Active",
    notes: "Smaller community with personalized care approach."
  }
]

export default function RetirementHomesPage() {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const calculateProgress = (completed: number, total: number) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0
  }

  const totalResidents = retirementHomes.reduce((sum, home) => sum + home.totalResidents, 0)
  const totalActive = retirementHomes.reduce((sum, home) => sum + home.activeResidents, 0)
  const totalCompleted = retirementHomes.reduce((sum, home) => sum + home.completedMemoirs, 0)
  const totalRevenue = retirementHomes.reduce((sum, home) => sum + home.monthlyFee, 0)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Retirement Homes</h2>
          <p className="text-muted-foreground">
            Manage partner communities and their resident programs
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Home
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Homes</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{retirementHomes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Residents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalResidents}</div>
            <p className="text-xs text-muted-foreground">{totalActive} currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Memoirs</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompleted}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((totalCompleted / totalResidents) * 100)}% completion rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Retirement Homes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {retirementHomes.map((home) => (
          <Card key={home.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{home.name}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {home.location}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(home.status)}>
                    {home.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Contact: </span>
                  {home.contactPerson}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="mr-1 h-3 w-3" />
                  {home.phone}
                </div>
              </div>

              {/* Progress Stats */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Active Residents</span>
                  <span className="font-medium">{home.activeResidents}/{home.totalResidents}</span>
                </div>
                <Progress 
                  value={(home.activeResidents / home.totalResidents) * 100} 
                  className="h-2"
                />
                
                <div className="flex justify-between text-sm">
                  <span>Memoir Completion</span>
                  <span className="font-medium">
                    {calculateProgress(home.completedMemoirs, home.totalResidents)}%
                  </span>
                </div>
                <Progress 
                  value={calculateProgress(home.completedMemoirs, home.totalResidents)} 
                  className="h-2"
                />
              </div>

              {/* Financial Info */}
              <div className="pt-2 border-t">
                <div className="flex justify-between text-sm">
                  <span>Monthly Revenue</span>
                  <span className="font-medium">${home.monthlyFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Member Since</span>
                  <span>{new Date(home.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Notes */}
              {home.notes && (
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">{home.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Residents
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  View Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}