<script setup lang="ts">
import { FieldsetHelperText as ArkFieldsetHelperText } from '@ark-ui/vue/fieldset';
import type { FieldsetHelperTextProps } from '@ark-ui/vue/fieldset';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Fieldset.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FieldsetHelperTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldsetHelperText
    v-bind="attrs"
    :class="clsx(styles.helperText, className)"
    data-slot="fieldset-helper-text"
  >
    <slot />
  </ArkFieldsetHelperText>
</template>