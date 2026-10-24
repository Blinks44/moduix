<script setup lang="ts">
import { AvatarRootProvider as ArkAvatarRootProvider } from '@ark-ui/vue/avatar';
import type { AvatarRootProviderProps } from '@ark-ui/vue/avatar';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { avatarVariants } from './Avatar.variants';
import type { AvatarSize } from './Avatar.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AvatarRootProviderProps {
  class?: HTMLAttributes['class'];
  size?: AvatarSize;
  value: AvatarRootProviderProps['value'];
}

const { class: className, size = 'md', value } = defineProps<Props>();
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