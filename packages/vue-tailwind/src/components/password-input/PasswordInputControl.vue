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
        'flex min-h-control-md items-center rounded-md border border-border bg-background pe-2 outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out group-data-[size=lg]/password-input:min-h-control-lg group-data-[size=lg]/password-input:pe-3 group-data-[size=sm]/password-input:min-h-control-sm group-data-[size=sm]/password-input:pe-1.5 group-data-[size=xl]/password-input:min-h-control-xl group-data-[size=xl]/password-input:pe-2.5 group-data-[size=xs]/password-input:min-h-control-xs focus-within:outline-ring data-invalid:border-destructive data-invalid:focus-within:outline-destructive',
        className,
      )
    "
    data-slot="password-input-control"
  >
    <slot />
  </ArkPasswordInputControl>
</template>