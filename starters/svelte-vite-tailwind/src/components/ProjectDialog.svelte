<script lang="ts">
  import { Button } from '@moduix/svelte-tailwind/button';
  import {
    Dialog,
    DialogCloseIcon,
    DialogDescription,
    DialogPanel,
    DialogTitle,
  } from '@moduix/svelte-tailwind/dialog';
  import { Field, FieldLabel } from '@moduix/svelte-tailwind/field';
  import { Input } from '@moduix/svelte-tailwind/input';
  import { NativeSelect } from '@moduix/svelte-tailwind/native-select';
  import { owners, statuses, type Project, type ProjectDraft } from '../data';

  let {
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
  } = $props();
  let confirmDelete = $state(false);
  const handleSubmit = (event: SubmitEvent & { currentTarget: HTMLFormElement }) => {
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
</script>

<Dialog {open} onOpenChange={(details) => !details.open && onClose()}>
  <DialogPanel class="w-[min(480px,calc(100vw-2rem))] rounded-2xl">
    <DialogCloseIcon />
    <DialogTitle>{project ? 'Edit project' : 'New project'}</DialogTitle>
    <DialogDescription class="mt-1">
      Changes stay in memory. Connect your API in src/data.ts.
    </DialogDescription>
    {#key project?.id ?? 'new'}
      <form class="mt-4 grid gap-4" onsubmit={handleSubmit}>
        <Field class="min-w-0" required>
          <FieldLabel>Name</FieldLabel>
          <Input class="w-full" name="name" required maxlength={100} value={project?.name ?? ''} />
        </Field>
        <Field class="min-w-0">
          <FieldLabel>Description</FieldLabel>
          <Input
            class="w-full"
            name="description"
            maxlength={200}
            value={project?.description ?? ''}
          />
        </Field>
        <div class="grid grid-cols-2 gap-4 [&_[data-slot=native-select-control]]:w-full">
          <Field class="min-w-0">
            <FieldLabel>Owner</FieldLabel>
            <NativeSelect class="w-full" name="owner" value={project?.owner ?? owners[0]}>
              {#each owners as owner (owner)}
                <option>{owner}</option>
              {/each}
            </NativeSelect>
          </Field>
          <Field class="min-w-0">
            <FieldLabel>Status</FieldLabel>
            <NativeSelect class="w-full" name="status" value={project?.status ?? 'Active'}>
              {#each statuses as status (status)}
                <option>{status}</option>
              {/each}
            </NativeSelect>
          </Field>
        </div>
        <div class="flex items-center justify-between gap-3 pt-2">
          {#if project}
            <button
              type="button"
              class="cursor-pointer text-[13px] text-destructive hover:underline focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
              onclick={() => (confirmDelete = true)}
            >
              Delete project
            </button>
          {/if}
          <div class="ml-auto flex justify-end gap-2">
            <Button type="button" variant="outline" onclick={onClose}>Cancel</Button>
            <Button type="submit">{project ? 'Save changes' : 'Create project'}</Button>
          </div>
        </div>
      </form>
    {/key}
    <Dialog bind:open={confirmDelete}>
      <DialogPanel>
        <DialogTitle>Delete project?</DialogTitle>
        <DialogDescription class="mt-1">You can undo this from the notification.</DialogDescription>
        <div class="mt-6 flex justify-end gap-2">
          <Button variant="outline" onclick={() => (confirmDelete = false)}>Cancel</Button>
          <Button
            variant="destructive"
            onclick={() => {
              confirmDelete = false;
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