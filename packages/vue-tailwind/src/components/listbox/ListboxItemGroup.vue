<script setup lang="ts">
import { ListboxItemGroup as ArkListboxItemGroup } from '@ark-ui/vue/listbox';
import type { ListboxItemGroupProps } from '@ark-ui/vue/listbox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ListboxItemGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkListboxItemGroup
    v-bind="attrs"
    :class="cn('flex flex-col [&+&]:mt-2', className)"
    data-slot="listbox-item-group"
  >
    <slot />
  </ArkListboxItemGroup>
</template>