<script setup lang="ts">
import { InputGroup, InputGroupAddon, InputGroupInput } from '@moduix/vue/input-group';
import styles from '@/components/examples/input-group/input-group-sizes.module.css';

const inputGroupSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<template>
  <div :class="styles.stack">
    <InputGroup v-for="size in inputGroupSizes" :key="size" :size="size">
      <InputGroupAddon>@</InputGroupAddon>
      <InputGroupInput :aria-label="`${size} workspace`" />
    </InputGroup>
  </div>
</template>