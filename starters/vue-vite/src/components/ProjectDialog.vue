<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
} from '@moduix/vue/dialog';
import { Field, FieldLabel } from '@moduix/vue/field';
import { Input } from '@moduix/vue/input';
import { NativeSelect } from '@moduix/vue/native-select';
import { ref } from 'vue';
import { owners, statuses, type Project, type ProjectDraft } from '../data';
import { portalRef } from '../portal';

const props = defineProps<{ project: Project | null; open: boolean }>();
const emit = defineEmits<{ close: []; save: [draft: ProjectDraft]; delete: [] }>();
const confirmDelete = ref(false);
const handleSubmit = (event: Event) => {
  const data = new FormData(event.currentTarget as HTMLFormElement);
  const name = String(data.get('name')).trim();
  if (!name) return;
  emit('save', {
    name,
    description: String(data.get('description')).trim(),
    owner: String(data.get('owner')),
    status: data.get('status') as Project['status'],
  });
};
</script>

<template>
  <Dialog :portal-ref="portalRef" :open="open" @open-change="!$event.open && emit('close')">
    <DialogBackdrop class="app-backdrop" /><DialogPositioner
      ><DialogContent class="project-dialog">
        <DialogCloseIcon /><DialogTitle>{{ project ? 'Edit project' : 'New project' }}</DialogTitle
        ><DialogDescription
          >Changes stay in memory. Connect your API in src/data.ts.</DialogDescription
        >
        <form :key="props.project?.id ?? 'new'" @submit.prevent="handleSubmit">
          <Field required
            ><FieldLabel>Name</FieldLabel
            ><Input name="name" required :max-length="100" :value="project?.name ?? ''"
          /></Field>
          <Field
            ><FieldLabel>Description</FieldLabel
            ><Input name="description" :max-length="200" :value="project?.description ?? ''"
          /></Field>
          <div class="field-row">
            <Field
              ><FieldLabel>Owner</FieldLabel
              ><NativeSelect name="owner" :model-value="project?.owner ?? owners[0]"
                ><option v-for="owner in owners" :key="owner">{{ owner }}</option></NativeSelect
              ></Field
            >
            <Field
              ><FieldLabel>Status</FieldLabel
              ><NativeSelect name="status" :model-value="project?.status ?? 'Active'"
                ><option v-for="status in statuses" :key="status">
                  {{ status }}
                </option></NativeSelect
              ></Field
            >
          </div>
          <div class="dialog-footer">
            <button v-if="project" type="button" class="delete-link" @click="confirmDelete = true">
              Delete project
            </button>
            <div class="dialog-actions">
              <Button type="button" variant="outline" @click="emit('close')">Cancel</Button
              ><Button type="submit">{{ project ? 'Save changes' : 'Create project' }}</Button>
            </div>
          </div>
        </form>
        <Dialog
          :portal-ref="portalRef"
          :open="confirmDelete"
          @open-change="confirmDelete = $event.open"
          ><DialogBackdrop class="app-backdrop" /><DialogPositioner
            ><DialogContent class="confirm-dialog"
              ><DialogTitle>Delete project?</DialogTitle
              ><DialogDescription>You can undo this from the notification.</DialogDescription>
              <div class="dialog-actions">
                <Button variant="outline" @click="confirmDelete = false">Cancel</Button
                ><Button
                  variant="destructive"
                  @click="
                    confirmDelete = false;
                    emit('delete');
                  "
                  >Delete project</Button
                >
              </div></DialogContent
            ></DialogPositioner
          ></Dialog
        >
      </DialogContent></DialogPositioner
    >
  </Dialog>
</template>