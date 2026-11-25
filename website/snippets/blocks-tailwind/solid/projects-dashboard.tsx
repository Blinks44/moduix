import { ChevronsUpDown, FileText, FolderOpen, Gauge, Plus, Settings, Users } from 'lucide-solid';
import { For, createSignal } from 'solid-js';
import { Badge } from '@/registry/solid/ui/badge';
import { Button } from '@/registry/solid/ui/button';
import { Card, CardBody } from '@/registry/solid/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@/registry/solid/ui/collapsible';
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
} from '@/registry/solid/ui/dialog';
import { Field, FieldLabel } from '@/registry/solid/ui/field';
import { Input } from '@/registry/solid/ui/input';
import {
  Menu,
  MenuContent,
  MenuIndicator,
  MenuItem,
  MenuItemText,
  MenuPositioner,
  MenuTrigger,
  MenuViewport,
} from '@/registry/solid/ui/menu';
import {
  Select,
  SelectContent,
  SelectField,
  SelectHiddenSelect,
  SelectLabel,
  SelectOption,
  SelectPositioner,
  createListCollection,
} from '@/registry/solid/ui/select';
import {
  Sidebar,
  SidebarContent,
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
} from '@/registry/solid/ui/sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@/registry/solid/ui/table';
import { ToastToaster, createToaster } from '@/registry/solid/ui/toast';

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
  const [open, setOpen] = createSignal(false);
  const [projects, setProjects] = createSignal<Project[]>([
    { name: 'Billing redesign', owner: 'Maya Chen', status: 'In review', updated: '2h ago' },
    { name: 'Mobile onboarding', owner: 'Leo Park', status: 'In progress', updated: '5h ago' },
    { name: 'Usage reports', owner: 'Sara Kim', status: 'Planning', updated: 'Yesterday' },
    { name: 'Status page', owner: 'Tom Reyes', status: 'Done', updated: 'Mon' },
  ]);

  const count = (status: Status) =>
    projects().filter((project) => project.status === status).length;

  const createProject = (event: SubmitEvent) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);
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
    <Sidebar class="h-[38rem] min-h-[30rem] w-[min(100%,64rem)] rounded-lg shadow-sm">
      <SidebarPanel>
        <SidebarHeader>
          <a
            class="flex min-w-0 items-center gap-2 font-semibold text-inherit no-underline"
            href="#overview"
          >
            <span
              class="grid size-control-sm flex-none place-items-center rounded-sm bg-primary text-xs text-primary-foreground"
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
                  {(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="#overview">
                          <Gauge />
                          <SidebarLabel>Overview</SidebarLabel>
                        </a>
                      )}
                    />
                  )}
                </SidebarTooltip>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <Collapsible defaultOpen>
                  <SidebarTooltip content="Projects">
                    {(props) => (
                      <CollapsibleTrigger
                        {...props()}
                        asChild={(triggerProps) => <SidebarNavigationButton {...triggerProps()} />}
                      >
                        <FolderOpen />
                        <SidebarLabel>Projects</SidebarLabel>
                        <CollapsibleIndicator />
                      </CollapsibleTrigger>
                    )}
                  </SidebarTooltip>
                  <CollapsibleContent>
                    <SidebarNavigationSubList>
                      <SidebarNavigationSubItem>
                        <SidebarNavigationSubButton
                          active
                          asChild={(props) => <a {...props()} href="#projects" />}
                        >
                          <SidebarLabel>All projects</SidebarLabel>
                        </SidebarNavigationSubButton>
                        <SidebarNavigationBadge>{projects().length}</SidebarNavigationBadge>
                      </SidebarNavigationSubItem>
                      <SidebarNavigationSubItem>
                        <SidebarNavigationSubButton
                          asChild={(props) => <a {...props()} href="#archived" />}
                        >
                          <SidebarLabel>Archived</SidebarLabel>
                        </SidebarNavigationSubButton>
                      </SidebarNavigationSubItem>
                    </SidebarNavigationSubList>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarTooltip content="Documents">
                  {(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="#documents">
                          <FileText />
                          <SidebarLabel>Documents</SidebarLabel>
                        </a>
                      )}
                    />
                  )}
                </SidebarTooltip>
              </SidebarNavigationItem>
            </SidebarNavigationList>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Manage</SidebarGroupLabel>
            <SidebarNavigationList>
              <For each={manageItems}>
                {(item) => (
                  <SidebarNavigationItem>
                    <SidebarTooltip content={item.label}>
                      {(props) => (
                        <SidebarNavigationButton
                          {...props()}
                          asChild={(buttonProps) => (
                            <a {...buttonProps()} href={item.href}>
                              <item.icon />
                              <SidebarLabel>{item.label}</SidebarLabel>
                            </a>
                          )}
                        />
                      )}
                    </SidebarTooltip>
                  </SidebarNavigationItem>
                )}
              </For>
            </SidebarNavigationList>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
                <MenuTrigger
                  asChild={(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      size="lg"
                      aria-label="Open workspace menu"
                      title="Workspace"
                    />
                  )}
                >
                  <span
                    class="grid size-control-sm flex-none place-items-center rounded-sm bg-muted text-xs font-semibold text-foreground"
                    data-sidebar-icon
                  >
                    AC
                  </span>
                  <SidebarLabel>Acme Inc.</SidebarLabel>
                  <MenuIndicator>
                    <ChevronsUpDown />
                  </MenuIndicator>
                </MenuTrigger>
                <MenuPositioner>
                  <MenuContent class="w-44 max-w-44 min-w-44">
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
        <main class="grid min-h-full content-start gap-6 p-4 sm:p-6" id="projects">
          <header class="flex flex-wrap items-start justify-between gap-4 [&_h1]:m-0 [&_h1]:text-2xl [&_p]:m-0">
            <div>
              <h1>Projects</h1>
              <p class="mt-2 text-muted-foreground">Track what your team is shipping this month.</p>
            </div>

            <Dialog open={open()} onOpenChange={(details) => setOpen(details.open)}>
              <DialogTrigger
                asChild={(props) => (
                  <Button {...props()} size="sm">
                    <Plus />
                    New project
                  </Button>
                )}
              />
              <DialogBackdrop />
              <DialogPositioner>
                <DialogContent>
                  <form onSubmit={createProject}>
                    <DialogHeader>
                      <DialogTitle>New project</DialogTitle>
                      <DialogCloseIcon />
                      <DialogDescription>Add a project and assign an owner.</DialogDescription>
                    </DialogHeader>
                    <DialogBody class="grid gap-4">
                      <Field required>
                        <FieldLabel>Project name</FieldLabel>
                        <Input name="name" placeholder="Customer portal" autocomplete="off" />
                      </Field>
                      <Field required>
                        <FieldLabel>Owner</FieldLabel>
                        <Input name="owner" placeholder="Alex Morgan" autocomplete="off" />
                      </Field>
                      <Select collection={statuses} name="status" defaultValue={['Planning']}>
                        <SelectLabel>Status</SelectLabel>
                        <SelectField />
                        <SelectPositioner>
                          <SelectContent>
                            <For each={statuses.items}>
                              {(item) => <SelectOption item={item}>{item.label}</SelectOption>}
                            </For>
                          </SelectContent>
                        </SelectPositioner>
                        <SelectHiddenSelect />
                      </Select>
                    </DialogBody>
                    <DialogFooter>
                      <DialogCloseTrigger
                        asChild={(props) => (
                          <Button {...props()} variant="outline">
                            Cancel
                          </Button>
                        )}
                      />
                      <Button type="submit">Create project</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </DialogPositioner>
            </Dialog>
          </header>

          <section class="grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Project summary">
            <Card size="sm">
              <CardBody class="grid gap-2 [&_span]:text-sm [&_span]:text-muted-foreground [&_strong]:text-3xl">
                <span>In progress</span>
                <strong>{count('In progress')}</strong>
              </CardBody>
            </Card>
            <Card size="sm">
              <CardBody class="grid gap-2 [&_span]:text-sm [&_span]:text-muted-foreground [&_strong]:text-3xl">
                <span>In review</span>
                <strong>{count('In review')}</strong>
              </CardBody>
            </Card>
            <Card size="sm">
              <CardBody class="grid gap-2 [&_span]:text-sm [&_span]:text-muted-foreground [&_strong]:text-3xl">
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
                  <For each={projects()}>
                    {(project) => (
                      <TableRow>
                        <TableCell class="font-medium">{project.name}</TableCell>
                        <TableCell>{project.owner}</TableCell>
                        <TableCell>
                          <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
                        </TableCell>
                        <TableCell class="text-muted-foreground">{project.updated}</TableCell>
                      </TableRow>
                    )}
                  </For>
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