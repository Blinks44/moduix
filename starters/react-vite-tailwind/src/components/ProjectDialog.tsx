import { Button } from '@moduix/react-tailwind/button';
import {
  Dialog,
  DialogCloseIcon,
  DialogDescription,
  DialogPanel,
  DialogTitle,
} from '@moduix/react-tailwind/dialog';
import { Field, FieldLabel } from '@moduix/react-tailwind/field';
import { Input } from '@moduix/react-tailwind/input';
import { NativeSelect } from '@moduix/react-tailwind/native-select';
import { useState, type FormEvent } from 'react';
import { owners, statuses, type Project, type ProjectDraft } from '../data';

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
      open={open}
      onOpenChange={(details) => {
        if (!details.open) onClose();
      }}
    >
      <DialogPanel className="w-[min(480px,calc(100vw-2rem))] rounded-2xl">
        <DialogCloseIcon />
        <DialogTitle>{project ? 'Edit project' : 'New project'}</DialogTitle>
        <DialogDescription className="mt-1">
          Changes stay in memory. Connect your API in src/data.ts.
        </DialogDescription>
        <form key={project?.id ?? 'new'} className="mt-4 grid gap-4" onSubmit={handleSubmit}>
          <Field className="min-w-0" required>
            <FieldLabel>Name</FieldLabel>
            <Input
              className="w-full"
              name="name"
              required
              maxLength={100}
              defaultValue={project?.name ?? ''}
            />
          </Field>
          <Field className="min-w-0">
            <FieldLabel>Description</FieldLabel>
            <Input
              className="w-full"
              name="description"
              maxLength={200}
              defaultValue={project?.description ?? ''}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4 [&_[data-slot=native-select-control]]:w-full">
            <Field className="min-w-0">
              <FieldLabel>Owner</FieldLabel>
              <NativeSelect
                className="w-full"
                name="owner"
                defaultValue={project?.owner ?? owners[0]}
              >
                {owners.map((owner) => (
                  <option key={owner}>{owner}</option>
                ))}
              </NativeSelect>
            </Field>
            <Field className="min-w-0">
              <FieldLabel>Status</FieldLabel>
              <NativeSelect
                className="w-full"
                name="status"
                defaultValue={project?.status ?? 'Active'}
              >
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </NativeSelect>
            </Field>
          </div>
          <div className="flex items-center justify-between gap-3 pt-2">
            {project && (
              <button
                type="button"
                className="cursor-pointer text-[13px] text-destructive hover:underline focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
                onClick={() => setConfirmDelete(true)}
              >
                Delete project
              </button>
            )}
            <div className="ml-auto flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{project ? 'Save changes' : 'Create project'}</Button>
            </div>
          </div>
        </form>
        <Dialog open={confirmDelete} onOpenChange={(details) => setConfirmDelete(details.open)}>
          <DialogPanel>
            <DialogTitle>Delete project?</DialogTitle>
            <DialogDescription className="mt-1">
              You can undo this from the notification.
            </DialogDescription>
            <div className="mt-6 flex justify-end gap-2">
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
          </DialogPanel>
        </Dialog>
      </DialogPanel>
    </Dialog>
  );
}