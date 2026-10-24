<script setup lang="ts">
import { StepsRootProvider as ArkStepsRootProvider } from '@ark-ui/vue/steps';
import type { StepsRootProviderProps } from '@ark-ui/vue/steps';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsRootProviderProps {
  class?: HTMLAttributes['class'];
  value: StepsRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'flex w-full min-w-0 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:gap-4 data-[orientation=vertical]:gap-6 max-[40rem]:data-[orientation=vertical]:flex-col max-[40rem]:data-[orientation=vertical]:gap-4';
</script>

<template>
  <ArkStepsRootProvider
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :value="value"
    data-slot="steps-root-provider"
  >
    <slot />
  </ArkStepsRootProvider>
</template>