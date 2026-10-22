<script setup lang="ts">
import { TagsInputClearTrigger as ArkTagsInputClearTrigger } from '@ark-ui/vue/tags-input';
import type { TagsInputClearTriggerProps } from '@ark-ui/vue/tags-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import CloseButton from '../close-button/CloseButton.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputClearTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const asChildClass = 'ms-auto data-readonly:hidden';
const closeButtonClass =
  'ms-auto size-control-xs focus-visible:outline-1 focus-visible:outline-offset-1 data-readonly:hidden [:is([data-slot=tags-input-root],[data-slot=tags-input-root-provider])[data-disabled]_&]:opacity-100';
</script>

<!-- Ark merges its label, anatomy, and state props onto the CloseButton host. -->
<template>
  <ArkTagsInputClearTrigger
    v-bind="attrs"
    as-child
    :class="cn(asChild ? asChildClass : closeButtonClass, className)"
    data-slot="tags-input-clear-trigger"
  >
    <slot v-if="asChild" />
    <CloseButton v-else><slot /></CloseButton>
  </ArkTagsInputClearTrigger>
</template>