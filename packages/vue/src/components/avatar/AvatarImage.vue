<script setup lang="ts">
import { AvatarImage as ArkAvatarImage } from '@ark-ui/vue/avatar';
import type { AvatarImageProps } from '@ark-ui/vue/avatar';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Avatar.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AvatarImageProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAvatarImage v-bind="attrs" :class="clsx(styles.image, className)" data-slot="avatar-image">
    <slot />
  </ArkAvatarImage>
</template>