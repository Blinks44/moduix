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
  DialogTrigger,
} from '@moduix/vue/dialog';
import { ref } from 'vue';

const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com' },
];
const activeUser = ref<(typeof users)[number]>();

const handleTriggerValueChange = (details: { value: string | null }) => {
  activeUser.value = users.find((user) => user.id === details.value);
};
</script>

<template>
  <Dialog @trigger-value-change="handleTriggerValueChange">
    <DialogTrigger v-for="user in users" :key="user.id" :value="user.id" as-child>
      <Button variant="outline">Edit {{ user.name }}</Button>
    </DialogTrigger>
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Edit user</DialogTitle>
        <DialogDescription>{{ activeUser?.email }}</DialogDescription>
        <DialogCloseIcon />
      </DialogContent>
    </DialogPositioner>
  </Dialog>
</template>