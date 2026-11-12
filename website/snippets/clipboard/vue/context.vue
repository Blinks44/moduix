<script setup lang="ts">
import {
  Clipboard,
  ClipboardContext,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardTrigger,
  ClipboardValueText,
} from '@moduix/vue/clipboard';
import { Stack } from '@moduix/vue/stack';
import styles from '@/components/examples/clipboard/component-context.module.css';
</script>

<template>
  <Clipboard :class="styles.root" default-value="https://moduix.dev/docs/clipboard">
    <ClipboardControl>
      <ClipboardValueText />
      <ClipboardTrigger>
        <ClipboardIndicator />
      </ClipboardTrigger>
    </ClipboardControl>
    <ClipboardContext v-slot="clipboard">
      <Stack align="center" gap="2">
        <div data-preview-meta>
          <output>Copied: {{ String(clipboard.copied) }}</output>
        </div>
      </Stack>
    </ClipboardContext>
  </Clipboard>
</template>