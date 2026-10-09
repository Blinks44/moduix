<script setup lang="ts">
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import Separator from '../separator/Separator.vue';
import type { Props as SeparatorProps } from '../separator/Separator.vue';
import styles from './Sidebar.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SeparatorProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <Separator v-bind="attrs" :class="clsx(styles.separator, props.class)"><slot /></Separator>
</template>