<script setup lang="ts">
import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardTrigger,
} from '@moduix/vue/clipboard';
import styles from '@/components/examples/clipboard/component-timeout.module.css';
</script>

<template>
  <Clipboard :class="styles.root" default-value="workspace-secret" :timeout="5000">
    <ClipboardLabel>Five second copied state</ClipboardLabel>
    <ClipboardControl>
      <ClipboardInput readonly />
      <ClipboardTrigger>
        <ClipboardIndicator />
      </ClipboardTrigger>
    </ClipboardControl>
  </Clipboard>
</template>