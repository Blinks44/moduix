<script setup lang="ts">
import { Avatar, AvatarFallback } from '@moduix/vue/avatar';
import styles from '@/components/examples/avatar/avatar-custom-fallback.module.css';
</script>

<template>
  <Avatar size="lg" :class="styles.root">
    <AvatarFallback role="img" aria-label="Workstation account">
      <svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        :class="styles.glyph"
      >
        <path d="M12 17v4" />
        <path d="M8 21h8" />
        <rect x="2" y="3" width="20" height="14" rx="2" />
      </svg>
    </AvatarFallback>
  </Avatar>
</template>