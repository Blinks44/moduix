<script setup lang="ts">
import { MenuTriggerItem as ArkMenuTriggerItem } from '@ark-ui/vue/menu';
import type { MenuTriggerItemProps } from '@ark-ui/vue/menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { menuItemStyles } from './Menu.variants';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuTriggerItemProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuTriggerItem
    v-bind="attrs"
    :class="cn(menuItemStyles({ layout: 'triggerItem' }), className)"
    data-slot="menu-trigger-item"
  >
    <slot />
  </ArkMenuTriggerItem>
</template>