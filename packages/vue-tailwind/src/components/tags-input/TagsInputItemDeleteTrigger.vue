<script setup lang="ts">
import { TagsInputItemDeleteTrigger as ArkTagsInputItemDeleteTrigger } from '@ark-ui/vue/tags-input';
import type { TagsInputItemDeleteTriggerProps } from '@ark-ui/vue/tags-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CloseIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputItemDeleteTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const deleteTriggerClass =
  'inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-inherit outline-0 transition-[background-color,color,opacity,box-shadow] duration-200 ease-in-out group-data-readonly:hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none [&>svg]:pointer-events-none [&>svg]:size-2.5 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-current/12';
</script>

<template>
  <ArkTagsInputItemDeleteTrigger
    v-bind="attrs"
    :class="cn(deleteTriggerClass, className)"
    data-slot="tags-input-item-delete-trigger"
  >
    <slot><CloseIcon /></slot>
  </ArkTagsInputItemDeleteTrigger>
</template>