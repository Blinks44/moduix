<script setup lang="ts">
import type { DialogContentProps } from '@ark-ui/vue/dialog';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import CommandPaletteBackdrop from './CommandPaletteBackdrop.vue';
import CommandPaletteBody from './CommandPaletteBody.vue';
import CommandPaletteContent from './CommandPaletteContent.vue';
import CommandPalettePositioner from './CommandPalettePositioner.vue';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ DialogContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <CommandPaletteBackdrop />
  <CommandPalettePositioner>
    <CommandPaletteContent :ref="forwardRef" v-bind="attrs" :class="className">
      <CommandPaletteBody><slot /></CommandPaletteBody>
    </CommandPaletteContent>
  </CommandPalettePositioner>
</template>