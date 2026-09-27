<script setup lang="ts">
import { SelectHiddenSelect as ArkSelectHiddenSelect } from '@ark-ui/vue/select';
import type { SelectHiddenSelectProps } from '@ark-ui/vue/select';
import { useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectHiddenSelectProps {}

defineProps<Props>();
const attrs = useAttrs();
</script>

<template>
  <ArkSelectHiddenSelect v-bind="attrs" />
</template>