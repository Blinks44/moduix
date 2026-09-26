<script setup lang="ts">
import { DialogDescription as ArkDialogDescription } from '@ark-ui/vue/dialog';
import type { DialogDescriptionProps } from '@ark-ui/vue/dialog';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ DialogDescriptionProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDialogDescription
    v-bind="attrs"
    :class="cn('text-sm leading-5 text-muted-foreground', className)"
    data-slot="command-palette-description"
  >
    <slot />
  </ArkDialogDescription>
</template>