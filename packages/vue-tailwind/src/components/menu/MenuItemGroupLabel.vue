<script setup lang="ts">
import { MenuItemGroupLabel as ArkMenuItemGroupLabel } from '@ark-ui/vue/menu';
import type { MenuItemGroupLabelProps } from '@ark-ui/vue/menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuItemGroupLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuItemGroupLabel
    v-bind="attrs"
    :class="
      cn(
        'cursor-default px-2.5 py-1 text-xs font-normal text-muted-foreground select-none',
        className,
      )
    "
    data-slot="menu-item-group-label"
  >
    <slot />
  </ArkMenuItemGroupLabel>
</template>