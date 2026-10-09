<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="
      cn(
        'grid gap-3 group-data-[state]/lightbox:[animation:inherit] group-data-[state=closed]/lightbox:[animation-name:moduix-lightbox-body-out] group-data-[state=open]/lightbox:[animation-name:moduix-lightbox-body-in]',
        className,
      )
    "
    data-slot="lightbox-body"
  >
    <slot />
  </ark.div>
</template>