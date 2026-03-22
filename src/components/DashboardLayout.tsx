import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import { cn } from '#/lib/utils'

type DashboardLayoutProps = {
  active: 'dashboard' | 'blogs' | 'projects' | 'contact'
  children: React.ReactNode
}

const items: Array<{
  label: string
  to: '/dashboard' | '/blogs' | '/projects' | '/contact'
  key: DashboardLayoutProps['active']
}> = [
  { label: 'Dashboard', to: '/dashboard', key: 'dashboard' },
  { label: 'Blogs', to: '/blogs', key: 'blogs' },
  { label: 'Projects', to: '/projects', key: 'projects' },
  { label: 'Contact', to: '/contact', key: 'contact' },
]

export default function DashboardLayout({
  active,
  children,
}: DashboardLayoutProps) {
  return (
    <main className="min-h-screen bg-[#efefef] p-4 md:p-6">
      <div className="mx-auto w-full max-w-330 rounded-[24px] border-2 border-black/70 bg-[#f8f8f8]">
        <div className="grid min-h-180 grid-cols-1 lg:grid-cols-[240px_1fr]">
          <aside className="border-b-2 border-black/70 p-5 lg:border-r-2 lg:border-b-0">
            <div className="space-y-3">
              {items.map((item) => (
                <Link
                  key={item.key}
                  to={item.to}
                  className={cn(
                    'block rounded-xl border-2 px-4 py-2.5 text-center text-2xl font-medium text-black transition',
                    active === item.key
                      ? 'border-black bg-black text-white'
                      : 'border-black/70 bg-white hover:bg-black/5',
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex justify-center lg:mt-8">
              <ThemeToggle />
            </div>
          </aside>
          <section className="p-4 md:p-6">{children}</section>
        </div>
      </div>
    </main>
  )
}
