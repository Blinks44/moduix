<script setup lang="ts">
import { DrawerTitle as ArkDrawerTitle } from '@ark-ui/vue/drawer';
import type { DrawerTitleProps } from '@ark-ui/vue/drawer';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerTitleProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDrawerTitle
    v-bind="attrs"
    :class="cn('text-lg font-semibold text-popover-foreground', className)"
    data-slot="drawer-title"
  >
    <slot />
  </ArkDrawerTitle>
</template>