import { AppSidebar } from "@/components/app-sidebar"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { ResidentsTable } from "@/components/residents-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getResidents } from "@/lib/supabase/queries"

export default async function Page() {
  const residents = await getResidents()
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <AnalyticsCharts />
              </div>
              <ResidentsTable data={residents} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
