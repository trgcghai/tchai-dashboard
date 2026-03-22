import { createFileRoute } from '@tanstack/react-router'
import DashboardLayout from '../components/DashboardLayout'

export const Route = createFileRoute('/projects')({
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <DashboardLayout active="projects">
      <h1 className="text-3xl font-medium text-black">Projects</h1>
      <p className="mt-4 text-lg text-black/70">
        This section is a placeholder. Blog management is available in Blogs.
      </p>
    </DashboardLayout>
  )
}
