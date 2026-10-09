<script setup lang="ts">
import { SignaturePadGuide as ArkSignaturePadGuide } from '@ark-ui/vue/signature-pad';
import type { SignaturePadGuideProps } from '@ark-ui/vue/signature-pad';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SignaturePadGuideProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSignaturePadGuide
    v-bind="attrs"
    :class="
      cn(
        'pointer-events-none absolute start-6 end-6 bottom-8 border-b border-dashed border-border',
        className,
      )
    "
    data-slot="signature-pad-guide"
  >
    <slot />
  </ArkSignaturePadGuide>
</template>