<script setup lang="ts">
import { FieldTextarea as ArkFieldTextarea } from '@ark-ui/vue/field';
import type { FieldTextareaProps } from '@ark-ui/vue/field';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<FieldTextareaProps, 'autoresize' | 'class'> {
  autoresize?: FieldTextareaProps['autoresize'];
  class?: HTMLAttributes['class'];
}

export interface Emits {
  'update:modelValue': [value: FieldTextareaProps['modelValue']];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldTextarea
    v-bind="attrs"
    :autoresize="props.autoresize"
    :class="
      cn(
        'min-h-24 w-full max-w-none resize-y rounded-md border border-border bg-background px-3.5 py-2 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive data-autoresize:overflow-y-hidden data-disabled:pointer-events-none data-disabled:opacity-50 data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        props.class,
      )
    "
    data-scope="field"
    data-part="textarea"
    data-slot="textarea-root"
    :data-autoresize="props.autoresize ? '' : undefined"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </ArkFieldTextarea>
</template>