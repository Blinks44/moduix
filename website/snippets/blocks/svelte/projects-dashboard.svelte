<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import FolderOpen from '@lucide/svelte/icons/folder-open';
  import Gauge from '@lucide/svelte/icons/gauge';
  import Plus from '@lucide/svelte/icons/plus';
  import Settings from '@lucide/svelte/icons/settings';
  import Users from '@lucide/svelte/icons/users';
  import { Badge } from '@/components/ui/badge';
  import { Button } from '@/components/ui/button';
  import { Card, CardBody } from '@/components/ui/card';
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
    SidebarGroup,
    SidebarHeader,
    SidebarInset,
    SidebarLabel,
    SidebarNavigationButton,
    SidebarNavigationItem,
    SidebarNavigationList,
    SidebarPanel,
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
  import styles from './projects-dashboard.module.css';

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

  const navigation = [
    { label: 'Overview', href: '#overview', icon: Gauge },
    { label: 'Projects', href: '#projects', icon: FolderOpen, active: true },
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

<Sidebar class={styles.root}>
  <SidebarPanel>
    <SidebarHeader>
      <a class={styles.brand} href="#overview">
        <span class={styles.brandMark} data-sidebar-icon>M</span>
        <SidebarLabel>moduix</SidebarLabel>
      </a>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarNavigationList>
          {#each navigation as item (item.label)}
            <SidebarNavigationItem>
              <SidebarTooltip content={item.label}>
                {#snippet children(tooltipProps)}
                  <SidebarNavigationButton {...tooltipProps()} active={item.active}>
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
  </SidebarPanel>

  <SidebarTrigger />

  <SidebarInset>
    <main class={styles.content} id="projects">
      <header class={styles.header}>
        <div>
          <h1>Projects</h1>
          <p class={styles.description}>Track what your team is shipping this month.</p>
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
                <DialogBody class={styles.form}>
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

      <section class={styles.metrics} aria-label="Project summary">
        <Card size="sm">
          <CardBody class={styles.metric}>
            <span>In progress</span>
            <strong>{count('In progress')}</strong>
          </CardBody>
        </Card>
        <Card size="sm">
          <CardBody class={styles.metric}>
            <span>In review</span>
            <strong>{count('In review')}</strong>
          </CardBody>
        </Card>
        <Card size="sm">
          <CardBody class={styles.metric}>
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
                  <TableCell class={styles.name}>{project.name}</TableCell>
                  <TableCell>{project.owner}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
                  </TableCell>
                  <TableCell class={styles.muted}>{project.updated}</TableCell>
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