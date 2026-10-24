<script setup lang="ts">
import { EditablePreview as ArkEditablePreview } from '@ark-ui/vue/editable';
import type { EditablePreviewProps } from '@ark-ui/vue/editable';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditablePreviewProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkEditablePreview
    v-bind="attrs"
    :class="
      cn(
        'w-full min-w-0 cursor-text bg-transparent wrap-anywhere whitespace-pre-wrap text-inherit outline-0 aria-readonly:cursor-default data-disabled:cursor-default data-placeholder-shown:text-muted-foreground',
        className,
      )
    "
    data-slot="editable-preview"
  >
    <slot />
  </ArkEditablePreview>
</template>