<script setup lang="ts">
import { FieldInput as ArkFieldInput } from '@ark-ui/vue/field';
import type { FieldInputProps } from '@ark-ui/vue/field';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { cva } from 'class-variance-authority';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ Omit<FieldInputProps, 'size'> {
  class?: HTMLAttributes['class'];
  htmlSize?: FieldInputProps['size'];
  size?: InputSize;
}

export interface Emits {
  'update:modelValue': [value: FieldInputProps['modelValue']];
}

const inputVariants = cva(
  [
    'w-full min-w-0 rounded-md border border-input bg-background px-3 py-1 text-sm leading-5 text-foreground outline-focus-halo outline-transparent transition-[border-color,outline-color,opacity] duration-normal ease-in-out placeholder:text-muted-foreground',
    'focus-visible:border-ring focus-visible:outline-ring/50',
    'disabled:pointer-events-none disabled:opacity-disabled data-disabled:pointer-events-none data-disabled:opacity-disabled',
    '[[data-slot=field-root][data-disabled]_&]:opacity-100 [[data-slot=field-root-provider][data-disabled]_&]:opacity-100 [[data-slot=input-group-root]:has([data-slot=input-root]:is([data-disabled],:disabled))_&]:opacity-100 [:is([data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100',
    'data-invalid:border-destructive data-invalid:focus-visible:outline-destructive/20 aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive/20',
    'file:me-3 file:cursor-pointer file:rounded-md file:border file:border-transparent file:bg-primary file:px-2 file:py-0.5 file:font-medium file:text-primary-foreground file:transition-colors file:duration-fast file:ease-in-out file:hover:bg-primary/88',
  ],
  {
    variants: {
      size: {
        xs: 'min-h-control-xs px-2 py-0.5 text-xs leading-4',
        sm: 'min-h-control-sm px-2 py-1 text-sm leading-5',
        md: 'min-h-control-md [@media(pointer:coarse)]:text-base [@media(pointer:coarse)]:leading-6',
        lg: 'min-h-control-lg px-4 py-1 text-lg leading-7',
        xl: 'min-h-control-xl px-4 py-2 text-lg leading-7',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const props = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <ArkFieldInput
    :ref="forwardRef"
    v-bind="attrs"
    :class="
      cn(inputVariants({ size: props.size }), props.htmlSize !== undefined && 'w-auto', props.class)
    "
    :size="props.htmlSize"
    data-scope="field"
    data-part="input"
    :data-slot="attrs['data-slot'] ?? 'input-root'"
    :data-size="props.size ?? 'md'"
  >
    <slot />
  </ArkFieldInput>
</template>