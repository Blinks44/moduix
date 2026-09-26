<script setup lang="ts">
import { TagsInputItem as ArkTagsInputItem } from '@ark-ui/vue/tags-input';
import type { TagsInputItemProps } from '@ark-ui/vue/tags-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TagsInput.module.css';

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
    :class="clsx(styles.item, className)"
    :index="index"
    :value="value"
    data-slot="tags-input-item"
  >
    <slot />
  </ArkTagsInputItem>
</template>