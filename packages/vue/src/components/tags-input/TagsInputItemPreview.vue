<script setup lang="ts">
import { TagsInputItemPreview as ArkTagsInputItemPreview } from '@ark-ui/vue/tags-input';
import type { TagsInputItemPreviewProps } from '@ark-ui/vue/tags-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TagsInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputItemPreviewProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTagsInputItemPreview
    v-bind="attrs"
    :class="clsx(styles.itemPreview, className)"
    data-slot="tags-input-item-preview"
  >
    <slot />
  </ArkTagsInputItemPreview>
</template>