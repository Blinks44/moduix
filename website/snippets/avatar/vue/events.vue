<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@moduix/vue/avatar';
import { ref } from 'vue';
import styles from '@/components/examples/avatar/avatar-events.module.css';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';
const status = ref('idle');
</script>

<template>
  <div :class="styles.root">
    <Avatar @status-change="status = $event.status">
      <AvatarFallback>AT</AvatarFallback>
      <AvatarImage :src="avatarImage" alt="Alex T." />
    </Avatar>
    <output>Status: {{ status }}</output>
  </div>
</template>