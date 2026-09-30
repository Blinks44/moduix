<script setup lang="ts">
import { useFieldContext } from '@ark-ui/vue/field';
import { SignaturePadRoot as ArkSignaturePadRoot } from '@ark-ui/vue/signature-pad';
import type { SignaturePadRootEmits, SignaturePadRootProps } from '@ark-ui/vue/signature-pad';
import { clsx } from 'clsx';
import { computed, provide, unref, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { signaturePadReadOnlyKey } from './context';
import styles from './SignaturePad.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SignaturePadRootProps {
  class?: HTMLAttributes['class'];
  readOnly?: SignaturePadRootProps['readOnly'];
}

export interface Emits extends /* @vue-ignore */ SignaturePadRootEmits {}

const { class: className, readOnly = undefined } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const field = useFieldContext();
const resolvedReadOnly = computed(() => readOnly ?? unref(field)?.readOnly);
const readOnlyContext = computed(() => resolvedReadOnly.value ?? false);

provide(signaturePadReadOnlyKey, readOnlyContext);
</script>

<template>
  <ArkSignaturePadRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :read-only="resolvedReadOnly"
    data-slot="signature-pad-root"
  >
    <slot />
  </ArkSignaturePadRoot>
</template>