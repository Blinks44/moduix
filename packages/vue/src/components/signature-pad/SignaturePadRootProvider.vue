<script setup lang="ts">
import { SignaturePadRootProvider as ArkSignaturePadRootProvider } from '@ark-ui/vue/signature-pad';
import type { SignaturePadRootProviderProps as ArkSignaturePadRootProviderProps } from '@ark-ui/vue/signature-pad';
import { clsx } from 'clsx';
import { computed, provide, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { signaturePadReadOnlyKey } from './context';
import type { SignaturePadApi } from './context';
import styles from './SignaturePad.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkSignaturePadRootProviderProps {
  class?: HTMLAttributes['class'];
  value: SignaturePadApi;
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const resolvedReadOnly = computed(() => value.readOnly ?? false);

provide(signaturePadReadOnlyKey, resolvedReadOnly);
</script>

<template>
  <ArkSignaturePadRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="signature-pad-root-provider"
  >
    <slot />
  </ArkSignaturePadRootProvider>
</template>