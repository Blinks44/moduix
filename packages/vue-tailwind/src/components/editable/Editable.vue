<script setup lang="ts">
import { EditableRoot as ArkEditableRoot } from '@ark-ui/vue/editable';
import type { EditableRootEmits, EditableRootProps } from '@ark-ui/vue/editable';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditableRootProps {
  activationMode?: EditableRootProps['activationMode'];
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ EditableRootEmits {}

const { activationMode = 'dblclick', class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-1 text-foreground has-data-autoresize:w-fit has-data-autoresize:max-w-full has-data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';
</script>

<template>
  <ArkEditableRoot
    v-bind="attrs"
    :activation-mode="activationMode"
    :class="cn(rootClass, className)"
    data-slot="editable-root"
  >
    <slot />
  </ArkEditableRoot>
</template>