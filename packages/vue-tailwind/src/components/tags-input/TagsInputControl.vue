<script setup lang="ts">
import { TagsInputControl as ArkTagsInputControl } from '@ark-ui/vue/tags-input';
import type { TagsInputControlProps } from '@ark-ui/vue/tags-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const controlClass =
  'group flex min-h-control-md w-full flex-wrap items-center gap-1 rounded-md border border-border bg-background px-2 py-[0.3125rem] text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,background-color,opacity] duration-200 ease-in-out data-disabled:pointer-events-none data-focus:outline-ring data-invalid:border-destructive data-invalid:data-focus:outline-destructive data-readonly:bg-background data-readonly:text-foreground motion-reduce:transition-none';
</script>

<template>
  <ArkTagsInputControl
    v-bind="attrs"
    :class="cn(controlClass, className)"
    data-slot="tags-input-control"
  >
    <slot />
  </ArkTagsInputControl>
</template>