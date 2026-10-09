<script setup lang="ts">
import { ToggleGroupItem as ArkToggleGroupItem } from '@ark-ui/vue/toggle-group';
import type { ToggleGroupItemProps as ArkToggleGroupItemProps } from '@ark-ui/vue/toggle-group';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { toggleVariants } from '../toggle/Toggle.variants';
import type { ToggleSize, ToggleVariant } from '../toggle/Toggle.vue';
import { useToggleGroupStyleContext } from './context';

defineOptions({ inheritAttrs: false });

export interface ToggleGroupItemProps extends /* @vue-ignore */ ArkToggleGroupItemProps {
  class?: HTMLAttributes['class'];
  size?: ToggleSize;
  value: ArkToggleGroupItemProps['value'];
  variant?: ToggleVariant;
}

const { class: className, size, value, variant } = defineProps<ToggleGroupItemProps>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const inherited = useToggleGroupStyleContext();
const resolvedSize = computed(() => size ?? inherited.size());
const resolvedVariant = computed(() => variant ?? inherited.variant());
const itemClass = computed(() =>
  cn(
    toggleVariants({ size: resolvedSize.value, variant: resolvedVariant.value }),
    'flex-none text-foreground group-data-[orientation=vertical]/toggle-group:w-full group-data-[orientation=vertical]/toggle-group:justify-start',
    className,
  ),
);
</script>

<template>
  <ArkToggleGroupItem
    v-bind="attrs"
    :class="itemClass"
    :data-size="resolvedSize"
    :data-variant="resolvedVariant"
    :value="value"
    data-slot="toggle-group-item"
  >
    <slot />
  </ArkToggleGroupItem>
</template>