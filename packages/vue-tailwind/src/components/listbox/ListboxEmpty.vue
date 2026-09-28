<script setup lang="ts">
import { ListboxEmpty as ArkListboxEmpty } from '@ark-ui/vue/listbox';
import type { ListboxEmptyProps } from '@ark-ui/vue/listbox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ListboxEmptyProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkListboxEmpty
    v-bind="attrs"
    :class="cn('px-3 py-1 text-center text-sm leading-5 text-muted-foreground', className)"
    data-slot="listbox-empty"
  >
    <slot />
  </ArkListboxEmpty>
</template>