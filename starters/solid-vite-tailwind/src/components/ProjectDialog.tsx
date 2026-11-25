import { Button } from '@moduix/solid-tailwind/button';
import {
  Dialog,
  DialogCloseIcon,
  DialogDescription,
  DialogPanel,
  DialogTitle,
} from '@moduix/solid-tailwind/dialog';
import { Field, FieldLabel } from '@moduix/solid-tailwind/field';
import { Input } from '@moduix/solid-tailwind/input';
import { NativeSelect } from '@moduix/solid-tailwind/native-select';
import { createSignal, For, Show } from 'solid-js';
import type { JSX } from 'solid-js';
import { owners, statuses, type Project, type ProjectDraft } from '../data';

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
      open={props.open}
      onOpenChange={(details) => {
        if (!details.open) props.onClose();
      }}
    >
      <DialogPanel class="w-[min(480px,calc(100vw-2rem))] rounded-2xl">
        <DialogCloseIcon />
        <DialogTitle>{props.project ? 'Edit project' : 'New project'}</DialogTitle>
        <DialogDescription class="mt-1">
          Changes stay in memory. Connect your API in src/data.ts.
        </DialogDescription>
        <form class="mt-4 grid gap-4" onSubmit={handleSubmit}>
          <Field class="min-w-0" required>
            <FieldLabel>Name</FieldLabel>
            <Input
              class="w-full"
              name="name"
              required
              maxLength={100}
              value={props.project?.name ?? ''}
            />
          </Field>
          <Field class="min-w-0">
            <FieldLabel>Description</FieldLabel>
            <Input
              class="w-full"
              name="description"
              maxLength={200}
              value={props.project?.description ?? ''}
            />
          </Field>
          <div class="grid grid-cols-2 gap-4 [&_[data-slot=native-select-control]]:w-full">
            <Field class="min-w-0">
              <FieldLabel>Owner</FieldLabel>
              <NativeSelect class="w-full" name="owner" value={props.project?.owner ?? owners[0]}>
                <For each={owners}>{(owner) => <option>{owner}</option>}</For>
              </NativeSelect>
            </Field>
            <Field class="min-w-0">
              <FieldLabel>Status</FieldLabel>
              <NativeSelect class="w-full" name="status" value={props.project?.status ?? 'Active'}>
                <For each={statuses}>{(status) => <option>{status}</option>}</For>
              </NativeSelect>
            </Field>
          </div>
          <div class="flex items-center justify-between gap-3 pt-2">
            <Show when={props.project}>
              <button
                type="button"
                class="cursor-pointer text-[13px] text-destructive hover:underline focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
                onClick={() => setConfirmDelete(true)}
              >
                Delete project
              </button>
            </Show>
            <div class="ml-auto flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => props.onClose()}>
                Cancel
              </Button>
              <Button type="submit">{props.project ? 'Save changes' : 'Create project'}</Button>
            </div>
          </div>
        </form>
        <Dialog open={confirmDelete()} onOpenChange={(details) => setConfirmDelete(details.open)}>
          <DialogPanel>
            <DialogTitle>Delete project?</DialogTitle>
            <DialogDescription class="mt-1">
              You can undo this from the notification.
            </DialogDescription>
            <div class="mt-6 flex justify-end gap-2">
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
          </DialogPanel>
        </Dialog>
      </DialogPanel>
    </Dialog>
  );
}