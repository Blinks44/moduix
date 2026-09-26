<script setup lang="ts">
import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardTrigger,
} from '@moduix/vue/clipboard';
import styles from '@/components/examples/clipboard/component-custom-copy-text.module.css';
</script>

<template>
  <Clipboard :class="styles.root" default-value="workspace-secret">
    <ClipboardLabel>Override copy labels</ClipboardLabel>
    <ClipboardControl>
      <ClipboardInput readonly />
      <ClipboardTrigger>
        <ClipboardIndicator />
        <ClipboardIndicator>
          Copy secret
          <template #copied>Copied!</template>
        </ClipboardIndicator>
      </ClipboardTrigger>
    </ClipboardControl>
  </Clipboard>
</template>