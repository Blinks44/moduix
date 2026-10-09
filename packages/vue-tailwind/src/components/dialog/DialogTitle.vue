<script setup lang="ts">
import { DialogTitle as ArkDialogTitle } from '@ark-ui/vue/dialog';
import type { DialogTitleProps } from '@ark-ui/vue/dialog';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ DialogTitleProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDialogTitle
    v-bind="attrs"
    :class="cn('text-lg font-semibold text-popover-foreground', className)"
    data-slot="dialog-title"
  >
    <slot />
  </ArkDialogTitle>
</template>