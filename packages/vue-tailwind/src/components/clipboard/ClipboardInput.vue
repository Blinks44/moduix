<script setup lang="ts">
import { ClipboardInput as ArkClipboardInput } from '@ark-ui/vue/clipboard';
import type { ClipboardInputProps } from '@ark-ui/vue/clipboard';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ClipboardInputProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const inputClass =
  'box-border min-h-control-md w-full min-w-0 rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50';
</script>

<template>
  <ArkClipboardInput
    v-bind="attrs"
    :class="cn(inputClass, props.class)"
    data-slot="clipboard-input"
  >
    <slot />
  </ArkClipboardInput>
</template>