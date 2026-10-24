<script setup lang="ts">
import { ColorPickerFormatSelect as ArkColorPickerFormatSelect } from '@ark-ui/vue/color-picker';
import type { ColorPickerFormatSelectProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerFormatSelectProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <span class="relative inline-grid w-fit max-w-full min-w-0 shrink-0">
    <ArkColorPickerFormatSelect
      v-bind="attrs"
      :class="
        cn(
          'peer/format-select h-control-md w-auto min-w-0 cursor-pointer appearance-none rounded-md border border-border bg-background px-3 pe-8 text-sm text-foreground uppercase outline-focus-inset outline-offset-focus-inset outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out focus:border-ring focus:outline-ring disabled:cursor-default data-invalid:border-destructive data-invalid:outline-destructive forced-colors:appearance-auto forced-colors:pe-3',
          className,
        )
      "
      data-slot="color-picker-format-select"
    />
    <span
      aria-hidden="true"
      class="pointer-events-none absolute end-3 top-1/2 inline-flex size-4 -translate-y-1/2 rounded-sm text-muted-foreground transition-[background-color,color] duration-normal ease-in-out forced-colors:hidden [&>svg]:size-full [@media(hover:hover)]:peer-[:not(:disabled):hover]/format-select:bg-muted [@media(hover:hover)]:peer-[:not(:disabled):hover]/format-select:text-foreground"
    >
      <ChevronDownIcon />
    </span>
  </span>
</template>