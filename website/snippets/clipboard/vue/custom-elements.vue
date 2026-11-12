<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardTrigger,
} from '@moduix/vue/clipboard';
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/clipboard/component-custom-elements.module.css';
</script>

<template>
  <Clipboard :class="styles.root" default-value="https://moduix.dev/docs/clipboard">
    <ClipboardLabel>Reuse moduix Input and Button</ClipboardLabel>
    <ClipboardControl>
      <ClipboardInput as-child>
        <Input read-only />
      </ClipboardInput>
      <ClipboardTrigger as-child>
        <Button variant="outline">
          <ClipboardIndicator />
        </Button>
      </ClipboardTrigger>
    </ClipboardControl>
  </Clipboard>
</template>