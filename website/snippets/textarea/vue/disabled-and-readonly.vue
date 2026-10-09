<script setup lang="ts">
import { Textarea } from '@moduix/vue/textarea';
import styles from '@/components/examples/textarea/textarea-disabled-and-readonly.module.css';
</script>

<template>
  <div :class="styles.root">
    <Textarea aria-label="Disabled textarea" disabled placeholder="Disabled textarea" />
    <Textarea aria-label="Read-only textarea" read-only value="Read-only text value" />
  </div>
</template>