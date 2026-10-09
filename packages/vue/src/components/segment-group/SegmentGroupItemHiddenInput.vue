<script setup lang="ts">
import { SegmentGroupItemHiddenInput as ArkSegmentGroupItemHiddenInput } from '@ark-ui/vue/segment-group';
import type { SegmentGroupItemHiddenInputProps } from '@ark-ui/vue/segment-group';
import { useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SegmentGroupItemHiddenInputProps {}

defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSegmentGroupItemHiddenInput v-bind="attrs"><slot /></ArkSegmentGroupItemHiddenInput>
</template>