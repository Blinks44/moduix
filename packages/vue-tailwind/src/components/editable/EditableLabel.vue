<script setup lang="ts">
import { EditableLabel as ArkEditableLabel } from '@ark-ui/vue/editable';
import type { EditableLabelProps } from '@ark-ui/vue/editable';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditableLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkEditableLabel
    v-bind="attrs"
    :class="
      cn(
        'col-span-full inline-flex items-center gap-1 text-sm leading-5 font-medium text-foreground data-invalid:text-destructive',
        className,
      )
    "
    data-slot="editable-label"
  >
    <slot />
  </ArkEditableLabel>
</template>