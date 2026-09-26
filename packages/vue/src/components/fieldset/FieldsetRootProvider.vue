<script setup lang="ts">
import { FieldsetRootProvider as ArkFieldsetRootProvider } from '@ark-ui/vue/fieldset';
import type { FieldsetRootProviderProps } from '@ark-ui/vue/fieldset';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Fieldset.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FieldsetRootProviderProps {
  class?: HTMLAttributes['class'];
  value: FieldsetRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldsetRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="fieldset-root-provider"
  >
    <slot />
  </ArkFieldsetRootProvider>
</template>