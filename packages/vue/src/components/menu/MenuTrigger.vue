<script setup lang="ts">
import { MenuTrigger as ArkMenuTrigger } from '@ark-ui/vue/menu';
import type { MenuTriggerProps } from '@ark-ui/vue/menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuTrigger v-bind="attrs" :as-child="asChild" :class="className" data-slot="menu-trigger">
    <slot />
  </ArkMenuTrigger>
</template>