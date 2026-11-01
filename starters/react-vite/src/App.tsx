import { Button } from '@moduix/react/button';
import { Field, FieldLabel } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import { ToastToaster, createToaster } from '@moduix/react/toast';
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
import { portalRef } from './portal';

const toaster = createToaster({ placement: 'bottom-end' });

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
    toaster.success({ title: editing ? 'Project updated' : 'Project created' });
  };
  const handleDelete = () => {
    if (!editing) return;
    const project = editing;
    const index = projects.findIndex((item) => item.id === project.id);
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
    <AppShell page={page} workspace={workspace} onNavigate={setPage}>
      <div className="page-header">
        <div>
          <h1>{page}</h1>
          <p>
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
        <div className="team-list">
          {owners.map((owner) => (
            <div className="team-member" key={owner}>
              <span className="avatar">{initials(owner)}</span>
              <strong>{owner}</strong>
              <span>{projects.filter((project) => project.owner === owner).length} projects</span>
            </div>
          ))}
        </div>
      )}
      {page === 'Reports' && (
        <div className="report-grid">
          {statuses.map((status) => (
            <div className="report-card" key={status}>
              <span>{status} projects</span>
              <strong>{projects.filter((project) => project.status === status).length}</strong>
            </div>
          ))}
        </div>
      )}
      {page === 'Settings' && (
        <form
          className="settings"
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
      <ToastToaster toaster={toaster} portalRef={portalRef} />
    </AppShell>
  );
}