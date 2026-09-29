<script setup lang="ts">
import { PasswordInputRootProvider as ArkPasswordInputRootProvider } from '@ark-ui/vue/password-input';
import type { PasswordInputRootProviderProps } from '@ark-ui/vue/password-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PasswordInputRootProviderProps {
  class?: HTMLAttributes['class'];
  value: PasswordInputRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPasswordInputRootProvider
    v-bind="attrs"
    :class="
      cn(
        'flex w-full max-w-none flex-col gap-1 text-foreground data-disabled:opacity-50',
        className,
      )
    "
    :value="value"
    data-slot="password-input-root-provider"
  >
    <slot />
  </ArkPasswordInputRootProvider>
</template>