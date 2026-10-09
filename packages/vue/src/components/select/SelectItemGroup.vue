<script setup lang="ts">
import { SelectItemGroup as ArkSelectItemGroup } from '@ark-ui/vue/select';
import type { SelectItemGroupProps } from '@ark-ui/vue/select';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Select.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectItemGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectItemGroup
    v-bind="attrs"
    :class="clsx(styles.itemGroup, className)"
    data-slot="select-item-group"
  >
    <slot />
  </ArkSelectItemGroup>
</template>