<script setup lang="ts">
import { MenuArrowTip as ArkMenuArrowTip } from '@ark-ui/vue/menu';
import type { MenuArrowTipProps } from '@ark-ui/vue/menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Menu.module.css';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuArrowTipProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuArrowTip
    v-bind="attrs"
    :class="clsx(styles.arrowTip, className)"
    data-slot="menu-arrow-tip"
  />
</template>