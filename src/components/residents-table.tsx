"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SearchIcon, UserIcon } from "lucide-react"
import Link from "next/link"

type SupabaseResident = {
  id: number
  name: string
  background_notes: string | null
  progress_status: string
  home: {
    name: string
  } | null
  interviews: unknown[]
  chapters: unknown[]
}

interface ResidentsTableProps {
  data: SupabaseResident[]
}

function getStatusVariant(status: string) {
  switch (status.toLowerCase()) {
    case "active":
      return "default"
    case "review":
      return "secondary"
    case "complete":
      return "outline"
    default:
      return "default"
  }
}

export function ResidentsTable({ data }: ResidentsTableProps) {
  const [search, setSearch] = React.useState("")

  const filteredData = data.filter(resident => 
    resident.name.toLowerCase().includes(search.toLowerCase()) ||
    (resident.home?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (resident.background_notes || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            Residents ({data.length})
          </CardTitle>
          <div className="relative">
            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search residents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Community</TableHead>
              <TableHead>Interview Progress</TableHead>
              <TableHead>Chapter Status</TableHead>
              <TableHead>Next Interview</TableHead>
              <TableHead>Assigned Writer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((resident) => (
              <TableRow key={resident.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">
                  <div>
                    <Link 
                      href={`/dashboard/residents/${resident.id}`}
                      className="font-semibold hover:underline text-primary"
                    >
                      {resident.name}
                    </Link>
                    <div className="text-sm text-muted-foreground">
                      {resident.background_notes?.substring(0, 100)}...
                    </div>
                  </div>
                </TableCell>
                <TableCell>{resident.home?.name || 'N/A'}</TableCell>
                <TableCell>
                  <div className="text-sm font-medium">{resident.interviews?.length || 0} sessions</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{resident.chapters?.length || 0} chapters</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {resident.progress_status === "Complete" ? (
                      <Badge variant="outline">Complete</Badge>
                    ) : (
                      "Scheduled"
                    )}
                  </div>
                </TableCell>
                <TableCell>Team Member</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(resident.progress_status)}>
                    {resident.progress_status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/residents/${resident.id}`}>
                      View Details
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No residents found matching your search.
          </div>
        )}
      </CardContent>
    </Card>
  )
}