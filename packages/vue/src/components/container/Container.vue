<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Container.module.css';

type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ContainerGutter = 'none' | 'sm' | 'md' | 'lg';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
  gutter?: ContainerGutter;
  size?: ContainerSize;
}

const { class: className, gutter = 'md', size = 'lg' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-scope="container"
    data-part="root"
    data-slot="container-root"
    :data-size="size"
    :data-gutter="gutter"
  >
    <slot />
  </ark.div>
</template>