<script setup lang="ts">
import { TagsInputRoot as ArkTagsInputRoot } from '@ark-ui/vue/tags-input';
import type { TagsInputRootEmits, TagsInputRootProps } from '@ark-ui/vue/tags-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { tagsInputRootVariants } from './TagsInput.variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ TagsInputRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTagsInputRoot
    v-bind="attrs"
    :class="cn(tagsInputRootVariants(), className)"
    data-slot="tags-input-root"
  >
    <slot />
  </ArkTagsInputRoot>
</template>