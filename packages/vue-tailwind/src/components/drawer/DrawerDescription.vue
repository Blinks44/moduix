<script setup lang="ts">
import { DrawerDescription as ArkDrawerDescription } from '@ark-ui/vue/drawer';
import type { DrawerDescriptionProps } from '@ark-ui/vue/drawer';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerDescriptionProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDrawerDescription
    v-bind="attrs"
    :class="cn('text-md leading-6 text-muted-foreground', className)"
    data-slot="drawer-description"
  >
    <slot />
  </ArkDrawerDescription>
</template>