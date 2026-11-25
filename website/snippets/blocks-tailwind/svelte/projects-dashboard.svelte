<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
  import FileText from '@lucide/svelte/icons/file-text';
  import FolderOpen from '@lucide/svelte/icons/folder-open';
  import Gauge from '@lucide/svelte/icons/gauge';
  import Plus from '@lucide/svelte/icons/plus';
  import Settings from '@lucide/svelte/icons/settings';
  import Users from '@lucide/svelte/icons/users';
  import { Badge } from '@/components/ui/badge';
  import { Button } from '@/components/ui/button';
  import { Card, CardBody } from '@/components/ui/card';
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleIndicator,
    CollapsibleTrigger,
  } from '@/components/ui/collapsible';
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
  } from '@/components/ui/dialog';
  import { Field, FieldLabel } from '@/components/ui/field';
  import { Input } from '@/components/ui/input';
  import {
    Menu,
    MenuContent,
    MenuIndicator,
    MenuItem,
    MenuItemText,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
  } from '@/components/ui/menu';
  import {
    Select,
    SelectContent,
    SelectField,
    SelectHiddenSelect,
    SelectLabel,
    SelectOption,
    SelectPositioner,
  } from '@/components/ui/select';
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
  } from '@/components/ui/sidebar';
  import {
    Table,
    TableBody,
    TableCell,
    TableColumnHeader,
    TableHeader,
    TableRow,
    TableScrollArea,
  } from '@/components/ui/table';
  import { ToastToaster, createToaster } from '@/components/ui/toast';

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

  let open = $state(false);
  let projects = $state<Project[]>([
    { name: 'Billing redesign', owner: 'Maya Chen', status: 'In review', updated: '2h ago' },
    { name: 'Mobile onboarding', owner: 'Leo Park', status: 'In progress', updated: '5h ago' },
    { name: 'Usage reports', owner: 'Sara Kim', status: 'Planning', updated: 'Yesterday' },
    { name: 'Status page', owner: 'Tom Reyes', status: 'Done', updated: 'Mon' },
  ]);

  const count = (status: Status) => projects.filter((project) => project.status === status).length;

  function createProject(event: SubmitEvent) {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);
    const name = String(data.get('name'));

    projects = [
      {
        name,
        owner: String(data.get('owner')),
        status: data.get('status') as Status,
        updated: 'Just now',
      },
      ...projects,
    ];
    open = false;
    toaster.create({
      title: 'Project created',
      description: `${name} was added to your projects.`,
      type: 'success',
    });
  }
</script>

