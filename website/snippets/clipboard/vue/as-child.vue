<script setup lang="ts">
import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardTrigger,
} from '@moduix/vue/clipboard';
import styles from '@/components/examples/clipboard/component-advanced-customization.module.css';
</script>

<template>
  <Clipboard :class="styles.root" default-value="https://moduix.dev/docs/clipboard">
    <ClipboardLabel>Use native input and button elements</ClipboardLabel>
    <ClipboardControl>
      <ClipboardInput as-child>
        <input readonly />
      </ClipboardInput>
      <ClipboardTrigger as-child>
        <button type="button">
          <ClipboardIndicator />
        </button>
      </ClipboardTrigger>
    </ClipboardControl>
  </Clipboard>
</template>