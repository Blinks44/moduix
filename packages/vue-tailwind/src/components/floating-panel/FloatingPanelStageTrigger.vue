<script setup lang="ts">
import { FloatingPanelStageTrigger as ArkFloatingPanelStageTrigger } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelStageTriggerProps } from '@ark-ui/vue/floating-panel';
import { useAttrs, useSlots } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { MaximizeIcon, MinusIcon, RestoreIcon } from '@/lib/moduix/icons/ui/Icons';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelStageTriggerProps {
  asChild?: FloatingPanelStageTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
  stage: FloatingPanelStageTriggerProps['stage'];
}

const { asChild = false, class: className, stage } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const slots = useSlots();
const stageClass =
  'box-border inline-flex size-control-sm cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-0 transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none [font:inherit] focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none [&>svg]:size-4 [@media(hover:hover)]:hover:bg-accent';
</script>

<template>
  <ArkFloatingPanelStageTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="cn(!asChild && stageClass, className)"
    :stage="stage"
    data-slot="floating-panel-stage-trigger"
  >
    <slot />
    <MinusIcon v-if="!slots.default && !asChild && stage === 'minimized'" />
    <MaximizeIcon v-if="!slots.default && !asChild && stage === 'maximized'" />
    <RestoreIcon v-if="!slots.default && !asChild && stage === 'default'" />
  </ArkFloatingPanelStageTrigger>
</template>