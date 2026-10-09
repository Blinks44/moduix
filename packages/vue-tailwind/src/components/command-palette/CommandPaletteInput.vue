<script setup lang="ts">
import { ComboboxInput as ArkComboboxInput } from '@ark-ui/vue/combobox';
import type { ComboboxInputProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ ComboboxInputProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkComboboxInput
    v-bind="attrs"
    :class="
      cn(
        'h-auto w-full min-w-0 flex-1 bg-transparent text-sm leading-5 text-inherit outline-0 placeholder:text-muted-foreground data-invalid:text-destructive',
        props.class,
      )
    "
    data-slot="command-palette-input"
  >
    <slot />
  </ArkComboboxInput>
</template>