'use client';

import {
  ChevronsUpDown,
  FileText,
  FolderOpen,
  Gauge,
  LogOut,
  Plus,
  Settings,
  Users,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Badge } from '@/registry/react/ui/badge';
import { Button } from '@/registry/react/ui/button';
import { Card, CardBody } from '@/registry/react/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@/registry/react/ui/collapsible';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@/registry/react/ui/dialog';
import { Field, FieldLabel } from '@/registry/react/ui/field';
import { Input } from '@/registry/react/ui/input';
import {
  Menu,
  MenuContent,
  MenuIndicator,
  MenuItem,
  MenuItemText,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  MenuViewport,
} from '@/registry/react/ui/menu';
import {
  Select,
  SelectContent,
  SelectField,
  SelectHiddenSelect,
  SelectLabel,
  SelectOption,
  SelectPositioner,
  createListCollection,
} from '@/registry/react/ui/select';
import {
  Sidebar,
  SidebarCollapsedContent,
  SidebarContent,
  SidebarExpandedContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarLabel,
  SidebarNavigationBadge,
  SidebarNavigationButton,
  SidebarNavigationItem,
  SidebarNavigationList,
  SidebarNavigationSubButton,
  SidebarNavigationSubItem,
  SidebarNavigationSubList,
  SidebarPanel,
  SidebarResizeTrigger,
  SidebarTooltip,
  SidebarTrigger,
} from '@/registry/react/ui/sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@/registry/react/ui/table';
import { ToastToaster, createToaster } from '@/registry/react/ui/toast';

type Status = 'Planning' | 'In progress' | 'In review' | 'Done';

type Project = { name: string; owner: string; status: Status; updated: string };

const statusVariant = {
  Planning: 'outline',
  'In progress': 'secondary',
  'In review': 'default',
  Done: 'ghost',
} as const;

const statuses = createListCollection({
  items: Object.keys(statusVariant).map((status) => ({ label: status, value: status })),
});

const manageItems = [
  { label: 'Team', href: '#team', icon: Users },
  { label: 'Settings', href: '#settings', icon: Settings },
];

const toaster = createToaster({ placement: 'bottom-end' });

