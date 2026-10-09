<script setup lang="ts">
import { SelectContent as ArkSelectContent } from '@ark-ui/vue/select';
import type { SelectContentProps } from '@ark-ui/vue/select';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Select.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectContent
    v-bind="attrs"
    :class="clsx(styles.content, className)"
    data-slot="select-content"
  >
    <slot />
  </ArkSelectContent>
</template>