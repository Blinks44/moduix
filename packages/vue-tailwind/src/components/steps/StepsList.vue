<script setup lang="ts">
import { StepsList as ArkStepsList } from '@ark-ui/vue/steps';
import type { StepsListProps } from '@ark-ui/vue/steps';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsListProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsList
    v-bind="attrs"
    :class="
      cn(
        'flex w-full min-w-0 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:items-center data-[orientation=vertical]:w-fit data-[orientation=vertical]:flex-none data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:gap-4 max-[40rem]:data-[orientation=horizontal]:[scrollbar-width:thin] max-[40rem]:data-[orientation=horizontal]:overflow-x-auto',
        className,
      )
    "
    data-slot="steps-list"
  >
    <slot />
  </ArkStepsList>
</template>