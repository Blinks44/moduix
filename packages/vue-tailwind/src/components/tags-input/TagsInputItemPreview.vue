<script setup lang="ts">
import { TagsInputItemPreview as ArkTagsInputItemPreview } from '@ark-ui/vue/tags-input';
import type { TagsInputItemPreviewProps } from '@ark-ui/vue/tags-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputItemPreviewProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const itemPreviewClass =
  'inline-flex min-h-control-xs max-w-full min-w-0 items-center gap-1 rounded-full border border-transparent bg-secondary px-2 py-0.5 text-xs leading-4 font-medium text-secondary-foreground transition-[border-color,background-color,color,box-shadow] duration-200 ease-in-out data-disabled:opacity-50 data-highlighted:ring-1 data-highlighted:ring-ring motion-reduce:transition-none';
</script>

<template>
  <ArkTagsInputItemPreview
    v-bind="attrs"
    :class="cn(itemPreviewClass, className)"
    data-slot="tags-input-item-preview"
  >
    <slot />
  </ArkTagsInputItemPreview>
</template>