<script setup lang="ts">
import { TagsInputItemDeleteTrigger as ArkTagsInputItemDeleteTrigger } from '@ark-ui/vue/tags-input';
import type { TagsInputItemDeleteTriggerProps } from '@ark-ui/vue/tags-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CloseIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './TagsInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputItemDeleteTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTagsInputItemDeleteTrigger
    v-bind="attrs"
    :class="clsx(styles.itemDeleteTrigger, className)"
    data-slot="tags-input-item-delete-trigger"
  >
    <slot><CloseIcon /></slot>
  </ArkTagsInputItemDeleteTrigger>
</template>