<script setup lang="ts">
import { MenuItemGroup as ArkMenuItemGroup } from '@ark-ui/vue/menu';
import type { MenuItemGroupProps } from '@ark-ui/vue/menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuItemGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuItemGroup v-bind="attrs" :class="cn('grid', className)" data-slot="menu-item-group">
    <slot />
  </ArkMenuItemGroup>
</template>