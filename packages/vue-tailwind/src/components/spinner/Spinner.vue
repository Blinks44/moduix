<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { cva } from 'class-variance-authority';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

type SpinnerSize = 'inherit' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

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
        class="inline-flex size-full animate-[var(--moduix-animation-spin)] items-center justify-center motion-reduce:animate-none [&_svg]:size-full"
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