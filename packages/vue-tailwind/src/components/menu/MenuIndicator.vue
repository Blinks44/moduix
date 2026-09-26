<script setup lang="ts">
import { MenuIndicator as ArkMenuIndicator } from '@ark-ui/vue/menu';
import type { MenuIndicatorProps } from '@ark-ui/vue/menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuIndicator
    v-bind="attrs"
    :class="
      cn('inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-full', className)
    "
    data-slot="menu-indicator"
  >
    <slot><ChevronDownIcon /></slot>
  </ArkMenuIndicator>
</template>