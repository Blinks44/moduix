<script setup lang="ts">
import { EditableRootProvider as ArkEditableRootProvider } from '@ark-ui/vue/editable';
import type { EditableRootProviderProps } from '@ark-ui/vue/editable';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditableRootProviderProps {
  class?: HTMLAttributes['class'];
  value: EditableRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-1 text-foreground has-data-autoresize:w-fit has-data-autoresize:max-w-full has-data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';
</script>

<template>
  <ArkEditableRootProvider
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :value="value"
    data-slot="editable-root-provider"
  >
    <slot />
  </ArkEditableRootProvider>
</template>