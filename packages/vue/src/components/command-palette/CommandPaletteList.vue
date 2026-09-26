<script setup lang="ts">
import { ComboboxContent as ArkComboboxContent } from '@ark-ui/vue/combobox';
import type { ComboboxContentProps } from '@ark-ui/vue/combobox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import ScrollArea from '../scroll-area/ScrollArea.vue';
import ScrollAreaContent from '../scroll-area/ScrollAreaContent.vue';
import ScrollAreaViewport from '../scroll-area/ScrollAreaViewport.vue';
import styles from './CommandPalette.module.css';

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
    :class="clsx(styles.list, className)"
    data-slot="command-palette-list"
  >
    <ScrollArea data-slot="command-palette-scroll-area" :class="styles.scrollArea">
      <ScrollAreaViewport
        data-slot="command-palette-scroll-viewport"
        :class="styles.scrollViewport"
      >
        <ScrollAreaContent data-slot="command-palette-scroll-content" :class="styles.scrollContent">
          <slot />
        </ScrollAreaContent>
      </ScrollAreaViewport>
    </ScrollArea>
  </ArkComboboxContent>
</template>