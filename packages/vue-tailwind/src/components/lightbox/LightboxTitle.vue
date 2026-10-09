<script setup lang="ts">
import { DialogTitle as ArkDialogTitle } from '@ark-ui/vue/dialog';
import type { DialogTitleProps } from '@ark-ui/vue/dialog';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DialogTitleProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDialogTitle
    v-bind="attrs"
    :class="cn('m-0 text-md leading-6 font-semibold text-foreground', className)"
    data-slot="lightbox-title"
  >
    <slot />
  </ArkDialogTitle>
</template>