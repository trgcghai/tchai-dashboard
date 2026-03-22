import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import DashboardLayout from '../components/DashboardLayout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '#/components/ui/breadcrumb'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'

type BlogStatus = 'Draft' | 'Published'

type BlogItem = {
  id: number
  title: string
  tags: string[]
  status: BlogStatus
}

const blogItems: BlogItem[] = [
  {
    id: 1,
    title: 'Launching the Spring Product Update',
    tags: ['Product', 'Update'],
    status: 'Published',
  },
  {
    id: 2,
    title: 'How We Designed Our New Dashboard',
    tags: ['Design', 'Case Study'],
    status: 'Draft',
  },
  {
    id: 3,
    title: 'Writing Better Frontend Documentation',
    tags: ['Engineering', 'Docs'],
    status: 'Published',
  },
  {
    id: 4,
    title: 'Q2 Content Planning Notes',
    tags: ['Content', 'Planning'],
    status: 'Draft',
  },
]

export const Route = createFileRoute('/blogs')({
  component: BlogsPage,
})

function BlogsPage() {
  const [searchText, setSearchText] = useState('')
  const [status, setStatus] = useState<'all' | BlogStatus>('all')

  const filteredBlogs = useMemo(() => {
    return blogItems.filter((blog) => {
      const text = searchText.toLowerCase()
      const matchesText =
        blog.title.toLowerCase().includes(text) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(text))
      const matchesStatus = status === 'all' || blog.status === status
      return matchesText && matchesStatus
    })
  }, [searchText, status])

  function clearFilters() {
    setSearchText('')
    setStatus('all')
  }

  return (
    <DashboardLayout active="blogs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Breadcrumb>
          <BreadcrumbList className="text-3xl font-medium text-black">
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-black" />
            <BreadcrumbItem>
              <BreadcrumbPage>Blog</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Button
          className="h-12 rounded-xl border-2 border-black/70 bg-white px-8 text-2xl font-medium text-black hover:bg-black/5"
          variant="outline"
        >
          Create
        </Button>
      </div>

      <div className="mt-6 rounded-2xl border-2 border-black/70 bg-white p-3">
        <div className="flex flex-wrap gap-3">
          <Input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search blogs..."
            className="h-12 min-w-70-1 rounded-xl border-black/60 bg-white px-4 text-lg text-black placeholder:text-black/50"
          />

          <Select
            value={status}
            onValueChange={(value) => setStatus(value as 'all' | BlogStatus)}
          >
            <SelectTrigger className="h-12 min-w-55 rounded-xl border-black/60 bg-white px-4 text-lg text-black">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
            </SelectContent>
          </Select>

          <Button
            type="button"
            onClick={clearFilters}
            variant="outline"
            className="h-12 min-w-30 rounded-xl border-black/60 bg-white text-lg text-black hover:bg-black/5"
          >
            Clear
          </Button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border-2 border-black/70 bg-white">
        <Table className="text-base">
          <TableHeader>
            <TableRow className="border-black/35 hover:bg-transparent">
              <TableHead className="border-r border-black/30 px-5 py-4 text-3xl font-medium text-black">
                Title
              </TableHead>
              <TableHead className="border-r border-black/30 px-5 py-4 text-3xl font-medium text-black">
                Tags
              </TableHead>
              <TableHead className="border-r border-black/30 px-5 py-4 text-3xl font-medium text-black">
                Status
              </TableHead>
              <TableHead className="px-5 py-4 text-3xl font-medium text-black">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBlogs.map((blog) => (
              <TableRow key={blog.id} className="border-black/25">
                <TableCell className="border-r border-black/20 px-5 py-4 text-lg text-black">
                  {blog.title}
                </TableCell>
                <TableCell className="border-r border-black/20 px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="h-7 rounded-full border-black/40 px-3 text-xs text-black"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="border-r border-black/20 px-5 py-4 text-lg text-black">
                  {blog.status}
                </TableCell>
                <TableCell className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      className="h-8 border-black/40 text-sm text-black"
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 border-black/40 text-sm text-black"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 border-black/40 text-sm text-black"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredBlogs.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={4}
                  className="px-5 py-10 text-center text-lg text-black/70"
                >
                  No blogs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  )
}
