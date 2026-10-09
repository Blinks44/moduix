<script setup lang="ts">
import { ListboxContent as ArkListboxContent } from '@ark-ui/vue/listbox';
import type { ListboxContentProps } from '@ark-ui/vue/listbox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Listbox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ListboxContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkListboxContent
    v-bind="attrs"
    :class="clsx(styles.content, className)"
    data-slot="listbox-content"
  >
    <slot />
  </ArkListboxContent>
</template>