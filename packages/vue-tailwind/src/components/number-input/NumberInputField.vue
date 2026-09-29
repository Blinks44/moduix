<script setup lang="ts">
import type { NumberInputControlProps } from '@ark-ui/vue/number-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import NumberInputControl from './NumberInputControl.vue';
import NumberInputDecrementTrigger from './NumberInputDecrementTrigger.vue';
import NumberInputIncrementTrigger from './NumberInputIncrementTrigger.vue';
import NumberInputInput from './NumberInputInput.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<NumberInputControlProps, 'asChild'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();

const attrs = useAttrs();
</script>

<template>
  <NumberInputControl v-bind="attrs" :class="className">
    <NumberInputDecrementTrigger />
    <NumberInputInput />
    <NumberInputIncrementTrigger />
  </NumberInputControl>
</template>