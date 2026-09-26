<script setup lang="ts">
import { TagsInputRoot as ArkTagsInputRoot } from '@ark-ui/vue/tags-input';
import type { TagsInputRootEmits, TagsInputRootProps } from '@ark-ui/vue/tags-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ TagsInputRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass = 'flex w-full max-w-96 flex-col gap-1 text-foreground data-disabled:opacity-50';
</script>

<template>
  <ArkTagsInputRoot v-bind="attrs" :class="cn(rootClass, className)" data-slot="tags-input-root">
    <slot />
  </ArkTagsInputRoot>
</template>