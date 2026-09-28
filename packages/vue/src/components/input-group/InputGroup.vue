<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, provide, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { defaultInputGroupSize, InputGroupSizeContextKey, type InputGroupSize } from './context';
import styles from './InputGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
  size?: InputGroupSize;
}

const { class: className, size = defaultInputGroupSize } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
provide(
  InputGroupSizeContextKey,
  computed(() => size),
);
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-size="size"
    data-scope="input-group"
    data-part="root"
    data-slot="input-group-root"
  >
    <slot />
  </ark.div>
</template>