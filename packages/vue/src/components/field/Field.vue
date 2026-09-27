<script setup lang="ts">
import { FieldRoot as ArkFieldRoot } from '@ark-ui/vue/field';
import type { FieldRootProps as ArkFieldRootProps } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Field.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkFieldRootProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldRoot v-bind="attrs" :class="clsx(styles.root, className)" data-slot="field-root">
    <slot />
  </ArkFieldRoot>
</template>