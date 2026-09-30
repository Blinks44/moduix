<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Sidebar.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'button'> {
  class?: HTMLAttributes['class'];
  type?: 'button' | 'reset' | 'submit';
}

const { class: className, type = 'button' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.button
    v-bind="attrs"
    :type="type"
    :class="clsx(styles.groupAction, className)"
    data-scope="sidebar"
    data-part="group-action"
    data-slot="sidebar-group-action"
  >
    <slot />
  </ark.button>
</template>