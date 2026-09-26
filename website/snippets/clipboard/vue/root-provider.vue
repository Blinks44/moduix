<script setup lang="ts">
import {
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRootProvider,
  ClipboardTrigger,
  useClipboard,
} from '@moduix/vue/clipboard';
import styles from '@/components/examples/clipboard/component-root-provider.module.css';

const clipboard = useClipboard({ defaultValue: 'https://moduix.dev/docs/clipboard' });
</script>

<template>
  <div :class="styles.stack">
    <ClipboardRootProvider :value="clipboard">
      <ClipboardLabel>Provider-driven clipboard</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput readonly />
        <ClipboardTrigger>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </ClipboardRootProvider>
    <output>Copied: {{ String(clipboard.copied) }}</output>
  </div>
</template>