<script setup lang="ts">
import { RadioGroupItemHiddenInput as ArkRadioGroupItemHiddenInput } from '@ark-ui/vue/radio-group';
import type { RadioGroupItemHiddenInputProps } from '@ark-ui/vue/radio-group';
import { useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RadioGroupItemHiddenInputProps {}

defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkRadioGroupItemHiddenInput v-bind="attrs"><slot /></ArkRadioGroupItemHiddenInput>
</template>