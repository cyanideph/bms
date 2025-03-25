"use client"

import { Card } from "@/components/ui/card"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for permit analytics
const monthlyPermitData = [
  { name: "Jan", applications: 32, approved: 28, rejected: 4 },
  { name: "Feb", applications: 28, approved: 25, rejected: 3 },
  { name: "Mar", applications: 35, approved: 30, rejected: 5 },
  { name: "Apr", applications: 30, approved: 27, rejected: 3 },
  { name: "May", applications: 25, approved: 22, rejected: 3 },
  { name: "Jun", applications: 38, approved: 34, rejected: 4 },
  { name: "Jul", applications: 42, approved: 38, rejected: 4 },
  { name: "Aug", applications: 32, approved: 29, rejected: 3 },
  { name: "Sep", applications: 28, approved: 25, rejected: 3 },
  { name: "Oct", applications: 35, approved: 31, rejected: 4 },
  { name: "Nov", applications: 30, approved: 27, rejected: 3 },
  { name: "Dec", applications: 25, approved: 22, rejected: 3 },
]

const permitTypeData = [
  { name: "Barangay Clearance", value: 180, color: "#1e40af" },
  { name: "Business Permit", value: 120, color: "#db2777" },
  { name: "Residency Certificate", value: 90, color: "#047857" },
  { name: "Indigency Certificate", value: 70, color: "#b45309" },
  { name: "Building Permit", value: 40, color: "#7c3aed" },
]

const processingTimeData = [
  { name: "Same Day", value: 140 },
  { name: "1-2 Days", value: 210 },
  { name: "3-5 Days", value: 120 },
  { name: "5+ Days", value: 30 },
]

export function PermitAnalytics() {
  return (
    <div className="space-y-6">
      <div className="h-80">
        <ChartContainer>
          <Chart>
            <LineChart data={monthlyPermitData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="applications" stroke="hsl(var(--primary))" name="Applications" />
              <Line type="monotone" dataKey="approved" stroke="hsl(var(--accent))" name="Approved" />
              <Line type="monotone" dataKey="rejected" stroke="hsl(var(--destructive))" name="Rejected" />
            </LineChart>
          </Chart>
          <ChartLegend>
            <ChartLegendItem name="Applications" color="hsl(var(--primary))" />
            <ChartLegendItem name="Approved" color="hsl(var(--accent))" />
            <ChartLegendItem name="Rejected" color="hsl(var(--destructive))" />
          </ChartLegend>
        </ChartContainer>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Permit Types Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <ChartContainer>
              <Chart>
                <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <Pie
                    data={permitTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                    label
                  >
                    {permitTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </Chart>
              <ChartLegend>
                {permitTypeData.map((entry) => (
                  <ChartLegendItem key={entry.name} name={entry.name} color={entry.color} />
                ))}
              </ChartLegend>
            </ChartContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Processing Time</h3>
          <div className="h-64">
            <ChartContainer>
              <Chart>
                <BarChart data={processingTimeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="hsl(var(--secondary))" name="Permits" />
                </BarChart>
              </Chart>
            </ChartContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}

// Custom tooltip component for charts
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <ChartTooltip>
        <ChartTooltipContent>
          {label && <p className="font-medium">{label}</p>}
          {payload.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color || item.fill }}></div>
              <span>
                {item.name || item.dataKey}: {item.value}
              </span>
            </div>
          ))}
        </ChartTooltipContent>
      </ChartTooltip>
    )
  }
  return null
}

