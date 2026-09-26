<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'a'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.a
    v-bind="attrs"
    :class="
      cn(
        'static text-inherit no-underline after:absolute after:inset-0 after:z-0 after:rounded-lg focus-visible:outline-0 focus-visible:after:outline-2 focus-visible:after:outline-offset-1 focus-visible:after:outline-ring',
        className,
      )
    "
    data-scope="card"
    data-part="link"
    data-slot="card-link"
  >
    <slot />
  </ark.a>
</template>