<script setup lang="ts">
import { MenuSeparator as ArkMenuSeparator } from '@ark-ui/vue/menu';
import type { MenuSeparatorProps } from '@ark-ui/vue/menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Menu.module.css';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuSeparatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuSeparator
    v-bind="attrs"
    :class="clsx(styles.separator, className)"
    data-slot="menu-separator"
  />
</template>