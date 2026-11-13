'use client';

import { createListCollection } from '@ark-ui/react/collection';
import { FolderOpen, Gauge, Plus, Settings, Users } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Badge } from '@/registry/react/ui/badge';
import { Button } from '@/registry/react/ui/button';
import { Card, CardBody } from '@/registry/react/ui/card';
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
  Select,
  SelectContent,
  SelectField,
  SelectHiddenSelect,
  SelectLabel,
  SelectOption,
  SelectPositioner,
} from '@/registry/react/ui/select';
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
    <Sidebar className={styles.root}>
      <SidebarPanel>
        <SidebarHeader>
          <a className={styles.brand} href="#overview">
            <span className={styles.brandMark} data-sidebar-icon>
              M
            </span>
            <SidebarLabel>moduix</SidebarLabel>
          </a>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarNavigationList>
              {navigation.map((item) => (
                <SidebarNavigationItem key={item.label}>
                  <SidebarTooltip content={item.label}>
                    <SidebarNavigationButton asChild active={item.active}>
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
      </SidebarPanel>

      <SidebarTrigger />

      <SidebarInset>
        <main className={styles.content} id="projects">
          <header className={styles.header}>
            <div>
              <h1>Projects</h1>
              <p className={styles.description}>Track what your team is shipping this month.</p>
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
                    <DialogBody className={styles.form}>
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

          <section className={styles.metrics} aria-label="Project summary">
            <Card size="sm">
              <CardBody className={styles.metric}>
                <span>In progress</span>
                <strong>{count('In progress')}</strong>
              </CardBody>
            </Card>
            <Card size="sm">
              <CardBody className={styles.metric}>
                <span>In review</span>
                <strong>{count('In review')}</strong>
              </CardBody>
            </Card>
            <Card size="sm">
              <CardBody className={styles.metric}>
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
                      <TableCell className={styles.name}>{project.name}</TableCell>
                      <TableCell>{project.owner}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
                      </TableCell>
                      <TableCell className={styles.muted}>{project.updated}</TableCell>
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