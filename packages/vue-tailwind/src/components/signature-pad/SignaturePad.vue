<script setup lang="ts">
import { useFieldContext } from '@ark-ui/vue/field';
import { SignaturePadRoot as ArkSignaturePadRoot } from '@ark-ui/vue/signature-pad';
import type { SignaturePadRootEmits, SignaturePadRootProps } from '@ark-ui/vue/signature-pad';
import { computed, provide, unref, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { signaturePadReadOnlyKey } from './context';

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
    :class="
      cn(
        'box-border inline-flex w-70 max-w-full flex-col gap-2 text-foreground data-disabled:opacity-50',
        className,
      )
    "
    :read-only="resolvedReadOnly"
    data-slot="signature-pad-root"
  >
    <slot />
  </ArkSignaturePadRoot>
</template>