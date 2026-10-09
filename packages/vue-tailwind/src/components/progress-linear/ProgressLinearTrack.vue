<script setup lang="ts">
import { ProgressTrack as ArkProgressTrack } from '@ark-ui/vue/progress';
import type { ProgressTrackProps } from '@ark-ui/vue/progress';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressTrackProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressTrack
    v-bind="attrs"
    :class="
      cn(
        'col-span-full box-border block h-2 w-full overflow-hidden rounded-full bg-muted ring-1 ring-border ring-inset data-[orientation=vertical]:flex data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2 data-[orientation=vertical]:items-end data-[orientation=vertical]:justify-self-center',
        className,
      )
    "
    data-slot="progress-linear-track"
  >
    <slot />
  </ArkProgressTrack>
</template>