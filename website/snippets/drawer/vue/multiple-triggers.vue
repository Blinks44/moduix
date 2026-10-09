<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Card, CardBody } from '@moduix/vue/card';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '@moduix/vue/drawer';
import { ref } from 'vue';
import styles from '@/components/examples/drawer/drawer-multiple-triggers.module.css';

const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com' },
];
const activeUser = ref<(typeof users)[number] | null>(null);
</script>

<template>
  <Drawer
    swipe-direction="end"
    @trigger-value-change="activeUser = users.find((user) => user.id === $event.value) ?? null"
    ><div :class="styles.triggers">
      <DrawerTrigger v-for="user in users" :key="user.id" :value="user.id" as-child
        ><Button variant="outline">Edit {{ user.name }}</Button></DrawerTrigger
      >
    </div>
    <DrawerBackdrop /><DrawerPositioner
      ><DrawerContent
        ><DrawerHeader
          ><DrawerTitle>Edit user</DrawerTitle><DrawerCloseIcon /><DrawerDescription>{{
            activeUser?.email
          }}</DrawerDescription></DrawerHeader
        ><DrawerBody v-if="activeUser" :class="styles.body"
          ><Card size="sm" :class="styles.card"
            ><CardBody>Selected: {{ activeUser.name }}</CardBody></Card
          ></DrawerBody
        ></DrawerContent
      ></DrawerPositioner
    ></Drawer
  >
</template>