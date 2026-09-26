<script setup lang="ts">
import { TagsInputRootProvider as ArkTagsInputRootProvider } from '@ark-ui/vue/tags-input';
import type { TagsInputRootProviderProps } from '@ark-ui/vue/tags-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TagsInput.module.css';

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
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="tags-input-root-provider"
  >
    <slot />
  </ArkTagsInputRootProvider>
</template>