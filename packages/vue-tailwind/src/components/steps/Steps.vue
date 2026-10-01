<script setup lang="ts">
import { StepsRoot as ArkStepsRoot } from '@ark-ui/vue/steps';
import type { StepChangeDetails, StepsRootProps } from '@ark-ui/vue/steps';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits {
  stepChange: [details: StepChangeDetails];
  stepComplete: [];
  stepInvalid: [details: { step: number; action: 'next' | 'set'; targetStep?: number }];
  'update:step': [step: number];
}

const { class: className } = defineProps<Props>();
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'box-border flex w-full max-w-[52rem] min-w-0 text-foreground data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:gap-4 data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-stretch data-[orientation=vertical]:gap-6 max-[40rem]:data-[orientation=vertical]:flex-col max-[40rem]:data-[orientation=vertical]:gap-4';
</script>

<template>
  <ArkStepsRoot
    v-bind="attrs"
    :class="cn(rootClass, className)"
    data-slot="steps-root"
    @step-change="emit('stepChange', $event)"
    @step-complete="emit('stepComplete')"
    @step-invalid="emit('stepInvalid', $event)"
    @update:step="emit('update:step', $event)"
  >
    <slot />
  </ArkStepsRoot>
</template>