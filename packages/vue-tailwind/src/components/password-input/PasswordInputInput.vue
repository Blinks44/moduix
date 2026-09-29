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
        'min-h-0 min-w-0 flex-auto bg-transparent px-3 py-1 text-md text-foreground outline-0 transition-opacity duration-200 ease-in-out placeholder:text-muted-foreground disabled:pointer-events-none data-disabled:pointer-events-none motion-reduce:transition-none',
        className,
      )
    "
    data-slot="password-input-input"
  />
</template>