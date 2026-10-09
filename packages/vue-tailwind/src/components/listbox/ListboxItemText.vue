<script setup lang="ts">
import { ListboxItemText as ArkListboxItemText } from '@ark-ui/vue/listbox';
import type { ListboxItemTextProps } from '@ark-ui/vue/listbox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ListboxItemTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkListboxItemText
    v-bind="attrs"
    :class="cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', className)"
    data-slot="listbox-item-text"
  >
    <slot />
  </ArkListboxItemText>
</template>