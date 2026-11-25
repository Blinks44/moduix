<script setup lang="ts">
import { Button } from '@moduix/vue-tailwind/button';
import {
  Dialog,
  DialogCloseIcon,
  DialogDescription,
  DialogPanel,
  DialogTitle,
} from '@moduix/vue-tailwind/dialog';
import { Field, FieldLabel } from '@moduix/vue-tailwind/field';
import { Input } from '@moduix/vue-tailwind/input';
import { NativeSelect } from '@moduix/vue-tailwind/native-select';
import { ref } from 'vue';
import { owners, statuses, type Project, type ProjectDraft } from '../data';

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
  <Dialog :open="open" @open-change="!$event.open && emit('close')">
    <DialogPanel class="w-[min(480px,calc(100vw-2rem))] rounded-2xl">
      <DialogCloseIcon />
      <DialogTitle>{{ project ? 'Edit project' : 'New project' }}</DialogTitle>
      <DialogDescription class="mt-1">
        Changes stay in memory. Connect your API in src/data.ts.
      </DialogDescription>
      <form
        :key="props.project?.id ?? 'new'"
        class="mt-4 grid gap-4"
        @submit.prevent="handleSubmit"
      >
        <Field class="min-w-0" required>
          <FieldLabel>Name</FieldLabel>
          <Input
            class="w-full"
            name="name"
            required
            :max-length="100"
            :value="project?.name ?? ''"
          />
        </Field>
        <Field class="min-w-0">
          <FieldLabel>Description</FieldLabel>
          <Input
            class="w-full"
            name="description"
            :max-length="200"
            :value="project?.description ?? ''"
          />
        </Field>
        <div class="grid grid-cols-2 gap-4 [&_[data-slot=native-select-control]]:w-full">
          <Field class="min-w-0">
            <FieldLabel>Owner</FieldLabel>
            <NativeSelect class="w-full" name="owner" :model-value="project?.owner ?? owners[0]">
              <option v-for="owner in owners" :key="owner">{{ owner }}</option>
            </NativeSelect>
          </Field>
          <Field class="min-w-0">
            <FieldLabel>Status</FieldLabel>
            <NativeSelect class="w-full" name="status" :model-value="project?.status ?? 'Active'">
              <option v-for="status in statuses" :key="status">
                {{ status }}
              </option>
            </NativeSelect>
          </Field>
        </div>
        <div class="flex items-center justify-between gap-3 pt-2">
          <button
            v-if="project"
            type="button"
            class="cursor-pointer text-[13px] text-destructive hover:underline focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
            @click="confirmDelete = true"
          >
            Delete project
          </button>
          <div class="ml-auto flex justify-end gap-2">
            <Button type="button" variant="outline" @click="emit('close')">Cancel</Button>
            <Button type="submit">{{ project ? 'Save changes' : 'Create project' }}</Button>
          </div>
        </div>
      </form>
      <Dialog :open="confirmDelete" @open-change="confirmDelete = $event.open">
        <DialogPanel>
          <DialogTitle>Delete project?</DialogTitle>
          <DialogDescription class="mt-1">
            You can undo this from the notification.
          </DialogDescription>
          <div class="mt-6 flex justify-end gap-2">
            <Button variant="outline" @click="confirmDelete = false">Cancel</Button>
            <Button
              variant="destructive"
              @click="
                confirmDelete = false;
                emit('delete');
              "
            >
              Delete project
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
    </DialogPanel>
  </Dialog>
</template>