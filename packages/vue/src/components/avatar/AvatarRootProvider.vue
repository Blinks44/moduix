<script setup lang="ts">
import { AvatarRootProvider as ArkAvatarRootProvider } from '@ark-ui/vue/avatar';
import type { AvatarRootProviderProps } from '@ark-ui/vue/avatar';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Avatar.module.css';

defineOptions({ inheritAttrs: false });

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ AvatarRootProviderProps {
  class?: HTMLAttributes['class'];
  size?: AvatarSize;
  value: AvatarRootProviderProps['value'];
}

const { class: className, size, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAvatarRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-size="size"
    :value="value"
    data-slot="avatar-root-provider"
  >
    <slot />
  </ArkAvatarRootProvider>
</template>