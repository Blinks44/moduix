<script setup lang="ts">
import { TagsInputItemText as ArkTagsInputItemText } from '@ark-ui/vue/tags-input';
import type { TagsInputItemTextProps } from '@ark-ui/vue/tags-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TagsInput.module.css';

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
    :class="clsx(styles.itemText, className)"
    data-slot="tags-input-item-text"
  >
    <slot />
  </ArkTagsInputItemText>
</template>