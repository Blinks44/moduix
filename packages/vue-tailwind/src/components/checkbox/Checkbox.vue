<script setup lang="ts">
import { CheckboxRoot as ArkCheckboxRoot } from '@ark-ui/vue/checkbox';
import type { CheckboxRootEmits, CheckboxRootProps } from '@ark-ui/vue/checkbox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ CheckboxRootProps {
  class?: HTMLAttributes['class'];
  size?: CheckboxSize;
}

export interface Emits extends /* @vue-ignore */ CheckboxRootEmits {}

const { class: className, size = 'md' } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCheckboxRoot
    v-bind="attrs"
    :class="
      cn(
        'group/checkbox inline-flex cursor-pointer items-center gap-2 align-middle text-foreground data-disabled:cursor-default data-disabled:opacity-50 data-readonly:cursor-default',
        className,
      )
    "
    :data-size="size"
    data-slot="checkbox-root"
  >
    <slot />
  </ArkCheckboxRoot>
</template>