<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Field, FieldLabel } from '@moduix/svelte/field';
  import { Input } from '@moduix/svelte/input';
  import { ToastToaster, createToaster } from '@moduix/svelte/toast';
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
  import { portalRef } from './portal';

  const toaster = createToaster({ placement: 'bottom-end' });
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
    toaster.success({ title: previous ? 'Project updated' : 'Project created' });
  };
  const handleDelete = () => {
    const project = editing;
    if (!project) return;
    const index = projects.findIndex((item) => item.id === project.id);
    projects = projects.filter((item) => item.id !== project.id);
    editing = undefined;
    toaster.create({
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
      toaster.success({ title: 'Workspace updated' });
    }
  };
</script>

<AppShell {page} {workspace} onNavigate={(next) => (page = next)}>
  <div class="page-header">
    <div>
      <h1>{page}</h1>
      <p>
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
    <div class="team-list">
      {#each owners as owner (owner)}
        <div class="team-member">
          <span class="avatar">{initials(owner)}</span><strong>{owner}</strong><span
            >{projects.filter((project) => project.owner === owner).length} projects</span
          >
        </div>
      {/each}
    </div>
  {:else if page === 'Reports'}
    <div class="report-grid">
      {#each statuses as status (status)}
        <div class="report-card">
          <span>{status} projects</span><strong
            >{projects.filter((project) => project.status === status).length}</strong
          >
        </div>
      {/each}
    </div>
  {:else}
    <form class="settings" onsubmit={handleSettings}>
      <Field required
        ><FieldLabel>Workspace name</FieldLabel><Input
          name="workspace"
          required
          maxlength={60}
          value={workspace}
        /></Field
      ><Button type="submit">Save changes</Button>
    </form>
  {/if}
  <ProjectDialog
    project={editing ?? null}
    open={editing !== undefined}
    onClose={() => (editing = undefined)}
    onSave={handleSave}
    onDelete={handleDelete}
  />
  <ToastToaster {toaster} {portalRef} />
</AppShell>