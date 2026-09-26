<script setup lang="ts">
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import Kbd from '../kbd/Kbd.vue';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ HTMLArkProps<'kbd'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <Kbd
    v-bind="attrs"
    :class="
      cn('min-h-5 min-w-5 rounded-sm px-1 text-xs leading-4 text-muted-foreground', className)
    "
    data-slot="command-palette-kbd"
  >
    <slot />
  </Kbd>
</template>