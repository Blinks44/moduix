<script setup lang="ts">
import { SegmentGroupRootProvider as ArkSegmentGroupRootProvider } from '@ark-ui/vue/segment-group';
import type { SegmentGroupRootProviderProps } from '@ark-ui/vue/segment-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SegmentGroupRootProviderProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
  value: SegmentGroupRootProviderProps['value'];
}

const { asChild = undefined, class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'group/segment-group relative isolate box-border inline-flex max-w-full items-stretch gap-1 rounded-lg border border-border bg-muted p-1 text-foreground data-disabled:opacity-50 data-invalid:border-destructive data-[orientation=vertical]:flex-col';
</script>

<template>
  <ArkSegmentGroupRootProvider
    v-bind="attrs"
    :as-child="asChild"
    :class="cn(rootClass, className)"
    :value="value"
    data-slot="segment-group-root-provider"
  >
    <slot />
  </ArkSegmentGroupRootProvider>
</template>