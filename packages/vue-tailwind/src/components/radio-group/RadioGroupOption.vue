<script setup lang="ts">
import { RadioGroupItemHiddenInput } from '@ark-ui/vue/radio-group';
import type { RadioGroupItemProps } from '@ark-ui/vue/radio-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import RadioGroupItem from './RadioGroupItem.vue';
import RadioGroupItemControl from './RadioGroupItemControl.vue';
import RadioGroupItemText from './RadioGroupItemText.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<RadioGroupItemProps, 'asChild'> {
  class?: HTMLAttributes['class'];
  value: RadioGroupItemProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <RadioGroupItem v-bind="attrs" :class="className" :value="value">
    <RadioGroupItemHiddenInput />
    <RadioGroupItemControl />
    <RadioGroupItemText><slot /></RadioGroupItemText>
  </RadioGroupItem>
</template>