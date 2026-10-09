<script setup lang="ts">
import { usePinInputContext } from '@ark-ui/vue/pin-input';
import type { HTMLAttributes } from 'vue';
import PinInputInput from './PinInputInput.vue';

defineOptions({ inheritAttrs: false });

export interface Props {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();

const pinInput = usePinInputContext();
</script>

<template>
  <PinInputInput v-for="index in pinInput.items" :key="index" :class="className" :index="index" />
</template>