<script setup lang="ts">
import { ComboboxContent as ArkComboboxContent } from '@ark-ui/vue/combobox';
import type { ComboboxContentProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import ScrollArea from '../scroll-area/ScrollArea.vue';
import ScrollAreaContent from '../scroll-area/ScrollAreaContent.vue';
import ScrollAreaViewport from '../scroll-area/ScrollAreaViewport.vue';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ ComboboxContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkComboboxContent
    v-bind="attrs"
    :class="cn('group/list flex min-h-0 flex-1 overflow-hidden outline-0', className)"
    data-slot="command-palette-list"
  >
    <ScrollArea data-slot="command-palette-scroll-area" class="h-auto min-h-0 flex-1">
      <ScrollAreaViewport data-slot="command-palette-scroll-viewport" class="scroll-py-2">
        <ScrollAreaContent
          data-slot="command-palette-scroll-content"
          class="min-h-full px-3 py-3 group-data-[empty]/list:p-0"
        >
          <slot />
        </ScrollAreaContent>
      </ScrollAreaViewport>
    </ScrollArea>
  </ArkComboboxContent>
</template>