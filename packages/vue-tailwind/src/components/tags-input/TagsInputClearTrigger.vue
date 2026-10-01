<script setup lang="ts">
import { TagsInputClearTrigger as ArkTagsInputClearTrigger } from '@ark-ui/vue/tags-input';
import type { TagsInputClearTriggerProps } from '@ark-ui/vue/tags-input';
import { useTagsInputContext } from '@ark-ui/vue/tags-input';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import CloseButton from '../close-button/CloseButton.vue';

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
const triggerClass = 'ms-auto shrink-0 self-center data-readonly:hidden';
const defaultTriggerClass = `ms-auto size-control-xs shrink-0 self-center focus-visible:outline-1 focus-visible:outline-offset-1 data-readonly:hidden motion-reduce:transition-none [&>svg:not([class*='size-'])]:size-4`;
</script>

<template>
  <ArkTagsInputClearTrigger
    v-if="asChild"
    v-bind="attrs"
    as-child
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    :class="cn(triggerClass, className)"
    data-slot="tags-input-clear-trigger"
  >
    <slot />
  </ArkTagsInputClearTrigger>
  <ArkTagsInputClearTrigger
    v-else
    v-bind="attrs"
    as-child
    :class="cn(defaultTriggerClass, className)"
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