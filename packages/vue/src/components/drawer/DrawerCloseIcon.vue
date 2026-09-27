<script setup lang="ts">
import { DrawerCloseTrigger as ArkDrawerCloseTrigger } from '@ark-ui/vue/drawer';
import type { DrawerCloseTriggerProps } from '@ark-ui/vue/drawer';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import CloseButton from '../close-button/CloseButton.vue';
import styles from './Drawer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<DrawerCloseTriggerProps, 'asChild'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const closeLabel = computed(() => (attrs['aria-label'] as string | undefined) ?? 'Close drawer');
</script>

<template>
  <ArkDrawerCloseTrigger v-bind="attrs" as-child>
    <CloseButton
      :aria-label="closeLabel"
      :class="clsx(styles.closeIcon, className)"
      data-slot="drawer-close-icon"
    >
      <slot v-if="$slots.default" />
    </CloseButton>
  </ArkDrawerCloseTrigger>
</template>
