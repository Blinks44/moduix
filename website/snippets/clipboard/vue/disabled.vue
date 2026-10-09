<script setup lang="ts">
import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardTrigger,
} from '@moduix/vue/clipboard';
import styles from '@/components/examples/clipboard/component-disabled.module.css';
</script>

<template>
  <Clipboard :class="styles.root" default-value="workspace-secret">
    <ClipboardLabel>Disabled clipboard</ClipboardLabel>
    <ClipboardControl>
      <ClipboardInput disabled />
      <ClipboardTrigger disabled>
        <ClipboardIndicator />
      </ClipboardTrigger>
    </ClipboardControl>
  </Clipboard>
</template>