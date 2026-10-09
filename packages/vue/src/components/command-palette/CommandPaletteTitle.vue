<script setup lang="ts">
import { DialogTitle as ArkDialogTitle } from '@ark-ui/vue/dialog';
import type { DialogTitleProps } from '@ark-ui/vue/dialog';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './CommandPalette.module.css';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ DialogTitleProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDialogTitle
    v-bind="attrs"
    :class="clsx(styles.title, className)"
    data-slot="command-palette-title"
  >
    <slot />
  </ArkDialogTitle>
</template>