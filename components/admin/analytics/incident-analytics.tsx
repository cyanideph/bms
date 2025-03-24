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
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for incident analytics
const monthlyIncidentData = [
  { name: "Jan", reported: 8, resolved: 7, pending: 1 },
  { name: "Feb", reported: 6, resolved: 5, pending: 1 },
  { name: "Mar", reported: 10, resolved: 8, pending: 2 },
  { name: "Apr", reported: 7, resolved: 6, pending: 1 },
  { name: "May", reported: 9, resolved: 7, pending: 2 },
  { name: "Jun", reported: 12, resolved: 10, pending: 2 },
  { name: "Jul", reported: 8, resolved: 7, pending: 1 },
  { name: "Aug", reported: 7, resolved: 6, pending: 1 },
  { name: "Sep", reported: 9, resolved: 8, pending: 1 },
  { name: "Oct", reported: 11, resolved: 9, pending: 2 },
  { name: "Nov", reported: 8, resolved: 7, pending: 1 },
  { name: "Dec", reported: 6, resolved: 5, pending: 1 },
]

const incidentTypeData = [
  { name: "Infrastructure", value: 35, color: "#1e40af" },
  { name: "Public Safety", value: 25, color: "#db2777" },
  { name: "Utilities", value: 20, color: "#047857" },
  { name: "Noise Complaint", value: 15, color: "#b45309" },
  { name: "Others", value: 5, color: "#7c3aed" },
]

const priorityDistributionData = [
  { name: "High", value: 25, color: "#ef4444" },
  { name: "Medium", value: 42, color: "#f59e0b" },
  { name: "Low", value: 33, color: "#10b981" },
]

const resolutionTimeData = [
  { name: "Same Day", value: 15 },
  { name: "1-3 Days", value: 35 },
  { name: "4-7 Days", value: 25 },
  { name: "1-2 Weeks", value: 15 },
  { name: "2+ Weeks", value: 10 },
]

export function IncidentAnalytics() {
  return (
    <div className="space-y-6">
      <div className="h-80">
        <ChartContainer>
          <Chart>
            <AreaChart data={monthlyIncidentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorReported" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="reported"
                stroke="hsl(var(--destructive))"
                fillOpacity={1}
                fill="url(#colorReported)"
                name="Reported"
              />
              <Area
                type="monotone"
                dataKey="resolved"
                stroke="hsl(var(--accent))"
                fillOpacity={1}
                fill="url(#colorResolved)"
                name="Resolved"
              />
            </AreaChart>
          </Chart>
          <ChartLegend>
            <ChartLegendItem name="Reported" color="hsl(var(--destructive))" />
            <ChartLegendItem name="Resolved" color="hsl(var(--accent))" />
          </ChartLegend>
        </ChartContainer>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Incident Types</h3>
          <div className="h-64 flex items-center justify-center">
            <ChartContainer>
              <Chart>
                <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <Pie
                    data={incidentTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                    label
                  >
                    {incidentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </Chart>
              <ChartLegend>
                {incidentTypeData.map((entry) => (
                  <ChartLegendItem key={entry.name} name={entry.name} color={entry.color} />
                ))}
              </ChartLegend>
            </ChartContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Priority Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <ChartContainer>
              <Chart>
                <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <Pie
                    data={priorityDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                    label
                  >
                    {priorityDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </Chart>
              <ChartLegend>
                {priorityDistributionData.map((entry) => (
                  <ChartLegendItem key={entry.name} name={entry.name} color={entry.color} />
                ))}
              </ChartLegend>
            </ChartContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Resolution Time</h3>
          <div className="h-64">
            <ChartContainer>
              <Chart>
                <BarChart data={resolutionTimeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" name="Incidents" />
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

