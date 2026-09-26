<script setup lang="ts">
import { TagsInputClearTrigger as ArkTagsInputClearTrigger } from '@ark-ui/vue/tags-input';
import type { TagsInputClearTriggerProps } from '@ark-ui/vue/tags-input';
import { useTagsInputContext } from '@ark-ui/vue/tags-input';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CloseIcon } from '@/lib/moduix/icons/ui/Icons';
import CloseButton from '../close-button/CloseButton.vue';
import styles from './TagsInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputClearTriggerProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { ariaLabel, ariaLabelledby, asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const tagsInput = useTagsInputContext();
const clearTriggerLabel = computed(() => tagsInput.value.getClearTriggerProps()['aria-label']);
</script>

<template>
  <ArkTagsInputClearTrigger
    v-if="asChild"
    v-bind="attrs"
    as-child
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    :class="clsx(styles.clearTrigger, className)"
    data-slot="tags-input-clear-trigger"
  >
    <slot />
  </ArkTagsInputClearTrigger>
  <ArkTagsInputClearTrigger
    v-else
    v-bind="attrs"
    as-child
    :class="clsx(styles.clearTrigger, className)"
    data-slot="tags-input-clear-trigger"
  >
    <CloseButton
      :aria-label="ariaLabel ?? clearTriggerLabel"
      :aria-labelledby="ariaLabelledby"
      data-part="clear-trigger"
      data-scope="tags-input"
      data-slot="tags-input-clear-trigger"
    >
      <slot><CloseIcon /></slot>
    </CloseButton>
  </ArkTagsInputClearTrigger>
</template>