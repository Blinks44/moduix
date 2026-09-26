<script setup lang="ts">
import { TagsInputLabel as ArkTagsInputLabel } from '@ark-ui/vue/tags-input';
import type { TagsInputLabelProps } from '@ark-ui/vue/tags-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TagsInput.module.css';

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
    :class="clsx(styles.label, className)"
    data-slot="tags-input-label"
  >
    <slot />
  </ArkTagsInputLabel>
</template>