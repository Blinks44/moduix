<script setup lang="ts">
import { TagsInputControl as ArkTagsInputControl } from '@ark-ui/vue/tags-input';
import type { TagsInputControlProps } from '@ark-ui/vue/tags-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TagsInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTagsInputControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    data-slot="tags-input-control"
  >
    <slot />
  </ArkTagsInputControl>
</template>