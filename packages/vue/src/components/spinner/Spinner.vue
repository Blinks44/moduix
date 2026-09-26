<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Spinner.module.css';

defineOptions({ inheritAttrs: false });

type SpinnerSize = 'inherit' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ HTMLArkProps<'span'> {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
  decorative?: boolean;
  size?: SpinnerSize;
}

const { asChild = false, class: className, decorative = false, size = 'md' } = defineProps<Props>();

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const ariaLabel = computed(() => attrs['aria-label'] as string | undefined);
const ariaLabelledBy = computed(() => attrs['aria-labelledby'] as string | undefined);
const accessibleLabel = computed(() =>
  decorative ? undefined : (ariaLabel.value ?? (ariaLabelledBy.value ? undefined : 'Loading')),
);
</script>

<template>
  <ark.span
    v-bind="attrs"
    :as-child="asChild"
    data-scope="spinner"
    data-part="root"
    data-slot="spinner-root"
    :data-size="size"
    :role="decorative && !asChild ? 'presentation' : decorative ? undefined : 'status'"
    :aria-hidden="decorative && !asChild ? true : undefined"
    :aria-label="accessibleLabel"
    :aria-labelledby="decorative ? undefined : ariaLabelledBy"
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