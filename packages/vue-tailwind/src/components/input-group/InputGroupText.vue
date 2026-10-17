<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { useInputGroupSize, type InputGroupAddonAlign } from './context';
import { inputGroupTextVariants } from './variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'span'> {
  align?: InputGroupAddonAlign;
  class?: HTMLAttributes['class'];
}

const { align = 'inline', class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const groupSize = useInputGroupSize();
</script>

<template>
  <ark.span
    v-bind="attrs"
    :class="cn(inputGroupTextVariants({ size: groupSize }), className)"
    data-scope="input-group"
    data-part="text"
    data-slot="input-group-text"
    :data-align="align"
  >
    <slot />
  </ark.span>
</template>