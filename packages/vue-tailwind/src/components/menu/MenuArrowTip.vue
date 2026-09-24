<script setup lang="ts">
import { MenuArrowTip as ArkMenuArrowTip } from '@ark-ui/vue/menu';
import type { MenuArrowTipProps } from '@ark-ui/vue/menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuArrowTipProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuArrowTip
    v-bind="attrs"
    :class="
      cn(
        '[border-block-start:1px_solid_var(--color-border)] [border-inline-start:1px_solid_var(--color-border)]',
        className,
      )
    "
    data-slot="menu-arrow-tip"
  />
</template>