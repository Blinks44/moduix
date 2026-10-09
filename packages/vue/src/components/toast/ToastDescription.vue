<script setup lang="ts">
import { ToastDescription as ArkToastDescription } from '@ark-ui/vue/toast';
import type { ToastDescriptionProps } from '@ark-ui/vue/toast';
import { useToastContext } from '@ark-ui/vue/toast';
import { clsx } from 'clsx';
import { defineComponent, useAttrs } from 'vue';
import type { HTMLAttributes, VNodeChild } from 'vue';
import styles from './Toast.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ToastDescriptionProps {
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
  <ArkToastDescription
    v-bind="attrs"
    :class="clsx(styles.description, className)"
    data-slot="toast-description"
  >
    <slot v-if="$slots.default" />
    <VNodeOutlet v-else :value="toast.description" />
  </ArkToastDescription>
</template>