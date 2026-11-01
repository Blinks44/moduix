import { Button } from '@moduix/react/button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
} from '@moduix/react/dialog';
import { Field, FieldLabel } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import { NativeSelect } from '@moduix/react/native-select';
import { useState, type FormEvent } from 'react';
import { owners, statuses, type Project, type ProjectDraft } from '../data';
import { portalRef } from '../portal';

export default function ProjectDialog({
  project,
  open,
  onClose,
  onSave,
  onDelete,
}: {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  onSave: (draft: ProjectDraft) => void;
  onDelete: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name')).trim();
    if (!name) return;
    onSave({
      name,
      description: String(data.get('description')).trim(),
      owner: String(data.get('owner')),
      status: data.get('status') as Project['status'],
    });
  };

  return (
    <Dialog
      portalRef={portalRef}
      open={open}
      onOpenChange={(details) => {
        if (!details.open) onClose();
      }}
    >
      <DialogBackdrop className="app-backdrop" />
      <DialogPositioner>
        <DialogContent className="project-dialog">
          <DialogCloseIcon />
          <DialogTitle>{project ? 'Edit project' : 'New project'}</DialogTitle>
          <DialogDescription>
            Changes stay in memory. Connect your API in src/data.ts.
          </DialogDescription>
          <form key={project?.id ?? 'new'} onSubmit={handleSubmit}>
            <Field required>
              <FieldLabel>Name</FieldLabel>
              <Input name="name" required maxLength={100} defaultValue={project?.name ?? ''} />
            </Field>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Input name="description" maxLength={200} defaultValue={project?.description ?? ''} />
            </Field>
            <div className="field-row">
              <Field>
                <FieldLabel>Owner</FieldLabel>
                <NativeSelect name="owner" defaultValue={project?.owner ?? owners[0]}>
                  {owners.map((owner) => (
                    <option key={owner}>{owner}</option>
                  ))}
                </NativeSelect>
              </Field>
              <Field>
                <FieldLabel>Status</FieldLabel>
                <NativeSelect name="status" defaultValue={project?.status ?? 'Active'}>
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </NativeSelect>
              </Field>
            </div>
            <div className="dialog-footer">
              {project && (
                <button
                  type="button"
                  className="delete-link"
                  onClick={() => setConfirmDelete(true)}
                >
                  Delete project
                </button>
              )}
              <div className="dialog-actions">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">{project ? 'Save changes' : 'Create project'}</Button>
              </div>
            </div>
          </form>
          <Dialog
            portalRef={portalRef}
            open={confirmDelete}
            onOpenChange={(details) => setConfirmDelete(details.open)}
          >
            <DialogBackdrop className="app-backdrop" />
            <DialogPositioner>
              <DialogContent className="confirm-dialog">
                <DialogTitle>Delete project?</DialogTitle>
                <DialogDescription>You can undo this from the notification.</DialogDescription>
                <div className="dialog-actions">
                  <Button variant="outline" onClick={() => setConfirmDelete(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setConfirmDelete(false);
                      onDelete();
                    }}
                  >
                    Delete project
                  </Button>
                </div>
              </DialogContent>
            </DialogPositioner>
          </Dialog>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}