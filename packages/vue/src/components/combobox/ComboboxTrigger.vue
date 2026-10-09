<script setup lang="ts">
import { ComboboxTrigger as ArkComboboxTrigger } from '@ark-ui/vue/combobox';
import type { ComboboxTriggerProps } from '@ark-ui/vue/combobox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronUpDownIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Combobox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkComboboxTrigger
    v-bind="attrs"
    :class="clsx(styles.trigger, className)"
    data-slot="combobox-trigger"
  >
    <slot><ChevronUpDownIcon /></slot>
  </ArkComboboxTrigger>
</template>