<script setup lang="ts">
import { FieldLabel as ArkFieldLabel } from '@ark-ui/vue/field';
import type { FieldLabelProps as ArkFieldLabelProps } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Field.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkFieldLabelProps {
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
  <ArkFieldLabel
    v-bind="{ ...attrs, ...forwardedProps }"
    :class="clsx(styles.label, props.class)"
    data-slot="field-label"
  >
    <slot />
  </ArkFieldLabel>
</template>