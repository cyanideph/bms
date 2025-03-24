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

// Mock data for user activity analytics
const userActivityData = [
  { name: "Mon", logins: 45, actions: 120 },
  { name: "Tue", logins: 52, actions: 140 },
  { name: "Wed", logins: 48, actions: 130 },
  { name: "Thu", logins: 61, actions: 155 },
  { name: "Fri", logins: 55, actions: 145 },
  { name: "Sat", logins: 28, actions: 80 },
  { name: "Sun", logins: 22, actions: 65 },
]

const userRoleData = [
  { name: "Admin", value: 5, color: "#1e40af" },
  { name: "Staff", value: 12, color: "#db2777" },
  { name: "Regular User", value: 83, color: "#047857" },
]

const featureUsageData = [
  { name: "Resident Records", value: 35 },
  { name: "Permits", value: 25 },
  { name: "Incidents", value: 15 },
  { name: "Announcements", value: 10 },
  { name: "Messages", value: 15 },
]

export function UserActivityAnalytics() {
  return (
    <div className="space-y-6">
      <div className="h-80">
        <ChartContainer>
          <Chart>
            <LineChart data={userActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="logins" stroke="hsl(var(--primary))" name="Logins" />
              <Line type="monotone" dataKey="actions" stroke="hsl(var(--secondary))" name="Actions" />
            </LineChart>
          </Chart>
          <ChartLegend>
            <ChartLegendItem name="Logins" color="hsl(var(--primary))" />
            <ChartLegendItem name="Actions" color="hsl(var(--secondary))" />
          </ChartLegend>
        </ChartContainer>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">User Roles</h3>
          <div className="h-64 flex items-center justify-center">
            <ChartContainer>
              <Chart>
                <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <Pie
                    data={userRoleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                    label
                  >
                    {userRoleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </Chart>
              <ChartLegend>
                {userRoleData.map((entry) => (
                  <ChartLegendItem key={entry.name} name={entry.name} color={entry.color} />
                ))}
              </ChartLegend>
            </ChartContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Feature Usage</h3>
          <div className="h-64">
            <ChartContainer>
              <Chart>
                <BarChart data={featureUsageData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="hsl(var(--accent))" name="Usage %" />
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

