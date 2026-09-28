<script setup lang="ts">
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { ark } from '@ark-ui/vue/factory';
import { useAttrs, computed, provide } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { defaultInputGroupSize, InputGroupSizeContextKey, type InputGroupSize } from './context';
import { inputGroupRootVariants } from './variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
  size?: InputGroupSize;
}

const { class: className, size = defaultInputGroupSize } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
provide(
  InputGroupSizeContextKey,
  computed(() => size),
);
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="cn(inputGroupRootVariants({ size }), className)"
    :data-size="size"
    data-scope="input-group"
    data-part="root"
    data-slot="input-group-root"
  >
    <slot />
  </ark.div>
</template>