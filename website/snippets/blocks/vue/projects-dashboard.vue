<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import { FolderOpen, Gauge, Plus, Settings, Users } from '@lucide/vue';
import { ref } from 'vue';
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

const open = ref(false);
const projects = ref<Project[]>([
  { name: 'Billing redesign', owner: 'Maya Chen', status: 'In review', updated: '2h ago' },
  { name: 'Mobile onboarding', owner: 'Leo Park', status: 'In progress', updated: '5h ago' },
  { name: 'Usage reports', owner: 'Sara Kim', status: 'Planning', updated: 'Yesterday' },
  { name: 'Status page', owner: 'Tom Reyes', status: 'Done', updated: 'Mon' },
]);

const count = (status: Status) =>
  projects.value.filter((project) => project.status === status).length;

function createProject(event: SubmitEvent) {
  const data = new FormData(event.currentTarget as HTMLFormElement);
  const name = String(data.get('name'));

  projects.value = [
    {
      name,
      owner: String(data.get('owner')),
      status: data.get('status') as Status,
      updated: 'Just now',
    },
    ...projects.value,
  ];
  open.value = false;
  toaster.create({
    title: 'Project created',
    description: `${name} was added to your projects.`,
    type: 'success',
  });
}
</script>

<template>
  <Sidebar :class="styles.root">
    <SidebarPanel>
      <SidebarHeader>
        <a :class="styles.brand" href="#overview">
          <span :class="styles.brandMark" data-sidebar-icon>M</span>
          <SidebarLabel>moduix</SidebarLabel>
        </a>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarNavigationList>
            <SidebarNavigationItem v-for="item in navigation" :key="item.label">
              <SidebarTooltip :content="item.label">
                <SidebarNavigationButton as-child :active="item.active">
                  <a :href="item.href">
                    <component :is="item.icon" />
                    <SidebarLabel>{{ item.label }}</SidebarLabel>
                  </a>
                </SidebarNavigationButton>
              </SidebarTooltip>
            </SidebarNavigationItem>
          </SidebarNavigationList>
        </SidebarGroup>
      </SidebarContent>
    </SidebarPanel>

    <SidebarTrigger />

    <SidebarInset>
      <main id="projects" :class="styles.content">
        <header :class="styles.header">
          <div>
            <h1>Projects</h1>
            <p :class="styles.description">Track what your team is shipping this month.</p>
          </div>

          <Dialog v-model:open="open">
            <DialogTrigger as-child>
              <Button size="sm"><Plus />New project</Button>
            </DialogTrigger>
            <DialogBackdrop />
            <DialogPositioner>
              <DialogContent>
                <form @submit.prevent="createProject">
                  <DialogHeader>
                    <DialogTitle>New project</DialogTitle>
                    <DialogCloseIcon />
                    <DialogDescription>Add a project and assign an owner.</DialogDescription>
                  </DialogHeader>
                  <DialogBody :class="styles.form">
                    <Field required>
                      <FieldLabel>Project name</FieldLabel>
                      <Input name="name" placeholder="Customer portal" autocomplete="off" />
                    </Field>
                    <Field required>
                      <FieldLabel>Owner</FieldLabel>
                      <Input name="owner" placeholder="Alex Morgan" autocomplete="off" />
                    </Field>
                    <Select :collection="statuses" name="status" :default-value="['Planning']">
                      <SelectLabel>Status</SelectLabel>
                      <SelectField />
                      <SelectPositioner>
                        <SelectContent>
                          <SelectOption
                            v-for="item in statuses.items"
                            :key="item.value"
                            :item="item"
                            >{{ item.label }}</SelectOption
                          >
                        </SelectContent>
                      </SelectPositioner>
                      <SelectHiddenSelect />
                    </Select>
                  </DialogBody>
                  <DialogFooter>
                    <DialogCloseTrigger as-child>
                      <Button variant="outline">Cancel</Button>
                    </DialogCloseTrigger>
                    <Button type="submit">Create project</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </DialogPositioner>
          </Dialog>
        </header>

        <section :class="styles.metrics" aria-label="Project summary">
          <Card size="sm">
            <CardBody :class="styles.metric">
              <span>In progress</span>
              <strong>{{ count('In progress') }}</strong>
            </CardBody>
          </Card>
          <Card size="sm">
            <CardBody :class="styles.metric">
              <span>In review</span>
              <strong>{{ count('In review') }}</strong>
            </CardBody>
          </Card>
          <Card size="sm">
            <CardBody :class="styles.metric">
              <span>Done</span>
              <strong>{{ count('Done') }}</strong>
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
                <TableRow v-for="(project, index) in projects" :key="index">
                  <TableCell :class="styles.name">{{ project.name }}</TableCell>
                  <TableCell>{{ project.owner }}</TableCell>
                  <TableCell>
                    <Badge :variant="statusVariant[project.status]">{{ project.status }}</Badge>
                  </TableCell>
                  <TableCell :class="styles.muted">{{ project.updated }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableScrollArea>
        </Card>
      </main>
    </SidebarInset>

    <ToastToaster :toaster="toaster" />
  </Sidebar>
</template>