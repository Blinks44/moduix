<script setup lang="ts">
import { AvatarRoot as ArkAvatarRoot } from '@ark-ui/vue/avatar';
import type { AvatarRootEmits, AvatarRootProps } from '@ark-ui/vue/avatar';
import { cva } from 'class-variance-authority';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted align-middle font-medium text-foreground select-none',
  {
    variants: {
      size: {
        xs: 'size-control-xs text-xs',
        sm: 'size-control-sm text-sm',
        md: 'size-control-md text-md',
        lg: 'size-control-lg text-lg',
        xl: 'size-control-xl text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

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
    :class="cn(avatarVariants({ size }), className)"
    data-slot="avatar-root"
  >
    <slot />
  </ArkAvatarRoot>
</template>