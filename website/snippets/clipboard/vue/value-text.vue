<script setup lang="ts">
import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardTrigger,
  ClipboardValueText,
} from '@moduix/vue/clipboard';
import styles from '@/components/examples/clipboard/component-value-text.module.css';
</script>

<template>
  <Clipboard :class="styles.root" default-value="moduix/clipboard">
    <ClipboardControl>
      <ClipboardValueText />
      <ClipboardTrigger aria-label="Copy package name">
        <ClipboardIndicator />
      </ClipboardTrigger>
    </ClipboardControl>
  </Clipboard>
</template>