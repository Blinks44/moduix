<script lang="ts">
  import { Button } from '@moduix/svelte-tailwind/button';
  import { Field, FieldLabel } from '@moduix/svelte-tailwind/field';
  import { Input } from '@moduix/svelte-tailwind/input';
  import { ToastToaster, toast } from '@moduix/svelte-tailwind/toast';
  import AppShell from './components/AppShell.svelte';
  import ProjectDialog from './components/ProjectDialog.svelte';
  import ProjectTable from './components/ProjectTable.svelte';
  import {
    initialProjects,
    initials,
    owners,
    statuses,
    type Page,
    type Project,
    type ProjectDraft,
  } from './data';

  let projects = $state(initialProjects);
  let page = $state<Page>('Projects');
  let workspace = $state('Acme Projects');
  let editing = $state<Project | null | undefined>(undefined);
  const handleSave = (draft: ProjectDraft) => {
    const previous = editing;
    const project = { ...draft, id: previous?.id ?? crypto.randomUUID(), updated: 'Just now' };
    projects = previous
      ? projects.map((item) => (item.id === previous.id ? project : item))
      : [...projects, project];
    editing = undefined;
    toast.success(previous ? 'Project updated' : 'Project created');
  };
  const handleDelete = () => {
    const project = editing;
    if (!project) return;
    const index = projects.findIndex((item) => item.id === project.id);
    projects = projects.filter((item) => item.id !== project.id);
    editing = undefined;
    toast.create({
      title: 'Project deleted',
      description: project.name,
      duration: 8000,
      action: {
        label: 'Undo',
        onClick: () => {
          projects = [...projects.slice(0, index), project, ...projects.slice(index)];
        },
      },
    });
  };
  const handleSettings = (event: SubmitEvent & { currentTarget: HTMLFormElement }) => {
    event.preventDefault();
    const name = String(new FormData(event.currentTarget).get('workspace')).trim();
    if (name) {
      workspace = name;
      toast.success('Workspace updated');
    }
  };
</script>

<AppShell {page} {workspace} onNavigate={(next) => (page = next)}>
  <div class="flex min-h-15 flex-wrap items-start justify-between gap-4 md:items-end">
    <div>
      <h1 class="text-[1.75rem] leading-[2.125rem] font-semibold tracking-tight">{page}</h1>
      <p class="mt-1 text-muted-foreground">
        {page === 'Projects'
          ? 'Five projects across two teams. Data lives in src/data.ts.'
          : 'A small workspace built with moduix.'}
      </p>
    </div>
    {#if page === 'Projects'}
      <Button onclick={() => (editing = null)}><span aria-hidden="true">+</span>New project</Button>
    {/if}
  </div>
  {#if page === 'Projects'}
    <ProjectTable {projects} onEdit={(project) => (editing = project)} />
  {:else if page === 'Team'}
    <div class="rounded-xl border border-border">
      {#each owners as owner (owner)}
        <div class="flex items-center gap-3 p-4">
          <span
            class="inline-grid size-6 shrink-0 place-items-center rounded-full bg-border text-xs text-muted-foreground"
            >{initials(owner)}</span
          >
          <strong>{owner}</strong>
          <span class="ml-auto text-muted-foreground"
            >{projects.filter((project) => project.owner === owner).length} projects</span
          >
        </div>
      {/each}
    </div>
  {:else if page === 'Reports'}
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      {#each statuses as status (status)}
        <div class="grid gap-4 rounded-xl border border-border p-6">
          <span>{status} projects</span>
          <strong class="text-[2rem] leading-10"
            >{projects.filter((project) => project.status === status).length}</strong
          >
        </div>
      {/each}
    </div>
  {:else}
    <form class="grid max-w-[420px] justify-items-start gap-6" onsubmit={handleSettings}>
      <Field class="w-full" required>
        <FieldLabel>Workspace name</FieldLabel>
        <Input name="workspace" required maxlength={60} value={workspace} />
      </Field>
      <Button type="submit">Save changes</Button>
    </form>
  {/if}
  <ProjectDialog
    project={editing ?? null}
    open={editing !== undefined}
    onClose={() => (editing = undefined)}
    onSave={handleSave}
    onDelete={handleDelete}
  />
  <ToastToaster />
</AppShell>