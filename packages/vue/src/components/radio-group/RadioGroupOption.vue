<script setup lang="ts">
import type { RadioGroupItemProps } from '@ark-ui/vue/radio-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import type { RadioGroupItemControlSize } from './radio-group.types';
import RadioGroupItem from './RadioGroupItem.vue';
import RadioGroupItemControl from './RadioGroupItemControl.vue';
import RadioGroupItemHiddenInput from './RadioGroupItemHiddenInput.vue';
import RadioGroupItemText from './RadioGroupItemText.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<RadioGroupItemProps, 'asChild'> {
  class?: HTMLAttributes['class'];
  size?: RadioGroupItemControlSize;
  value: RadioGroupItemProps['value'];
}

const { class: className, size, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <RadioGroupItem v-bind="attrs" :class="className" :value="value">
    <RadioGroupItemHiddenInput />
    <RadioGroupItemControl :size="size" />
    <RadioGroupItemText><slot /></RadioGroupItemText>
  </RadioGroupItem>
</template>