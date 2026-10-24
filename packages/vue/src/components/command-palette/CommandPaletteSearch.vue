<script setup lang="ts">
import type { ComboboxInputProps } from '@ark-ui/vue/combobox';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { SearchIcon } from '@/lib/moduix/icons/ui';
import styles from './CommandPalette.module.css';
import CommandPaletteClearTrigger from './CommandPaletteClearTrigger.vue';
import CommandPaletteControl from './CommandPaletteControl.vue';
import CommandPaletteInput from './CommandPaletteInput.vue';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ ComboboxInputProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{}>();
const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <CommandPaletteControl>
    <SearchIcon data-slot="command-palette-search-icon" :class="styles.searchIcon" />
    <!-- @vue-ignore -->
    <CommandPaletteInput
      :ref="forwardRef"
      v-bind="attrs"
      :aria-label="
        props.ariaLabel ?? (props.ariaLabelledby == null ? a11yLabels.searchCommands : undefined)
      "
      :aria-labelledby="props.ariaLabelledby"
      :class="props.class"
    />
    <CommandPaletteClearTrigger />
  </CommandPaletteControl>
</template>