<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import styles from './Spinner.module.css';

defineOptions({ inheritAttrs: false });

export type SpinnerSize = 'inherit' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ HTMLArkProps<'span'> {
  asChild?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  class?: HTMLAttributes['class'];
  decorative?: boolean;
  size?: SpinnerSize;
}

const {
  asChild = false,
  ariaLabel,
  ariaLabelledby,
  class: className,
  decorative = false,
  size = 'md',
} = defineProps<Props>();

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.span
    v-bind="attrs"
    :as-child="asChild"
    data-scope="spinner"
    data-part="root"
    data-slot="spinner-root"
    :data-size="size"
    :role="decorative ? undefined : 'status'"
    :aria-hidden="decorative || undefined"
    :aria-label="ariaLabel ?? (decorative || ariaLabelledby ? undefined : a11yLabels.loading)"
    :aria-labelledby="ariaLabelledby"
    :class="clsx(styles.root, className)"
  >
    <template v-if="asChild">
      <slot />
    </template>
    <template v-else>
      <span
        data-scope="spinner"
        data-part="indicator"
        data-slot="spinner-indicator"
        :class="styles.indicator"
        aria-hidden="true"
      >
        <slot>
          <span
            data-scope="spinner"
            data-part="ring"
            data-slot="spinner-ring"
            :class="styles.ring"
          />
        </slot>
      </span>
    </template>
  </ark.span>
</template>