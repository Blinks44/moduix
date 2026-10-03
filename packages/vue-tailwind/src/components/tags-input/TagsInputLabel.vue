<script setup lang="ts">
import { TagsInputLabel as ArkTagsInputLabel } from '@ark-ui/vue/tags-input';
import type { TagsInputLabelProps } from '@ark-ui/vue/tags-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTagsInputLabel
    v-bind="attrs"
    :class="
      cn(
        'inline-flex items-center gap-1 text-sm leading-5 font-medium text-foreground data-disabled:opacity-50 [:is([data-slot=tags-input-root],[data-slot=tags-input-root-provider])[data-disabled]_&]:opacity-100',
        className,
      )
    "
    data-slot="tags-input-label"
  >
    <slot />
  </ArkTagsInputLabel>
</template>