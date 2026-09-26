<script setup lang="ts">
import { TagsInputInput as ArkTagsInputInput } from '@ark-ui/vue/tags-input';
import type { TagsInputInputProps } from '@ark-ui/vue/tags-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputInputProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTagsInputInput
    v-bind="attrs"
    :class="
      cn(
        'h-control-xs min-w-28 shrink grow basis-28 border-0 bg-transparent px-1 text-sm leading-5 text-inherit outline-0 placeholder:text-muted-foreground read-only:cursor-default data-readonly:hidden data-readonly:cursor-default',
        props.class,
      )
    "
    data-slot="tags-input-input"
  />
</template>