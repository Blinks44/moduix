<script setup lang="ts">
import { PasswordInputRoot as ArkPasswordInputRoot } from '@ark-ui/vue/password-input';
import type {
  PasswordInputRootProps,
  PasswordInputVisibilityChangeDetails,
} from '@ark-ui/vue/password-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PasswordInputRootProps {
  class?: HTMLAttributes['class'];
}

export interface PasswordInputRootEmits {
  visibilityChange: [details: PasswordInputVisibilityChangeDetails];
  'update:visible': [visible: boolean];
}

const { class: className } = defineProps<Props>();
const emit = defineEmits<PasswordInputRootEmits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPasswordInputRoot
    v-bind="attrs"
    :class="
      cn(
        'flex w-full max-w-none flex-col gap-1 text-foreground data-disabled:opacity-50',
        className,
      )
    "
    @visibility-change="emit('visibilityChange', $event)"
    @update:visible="emit('update:visible', $event)"
    data-slot="password-input-root"
  >
    <slot />
  </ArkPasswordInputRoot>
</template>