export function ProjectsDashboard() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    { name: 'Billing redesign', owner: 'Maya Chen', status: 'In review', updated: '2h ago' },
    { name: 'Mobile onboarding', owner: 'Leo Park', status: 'In progress', updated: '5h ago' },
    { name: 'Usage reports', owner: 'Sara Kim', status: 'Planning', updated: 'Yesterday' },
    { name: 'Status page', owner: 'Tom Reyes', status: 'Done', updated: 'Mon' },
  ]);

  const count = (status: Status) => projects.filter((project) => project.status === status).length;

  const createProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name'));

    setProjects((current) => [
      {
        name,
        owner: String(data.get('owner')),
        status: data.get('status') as Status,
        updated: 'Just now',
      },
      ...current,
    ]);
    setOpen(false);
    toaster.create({
      title: 'Project created',
      description: `${name} was added to your projects.`,
      type: 'success',
    });
  };

  return (
    <Sidebar className="h-[38rem] min-h-[30rem] w-[min(100%,64rem)] rounded-lg shadow-sm">
      <SidebarPanel>
        <SidebarHeader>
          <a
            className="flex min-w-0 items-center gap-2 font-semibold text-inherit no-underline"
            href="#overview"
          >
            <span
              className="grid size-control-sm flex-none place-items-center rounded-sm bg-primary text-xs text-primary-foreground"
              data-sidebar-icon
            >
              M
            </span>
            <SidebarLabel>moduix</SidebarLabel>
          </a>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarNavigationList>
              <SidebarNavigationItem>
                <SidebarTooltip content="Overview">
                  <SidebarNavigationButton asChild>
                    <a href="#overview">
                      <Gauge />
                      <SidebarLabel>Overview</SidebarLabel>
                    </a>
                  </SidebarNavigationButton>
                </SidebarTooltip>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarExpandedContent>
                  <Collapsible defaultOpen>
                    <SidebarTooltip content="Projects">
                      <CollapsibleTrigger asChild>
                        <SidebarNavigationButton>
                          <FolderOpen />
                          <SidebarLabel>Projects</SidebarLabel>
                          <CollapsibleIndicator />
                        </SidebarNavigationButton>
                      </CollapsibleTrigger>
                    </SidebarTooltip>
                    <CollapsibleContent>
                      <SidebarNavigationSubList>
                        <SidebarNavigationSubItem>
                          <SidebarNavigationSubButton href="#projects" active>
                            <SidebarLabel>All projects</SidebarLabel>
                          </SidebarNavigationSubButton>
                          <SidebarNavigationBadge>{projects.length}</SidebarNavigationBadge>
                        </SidebarNavigationSubItem>
                        <SidebarNavigationSubItem>
                          <SidebarNavigationSubButton href="#archived">
                            <SidebarLabel>Archived</SidebarLabel>
                          </SidebarNavigationSubButton>
                        </SidebarNavigationSubItem>
                      </SidebarNavigationSubList>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarExpandedContent>
                <SidebarCollapsedContent>
                  <Menu positioning={{ placement: 'right-start', gutter: 8 }}>
                    <MenuTrigger asChild>
                      <SidebarNavigationButton aria-label="Open projects" title="Projects" active>
                        <FolderOpen />
                      </SidebarNavigationButton>
                    </MenuTrigger>
                    <MenuPositioner>
                      <MenuContent>
                        <MenuViewport>
                          <MenuItem value="all-projects" asChild>
                            <a href="#projects">All projects</a>
                          </MenuItem>
                          <MenuItem value="archived" asChild>
                            <a href="#archived">Archived</a>
                          </MenuItem>
                        </MenuViewport>
                      </MenuContent>
                    </MenuPositioner>
                  </Menu>
                </SidebarCollapsedContent>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarTooltip content="Documents">
                  <SidebarNavigationButton asChild>
                    <a href="#documents">
                      <FileText />
                      <SidebarLabel>Documents</SidebarLabel>
                    </a>
                  </SidebarNavigationButton>
                </SidebarTooltip>
              </SidebarNavigationItem>
            </SidebarNavigationList>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Manage</SidebarGroupLabel>
            <SidebarNavigationList>
              {manageItems.map((item) => (
                <SidebarNavigationItem key={item.label}>
                  <SidebarTooltip content={item.label}>
                    <SidebarNavigationButton asChild>
                      <a href={item.href}>
                        <item.icon />
                        <SidebarLabel>{item.label}</SidebarLabel>
                      </a>
                    </SidebarNavigationButton>
                  </SidebarTooltip>
                </SidebarNavigationItem>
              ))}
            </SidebarNavigationList>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
                <MenuTrigger asChild>
                  <SidebarNavigationButton
                    size="lg"
                    aria-label="Open workspace menu"
                    title="Workspace"
                  >
                    <span
                      className="grid size-control-sm flex-none place-items-center rounded-sm bg-muted text-xs font-semibold text-foreground"
                      data-sidebar-icon
                    >
                      AC
                    </span>
                    <SidebarLabel>Acme Inc.</SidebarLabel>
                    <MenuIndicator>
                      <ChevronsUpDown />
                    </MenuIndicator>
                  </SidebarNavigationButton>
                </MenuTrigger>
                <MenuPositioner>
                  <MenuContent className="w-44 max-w-44 min-w-44">
                    <MenuViewport>
                      <MenuItem value="workspace-settings">
                        <MenuItemText>
                          <Settings />
                          Workspace settings
                        </MenuItemText>
                      </MenuItem>
                      <MenuItem value="manage-members">
                        <MenuItemText>
                          <Users />
                          Manage members
                        </MenuItemText>
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem value="sign-out" tone="destructive">
                        <MenuItemText>
                          <LogOut />
                          Sign out
                        </MenuItemText>
                      </MenuItem>
                    </MenuViewport>
                  </MenuContent>
                </MenuPositioner>
              </Menu>
            </SidebarNavigationItem>
          </SidebarNavigationList>
        </SidebarFooter>
      </SidebarPanel>

      <SidebarResizeTrigger />
      <SidebarTrigger />

      <SidebarInset>
        <main className="grid min-h-full content-start gap-6 p-4 sm:p-6" id="projects">
          <header className="flex flex-wrap items-start justify-between gap-4 [&_h1]:m-0 [&_h1]:text-2xl [&_p]:m-0">
            <div>
              <h1>Projects</h1>
              <p className="mt-2 text-muted-foreground">
                Track what your team is shipping this month.
              </p>
            </div>

            <Dialog open={open} onOpenChange={(details) => setOpen(details.open)}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus />
                  New project
                </Button>
              </DialogTrigger>
              <DialogBackdrop />
              <DialogPositioner>
                <DialogContent>
                  <form onSubmit={createProject}>
                    <DialogHeader>
                      <DialogTitle>New project</DialogTitle>
                      <DialogCloseIcon />
                      <DialogDescription>Add a project and assign an owner.</DialogDescription>
                    </DialogHeader>
                    <DialogBody className="grid gap-4">
                      <Field required>
                        <FieldLabel>Project name</FieldLabel>
                        <Input name="name" placeholder="Customer portal" autoComplete="off" />
                      </Field>
                      <Field required>
                        <FieldLabel>Owner</FieldLabel>
                        <Input name="owner" placeholder="Alex Morgan" autoComplete="off" />
                      </Field>
                      <Select collection={statuses} name="status" defaultValue={['Planning']}>
                        <SelectLabel>Status</SelectLabel>
                        <SelectField />
                        <SelectPositioner>
                          <SelectContent>
                            {statuses.items.map((item) => (
                              <SelectOption key={item.value} item={item}>
                                {item.label}
                              </SelectOption>
                            ))}
                          </SelectContent>
                        </SelectPositioner>
                        <SelectHiddenSelect />
                      </Select>
                    </DialogBody>
                    <DialogFooter>
                      <DialogCloseTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogCloseTrigger>
                      <Button type="submit">Create project</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </DialogPositioner>
            </Dialog>
          </header>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Project summary">
            <Card size="sm">
              <CardBody className="grid gap-2 [&_span]:text-sm [&_span]:text-muted-foreground [&_strong]:text-3xl">
                <span>In progress</span>
                <strong>{count('In progress')}</strong>
              </CardBody>
            </Card>
            <Card size="sm">
              <CardBody className="grid gap-2 [&_span]:text-sm [&_span]:text-muted-foreground [&_strong]:text-3xl">
                <span>In review</span>
                <strong>{count('In review')}</strong>
              </CardBody>
            </Card>
            <Card size="sm">
              <CardBody className="grid gap-2 [&_span]:text-sm [&_span]:text-muted-foreground [&_strong]:text-3xl">
                <span>Done</span>
                <strong>{count('Done')}</strong>
              </CardBody>
            </Card>
          </section>

          <Card size="sm">
            <TableScrollArea>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableColumnHeader scope="col">Project</TableColumnHeader>
                    <TableColumnHeader scope="col">Owner</TableColumnHeader>
                    <TableColumnHeader scope="col">Status</TableColumnHeader>
                    <TableColumnHeader scope="col">Updated</TableColumnHeader>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.owner}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{project.updated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableScrollArea>
          </Card>
        </main>
      </SidebarInset>

      <ToastToaster toaster={toaster} />
    </Sidebar>
  );
}