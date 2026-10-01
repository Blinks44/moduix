<script setup lang="ts">
import { StepsItem as ArkStepsItem } from '@ark-ui/vue/steps';
import type { StepsItemProps } from '@ark-ui/vue/steps';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsItemProps {
  class?: HTMLAttributes['class'];
  index: StepsItemProps['index'];
}

const { class: className, index } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsItem
    v-bind="attrs"
    :class="
      cn(
        'group/steps-item relative flex min-w-0 flex-1 items-center gap-3 last:flex-none data-[orientation=vertical]:min-h-16 data-[orientation=vertical]:flex-none data-[orientation=vertical]:items-start max-[40rem]:data-[orientation=horizontal]:flex-none',
        className,
      )
    "
    :index="index"
    data-slot="steps-item"
  >
    <slot />
  </ArkStepsItem>
</template>