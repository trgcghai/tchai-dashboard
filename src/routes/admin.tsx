import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { format } from 'date-fns'
import { toast } from 'sonner'

import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert'
import { Badge } from '#/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '#/components/ui/breadcrumb'
import { Button } from '#/components/ui/button'
import { Calendar } from '#/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Checkbox } from '#/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '#/components/ui/pagination'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '#/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import { Separator } from '#/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '#/components/ui/sidebar'
import { Skeleton } from '#/components/ui/skeleton'
import { Switch } from '#/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { Textarea } from '#/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'

export const Route = createFileRoute('/admin')({
  component: AdminPage,
})

type PostItem = {
  id: number
  title: string
  author: string
  status: 'published' | 'draft' | 'review'
  updatedAt: string
}

const posts: PostItem[] = [
  {
    id: 1,
    title: 'Homepage Refresh Q2',
    author: 'Nora',
    status: 'published',
    updatedAt: '2026-03-15',
  },
  {
    id: 2,
    title: 'Pricing FAQ',
    author: 'Liam',
    status: 'draft',
    updatedAt: '2026-03-14',
  },
  {
    id: 3,
    title: 'Release Notes 1.8',
    author: 'Emma',
    status: 'review',
    updatedAt: '2026-03-13',
  },
  {
    id: 4,
    title: 'SEO Landing Draft',
    author: 'Ava',
    status: 'draft',
    updatedAt: '2026-03-12',
  },
  {
    id: 5,
    title: 'Case Study: Retail',
    author: 'Noah',
    status: 'published',
    updatedAt: '2026-03-11',
  },
]

function AdminPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | PostItem['status']>(
    'all',
  )
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [publishAt, setPublishAt] = useState<Date | undefined>(new Date())
  const [saving, setSaving] = useState(false)

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.author.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === 'all' || post.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [search, statusFilter])

  const allVisibleSelected =
    filteredPosts.length > 0 &&
    filteredPosts.every((post) => selectedIds.includes(post.id))

  function toggleSelectAll(checked: boolean) {
    if (checked) {
      setSelectedIds(filteredPosts.map((post) => post.id))
      return
    }
    setSelectedIds([])
  }

  function toggleSelectPost(id: number, checked: boolean) {
    if (checked) {
      setSelectedIds((current) => [...new Set([...current, id])])
      return
    }
    setSelectedIds((current) => current.filter((item) => item !== id))
  }

  async function handleSaveCampaign() {
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 700))
    setSaving(false)
    toast.success('Campaign settings saved')
  }

  return (
    <main className="pb-8">
      <SidebarProvider>
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="px-2 py-3">
            <div className="rounded-xl border border-(--line) bg-(--chip-bg) px-3 py-2 text-sm font-semibold text-(--sea-ink)">
              CMS Control Room
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {[
                    'Dashboard',
                    'Posts',
                    'Pages',
                    'Media',
                    'Users',
                    'Settings',
                  ].map((item) => (
                    <SidebarMenuItem key={item}>
                      <SidebarMenuButton isActive={item === 'Posts'}>
                        {item}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="px-2 pb-3">
            <Card className="border-(--line) bg-(--surface)">
              <CardContent className="p-3 text-xs text-(--sea-ink-soft)">
                3 items waiting review.
              </CardContent>
            </Card>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="bg-transparent">
          <div className="page-wrap w-full px-4 pt-6">
            <div className="island-shell rounded-3xl p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <SidebarTrigger />
                  <Separator orientation="vertical" className="h-6" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">Site</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Admin</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        Publish:{' '}
                        {publishAt
                          ? format(publishAt, 'dd MMM yyyy')
                          : 'Pick date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={publishAt}
                        onSelect={setPublishAt}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Create New Post</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create content draft</DialogTitle>
                        <DialogDescription>
                          Add a post shell first, then assign category and
                          schedule.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="new-title">Title</Label>
                          <Input
                            id="new-title"
                            placeholder="e.g. April Campaign Roundup"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="new-summary">Summary</Label>
                          <Textarea
                            id="new-summary"
                            rows={4}
                            placeholder="Brief intro for editors..."
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button
                          onClick={() => toast.success('Draft created')}
                          className="w-full sm:w-auto"
                        >
                          Save Draft
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <Card className="border-(--line) bg-white/70 dark:bg-black/10">
                  <CardHeader>
                    <CardTitle>Total Posts</CardTitle>
                    <CardDescription>Across all statuses</CardDescription>
                  </CardHeader>
                  <CardContent className="text-3xl font-semibold">
                    124
                  </CardContent>
                </Card>
                <Card className="border-(--line) bg-white/70 dark:bg-black/10">
                  <CardHeader>
                    <CardTitle>Published This Month</CardTitle>
                    <CardDescription>Mar 2026</CardDescription>
                  </CardHeader>
                  <CardContent className="text-3xl font-semibold">
                    31
                  </CardContent>
                </Card>
                <Card className="border-(--line) bg-white/70 dark:bg-black/10">
                  <CardHeader>
                    <CardTitle>Review Queue</CardTitle>
                    <CardDescription>Needs approval</CardDescription>
                  </CardHeader>
                  <CardContent className="text-3xl font-semibold">
                    8
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-5 border-(--line) bg-white/75 dark:bg-black/10">
                <CardHeader>
                  <CardTitle>Content Manager</CardTitle>
                  <CardDescription>
                    Filter, review, and run bulk actions on posts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search by title or author"
                      className="max-w-sm"
                    />
                    <Select
                      value={statusFilter}
                      onValueChange={(value) =>
                        setStatusFilter(value as 'all' | PostItem['status'])
                      }
                    >
                      <SelectTrigger className="w-44">
                        <SelectValue placeholder="Filter status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All status</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="review">In review</SelectItem>
                      </SelectContent>
                    </Select>
                    <Tabs
                      value={statusFilter}
                      onValueChange={(value) =>
                        setStatusFilter(value as 'all' | PostItem['status'])
                      }
                    >
                      <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="published">Published</TabsTrigger>
                        <TabsTrigger value="draft">Draft</TabsTrigger>
                        <TabsTrigger value="review">Review</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">
                          <Checkbox
                            checked={allVisibleSelected}
                            onCheckedChange={(value) =>
                              toggleSelectAll(Boolean(value))
                            }
                            aria-label="Select all visible posts"
                          />
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedIds.includes(post.id)}
                              onCheckedChange={(value) =>
                                toggleSelectPost(post.id, Boolean(value))
                              }
                              aria-label={`Select ${post.title}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {post.title}
                          </TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                post.status === 'published'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {post.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{post.updatedAt}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Manage
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem
                                  onClick={() =>
                                    toast.info(`Editing ${post.title}`)
                                  }
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    toast.info(`Duplicated ${post.title}`)
                                  }
                                >
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  variant="destructive"
                                  onClick={() =>
                                    toast.error(`Deleted ${post.title}`)
                                  }
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs text-(--sea-ink-soft)">
                      Selected: {selectedIds.length} item(s)
                    </p>
                    <Pagination className="w-auto">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <Card className="border-(--line) bg-white/75 dark:bg-black/10">
                  <CardHeader>
                    <CardTitle>Campaign Settings</CardTitle>
                    <CardDescription>
                      Default options for new CMS content.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="campaign-name">Campaign name</Label>
                      <Input
                        id="campaign-name"
                        defaultValue="Spring Product Education"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="campaign-brief">Editorial brief</Label>
                      <Textarea
                        id="campaign-brief"
                        rows={4}
                        defaultValue="Keep language concise and customer-centered."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Publishing channel</Label>
                      <RadioGroup
                        defaultValue="blog"
                        className="grid grid-cols-2 gap-2"
                      >
                        <div className="flex items-center gap-2 rounded-md border p-2">
                          <RadioGroupItem value="blog" id="blog" />
                          <Label htmlFor="blog">Blog</Label>
                        </div>
                        <div className="flex items-center gap-2 rounded-md border p-2">
                          <RadioGroupItem value="news" id="news" />
                          <Label htmlFor="news">Newsroom</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <p className="text-sm font-medium">
                          Require editor approval
                        </p>
                        <p className="text-xs text-(--sea-ink-soft)">
                          New drafts stay in review queue before publish.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Button onClick={handleSaveCampaign} disabled={saving}>
                      {saving ? 'Saving...' : 'Save settings'}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-(--line) bg-white/75 dark:bg-black/10">
                  <CardHeader>
                    <CardTitle>System Signals</CardTitle>
                    <CardDescription>
                      Feedback, loading states, and helper UI.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <AlertTitle>Webhook queue delayed</AlertTitle>
                      <AlertDescription>
                        2 integrations are retrying. Editors can continue normal
                        work.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        Loading preview skeleton
                      </p>
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-20 w-full" />
                    </div>

                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Help</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Bulk publish is available for published-ready posts.
                        </TooltipContent>
                      </Tooltip>

                      <Button
                        variant="secondary"
                        onClick={() => toast.info('Autosave every 2 minutes')}
                      >
                        Show tip toast
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  )
}
