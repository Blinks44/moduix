<script setup lang="ts">
import { FieldRootProvider as ArkFieldRootProvider } from '@ark-ui/vue/field';
import type { FieldRootProviderProps as ArkFieldRootProviderProps } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Field.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkFieldRootProviderProps {
  class?: HTMLAttributes['class'];
  value: ArkFieldRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="field-root-provider"
  >
    <slot />
  </ArkFieldRootProvider>
</template>