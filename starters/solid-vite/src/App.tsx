import { Button } from '@moduix/solid/button';
import { Field, FieldLabel } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import { ToastToaster, createToaster } from '@moduix/solid/toast';
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
import { portalRef } from './portal';

const toaster = createToaster({ placement: 'bottom-end' });

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
    toaster.success({ title: previous ? 'Project updated' : 'Project created' });
  };
  const handleDelete = () => {
    const project = editing();
    if (!project) return;
    const index = projects().findIndex((item) => item.id === project.id);
    setProjects((current) => current.filter((item) => item.id !== project.id));
    setEditing(undefined);
    toaster.create({
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
      <div class="page-header">
        <div>
          <h1>{page()}</h1>
          <p>
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
        <div class="team-list">
          <For each={owners}>
            {(owner) => (
              <div class="team-member">
                <span class="avatar">{initials(owner)}</span>
                <strong>{owner}</strong>
                <span>
                  {projects().filter((project) => project.owner === owner).length} projects
                </span>
              </div>
            )}
          </For>
        </div>
      </Show>
      <Show when={page() === 'Reports'}>
        <div class="report-grid">
          <For each={statuses}>
            {(status) => (
              <div class="report-card">
                <span>{status} projects</span>
                <strong>{projects().filter((project) => project.status === status).length}</strong>
              </div>
            )}
          </For>
        </div>
      </Show>
      <Show when={page() === 'Settings'}>
        <form
          class="settings"
          onSubmit={(event) => {
            event.preventDefault();
            const name = String(new FormData(event.currentTarget).get('workspace')).trim();
            if (name) {
              setWorkspace(name);
              toaster.success({ title: 'Workspace updated' });
            }
          }}
        >
          <Field required>
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
      <ToastToaster toaster={toaster} portalRef={portalRef} />
    </AppShell>
  );
}