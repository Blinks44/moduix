<script setup lang="ts">
import { MenuArrow as ArkMenuArrow } from '@ark-ui/vue/menu';
import type { MenuArrowProps } from '@ark-ui/vue/menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import MenuArrowTip from './MenuArrowTip.vue';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuArrowProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuArrow
    v-bind="attrs"
    :class="cn('[--arrow-background:var(--color-popover)]', className)"
    data-slot="menu-arrow"
  >
    <slot><MenuArrowTip /></slot>
  </ArkMenuArrow>
</template>