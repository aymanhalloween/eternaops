"use client"

import { FileUpload } from '@/components/file-upload'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

export default function UploadPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Upload Files</h2>
          <p className="text-muted-foreground">
            Upload interview recordings and related files for processing
          </p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Settings</CardTitle>
              <CardDescription>
                Select the resident and session details before uploading
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resident">Resident</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a resident" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Margaret Chen - Sunset Manor</SelectItem>
                    <SelectItem value="2">Robert Martinez - Golden Years</SelectItem>
                    <SelectItem value="3">Eleanor Thompson - Peaceful Gardens</SelectItem>
                    <SelectItem value="4">James Wilson - Harbor View</SelectItem>
                    <SelectItem value="5">Dorothy Anderson - Meadowbrook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="session">Session Number</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select session number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Session 1</SelectItem>
                    <SelectItem value="2">Session 2</SelectItem>
                    <SelectItem value="3">Session 3</SelectItem>
                    <SelectItem value="4">Session 4</SelectItem>
                    <SelectItem value="5">Session 5</SelectItem>
                    <SelectItem value="6">Session 6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <FileUpload 
            maxFiles={5}
            onUploadComplete={(files) => {
              console.log('Upload completed:', files)
            }}
          />
        </div>
      </div>
    </div>
  )
}