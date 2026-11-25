import { Button } from '@moduix/solid-tailwind/button';
import { Field, FieldLabel } from '@moduix/solid-tailwind/field';
import { Input } from '@moduix/solid-tailwind/input';
import { ToastToaster, toast } from '@moduix/solid-tailwind/toast';
import { createSignal, For, Show } from 'solid-js';
import AppShell, { type Page } from './components/AppShell';
import ProjectDialog from './components/ProjectDialog';
import ProjectTable from './components/ProjectTable';
import {
  initialProjects,
  initials,
  owners,
  statuses,
  type Project,
  type ProjectDraft,
} from './data';

export default function App() {
  const [projects, setProjects] = createSignal(initialProjects);
  const [page, setPage] = createSignal<Page>('Projects');
  const [workspace, setWorkspace] = createSignal('Acme Projects');
  const [editing, setEditing] = createSignal<Project | null | undefined>(undefined);
  const handleSave = (draft: ProjectDraft) => {
    const previous = editing();
    const project = { ...draft, id: previous?.id ?? crypto.randomUUID(), updated: 'Just now' };
    setProjects((current) =>
      previous
        ? current.map((item) => (item.id === previous.id ? project : item))
        : [...current, project],
    );
    setEditing(undefined);
    toast.success(previous ? 'Project updated' : 'Project created');
  };
  const handleDelete = () => {
    const project = editing();
    if (!project) return;
    const index = projects().findIndex((item) => item.id === project.id);
    setProjects((current) => current.filter((item) => item.id !== project.id));
    setEditing(undefined);
    toast.create({
      title: 'Project deleted',
      description: project.name,
      duration: 8000,
      action: {
        label: 'Undo',
        onClick: () =>
          setProjects((current) => [...current.slice(0, index), project, ...current.slice(index)]),
      },
    });
  };

  return (
    <AppShell page={page()} workspace={workspace()} onNavigate={setPage}>
      <div class="flex min-h-15 flex-wrap items-start justify-between gap-4 md:items-end">
        <div>
          <h1 class="text-[1.75rem] leading-[2.125rem] font-semibold tracking-tight">{page()}</h1>
          <p class="mt-1 text-muted-foreground">
            {page() === 'Projects'
              ? 'Five projects across two teams. Data lives in src/data.ts.'
              : 'A small workspace built with moduix.'}
          </p>
        </div>
        <Show when={page() === 'Projects'}>
          <Button onClick={() => setEditing(null)}>
            <span aria-hidden="true">+</span>New project
          </Button>
        </Show>
      </div>
      <Show when={page() === 'Projects'}>
        <ProjectTable projects={projects()} onEdit={setEditing} />
      </Show>
      <Show when={page() === 'Team'}>
        <div class="rounded-xl border border-border">
          <For each={owners}>
            {(owner) => (
              <div class="flex items-center gap-3 p-4">
                <span class="inline-grid size-6 shrink-0 place-items-center rounded-full bg-border text-xs text-muted-foreground">
                  {initials(owner)}
                </span>
                <strong>{owner}</strong>
                <span class="ml-auto text-muted-foreground">
                  {projects().filter((project) => project.owner === owner).length} projects
                </span>
              </div>
            )}
          </For>
        </div>
      </Show>
      <Show when={page() === 'Reports'}>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <For each={statuses}>
            {(status) => (
              <div class="grid gap-4 rounded-xl border border-border p-6">
                <span>{status} projects</span>
                <strong class="text-[2rem] leading-10">
                  {projects().filter((project) => project.status === status).length}
                </strong>
              </div>
            )}
          </For>
        </div>
      </Show>
      <Show when={page() === 'Settings'}>
        <form
          class="grid max-w-[420px] justify-items-start gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            const name = String(new FormData(event.currentTarget).get('workspace')).trim();
            if (name) {
              setWorkspace(name);
              toast.success('Workspace updated');
            }
          }}
        >
          <Field class="w-full" required>
            <FieldLabel>Workspace name</FieldLabel>
            <Input name="workspace" required maxLength={60} value={workspace()} />
          </Field>
          <Button type="submit">Save changes</Button>
        </form>
      </Show>
      <ProjectDialog
        project={editing() ?? null}
        open={editing() !== undefined}
        onClose={() => setEditing(undefined)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <ToastToaster />
    </AppShell>
  );
}