<script setup lang="ts">
import { CheckboxIndicator as ArkCheckboxIndicator } from '@ark-ui/vue/checkbox';
import type { CheckboxIndicatorProps } from '@ark-ui/vue/checkbox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CheckboxIndicatorProps {
  class?: HTMLAttributes['class'];
  indeterminate?: CheckboxIndicatorProps['indeterminate'];
}

const { class: className, indeterminate = undefined } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCheckboxIndicator
    v-bind="attrs"
    :class="
      cn(
        'inline-flex size-3 group-data-[size=lg]/checkbox:size-3.5 group-data-[size=sm]/checkbox:size-2.5 group-data-[size=xl]/checkbox:size-4 group-data-[size=xs]/checkbox:size-2 [&>svg]:size-full',
        className,
      )
    "
    :indeterminate="indeterminate"
    data-slot="checkbox-indicator"
  >
    <slot>
      <IndeterminateIcon v-if="indeterminate" />
      <CheckIcon v-else />
    </slot>
  </ArkCheckboxIndicator>
</template>