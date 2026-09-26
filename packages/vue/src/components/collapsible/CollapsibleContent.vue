<script setup lang="ts">
import { CollapsibleContent as ArkCollapsibleContent } from '@ark-ui/vue/collapsible';
import type { CollapsibleContentProps } from '@ark-ui/vue/collapsible';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Collapsible.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CollapsibleContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCollapsibleContent
    v-bind="attrs"
    :class="clsx(styles.content, className)"
    data-slot="collapsible-content"
  >
    <slot />
  </ArkCollapsibleContent>
</template>