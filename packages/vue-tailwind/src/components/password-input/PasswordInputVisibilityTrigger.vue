<script setup lang="ts">
import { PasswordInputVisibilityTrigger as ArkPasswordInputVisibilityTrigger } from '@ark-ui/vue/password-input';
import type { PasswordInputVisibilityTriggerProps } from '@ark-ui/vue/password-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PasswordInputVisibilityTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPasswordInputVisibilityTrigger
    v-bind="attrs"
    :class="
      cn(
        'group/password-input-trigger inline-flex size-control-sm min-w-control-sm shrink-0 cursor-pointer items-center justify-center rounded-sm bg-transparent text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default data-disabled:cursor-default data-readonly:cursor-default motion-reduce:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-readonly]):hover]:text-foreground',
        className,
      )
    "
    data-slot="password-input-visibility-trigger"
  >
    <slot />
  </ArkPasswordInputVisibilityTrigger>
</template>