<script setup lang="ts">
import { MenuContent as ArkMenuContent } from '@ark-ui/vue/menu';
import type { MenuContentProps } from '@ark-ui/vue/menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Menu.module.css';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuContent v-bind="attrs" :class="clsx(styles.content, className)" data-slot="menu-content">
    <slot />
  </ArkMenuContent>
</template>