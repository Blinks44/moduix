<script setup lang="ts">
import { ListboxLabel as ArkListboxLabel } from '@ark-ui/vue/listbox';
import type { ListboxLabelProps } from '@ark-ui/vue/listbox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ListboxLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkListboxLabel
    v-bind="attrs"
    :class="cn('text-sm leading-5 font-medium text-foreground select-none', className)"
    data-slot="listbox-label"
  >
    <slot />
  </ArkListboxLabel>
</template>