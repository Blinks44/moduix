<script setup lang="ts">
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import Input from '../input/Input.vue';
import type { Emits as InputEmits, Props as InputProps } from '../input/Input.vue';
import styles from './Sidebar.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ InputProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
export interface Emits extends /* @vue-ignore */ InputEmits {}
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <Input v-bind="attrs" :class="clsx(styles.input, props.class)"><slot /></Input>
</template>