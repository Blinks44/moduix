<script setup lang="ts">
import type { PasswordInputControlProps } from '@ark-ui/vue/password-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import PasswordInputControl from './PasswordInputControl.vue';
import PasswordInputIndicator from './PasswordInputIndicator.vue';
import PasswordInputInput from './PasswordInputInput.vue';
import PasswordInputVisibilityTrigger from './PasswordInputVisibilityTrigger.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<PasswordInputControlProps, 'asChild'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const attrs = useAttrs();
</script>

<template>
  <PasswordInputControl v-bind="attrs" :class="className">
    <PasswordInputInput />
    <PasswordInputVisibilityTrigger>
      <PasswordInputIndicator />
    </PasswordInputVisibilityTrigger>
  </PasswordInputControl>
</template>