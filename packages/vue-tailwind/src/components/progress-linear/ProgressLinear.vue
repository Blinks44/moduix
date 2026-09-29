<script setup lang="ts">
import { ProgressRoot as ArkProgressRoot } from '@ark-ui/vue/progress';
import type { ProgressRootEmits, ProgressRootProps } from '@ark-ui/vue/progress';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ ProgressRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressRoot
    v-bind="attrs"
    :class="
      cn(
        'box-border grid w-48 max-w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-2 text-foreground data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)]',
        className,
      )
    "
    data-slot="progress-linear-root"
  >
    <slot />
  </ArkProgressRoot>
</template>