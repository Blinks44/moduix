<script setup lang="ts">
import { ToastTitle as ArkToastTitle } from '@ark-ui/vue/toast';
import type { ToastTitleProps } from '@ark-ui/vue/toast';
import { useToastContext } from '@ark-ui/vue/toast';
import { clsx } from 'clsx';
import { defineComponent, useAttrs } from 'vue';
import type { HTMLAttributes, VNodeChild } from 'vue';
import styles from './Toast.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ToastTitleProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const toast = useToastContext();
const VNodeOutlet = defineComponent((props: { value: VNodeChild }) => () => props.value, {
  props: ['value'],
});
</script>

<template>
  <ArkToastTitle v-bind="attrs" :class="clsx(styles.title, className)" data-slot="toast-title">
    <slot v-if="$slots.default" />
    <VNodeOutlet v-else :value="toast.title" />
  </ArkToastTitle>
</template>