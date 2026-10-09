<script setup lang="ts">
import { ColorPickerAreaBackground as ArkColorPickerAreaBackground } from '@ark-ui/vue/color-picker';
import type { ColorPickerAreaBackgroundProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerAreaBackgroundProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerAreaBackground
    v-bind="attrs"
    :class="cn('size-full rounded-[inherit]', className)"
    data-slot="color-picker-area-background"
  />
</template>