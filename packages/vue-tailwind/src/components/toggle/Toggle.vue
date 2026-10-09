<script setup lang="ts">
import { ToggleRoot as ArkToggleRoot } from '@ark-ui/vue/toggle';
import type { ToggleRootEmits, ToggleRootProps } from '@ark-ui/vue/toggle';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { toggleVariants } from './Toggle.variants';

defineOptions({ inheritAttrs: false });

export type ToggleVariant = 'default' | 'outline' | 'ghost';
export type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg';

export interface Props extends /* @vue-ignore */ ToggleRootProps {
  class?: HTMLAttributes['class'];
  size?: ToggleSize;
  variant?: ToggleVariant;
}

export interface Emits extends /* @vue-ignore */ ToggleRootEmits {}

const { class: className, size = 'md', variant = 'default' } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkToggleRoot
    v-bind="attrs"
    :class="cn(toggleVariants({ size, variant }), className)"
    :data-size="size"
    :data-variant="variant"
    data-slot="toggle-root"
  >
    <slot />
  </ArkToggleRoot>
</template>