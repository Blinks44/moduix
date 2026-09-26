<script setup lang="ts">
import { FieldRoot as ArkFieldRoot } from '@ark-ui/vue/field';
import type { FieldRootProps as ArkFieldRootProps } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Field.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkFieldRootProps {
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
  <ArkFieldRoot
    v-bind="{ ...attrs, ...forwardedProps }"
    :class="clsx(styles.root, props.class)"
    data-slot="field-root"
  >
    <slot />
  </ArkFieldRoot>
</template>