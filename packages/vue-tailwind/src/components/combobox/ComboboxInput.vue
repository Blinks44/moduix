<script setup lang="ts">
import { ComboboxInput as ArkComboboxInput } from '@ark-ui/vue/combobox';
import type { ComboboxInputProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxInputProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkComboboxInput
    v-bind="attrs"
    :as-child="props.asChild"
    :class="
      cn(
        !props.asChild &&
          'm-0 box-border h-control-md w-full min-w-0 rounded-[inherit] border-0 bg-transparent px-3.5 text-inherit outline-0 [font:inherit] group-has-[>[data-slot=combobox-clear-trigger]]/combobox-control:pe-[4.375rem] group-has-[>[data-slot=combobox-trigger]]/combobox-control:pe-11 group-has-[>[data-slot=combobox-clear-trigger]]/combobox-control:group-has-[>[data-slot=combobox-trigger]]/combobox-control:pe-[4.375rem] placeholder:text-muted-foreground',
        props.class,
      )
    "
    data-slot="combobox-input"
  >
    <slot />
  </ArkComboboxInput>
</template>