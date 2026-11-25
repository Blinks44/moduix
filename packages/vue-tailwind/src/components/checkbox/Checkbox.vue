<script setup lang="ts">
import {
  CheckboxHiddenInput as ArkCheckboxHiddenInput,
  CheckboxRoot as ArkCheckboxRoot,
} from '@ark-ui/vue/checkbox';
import type {
  CheckboxHiddenInputProps,
  CheckboxRootEmits,
  CheckboxRootProps,
} from '@ark-ui/vue/checkbox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import CheckboxControl from './CheckboxControl.vue';
import CheckboxLabel from './CheckboxLabel.vue';

defineOptions({ inheritAttrs: false });

export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ CheckboxRootProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
  hiddenInput?: boolean;
  hiddenInputProps?: CheckboxHiddenInputProps;
  label?: string;
  size?: CheckboxSize;
}

export interface Emits extends /* @vue-ignore */ CheckboxRootEmits {}

const {
  asChild = undefined,
  class: className,
  hiddenInput = undefined,
  hiddenInputProps,
  label,
  size = 'md',
} = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCheckboxRoot
    v-bind="attrs"
    :as-child="asChild"
    :class="
      cn(
        'group/checkbox inline-flex cursor-pointer items-center gap-2 align-middle text-foreground data-disabled:cursor-default data-disabled:opacity-disabled data-readonly:cursor-default',
        className,
      )
    "
    :data-size="size"
    data-slot="checkbox-root"
  >
    <template v-if="asChild">
      <slot />
    </template>
    <template v-else-if="$slots.default">
      <slot />
      <ArkCheckboxHiddenInput v-if="hiddenInput" v-bind="hiddenInputProps" />
    </template>
    <template v-else>
      <CheckboxControl />
      <CheckboxLabel v-if="label != null">{{ label }}</CheckboxLabel>
      <ArkCheckboxHiddenInput v-if="hiddenInput !== false" v-bind="hiddenInputProps" />
    </template>
  </ArkCheckboxRoot>
</template>