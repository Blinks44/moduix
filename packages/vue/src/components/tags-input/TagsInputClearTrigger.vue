<script setup lang="ts">
import { TagsInputClearTrigger as ArkTagsInputClearTrigger } from '@ark-ui/vue/tags-input';
import type { TagsInputClearTriggerProps } from '@ark-ui/vue/tags-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import CloseButton from '../close-button/CloseButton.vue';
import styles from './TagsInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputClearTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<!-- Ark merges its label, anatomy, and state props onto the CloseButton host. -->
<template>
  <ArkTagsInputClearTrigger
    v-bind="attrs"
    as-child
    :class="clsx(styles.clearTrigger, className)"
    data-slot="tags-input-clear-trigger"
  >
    <slot v-if="asChild" />
    <CloseButton v-else><slot /></CloseButton>
  </ArkTagsInputClearTrigger>
</template>