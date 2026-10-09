<script setup lang="ts">
import { PasswordInputLabel as ArkPasswordInputLabel } from '@ark-ui/vue/password-input';
import type { PasswordInputLabelProps } from '@ark-ui/vue/password-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PasswordInputLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPasswordInputLabel
    v-bind="attrs"
    :class="cn('inline-flex items-center gap-1 text-sm font-medium text-foreground', className)"
    data-slot="password-input-label"
  >
    <slot />
  </ArkPasswordInputLabel>
</template>