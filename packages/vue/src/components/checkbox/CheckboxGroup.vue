<script setup lang="ts">
import { CheckboxGroup as ArkCheckboxGroup } from '@ark-ui/vue/checkbox';
import type { CheckboxGroupProps } from '@ark-ui/vue/checkbox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Checkbox.module.css';
import type { CheckboxGroupEmits } from './checkbox.types';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CheckboxGroupProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ CheckboxGroupEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCheckboxGroup
    v-bind="attrs"
    :class="clsx(styles.group, className)"
    data-slot="checkbox-group"
  >
    <slot />
  </ArkCheckboxGroup>
</template>