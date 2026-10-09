<script setup lang="ts">
import { TagsInputItemText as ArkTagsInputItemText } from '@ark-ui/vue/tags-input';
import type { TagsInputItemTextProps } from '@ark-ui/vue/tags-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputItemTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTagsInputItemText
    v-bind="attrs"
    :class="cn('min-w-0 truncate', className)"
    data-slot="tags-input-item-text"
  >
    <slot />
  </ArkTagsInputItemText>
</template>