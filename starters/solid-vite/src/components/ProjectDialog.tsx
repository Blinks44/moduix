import { Button } from '@moduix/solid/button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
} from '@moduix/solid/dialog';
import { Field, FieldLabel } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import { NativeSelect } from '@moduix/solid/native-select';
import { createSignal, For, Show } from 'solid-js';
import type { JSX } from 'solid-js';
import { owners, statuses, type Project, type ProjectDraft } from '../data';
import { portalRef } from '../portal';

export default function ProjectDialog(props: {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  onSave: (draft: ProjectDraft) => void;
  onDelete: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = createSignal(false);
  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name')).trim();
    if (!name) return;
    props.onSave({
      name,
      description: String(data.get('description')).trim(),
      owner: String(data.get('owner')),
      status: data.get('status') as Project['status'],
    });
  };

  return (
    <Dialog
      portalRef={portalRef}
      open={props.open}
      onOpenChange={(details) => {
        if (!details.open) props.onClose();
      }}
    >
      <DialogBackdrop class="app-backdrop" />
      <DialogPositioner>
        <DialogContent class="project-dialog">
          <DialogCloseIcon />
          <DialogTitle>{props.project ? 'Edit project' : 'New project'}</DialogTitle>
          <DialogDescription>
            Changes stay in memory. Connect your API in src/data.ts.
          </DialogDescription>
          <form onSubmit={handleSubmit}>
            <Field required>
              <FieldLabel>Name</FieldLabel>
              <Input name="name" required maxLength={100} value={props.project?.name ?? ''} />
            </Field>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Input name="description" maxLength={200} value={props.project?.description ?? ''} />
            </Field>
            <div class="field-row">
              <Field>
                <FieldLabel>Owner</FieldLabel>
                <NativeSelect name="owner" value={props.project?.owner ?? owners[0]}>
                  <For each={owners}>{(owner) => <option>{owner}</option>}</For>
                </NativeSelect>
              </Field>
              <Field>
                <FieldLabel>Status</FieldLabel>
                <NativeSelect name="status" value={props.project?.status ?? 'Active'}>
                  <For each={statuses}>{(status) => <option>{status}</option>}</For>
                </NativeSelect>
              </Field>
            </div>
            <div class="dialog-footer">
              <Show when={props.project}>
                <button type="button" class="delete-link" onClick={() => setConfirmDelete(true)}>
                  Delete project
                </button>
              </Show>
              <div class="dialog-actions">
                <Button type="button" variant="outline" onClick={() => props.onClose()}>
                  Cancel
                </Button>
                <Button type="submit">{props.project ? 'Save changes' : 'Create project'}</Button>
              </div>
            </div>
          </form>
          <Dialog
            portalRef={portalRef}
            open={confirmDelete()}
            onOpenChange={(details) => setConfirmDelete(details.open)}
          >
            <DialogBackdrop class="app-backdrop" />
            <DialogPositioner>
              <DialogContent class="confirm-dialog">
                <DialogTitle>Delete project?</DialogTitle>
                <DialogDescription>You can undo this from the notification.</DialogDescription>
                <div class="dialog-actions">
                  <Button variant="outline" onClick={() => setConfirmDelete(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setConfirmDelete(false);
                      props.onDelete();
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