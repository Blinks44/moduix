<script setup lang="ts">
import { PasswordInputControl as ArkPasswordInputControl } from '@ark-ui/vue/password-input';
import type { PasswordInputControlProps } from '@ark-ui/vue/password-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PasswordInputControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPasswordInputControl
    v-bind="attrs"
    :class="
      cn(
        'flex min-h-control-md w-full items-center rounded-md border border-border bg-background pr-2 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out focus-within:outline-ring data-invalid:border-destructive data-invalid:focus-within:outline-destructive data-readonly:bg-background data-readonly:text-foreground motion-reduce:transition-none',
        className,
      )
    "
    data-slot="password-input-control"
  >
    <slot />
  </ArkPasswordInputControl>
</template>