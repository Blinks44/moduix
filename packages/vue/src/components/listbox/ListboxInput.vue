<script setup lang="ts">
import { ListboxInput as ArkListboxInput } from '@ark-ui/vue/listbox';
import type { ListboxInputProps } from '@ark-ui/vue/listbox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Listbox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ListboxInputProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkListboxInput
    v-bind="attrs"
    :class="clsx(styles.input, props.class)"
    data-slot="listbox-input"
  >
    <slot />
  </ArkListboxInput>
</template>