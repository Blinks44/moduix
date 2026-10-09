<script setup lang="ts">
import { SelectControl as ArkSelectControl } from '@ark-ui/vue/select';
import type { SelectControlProps } from '@ark-ui/vue/select';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectControl
    v-bind="attrs"
    :class="
      cn(
        'group/select-control relative flex w-full min-w-0 items-center text-foreground data-disabled:opacity-50',
        className,
      )
    "
    data-slot="select-control"
  >
    <slot />
  </ArkSelectControl>
</template>