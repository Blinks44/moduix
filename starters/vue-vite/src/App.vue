<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Field, FieldLabel } from '@moduix/vue/field';
import { Input } from '@moduix/vue/input';
import { ToastToaster, createToaster } from '@moduix/vue/toast';
import { ref } from 'vue';
import AppShell from './components/AppShell.vue';
import ProjectDialog from './components/ProjectDialog.vue';
import ProjectTable from './components/ProjectTable.vue';
import {
  initialProjects,
  initials,
  owners,
  statuses,
  type Page,
  type Project,
  type ProjectDraft,
} from './data';
import { portalRef } from './portal';

const toaster = createToaster({ placement: 'bottom-end' });
const projects = ref(initialProjects);
const page = ref<Page>('Projects');
const workspace = ref('Acme Projects');
const editing = ref<Project | null | undefined>(undefined);
const handleSave = (draft: ProjectDraft) => {
  const previous = editing.value;
  const project = { ...draft, id: previous?.id ?? crypto.randomUUID(), updated: 'Just now' };
  projects.value = previous
    ? projects.value.map((item) => (item.id === previous.id ? project : item))
    : [...projects.value, project];
  editing.value = undefined;
  toaster.success({ title: previous ? 'Project updated' : 'Project created' });
};
const handleDelete = () => {
  const project = editing.value;
  if (!project) return;
  const index = projects.value.findIndex((item) => item.id === project.id);
  projects.value = projects.value.filter((item) => item.id !== project.id);
  editing.value = undefined;
  toaster.create({
    title: 'Project deleted',
    description: project.name,
    duration: 8000,
    action: {
      label: 'Undo',
      onClick: () => {
        projects.value = [
          ...projects.value.slice(0, index),
          project,
          ...projects.value.slice(index),
        ];
      },
    },
  });
};
const handleSettings = (event: Event) => {
  const name = String(new FormData(event.currentTarget as HTMLFormElement).get('workspace')).trim();
  if (name) {
    workspace.value = name;
    toaster.success({ title: 'Workspace updated' });
  }
};
</script>

<template>
  <AppShell :page="page" :workspace="workspace" @navigate="page = $event">
    <div class="page-header">
      <div>
        <h1>{{ page }}</h1>
        <p>
          {{
            page === 'Projects'
              ? 'Five projects across two teams. Data lives in src/data.ts.'
              : 'A small workspace built with moduix.'
          }}
        </p>
      </div>
      <Button v-if="page === 'Projects'" @click="editing = null"
        ><span aria-hidden="true">+</span>New project</Button
      >
    </div>
    <ProjectTable v-if="page === 'Projects'" :projects="projects" @edit="editing = $event" />
    <div v-if="page === 'Team'" class="team-list">
      <div v-for="owner in owners" :key="owner" class="team-member">
        <span class="avatar">{{ initials(owner) }}</span><strong>{{ owner }}</strong
        ><span>{{ projects.filter((project) => project.owner === owner).length }} projects</span>
      </div>
    </div>
    <div v-if="page === 'Reports'" class="report-grid">
      <div v-for="status in statuses" :key="status" class="report-card">
        <span>{{ status }} projects</span
        ><strong>{{ projects.filter((project) => project.status === status).length }}</strong>
      </div>
    </div>
    <form v-if="page === 'Settings'" class="settings" @submit.prevent="handleSettings">
      <Field required
        ><FieldLabel>Workspace name</FieldLabel
        ><Input name="workspace" required :max-length="60" :value="workspace" /></Field
      ><Button type="submit">Save changes</Button>
    </form>
    <ProjectDialog
      :project="editing ?? null"
      :open="editing !== undefined"
      @close="editing = undefined"
      @save="handleSave"
      @delete="handleDelete"
    />
    <ToastToaster :toaster="toaster" :portal-ref="portalRef" />
  </AppShell>
</template>