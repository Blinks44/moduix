<script setup lang="ts">
import { AvatarRootProvider as ArkAvatarRootProvider } from '@ark-ui/vue/avatar';
import type { AvatarRootProviderProps } from '@ark-ui/vue/avatar';
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
    :class="cn(avatarVariants({ size }), className)"
    :data-size="size"
    :value="value"
    data-slot="avatar-root-provider"
  >
    <slot />
  </ArkAvatarRootProvider>
</template>