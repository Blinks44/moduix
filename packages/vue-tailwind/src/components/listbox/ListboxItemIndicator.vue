<script setup lang="ts">
import { ListboxItemIndicator as ArkListboxItemIndicator } from '@ark-ui/vue/listbox';
import type { ListboxItemIndicatorProps } from '@ark-ui/vue/listbox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ListboxItemIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkListboxItemIndicator
    v-bind="attrs"
    :class="
      cn(
        'inline-flex size-4 shrink-0 items-center justify-center data-[state=unchecked]:invisible [&>svg]:size-3',
        className,
      )
    "
    data-slot="listbox-item-indicator"
  >
    <slot><CheckIcon /></slot>
  </ArkListboxItemIndicator>
</template>