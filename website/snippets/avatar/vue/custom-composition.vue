<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@moduix/vue/avatar';
import styles from '@/components/examples/avatar/avatar-custom-composition.module.css';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';
</script>

<template>
  <Avatar as-child size="xl" :class="styles.root">
    <a href="mailto:alex@example.com" aria-label="Email Alex T.">
      <AvatarFallback :class="styles.fallback">AT</AvatarFallback>
      <AvatarImage :class="styles.image" :src="avatarImage" alt="" />
    </a>
  </Avatar>
</template>