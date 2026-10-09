<script setup lang="ts">
import { DateInputSegment as ArkDateInputSegment } from '@ark-ui/vue/date-input';
import type { DateInputSegmentProps } from '@ark-ui/vue/date-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DateInputSegmentProps {
  class?: HTMLAttributes['class'];
  segment: DateInputSegmentProps['segment'];
}

const { class: className, segment } = defineProps<Props>();

const attrs = useAttrs();
const segmentClass =
  'min-w-[2ch] cursor-text rounded-sm px-1 py-0 text-center leading-6 text-current outline-0 transition-colors duration-200 ease-in-out [font:inherit] focus-visible:bg-ring/18 focus-visible:text-foreground data-disabled:cursor-default data-placeholder-shown:text-muted-foreground data-readonly:cursor-default data-[type=literal]:pointer-events-none data-[type=literal]:min-w-auto data-[type=literal]:bg-transparent data-[type=literal]:px-0 data-[type=literal]:text-muted-foreground motion-reduce:transition-none';
</script>

<template>
  <ArkDateInputSegment
    v-bind="attrs"
    :class="cn(segmentClass, className)"
    :segment="segment"
    data-slot="date-input-segment"
  />
</template>