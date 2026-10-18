<script setup lang="ts">
import { PinInputRoot as ArkPinInputRoot } from '@ark-ui/vue/pin-input';
import type { PinInputRootEmits, PinInputRootProps } from '@ark-ui/vue/pin-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export type PinInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ PinInputRootProps {
  class?: HTMLAttributes['class'];
  placeholder?: PinInputRootProps['placeholder'];
  size?: PinInputSize;
}

const { class: className, placeholder = '', size = 'md' } = defineProps<Props>();
defineEmits</* @vue-ignore */ PinInputRootEmits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPinInputRoot
    v-bind="attrs"
    :class="
      cn(
        'group/pin-input inline-flex flex-col items-start gap-2 text-foreground data-disabled:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100',
        className,
      )
    "
    :data-size="size"
    :placeholder="placeholder"
    data-slot="pin-input-root"
  >
    <slot />
  </ArkPinInputRoot>
</template>