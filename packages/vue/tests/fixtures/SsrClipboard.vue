<script setup lang="ts">
import {
  Clipboard,
  ClipboardLabel,
  ClipboardControl,
  ClipboardInput,
  ClipboardTrigger,
} from '../../src/components/clipboard';
</script>

<template>
  <Clipboard default-value="server-value"
    ><ClipboardLabel>Server value</ClipboardLabel
    ><ClipboardControl
      ><ClipboardInput as-child><input readonly /></ClipboardInput
      ><ClipboardTrigger as-child
        ><button type="button">Copy server value</button></ClipboardTrigger
      ></ClipboardControl
    ></Clipboard
  >
</template>