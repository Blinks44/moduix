<script setup lang="ts">
import { CheckboxRoot as ArkCheckboxRoot } from '@ark-ui/vue/checkbox';
import type { CheckboxRootEmits, CheckboxRootProps } from '@ark-ui/vue/checkbox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Checkbox.module.css';

defineOptions({ inheritAttrs: false });

type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ CheckboxRootProps {
  class?: HTMLAttributes['class'];
  size?: CheckboxSize;
}

export interface Emits extends /* @vue-ignore */ CheckboxRootEmits {}

const { class: className, size = 'md' } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCheckboxRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-size="size"
    data-slot="checkbox-root"
  >
    <slot />
  </ArkCheckboxRoot>
</template>