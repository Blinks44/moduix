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

export type PasswordInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ PasswordInputRootProps {
  class?: HTMLAttributes['class'];
  size?: PasswordInputSize;
}

export interface PasswordInputRootEmits {
  visibilityChange: [details: PasswordInputVisibilityChangeDetails];
  'update:visible': [visible: boolean];
}

const { class: className, size = 'md' } = defineProps<Props>();
defineEmits</* @vue-ignore */ PasswordInputRootEmits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPasswordInputRoot
    v-bind="attrs"
    :class="
      cn(
        'group/password-input flex w-full flex-col gap-1 text-foreground data-disabled:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100',
        className,
      )
    "
    :data-size="size"
    data-slot="password-input-root"
  >
    <slot />
  </ArkPasswordInputRoot>
</template>