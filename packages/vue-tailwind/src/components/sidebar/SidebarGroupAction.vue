<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'button'> {
  class?: HTMLAttributes['class'];
  type?: 'button' | 'reset' | 'submit';
}

const { class: className, type = 'button' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();

const groupActionClass =
  'me-2 inline-flex size-control-xs flex-none cursor-pointer items-center justify-center rounded-md p-0 text-muted-foreground outline-0 transition-colors duration-normal ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring @max-[7rem]:hidden [&>svg]:size-4';
</script>

<template>
  <ark.button
    v-bind="attrs"
    :type="type"
    :class="cn(groupActionClass, className)"
    data-scope="sidebar"
    data-part="group-action"
    data-slot="sidebar-group-action"
  >
    <slot />
  </ark.button>
</template>