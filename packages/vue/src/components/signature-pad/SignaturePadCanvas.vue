<script setup lang="ts">
import type { SignaturePadControlProps } from '@ark-ui/vue/signature-pad';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { RotateCcwIcon } from '@/lib/moduix/icons/ui/Icons';
import SignaturePadClearTrigger from './SignaturePadClearTrigger.vue';
import SignaturePadControl from './SignaturePadControl.vue';
import SignaturePadGuide from './SignaturePadGuide.vue';
import SignaturePadSegment from './SignaturePadSegment.vue';

defineOptions({ inheritAttrs: false });

export interface Props
  extends /* @vue-ignore */ Omit<SignaturePadControlProps, 'asChild' | 'children'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();

const attrs = useAttrs();
</script>

<template>
  <SignaturePadControl v-bind="attrs" :class="className">
    <SignaturePadSegment />
    <SignaturePadClearTrigger>
      <RotateCcwIcon aria-hidden="true" />
    </SignaturePadClearTrigger>
    <SignaturePadGuide />
  </SignaturePadControl>
</template>