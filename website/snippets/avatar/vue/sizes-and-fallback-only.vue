<script setup lang="ts">
import { Avatar, AvatarFallback } from '@moduix/vue/avatar';
import styles from '@/components/examples/avatar/avatar-sizes-and-fallback-only.module.css';

const avatarSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<template>
  <div :class="styles.root">
    <Avatar v-for="size in avatarSizes" :key="size" :size="size">
      <AvatarFallback>{{ size.toUpperCase() }}</AvatarFallback>
    </Avatar>
  </div>
</template>