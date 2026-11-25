import { Button } from '@moduix/react-tailwind/button';
import { Field, FieldLabel } from '@moduix/react-tailwind/field';
import { Input } from '@moduix/react-tailwind/input';
import { ToastToaster, toast } from '@moduix/react-tailwind/toast';
import { useState } from 'react';
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
  const [projects, setProjects] = useState(initialProjects);
  const [page, setPage] = useState<Page>('Projects');
  const [workspace, setWorkspace] = useState('Acme Projects');
  const [editing, setEditing] = useState<Project | null | undefined>(undefined);
  const handleSave = (draft: ProjectDraft) => {
    const project = { ...draft, id: editing?.id ?? crypto.randomUUID(), updated: 'Just now' };
    setProjects((current) =>
      editing
        ? current.map((item) => (item.id === editing.id ? project : item))
        : [...current, project],
    );
    setEditing(undefined);
    toast.success(editing ? 'Project updated' : 'Project created');
  };
  const handleDelete = () => {
    if (!editing) return;
    const project = editing;
    const index = projects.findIndex((item) => item.id === project.id);
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
    <AppShell page={page} workspace={workspace} onNavigate={setPage}>
      <div className="flex min-h-15 flex-wrap items-start justify-between gap-4 md:items-end">
        <div>
          <h1 className="text-[1.75rem] leading-[2.125rem] font-semibold tracking-tight">{page}</h1>
          <p className="mt-1 text-muted-foreground">
            {page === 'Projects'
              ? 'Five projects across two teams. Data lives in src/data.ts.'
              : 'A small workspace built with moduix.'}
          </p>
        </div>
        {page === 'Projects' && (
          <Button onClick={() => setEditing(null)}>
            <span aria-hidden="true">+</span>New project
          </Button>
        )}
      </div>
      {page === 'Projects' && <ProjectTable projects={projects} onEdit={setEditing} />}
      {page === 'Team' && (
        <div className="rounded-xl border border-border">
          {owners.map((owner) => (
            <div className="flex items-center gap-3 p-4" key={owner}>
              <span className="inline-grid size-6 shrink-0 place-items-center rounded-full bg-border text-xs text-muted-foreground">
                {initials(owner)}
              </span>
              <strong>{owner}</strong>
              <span className="ml-auto text-muted-foreground">
                {projects.filter((project) => project.owner === owner).length} projects
              </span>
            </div>
          ))}
        </div>
      )}
      {page === 'Reports' && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {statuses.map((status) => (
            <div className="grid gap-4 rounded-xl border border-border p-6" key={status}>
              <span>{status} projects</span>
              <strong className="text-[2rem] leading-10">
                {projects.filter((project) => project.status === status).length}
              </strong>
            </div>
          ))}
        </div>
      )}
      {page === 'Settings' && (
        <form
          className="grid max-w-[420px] justify-items-start gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            const name = String(new FormData(event.currentTarget).get('workspace')).trim();
            if (name) {
              setWorkspace(name);
              toast.success('Workspace updated');
            }
          }}
        >
          <Field className="w-full" required>
            <FieldLabel>Workspace name</FieldLabel>
            <Input name="workspace" required maxLength={60} defaultValue={workspace} />
          </Field>
          <Button type="submit">Save changes</Button>
        </form>
      )}
      <ProjectDialog
        project={editing ?? null}
        open={editing !== undefined}
        onClose={() => setEditing(undefined)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <ToastToaster />
    </AppShell>
  );
}