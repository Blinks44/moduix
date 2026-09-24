<script setup lang="ts">
import { MenuItemIndicator as ArkMenuItemIndicator } from '@ark-ui/vue/menu';
import type { MenuItemIndicatorProps } from '@ark-ui/vue/menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuItemIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuItemIndicator
    v-bind="attrs"
    :class="
      cn('inline-flex size-3 items-center justify-center rounded-xs [&_svg]:size-full', className)
    "
    data-slot="menu-item-indicator"
  >
    <slot><CheckIcon /></slot>
  </ArkMenuItemIndicator>
</template>