<script setup lang="ts">
import { FieldInput as ArkFieldInput } from '@ark-ui/vue/field';
import type { FieldInputProps } from '@ark-ui/vue/field';
import { cva } from 'class-variance-authority';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ Omit<FieldInputProps, 'size'> {
  class?: HTMLAttributes['class'];
  htmlSize?: FieldInputProps['size'];
  size?: InputSize;
}

export interface Emits {
  'update:modelValue': [value: FieldInputProps['modelValue']];
}

const inputVariants = cva(
  'w-full max-w-none rounded-md border border-border bg-background px-3 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-invalid:border-destructive data-invalid:focus-visible:outline-destructive aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive motion-reduce:transition-none file:me-3 file:rounded-md file:border file:border-primary file:bg-primary file:px-2 file:py-0.5 file:font-medium file:text-primary-foreground file:transition-colors file:duration-200 file:ease-in-out file:cursor-pointer [@media(hover:hover)]:file:hover:bg-foreground',
  {
    variants: {
      size: {
        xs: 'min-h-control-xs px-2 py-0.5 text-xs leading-4',
        sm: 'min-h-control-sm px-2 py-1 text-sm leading-5',
        md: 'min-h-control-md',
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
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldInput
    v-bind="attrs"
    :class="
      cn(
        inputVariants({ size: props.size ?? 'md' }),
        props.htmlSize === undefined ? undefined : 'w-auto',
        props.class,
      )
    "
    :size="props.htmlSize"
    data-scope="field"
    data-part="input"
    data-slot="input-root"
    :data-size="props.size ?? 'md'"
    :data-html-size="props.htmlSize === undefined ? undefined : ''"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </ArkFieldInput>
</template>