<script setup lang="ts">
import { Button } from '@moduix/vue-tailwind/button';
import { Field, FieldLabel } from '@moduix/vue-tailwind/field';
import { Input } from '@moduix/vue-tailwind/input';
import { ToastToaster, toast } from '@moduix/vue-tailwind/toast';
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
  toast.success(previous ? 'Project updated' : 'Project created');
};
const handleDelete = () => {
  const project = editing.value;
  if (!project) return;
  const index = projects.value.findIndex((item) => item.id === project.id);
  projects.value = projects.value.filter((item) => item.id !== project.id);
  editing.value = undefined;
  toast.create({
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
    toast.success('Workspace updated');
  }
};
</script>

<template>
  <AppShell :page="page" :workspace="workspace" @navigate="page = $event">
    <div class="flex min-h-15 flex-wrap items-start justify-between gap-4 md:items-end">
      <div>
        <h1 class="text-[1.75rem] leading-[2.125rem] font-semibold tracking-tight">{{ page }}</h1>
        <p class="mt-1 text-muted-foreground">
          {{
            page === 'Projects'
              ? 'Five projects across two teams. Data lives in src/data.ts.'
              : 'A small workspace built with moduix.'
          }}
        </p>
      </div>
      <Button v-if="page === 'Projects'" @click="editing = null">
        <span aria-hidden="true">+</span>New project
      </Button>
    </div>
    <ProjectTable v-if="page === 'Projects'" :projects="projects" @edit="editing = $event" />
    <div v-if="page === 'Team'" class="rounded-xl border border-border">
      <div v-for="owner in owners" :key="owner" class="flex items-center gap-3 p-4">
        <span
          class="inline-grid size-6 shrink-0 place-items-center rounded-full bg-border text-xs text-muted-foreground"
          >{{ initials(owner) }}</span
        >
        <strong>{{ owner }}</strong>
        <span class="ml-auto text-muted-foreground"
          >{{ projects.filter((project) => project.owner === owner).length }} projects</span
        >
      </div>
    </div>
    <div v-if="page === 'Reports'" class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div
        v-for="status in statuses"
        :key="status"
        class="grid gap-4 rounded-xl border border-border p-6"
      >
        <span>{{ status }} projects</span>
        <strong class="text-[2rem] leading-10">{{
          projects.filter((project) => project.status === status).length
        }}</strong>
      </div>
    </div>
    <form
      v-if="page === 'Settings'"
      class="grid max-w-[420px] justify-items-start gap-6"
      @submit.prevent="handleSettings"
    >
      <Field class="w-full" required>
        <FieldLabel>Workspace name</FieldLabel>
        <Input name="workspace" required :max-length="60" :value="workspace" />
      </Field>
      <Button type="submit">Save changes</Button>
    </form>
    <ProjectDialog
      :project="editing ?? null"
      :open="editing !== undefined"
      @close="editing = undefined"
      @save="handleSave"
      @delete="handleDelete"
    />
    <ToastToaster />
  </AppShell>
</template>