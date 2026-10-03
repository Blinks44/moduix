<script setup lang="ts">
import { TagsInputRootProvider as ArkTagsInputRootProvider } from '@ark-ui/vue/tags-input';
import type { TagsInputRootProviderProps } from '@ark-ui/vue/tags-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { tagsInputRootVariants } from './TagsInput.variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputRootProviderProps {
  class?: HTMLAttributes['class'];
  value: TagsInputRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTagsInputRootProvider
    v-bind="attrs"
    :class="cn(tagsInputRootVariants(), className)"
    :value="value"
    data-slot="tags-input-root-provider"
  >
    <slot />
  </ArkTagsInputRootProvider>
</template>