<script setup lang="ts">
import { SelectIndicator as ArkSelectIndicator } from '@ark-ui/vue/select';
import type { SelectIndicatorProps } from '@ark-ui/vue/select';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronUpDownIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectIndicator
    v-bind="attrs"
    :class="
      cn(
        'pointer-events-none absolute end-(--select-action-offset) top-1/2 inline-flex size-(--select-action-size) -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-[background-color,color] duration-normal ease-in-out peer-enabled/select-trigger:peer-hover/select-trigger:bg-muted peer-enabled/select-trigger:peer-hover/select-trigger:text-foreground [&>svg]:size-4',
        className,
      )
    "
    data-slot="select-indicator"
  >
    <slot><ChevronUpDownIcon /></slot>
  </ArkSelectIndicator>
</template>