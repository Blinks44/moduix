<script setup lang="ts">
import { DrawerTrigger as ArkDrawerTrigger } from '@ark-ui/vue/drawer';
import type { DrawerTriggerProps } from '@ark-ui/vue/drawer';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ DrawerTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDrawerTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="className"
    data-slot="drawer-trigger"
  >
    <slot />
  </ArkDrawerTrigger>
</template>