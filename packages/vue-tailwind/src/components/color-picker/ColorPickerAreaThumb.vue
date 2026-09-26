<script setup lang="ts">
import { ColorPickerAreaThumb as ArkColorPickerAreaThumb } from '@ark-ui/vue/color-picker';
import type { ColorPickerAreaThumbProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerAreaThumbProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerAreaThumb
    v-bind="attrs"
    :class="
      cn(
        'box-border size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-[0_0_0_4px_rgb(0_0_0_/_18%),0_2px_4px_0_rgb(0_0_0_/_10%),0_1px_2px_-1px_rgb(0_0_0_/_10%)] ring-2 ring-background outline-0 focus-visible:ring-ring data-disabled:pointer-events-none',
        className,
      )
    "
    data-slot="color-picker-area-thumb"
  />
</template>