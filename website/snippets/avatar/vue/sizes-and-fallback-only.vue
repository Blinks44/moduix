<script setup lang="ts">
import { Avatar, AvatarFallback } from '@moduix/vue/avatar';
import { Stack } from '@moduix/vue/stack';

const avatarSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<template>
  <Stack direction="row" align="center" justify="center" wrap="nowrap" gap="3">
    <Avatar v-for="size in avatarSizes" :key="size" :size="size">
      <AvatarFallback>{{ size.toUpperCase() }}</AvatarFallback>
    </Avatar>
  </Stack>
</template>