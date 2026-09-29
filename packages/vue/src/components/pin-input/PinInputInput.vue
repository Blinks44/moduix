<script setup lang="ts">
import { PinInputInput as ArkPinInputInput } from '@ark-ui/vue/pin-input';
import type { PinInputInputProps } from '@ark-ui/vue/pin-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './PinInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PinInputInputProps {
  class?: HTMLAttributes['class'];
  index: number;
}

const props = defineProps<Props>();
const attrs = useAttrs();
</script>

<template>
  <ArkPinInputInput
    v-bind="attrs"
    :class="clsx(styles.input, props.class)"
    :index="props.index"
    data-slot="pin-input-input"
  />
</template>