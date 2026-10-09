<script setup lang="ts">
import { SelectItemGroupLabel as ArkSelectItemGroupLabel } from '@ark-ui/vue/select';
import type { SelectItemGroupLabelProps } from '@ark-ui/vue/select';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectItemGroupLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectItemGroupLabel
    v-bind="attrs"
    :class="cn('px-2.5 py-1 text-xs font-normal text-muted-foreground', className)"
    data-slot="select-item-group-label"
  >
    <slot />
  </ArkSelectItemGroupLabel>
</template>