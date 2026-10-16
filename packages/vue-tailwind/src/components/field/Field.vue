<script setup lang="ts">
import { FieldRoot as ArkFieldRoot } from '@ark-ui/vue/field';
import type { FieldRootProps as ArkFieldRootProps } from '@ark-ui/vue/field';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { fieldRootClass } from './Field.variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkFieldRootProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldRoot v-bind="attrs" :class="cn(fieldRootClass, className)" data-slot="field-root">
    <slot />
  </ArkFieldRoot>
</template>