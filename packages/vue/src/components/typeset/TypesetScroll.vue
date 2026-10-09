<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Typeset.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  ariaLabel?: HTMLAttributes['aria-label'];
  ariaLabelledby?: HTMLAttributes['aria-labelledby'];
  class?: HTMLAttributes['class'];
  role?: HTMLAttributes['role'];
  tabindex?: HTMLAttributes['tabindex'];
}

const { ariaLabel, ariaLabelledby, class: className, role, tabindex = 0 } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const resolvedRole = computed(() => role ?? (ariaLabel || ariaLabelledby ? 'region' : undefined));
</script>

<template>
  <ark.div
    v-bind="attrs"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    :class="clsx(styles.scroll, className)"
    :role="resolvedRole"
    :tabindex="tabindex"
    data-scope="typeset"
    data-part="scroll"
    data-slot="typeset-scroll"
  >
    <slot />
  </ark.div>
</template>