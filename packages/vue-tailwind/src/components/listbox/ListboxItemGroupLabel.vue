<script setup lang="ts">
import { ListboxItemGroupLabel as ArkListboxItemGroupLabel } from '@ark-ui/vue/listbox';
import type { ListboxItemGroupLabelProps } from '@ark-ui/vue/listbox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ListboxItemGroupLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkListboxItemGroupLabel
    v-bind="attrs"
    :class="
      cn('px-2 py-1 text-xs leading-4 font-normal text-muted-foreground select-none', className)
    "
    data-slot="listbox-item-group-label"
  >
    <slot />
  </ArkListboxItemGroupLabel>
</template>