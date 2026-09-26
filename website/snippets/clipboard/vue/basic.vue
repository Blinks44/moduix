<script setup lang="ts">
import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardTrigger,
} from '@moduix/vue/clipboard';
import styles from '@/components/examples/clipboard/component-basic.module.css';
</script>

<template>
  <Clipboard :class="styles.root" default-value="https://moduix.dev/docs/clipboard">
    <ClipboardLabel>Copy this link</ClipboardLabel>
    <ClipboardControl>
      <ClipboardInput readonly />
      <ClipboardTrigger>
        <ClipboardIndicator />
      </ClipboardTrigger>
    </ClipboardControl>
  </Clipboard>
</template>