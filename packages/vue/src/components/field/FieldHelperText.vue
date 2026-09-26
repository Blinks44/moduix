<script setup lang="ts">
import { FieldHelperText as ArkFieldHelperText } from '@ark-ui/vue/field';
import type { FieldHelperTextProps as ArkFieldHelperTextProps } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Field.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkFieldHelperTextProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedProps = computed(() =>
  Object.fromEntries(Object.entries(props).filter(([, value]) => value !== undefined)),
);
</script>

<template>
  <ArkFieldHelperText
    v-bind="{ ...attrs, ...forwardedProps }"
    :class="clsx(styles.helperText, props.class)"
    data-slot="field-helper-text"
  >
    <slot />
  </ArkFieldHelperText>
</template>