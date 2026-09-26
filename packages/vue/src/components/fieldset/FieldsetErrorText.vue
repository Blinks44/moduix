<script setup lang="ts">
import { FieldsetErrorText as ArkFieldsetErrorText } from '@ark-ui/vue/fieldset';
import type { FieldsetErrorTextProps } from '@ark-ui/vue/fieldset';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Fieldset.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FieldsetErrorTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldsetErrorText
    v-bind="attrs"
    :class="clsx(styles.errorText, className)"
    data-slot="fieldset-error-text"
  >
    <slot />
  </ArkFieldsetErrorText>
</template>