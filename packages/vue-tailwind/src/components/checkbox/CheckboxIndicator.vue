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
    :class="cn('inline-flex h-full w-full items-center justify-center text-inherit', className)"
    :indeterminate="indeterminate"
    data-slot="checkbox-indicator"
  >
    <slot>
      <span
        aria-hidden="true"
        class="inline-flex size-3 items-center justify-center leading-none text-inherit group-data-[size=lg]/checkbox:size-3.5 group-data-[size=sm]/checkbox:size-2.5 group-data-[size=xl]/checkbox:size-4 group-data-[size=xs]/checkbox:size-2 [&>svg]:size-full"
        :data-slot="
          indeterminate
            ? 'checkbox-indicator-indeterminate-icon'
            : 'checkbox-indicator-checked-icon'
        "
      >
        <IndeterminateIcon v-if="indeterminate" />
        <CheckIcon v-else />
      </span>
    </slot>
  </ArkCheckboxIndicator>
</template>