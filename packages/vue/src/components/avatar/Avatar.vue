<script setup lang="ts">
import { AvatarRoot as ArkAvatarRoot } from '@ark-ui/vue/avatar';
import type { AvatarRootEmits, AvatarRootProps } from '@ark-ui/vue/avatar';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Avatar.module.css';

defineOptions({ inheritAttrs: false });

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ AvatarRootProps {
  class?: HTMLAttributes['class'];
  size?: AvatarSize;
}

export interface Emits extends /* @vue-ignore */ AvatarRootEmits {}

const { class: className, size } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAvatarRoot
    :data-size="size"
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-slot="avatar-root"
  >
    <slot />
  </ArkAvatarRoot>
</template>