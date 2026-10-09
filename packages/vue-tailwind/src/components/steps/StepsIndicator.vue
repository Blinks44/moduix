<script setup lang="ts">
import { StepsIndicator as ArkStepsIndicator, useStepsItemContext } from '@ark-ui/vue/steps';
import type { StepsIndicatorProps } from '@ark-ui/vue/steps';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const item = useStepsItemContext();
const slots = defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsIndicator
    v-bind="attrs"
    :class="
      cn(
        'box-border inline-flex size-8 flex-none items-center justify-center rounded-full border border-border bg-background text-sm leading-none font-semibold text-muted-foreground transition-[background-color,border-color,color,opacity] duration-200 ease-in-out data-complete:border-foreground data-complete:bg-foreground data-complete:text-background data-current:border-foreground data-current:bg-background data-current:text-foreground motion-reduce:transition-none [&_svg]:size-3.5 [@media(hover:hover)]:group-hover/steps-trigger:data-incomplete:border-foreground [@media(hover:hover)]:group-hover/steps-trigger:data-incomplete:text-foreground',
        className,
      )
    "
    data-slot="steps-indicator"
  >
    <template v-if="slots.default"><slot /></template>
    <template v-else>
      <CheckIcon v-if="item.completed" />
      <template v-else>{{ item.index + 1 }}</template>
    </template>
  </ArkStepsIndicator>
</template>