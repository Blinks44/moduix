<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Dialog,
    DialogBackdrop,
    DialogCloseIcon,
    DialogContent,
    DialogDescription,
    DialogPositioner,
    DialogTitle,
  } from '@moduix/svelte/dialog';
  import { Field, FieldLabel } from '@moduix/svelte/field';
  import { Input } from '@moduix/svelte/input';
  import { NativeSelect } from '@moduix/svelte/native-select';
  import { owners, statuses, type Project, type ProjectDraft } from '../data';
  import { portalRef } from '../portal';

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

<Dialog {portalRef} {open} onOpenChange={(details) => !details.open && onClose()}>
  <DialogBackdrop class="app-backdrop" /><DialogPositioner
    ><DialogContent class="project-dialog">
      <DialogCloseIcon /><DialogTitle>{project ? 'Edit project' : 'New project'}</DialogTitle
      ><DialogDescription
        >Changes stay in memory. Connect your API in src/data.ts.</DialogDescription
      >
      {#key project?.id ?? 'new'}
        <form onsubmit={handleSubmit}>
          <Field required
            ><FieldLabel>Name</FieldLabel><Input
              name="name"
              required
              maxlength={100}
              value={project?.name ?? ''}
            /></Field
          >
          <Field
            ><FieldLabel>Description</FieldLabel><Input
              name="description"
              maxlength={200}
              value={project?.description ?? ''}
            /></Field
          >
          <div class="field-row">
            <Field
              ><FieldLabel>Owner</FieldLabel><NativeSelect
                name="owner"
                value={project?.owner ?? owners[0]}
                >{#each owners as owner (owner)}<option>{owner}</option>{/each}</NativeSelect
              ></Field
            >
            <Field
              ><FieldLabel>Status</FieldLabel><NativeSelect
                name="status"
                value={project?.status ?? 'Active'}
                >{#each statuses as status (status)}<option>{status}</option>{/each}</NativeSelect
              ></Field
            >
          </div>
          <div class="dialog-footer">
            {#if project}
              <button type="button" class="delete-link" onclick={() => (confirmDelete = true)}>
                Delete project
              </button>
            {/if}
            <div class="dialog-actions">
              <Button type="button" variant="outline" onclick={onClose}>Cancel</Button><Button
                type="submit">{project ? 'Save changes' : 'Create project'}</Button
              >
            </div>
          </div>
        </form>
      {/key}
      <Dialog {portalRef} bind:open={confirmDelete}
        ><DialogBackdrop class="app-backdrop" /><DialogPositioner
          ><DialogContent class="confirm-dialog"
            ><DialogTitle>Delete project?</DialogTitle><DialogDescription
              >You can undo this from the notification.</DialogDescription
            >
            <div class="dialog-actions">
              <Button variant="outline" onclick={() => (confirmDelete = false)}>Cancel</Button
              ><Button
                variant="destructive"
                onclick={() => {
                  confirmDelete = false;
                  onDelete();
                }}>Delete project</Button
              >
            </div></DialogContent
          ></DialogPositioner
        ></Dialog
      >
    </DialogContent></DialogPositioner
  >
</Dialog>