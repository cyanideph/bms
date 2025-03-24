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

// Mock data for resident analytics
const monthlyResidentData = [
  { name: "Jan", residents: 1200, newRegistrations: 15, transfers: 5 },
  { name: "Feb", residents: 1210, newRegistrations: 12, transfers: 2 },
  { name: "Mar", residents: 1218, newRegistrations: 10, transfers: 2 },
  { name: "Apr", residents: 1225, newRegistrations: 8, transfers: 1 },
  { name: "May", residents: 1232, newRegistrations: 9, transfers: 2 },
  { name: "Jun", residents: 1240, newRegistrations: 12, transfers: 4 },
  { name: "Jul", residents: 1247, newRegistrations: 10, transfers: 3 },
  { name: "Aug", residents: 1252, newRegistrations: 8, transfers: 3 },
  { name: "Sep", residents: 1260, newRegistrations: 11, transfers: 3 },
  { name: "Oct", residents: 1268, newRegistrations: 13, transfers: 5 },
  { name: "Nov", residents: 1275, newRegistrations: 9, transfers: 2 },
  { name: "Dec", residents: 1280, newRegistrations: 7, transfers: 2 },
]

const ageDistributionData = [
  { name: "0-10", value: 120 },
  { name: "11-20", value: 210 },
  { name: "21-30", value: 325 },
  { name: "31-40", value: 290 },
  { name: "41-50", value: 185 },
  { name: "51-60", value: 95 },
  { name: "61+", value: 55 },
]

const genderDistributionData = [
  { name: "Male", value: 650, color: "#1e40af" },
  { name: "Female", value: 630, color: "#db2777" },
]

const purokDistributionData = [
  { name: "Purok 1", value: 210 },
  { name: "Purok 2", value: 185 },
  { name: "Purok 3", value: 230 },
  { name: "Purok 4", value: 195 },
  { name: "Purok 5", value: 240 },
  { name: "Purok 6", value: 220 },
]

export function ResidentAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Resident Population Trend</h3>
          <div className="h-80">
            <ChartContainer>
              <Chart>
                <AreaChart data={monthlyResidentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorResidents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="residents"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorResidents)"
                  />
                </AreaChart>
              </Chart>
              <ChartLegend>
                <ChartLegendItem name="Total Residents" color="hsl(var(--primary))" />
              </ChartLegend>
            </ChartContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">New Registrations & Transfers</h3>
          <div className="h-80">
            <ChartContainer>
              <Chart>
                <BarChart data={monthlyResidentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="newRegistrations" fill="hsl(var(--primary))" name="New Registrations" />
                  <Bar dataKey="transfers" fill="hsl(var(--secondary))" name="Transfers" />
                </BarChart>
              </Chart>
              <ChartLegend>
                <ChartLegendItem name="New Registrations" color="hsl(var(--primary))" />
                <ChartLegendItem name="Transfers" color="hsl(var(--secondary))" />
              </ChartLegend>
            </ChartContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Age Distribution</h3>
          <div className="h-64">
            <ChartContainer>
              <Chart>
                <BarChart
                  data={ageDistributionData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="hsl(var(--accent))" name="Residents" />
                </BarChart>
              </Chart>
            </ChartContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Gender Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <ChartContainer>
              <Chart>
                <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <Pie
                    data={genderDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                    label
                  >
                    {genderDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </Chart>
              <ChartLegend>
                {genderDistributionData.map((entry) => (
                  <ChartLegendItem key={entry.name} name={entry.name} color={entry.color} />
                ))}
              </ChartLegend>
            </ChartContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Purok Distribution</h3>
          <div className="h-64">
            <ChartContainer>
              <Chart>
                <BarChart data={purokDistributionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" name="Residents" />
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

