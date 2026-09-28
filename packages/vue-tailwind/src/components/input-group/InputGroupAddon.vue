<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs, computed, inject } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { defaultInputGroupSize, InputGroupSizeContextKey } from './context';
import { inputGroupAddonVariants } from './variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'span'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const groupSize = inject(
  InputGroupSizeContextKey,
  computed(() => defaultInputGroupSize),
);
</script>

<template>
  <ark.span
    v-bind="attrs"
    :class="cn(inputGroupAddonVariants({ size: groupSize }), className)"
    data-scope="input-group"
    data-part="addon"
    data-slot="input-group-addon"
  >
    <slot />
  </ark.span>
</template>