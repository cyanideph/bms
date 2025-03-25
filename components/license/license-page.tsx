"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageTransition } from "@/components/animations/page-transition"
import { FadeIn } from "@/components/animations/fade-in"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function LicensePage() {
  return (
    <PageTransition>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <FadeIn>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight philippines-text-gradient">Software License</h2>
              <p className="text-muted-foreground">License information for Barangay Sua Management System</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download License</span>
              </Button>
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>

        <Card>
          <CardHeader>
            <CardTitle>MIT License</CardTitle>
            <CardDescription>Copyright (c) {new Date().getFullYear()} Joemar Balaba</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-muted p-4 text-sm">
              <p>
                Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
                associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction,
                including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
                and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
                subject to the following conditions:
              </p>
              <p className="mt-4">
                The above copyright notice and this permission notice shall be included in all copies or substantial
                portions of the Software.
              </p>
              <p className="mt-4">
                THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
                BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
                OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
                CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">About This License</h3>
              <p className="text-sm text-muted-foreground">
                The MIT License is a permissive free software license originating at the Massachusetts Institute of
                Technology. It puts only very limited restriction on reuse and has, therefore, high license
                compatibility.
              </p>
              <p className="text-sm text-muted-foreground">This means you are free to:</p>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                <li>Use the software for commercial purposes</li>
                <li>Modify the software and create derivative works</li>
                <li>Distribute the software</li>
                <li>Sublicense the software</li>
                <li>Use the software privately</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                The only requirement is that the license and copyright notice must be included in all copies or
                substantial portions of the software.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Attribution</h3>
              <p className="text-sm text-muted-foreground">
                Barangay Sua Management System was created by <span className="font-medium">Joemar Balaba</span>.
              </p>
              <p className="text-sm text-muted-foreground">
                When using this software or derivative works, please provide appropriate attribution to the original
                creator.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Third-Party Components</h3>
              <p className="text-sm text-muted-foreground">
                This software includes several third-party open-source components, each with their own licenses:
              </p>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                <li>Next.js - Licensed under the MIT License</li>
                <li>React - Licensed under the MIT License</li>
                <li>Tailwind CSS - Licensed under the MIT License</li>
                <li>shadcn/ui - Licensed under the MIT License</li>
                <li>Lucide Icons - Licensed under the ISC License</li>
                <li>Recharts - Licensed under the MIT License</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                Full license texts for these components are available in the project repository.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>For licensing inquiries or questions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              If you have any questions about the license or need to contact the creator for licensing inquiries, please
              reach out to:
            </p>
            <div className="mt-2 rounded-md bg-muted p-4">
              <p className="font-medium">Joemar Balaba</p>
              <p className="text-sm text-muted-foreground">Email: joemar.balaba@example.com</p>
              <p className="text-sm text-muted-foreground">Website: https://joemarbalaba.example.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}

