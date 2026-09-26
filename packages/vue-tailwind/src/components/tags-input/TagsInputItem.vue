<script setup lang="ts">
import { TagsInputItem as ArkTagsInputItem } from '@ark-ui/vue/tags-input';
import type { TagsInputItemProps } from '@ark-ui/vue/tags-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputItemProps {
  class?: HTMLAttributes['class'];
  index: TagsInputItemProps['index'];
  value: TagsInputItemProps['value'];
}

const { class: className, index, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTagsInputItem
    v-bind="attrs"
    :class="cn('contents', className)"
    :index="index"
    :value="value"
    data-slot="tags-input-item"
  >
    <slot />
  </ArkTagsInputItem>
</template>