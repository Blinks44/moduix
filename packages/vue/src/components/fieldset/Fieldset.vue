<script setup lang="ts">
import { FieldsetRoot as ArkFieldsetRoot } from '@ark-ui/vue/fieldset';
import type { FieldsetRootProps } from '@ark-ui/vue/fieldset';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Fieldset.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FieldsetRootProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldsetRoot v-bind="attrs" :class="clsx(styles.root, className)" data-slot="fieldset-root">
    <slot />
  </ArkFieldsetRoot>
</template>