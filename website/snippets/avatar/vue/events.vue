<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@moduix/vue/avatar';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';
const status = ref('idle');
</script>

<template>
  <Stack align="center" gap="3">
    <Avatar @status-change="status = $event.status">
      <AvatarFallback>AT</AvatarFallback>
      <AvatarImage :src="avatarImage" alt="Alex T." />
    </Avatar>
    <output>Status: {{ status }}</output>
  </Stack>
</template>