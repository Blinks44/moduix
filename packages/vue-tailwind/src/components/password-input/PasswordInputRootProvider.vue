<script setup lang="ts">
import { PasswordInputRootProvider as ArkPasswordInputRootProvider } from '@ark-ui/vue/password-input';
import type { PasswordInputRootProviderProps } from '@ark-ui/vue/password-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import type { PasswordInputSize } from './PasswordInput.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PasswordInputRootProviderProps {
  class?: HTMLAttributes['class'];
  size?: PasswordInputSize;
  value: PasswordInputRootProviderProps['value'];
}

const { class: className, size = 'md', value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPasswordInputRootProvider
    v-bind="attrs"
    :class="
      cn(
        'group/password-input flex w-full flex-col gap-1 text-foreground data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100',
        className,
      )
    "
    :data-size="size"
    :value="value"
    data-slot="password-input-root-provider"
  >
    <slot />
  </ArkPasswordInputRootProvider>
</template>