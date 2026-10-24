<script setup lang="ts">
import { StepsRoot as ArkStepsRoot } from '@ark-ui/vue/steps';
import type { Steps as ArkSteps, StepsRootProps } from '@ark-ui/vue/steps';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ ArkSteps.RootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'flex w-full min-w-0 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:gap-4 data-[orientation=vertical]:gap-6 max-[40rem]:data-[orientation=vertical]:flex-col max-[40rem]:data-[orientation=vertical]:gap-4';
</script>

<template>
  <ArkStepsRoot v-bind="attrs" :class="cn(rootClass, className)" data-slot="steps-root">
    <slot />
  </ArkStepsRoot>
</template>