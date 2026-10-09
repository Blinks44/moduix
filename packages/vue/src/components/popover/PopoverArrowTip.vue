<script setup lang="ts">
import { PopoverArrowTip as ArkPopoverArrowTip } from '@ark-ui/vue/popover';
import type { PopoverArrowTipProps } from '@ark-ui/vue/popover';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Popover.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PopoverArrowTipProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const attrs = useAttrs();
</script>

<template>
  <ArkPopoverArrowTip
    v-bind="attrs"
    :class="clsx(styles.arrowTip, className)"
    data-slot="popover-arrow-tip"
  />
</template>