<Sidebar class="h-[38rem] min-h-[30rem] w-[min(100%,64rem)] rounded-lg shadow-sm">
  <SidebarPanel>
    <SidebarHeader>
      <a
        class="flex min-w-0 items-center gap-2 font-semibold text-inherit no-underline"
        href="#overview"
      >
        <span
          class="grid size-control-sm flex-none place-items-center rounded-sm bg-primary text-xs text-primary-foreground"
          data-sidebar-icon>M</span
        >
        <SidebarLabel>moduix</SidebarLabel>
      </a>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <SidebarTooltip content="Overview">
              {#snippet children(tooltipProps)}
                <SidebarNavigationButton {...tooltipProps()}>
                  {#snippet asChild(buttonProps)}
                    <a {...buttonProps()} href="#overview">
                      <Gauge /><SidebarLabel>Overview</SidebarLabel>
                    </a>
                  {/snippet}
                </SidebarNavigationButton>
              {/snippet}
            </SidebarTooltip>
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <Collapsible defaultOpen>
              <SidebarTooltip content="Projects">
                {#snippet children(tooltipProps)}
                  <CollapsibleTrigger>
                    {#snippet asChild(triggerProps)}
                      <SidebarNavigationButton {...tooltipProps(triggerProps())}>
                        <FolderOpen /><SidebarLabel>Projects</SidebarLabel><CollapsibleIndicator />
                      </SidebarNavigationButton>
                    {/snippet}
                  </CollapsibleTrigger>
                {/snippet}
              </SidebarTooltip>
              <CollapsibleContent>
                <SidebarNavigationSubList>
                  <SidebarNavigationSubItem>
                    <SidebarNavigationSubButton active>
                      {#snippet asChild(props)}
                        <a {...props()} href="#projects"
                          ><SidebarLabel>All projects</SidebarLabel></a
                        >
                      {/snippet}
                    </SidebarNavigationSubButton>
                    <SidebarNavigationBadge>{projects.length}</SidebarNavigationBadge>
                  </SidebarNavigationSubItem>
                  <SidebarNavigationSubItem>
                    <SidebarNavigationSubButton>
                      {#snippet asChild(props)}
                        <a {...props()} href="#archived"><SidebarLabel>Archived</SidebarLabel></a>
                      {/snippet}
                    </SidebarNavigationSubButton>
                  </SidebarNavigationSubItem>
                </SidebarNavigationSubList>
              </CollapsibleContent>
            </Collapsible>
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <SidebarTooltip content="Documents">
              {#snippet children(tooltipProps)}
                <SidebarNavigationButton {...tooltipProps()}>
                  {#snippet asChild(buttonProps)}
                    <a {...buttonProps()} href="#documents">
                      <FileText /><SidebarLabel>Documents</SidebarLabel>
                    </a>
                  {/snippet}
                </SidebarNavigationButton>
              {/snippet}
            </SidebarTooltip>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Manage</SidebarGroupLabel>
        <SidebarNavigationList>
          {#each manageItems as item (item.label)}
            <SidebarNavigationItem>
              <SidebarTooltip content={item.label}>
                {#snippet children(tooltipProps)}
                  <SidebarNavigationButton {...tooltipProps()}>
                    {#snippet asChild(buttonProps)}
                      <a {...buttonProps()} href={item.href}>
                        <item.icon />
                        <SidebarLabel>{item.label}</SidebarLabel>
                      </a>
                    {/snippet}
                  </SidebarNavigationButton>
                {/snippet}
              </SidebarTooltip>
            </SidebarNavigationItem>
          {/each}
        </SidebarNavigationList>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarNavigationList>
        <SidebarNavigationItem>
          <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
            <MenuTrigger>
              {#snippet asChild(triggerProps)}
                <SidebarNavigationButton
                  {...triggerProps()}
                  size="lg"
                  aria-label="Open workspace menu"
                  title="Workspace"
                >
                  <span
                    class="grid size-control-sm flex-none place-items-center rounded-sm bg-muted text-xs font-semibold text-foreground"
                    data-sidebar-icon>AC</span
                  >
                  <SidebarLabel>Acme Inc.</SidebarLabel>
                  <MenuIndicator><ChevronsUpDown /></MenuIndicator>
                </SidebarNavigationButton>
              {/snippet}
            </MenuTrigger>
            <MenuPositioner>
              <MenuContent class="w-44 max-w-44 min-w-44">
                <MenuViewport>
                  <MenuItem value="workspace-settings">
                    <MenuItemText><Settings />Workspace settings</MenuItemText>
                  </MenuItem>
                  <MenuItem value="manage-members">
                    <MenuItemText><Users />Manage members</MenuItemText>
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
      <header
        class="flex flex-wrap items-start justify-between gap-4 [&_h1]:m-0 [&_h1]:text-2xl [&_p]:m-0"
      >
        <div>
          <h1>Projects</h1>
          <p class="mt-2 text-muted-foreground">Track what your team is shipping this month.</p>
        </div>

        <Dialog bind:open>
          <DialogTrigger>
            {#snippet asChild(props)}
              <Button {...props()} size="sm"><Plus />New project</Button>
            {/snippet}
          </DialogTrigger>
          <DialogBackdrop />
          <DialogPositioner>
            <DialogContent>
              <form onsubmit={createProject}>
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
                        {#each statuses.items as item (item.value)}
                          <SelectOption {item}>{item.label}</SelectOption>
                        {/each}
                      </SelectContent>
                    </SelectPositioner>
                    <SelectHiddenSelect />
                  </Select>
                </DialogBody>
                <DialogFooter>
                  <DialogCloseTrigger>
                    {#snippet asChild(props)}
                      <Button {...props()} variant="outline">Cancel</Button>
                    {/snippet}
                  </DialogCloseTrigger>
                  <Button type="submit">Create project</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </DialogPositioner>
        </Dialog>
      </header>

      <section class="grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Project summary">
        <Card size="sm">
          <CardBody
            class="grid gap-2 [&_span]:text-sm [&_span]:text-muted-foreground [&_strong]:text-3xl"
          >
            <span>In progress</span>
            <strong>{count('In progress')}</strong>
          </CardBody>
        </Card>
        <Card size="sm">
          <CardBody
            class="grid gap-2 [&_span]:text-sm [&_span]:text-muted-foreground [&_strong]:text-3xl"
          >
            <span>In review</span>
            <strong>{count('In review')}</strong>
          </CardBody>
        </Card>
        <Card size="sm">
          <CardBody
            class="grid gap-2 [&_span]:text-sm [&_span]:text-muted-foreground [&_strong]:text-3xl"
          >
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
              {#each projects as project, index (index)}
                <TableRow>
                  <TableCell class="font-medium">{project.name}</TableCell>
                  <TableCell>{project.owner}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
                  </TableCell>
                  <TableCell class="text-muted-foreground">{project.updated}</TableCell>
                </TableRow>
              {/each}
            </TableBody>
          </Table>
        </TableScrollArea>
      </Card>
    </main>
  </SidebarInset>

  <ToastToaster {toaster} />
</Sidebar>