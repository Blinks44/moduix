<script setup lang="ts">
import { ToggleGroupItem as ArkToggleGroupItem } from '@ark-ui/vue/toggle-group';
import type { ToggleGroupItemProps as ArkToggleGroupItemProps } from '@ark-ui/vue/toggle-group';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import toggleStyles from '../toggle/Toggle.module.css';
import type { ToggleSize, ToggleVariant } from '../toggle/Toggle.vue';
import { useToggleGroupStyleContext } from './context';
import styles from './ToggleGroup.module.css';

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
</script>

<template>
  <ArkToggleGroupItem
    v-bind="attrs"
    :class="clsx(toggleStyles.root, styles.item, className)"
    :data-size="resolvedSize"
    :data-variant="resolvedVariant"
    :value="value"
    data-slot="toggle-group-item"
  >
    <slot />
  </ArkToggleGroupItem>
</template>