<script setup lang="ts">
import { PasswordInputIndicator as ArkPasswordInputIndicator } from '@ark-ui/vue/password-input';
import type { PasswordInputIndicatorProps } from '@ark-ui/vue/password-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { EyeClosedIcon, EyeIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PasswordInputIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const slots = defineSlots<{
  default?: () => unknown;
  fallback?: (props: { fallback: string | undefined }) => unknown;
}>();

const attrs = useAttrs();
const indicatorClass =
  "inline-flex items-center justify-center rounded-sm p-1 transition-[background-color] duration-normal ease-in-out group-hover/password-input-trigger:bg-muted group-focus-visible/password-input-trigger:bg-muted group-data-[disabled]/password-input-trigger:bg-transparent group-data-[readonly]/password-input-trigger:bg-transparent [&>svg:not([class*='size-'])]:size-4 group-data-[size=xs]/password-input:[&>svg:not([class*='size-'])]:size-3 group-data-[size=sm]/password-input:[&>svg:not([class*='size-'])]:size-3.5 group-data-[size=xl]/password-input:[&>svg:not([class*='size-'])]:size-5";
</script>

<template>
  <ArkPasswordInputIndicator
    v-bind="attrs"
    :class="cn(indicatorClass, className)"
    data-slot="password-input-indicator"
  >
    <template v-if="slots.fallback" #fallback="slotProps">
      <slot name="fallback" v-bind="slotProps" />
    </template>
    <template v-else-if="attrs.fallback === undefined" #fallback>
      <EyeClosedIcon />
    </template>
    <slot>
      <EyeIcon />
    </slot>
  </ArkPasswordInputIndicator>
</template>