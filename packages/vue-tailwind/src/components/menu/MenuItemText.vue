<script setup lang="ts">
import { MenuItemText as ArkMenuItemText } from '@ark-ui/vue/menu';
import type { MenuItemTextProps } from '@ark-ui/vue/menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuItemTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuItemText
    v-bind="attrs"
    :class="cn('min-w-0 overflow-hidden', className)"
    data-slot="menu-item-text"
  >
    <slot />
  </ArkMenuItemText>
</template>