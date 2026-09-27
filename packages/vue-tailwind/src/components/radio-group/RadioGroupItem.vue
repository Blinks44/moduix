<script setup lang="ts">
import { RadioGroupItem as ArkRadioGroupItem } from '@ark-ui/vue/radio-group';
import type { RadioGroupItemProps } from '@ark-ui/vue/radio-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RadioGroupItemProps {
  class?: HTMLAttributes['class'];
  value: RadioGroupItemProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkRadioGroupItem
    v-bind="attrs"
    :class="
      cn(
        'inline-flex w-fit cursor-pointer items-center gap-2 align-middle data-disabled:cursor-default data-disabled:opacity-50 data-readonly:cursor-default',
        className,
      )
    "
    :value="value"
    data-slot="radio-group-item"
  >
    <slot />
  </ArkRadioGroupItem>
</template>