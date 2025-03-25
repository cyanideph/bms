"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  Users,
  FileCheck,
  AlertTriangle,
  CalendarDays,
  Download,
  Printer,
  Mail,
  FileSpreadsheet,
  FileIcon as FilePdf,
} from "lucide-react"
import { format } from "date-fns"

export function ReportGenerator() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
          <CardDescription>
            Create customized reports for different aspects of the barangay management system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="residents" className="space-y-4">
            <TabsList className="grid grid-cols-4 gap-4">
              <TabsTrigger value="residents" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Residents
              </TabsTrigger>
              <TabsTrigger value="permits" className="flex items-center gap-2">
                <FileCheck className="h-4 w-4" />
                Permits
              </TabsTrigger>
              <TabsTrigger value="incidents" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Incidents
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Events
              </TabsTrigger>
            </TabsList>

            <TabsContent value="residents" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="resident-report-type">Report Type</Label>
                  <Select defaultValue="demographic">
                    <SelectTrigger id="resident-report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="demographic">Demographic Report</SelectItem>
                      <SelectItem value="household">Household Report</SelectItem>
                      <SelectItem value="purok">Purok Distribution</SelectItem>
                      <SelectItem value="age">Age Distribution</SelectItem>
                      <SelectItem value="custom">Custom Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={(range) => range && setDateRange(range)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Include Fields</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="name" defaultChecked />
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Name
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="address" defaultChecked />
                    <label
                      htmlFor="address"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Address
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="gender" defaultChecked />
                    <label
                      htmlFor="gender"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Gender
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="age" defaultChecked />
                    <label
                      htmlFor="age"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Age
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="civil-status" defaultChecked />
                    <label
                      htmlFor="civil-status"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Civil Status
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="occupation" defaultChecked />
                    <label
                      htmlFor="occupation"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Occupation
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-notes">Additional Notes</Label>
                <Textarea id="additional-notes" placeholder="Add any additional notes or comments for this report" />
              </div>
            </TabsContent>

            <TabsContent value="permits" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="permit-report-type">Report Type</Label>
                  <Select defaultValue="summary">
                    <SelectTrigger id="permit-report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">Summary Report</SelectItem>
                      <SelectItem value="detailed">Detailed Report</SelectItem>
                      <SelectItem value="type">By Permit Type</SelectItem>
                      <SelectItem value="status">By Status</SelectItem>
                      <SelectItem value="custom">Custom Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={(range) => range && setDateRange(range)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Include Fields</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="permit-id" defaultChecked />
                    <label
                      htmlFor="permit-id"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Permit ID
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="applicant" defaultChecked />
                    <label
                      htmlFor="applicant"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Applicant
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="permit-type" defaultChecked />
                    <label
                      htmlFor="permit-type"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Permit Type
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="date-applied" defaultChecked />
                    <label
                      htmlFor="date-applied"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Date Applied
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="status" defaultChecked />
                    <label
                      htmlFor="status"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Status
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="purpose" defaultChecked />
                    <label
                      htmlFor="purpose"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Purpose
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-notes-permits">Additional Notes</Label>
                <Textarea
                  id="additional-notes-permits"
                  placeholder="Add any additional notes or comments for this report"
                />
              </div>
            </TabsContent>

            <TabsContent value="incidents" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="incident-report-type">Report Type</Label>
                  <Select defaultValue="summary">
                    <SelectTrigger id="incident-report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">Summary Report</SelectItem>
                      <SelectItem value="detailed">Detailed Report</SelectItem>
                      <SelectItem value="type">By Incident Type</SelectItem>
                      <SelectItem value="status">By Status</SelectItem>
                      <SelectItem value="priority">By Priority</SelectItem>
                      <SelectItem value="custom">Custom Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={(range) => range && setDateRange(range)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Include Fields</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="incident-id" defaultChecked />
                    <label
                      htmlFor="incident-id"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Incident ID
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="reporter" defaultChecked />
                    <label
                      htmlFor="reporter"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Reported By
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="incident-type" defaultChecked />
                    <label
                      htmlFor="incident-type"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Incident Type
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="date-reported" defaultChecked />
                    <label
                      htmlFor="date-reported"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Date Reported
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="incident-status" defaultChecked />
                    <label
                      htmlFor="incident-status"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Status
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="priority" defaultChecked />
                    <label
                      htmlFor="priority"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Priority
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-notes-incidents">Additional Notes</Label>
                <Textarea
                  id="additional-notes-incidents"
                  placeholder="Add any additional notes or comments for this report"
                />
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="event-report-type">Report Type</Label>
                  <Select defaultValue="summary">
                    <SelectTrigger id="event-report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">Summary Report</SelectItem>
                      <SelectItem value="detailed">Detailed Report</SelectItem>
                      <SelectItem value="attendance">Attendance Report</SelectItem>
                      <SelectItem value="upcoming">Upcoming Events</SelectItem>
                      <SelectItem value="custom">Custom Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={(range) => range && setDateRange(range)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Include Fields</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-title" defaultChecked />
                    <label
                      htmlFor="event-title"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Event Title
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-date" defaultChecked />
                    <label
                      htmlFor="event-date"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Event Date
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="location" defaultChecked />
                    <label
                      htmlFor="location"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Location
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="organizer" defaultChecked />
                    <label
                      htmlFor="organizer"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Organizer
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="attendees" defaultChecked />
                    <label
                      htmlFor="attendees"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Attendees
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="description" defaultChecked />
                    <label
                      htmlFor="description"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Description
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-notes-events">Additional Notes</Label>
                <Textarea
                  id="additional-notes-events"
                  placeholder="Add any additional notes or comments for this report"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
            <Button variant="outline" className="flex items-center gap-2">
              <FilePdf className="h-4 w-4" />
              <span>PDF</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              <span>Excel</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </Button>
          </div>
          <Button className="w-full sm:w-auto">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Previously generated reports that you can access again</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <FilePdf className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="text-sm font-medium">Resident Demographics Report</p>
                    <p className="text-xs text-muted-foreground">Generated on June 10, 2024</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <FileSpreadsheet className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Monthly Permit Applications</p>
                    <p className="text-xs text-muted-foreground">Generated on June 5, 2024</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <FilePdf className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="text-sm font-medium">Incident Resolution Report</p>
                    <p className="text-xs text-muted-foreground">Generated on June 1, 2024</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <FileSpreadsheet className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Q2 Events Summary</p>
                    <p className="text-xs text-muted-foreground">Generated on May 28, 2024</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

