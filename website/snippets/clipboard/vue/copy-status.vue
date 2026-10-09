<script setup lang="ts">
import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardTrigger,
  ClipboardValueText,
} from '@moduix/vue/clipboard';
import { ref } from 'vue';
import styles from '@/components/examples/clipboard/component-copy-status.module.css';

const copyCount = ref(0);

function handleStatusChange(details: { copied: boolean }) {
  if (details.copied) copyCount.value += 1;
}
</script>

<template>
  <div :class="styles.stack">
    <Clipboard
      :class="styles.root"
      default-value="maps-platform-token"
      @status-change="handleStatusChange"
    >
      <ClipboardControl>
        <ClipboardTrigger>
          <ClipboardIndicator />
          <ClipboardValueText />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
    <output>Copied {{ copyCount }} times</output>
  </div>
</template>