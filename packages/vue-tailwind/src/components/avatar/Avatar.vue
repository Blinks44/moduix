<script setup lang="ts">
import { AvatarRoot as ArkAvatarRoot } from '@ark-ui/vue/avatar';
import type { AvatarRootEmits, AvatarRootProps } from '@ark-ui/vue/avatar';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { avatarVariants } from './Avatar.variants';

defineOptions({ inheritAttrs: false });

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ AvatarRootProps {
  class?: HTMLAttributes['class'];
  size?: AvatarSize;
}

export interface Emits extends /* @vue-ignore */ AvatarRootEmits {}

const { class: className, size = 'md' } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAvatarRoot
    v-bind="attrs"
    :class="cn(avatarVariants({ size }), className)"
    :data-size="size"
    data-slot="avatar-root"
  >
    <slot />
  </ArkAvatarRoot>
</template>