<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { cva } from 'class-variance-authority';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export type SpinnerSize = 'inherit' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const spinnerVariants = cva('inline-flex shrink-0 items-center justify-center align-middle', {
  variants: {
    size: {
      inherit: 'size-[1em]',
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-7',
      xl: 'size-control-md',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

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
    :class="cn(spinnerVariants({ size }), className)"
  >
    <template v-if="asChild">
      <slot />
    </template>
    <template v-else>
      <span
        data-scope="spinner"
        data-part="indicator"
        data-slot="spinner-indicator"
        class="inline-flex size-full animate-(--moduix-animation-spin) items-center justify-center [&_svg]:size-full"
        aria-hidden="true"
      >
        <slot>
          <span
            data-scope="spinner"
            data-part="ring"
            data-slot="spinner-ring"
            class="box-border block size-full rounded-full border-2 border-solid border-current/[22%] [border-block-start-color:currentColor]"
          />
        </slot>
      </span>
    </template>
  </ark.span>
</template>