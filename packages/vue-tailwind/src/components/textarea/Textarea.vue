<script setup lang="ts">
import { FieldTextarea as ArkFieldTextarea } from '@ark-ui/vue/field';
import type { FieldTextareaProps } from '@ark-ui/vue/field';
import { cva } from 'class-variance-authority';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ FieldTextareaProps {
  class?: HTMLAttributes['class'];
  size?: TextareaSize;
}

export interface Emits {
  'update:modelValue': [value: FieldTextareaProps['modelValue']];
}

const textareaVariants = cva(
  'w-full resize-y rounded-md border border-border bg-background text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-normal ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-disabled data-disabled:pointer-events-none data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100 aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive data-invalid:border-destructive data-invalid:focus-visible:outline-destructive',
  {
    variants: {
      size: {
        xs: 'px-2 py-1 text-xs leading-4',
        sm: 'px-2 py-1.5 text-sm leading-5',
        md: 'px-3 py-2 text-md leading-6',
        lg: 'px-4 py-2.5 text-lg leading-7',
        xl: 'px-4 py-3 text-lg leading-7',
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
</script>

<template>
  <ArkFieldTextarea
    v-bind="attrs"
    :class="cn(textareaVariants({ size: props.size }), props.class)"
    data-scope="field"
    data-part="textarea"
    data-slot="textarea-root"
    :data-size="props.size ?? 'md'"
  >
    <slot />
  </ArkFieldTextarea>
</template>