<script setup lang="ts">
import { TagsInputHiddenInput as ArkTagsInputHiddenInput } from '@ark-ui/vue/tags-input';
import type { TagsInputHiddenInputProps } from '@ark-ui/vue/tags-input';
import { useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputHiddenInputProps {}

defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTagsInputHiddenInput v-bind="attrs"><slot /></ArkTagsInputHiddenInput>
</template>