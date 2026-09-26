<script setup lang="ts">
import { AvatarFallback as ArkAvatarFallback } from '@ark-ui/vue/avatar';
import type { AvatarFallbackProps } from '@ark-ui/vue/avatar';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Avatar.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AvatarFallbackProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAvatarFallback
    v-bind="attrs"
    :class="clsx(styles.fallback, className)"
    data-slot="avatar-fallback"
  >
    <slot />
  </ArkAvatarFallback>
</template>