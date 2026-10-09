<script setup lang="ts">
import { AvatarFallback as ArkAvatarFallback } from '@ark-ui/vue/avatar';
import type { AvatarFallbackProps } from '@ark-ui/vue/avatar';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
    :class="
      cn(
        'inline-flex size-full items-center justify-center rounded-[inherit] bg-[inherit] data-[state=hidden]:hidden',
        className,
      )
    "
    data-slot="avatar-fallback"
  >
    <slot />
  </ArkAvatarFallback>
</template>