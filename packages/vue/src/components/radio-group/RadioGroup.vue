<script setup lang="ts">
import { RadioGroupRoot as ArkRadioGroupRoot } from '@ark-ui/vue/radio-group';
import type { RadioGroupRootEmits, RadioGroupRootProps } from '@ark-ui/vue/radio-group';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './RadioGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RadioGroupRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ RadioGroupRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkRadioGroupRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-slot="radio-group-root"
  >
    <slot />
  </ArkRadioGroupRoot>
</template>