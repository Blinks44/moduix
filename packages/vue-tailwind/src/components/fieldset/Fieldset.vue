<script setup lang="ts">
import { FieldsetRoot as ArkFieldsetRoot } from '@ark-ui/vue/fieldset';
import type { FieldsetRootProps } from '@ark-ui/vue/fieldset';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FieldsetRootProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass = 'flex w-full min-w-0 flex-col gap-4 data-disabled:opacity-disabled';
</script>

<template>
  <ArkFieldsetRoot v-bind="attrs" :class="cn(rootClass, className)" data-slot="fieldset-root">
    <slot />
  </ArkFieldsetRoot>
</template>