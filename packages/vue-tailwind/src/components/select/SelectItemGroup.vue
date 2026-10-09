<script setup lang="ts">
import { SelectItemGroup as ArkSelectItemGroup } from '@ark-ui/vue/select';
import type { SelectItemGroupProps } from '@ark-ui/vue/select';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectItemGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectItemGroup
    v-bind="attrs"
    :class="cn('flex flex-col [&+&]:mt-2', className)"
    data-slot="select-item-group"
  >
    <slot />
  </ArkSelectItemGroup>
</template>