<script setup lang="ts">
import { PasswordInputInput as ArkPasswordInputInput } from '@ark-ui/vue/password-input';
import type { PasswordInputInputProps } from '@ark-ui/vue/password-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PasswordInputInputProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const attrs = useAttrs();
</script>

<template>
  <ArkPasswordInputInput
    v-bind="attrs"
    :class="
      cn(
        'min-w-0 flex-auto bg-transparent px-3 py-1 text-md text-foreground outline-0 group-data-[size=lg]/password-input:px-4 group-data-[size=lg]/password-input:text-lg group-data-[size=sm]/password-input:px-2 group-data-[size=sm]/password-input:text-sm group-data-[size=xl]/password-input:px-4 group-data-[size=xl]/password-input:py-2 group-data-[size=xl]/password-input:text-lg group-data-[size=xs]/password-input:px-2 group-data-[size=xs]/password-input:py-0.5 group-data-[size=xs]/password-input:text-xs placeholder:text-muted-foreground',
        className,
      )
    "
    data-slot="password-input-input"
  />
</template>