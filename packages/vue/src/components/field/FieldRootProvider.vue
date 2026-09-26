<script setup lang="ts">
import { FieldRootProvider as ArkFieldRootProvider } from '@ark-ui/vue/field';
import type { FieldRootProviderProps as ArkFieldRootProviderProps } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Field.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkFieldRootProviderProps {
  class?: HTMLAttributes['class'];
  value: ArkFieldRootProviderProps['value'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedProps = computed(() =>
  Object.fromEntries(Object.entries(props).filter(([, value]) => value !== undefined)),
);
</script>

<template>
  <ArkFieldRootProvider
    v-bind="{ ...attrs, ...forwardedProps }"
    :class="clsx(styles.root, props.class)"
    :value="props.value"
    data-slot="field-root-provider"
  >
    <slot />
  </ArkFieldRootProvider>
</template>