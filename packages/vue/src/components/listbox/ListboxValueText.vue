<script setup lang="ts">
import { ListboxValueText as ArkListboxValueText } from '@ark-ui/vue/listbox';
import type { ListboxValueTextProps } from '@ark-ui/vue/listbox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Listbox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ListboxValueTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkListboxValueText
    v-if="$slots.default"
    v-bind="attrs"
    :class="clsx(styles.valueText, className)"
    data-slot="listbox-value-text"
  >
    <slot />
  </ArkListboxValueText>
  <ArkListboxValueText
    v-else
    v-bind="attrs"
    :class="clsx(styles.valueText, className)"
    data-slot="listbox-value-text"
  />
</template>