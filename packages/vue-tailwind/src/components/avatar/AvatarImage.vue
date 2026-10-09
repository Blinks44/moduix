<script setup lang="ts">
import { AvatarImage as ArkAvatarImage } from '@ark-ui/vue/avatar';
import type { AvatarImageProps } from '@ark-ui/vue/avatar';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AvatarImageProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAvatarImage
    v-bind="attrs"
    :class="
      cn(
        'block size-full rounded-[inherit] object-cover object-center data-[state=hidden]:hidden',
        className,
      )
    "
    data-slot="avatar-image"
  >
    <slot />
  </ArkAvatarImage>
</template>