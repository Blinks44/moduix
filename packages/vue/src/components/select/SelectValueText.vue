<script setup lang="ts">
import { SelectValueText as ArkSelectValueText } from '@ark-ui/vue/select';
import type { SelectValueTextProps } from '@ark-ui/vue/select';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Select.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectValueTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkSelectValueText
    v-bind="attrs"
    :class="clsx(styles.valueText, className)"
    data-slot="select-value-text"
  >
    <template v-if="slots.default" #default>
      <slot />
    </template>
  </ArkSelectValueText>
</template>