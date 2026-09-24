<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { cva } from 'class-variance-authority';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

type ButtonVariant =
  | 'default'
  | 'outline'
  | 'secondary'
  | 'destructive'
  | 'destructive-outline'
  | 'ghost'
  | 'link';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon-md' | 'icon-lg';
type Booleanish = boolean | 'false' | 'true';

export interface Props extends /* @vue-ignore */ HTMLArkProps<'button'> {
  dataPart?: string;
  dataScope?: string;
  dataSlot?: string;
  asChild?: boolean;
  class?: HTMLAttributes['class'];
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: MouseEvent) => void;
  onClickCapture?: (event: MouseEvent) => void;
  size?: ButtonSize;
  type?: 'button' | 'reset' | 'submit';
  variant?: ButtonVariant;
}

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border text-sm font-medium no-underline appearance-none transition-[background-color,border-color,color,opacity,transform] duration-200 ease-in-out select-none whitespace-nowrap focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 data-loading:cursor-progress motion-reduce:transition-none motion-safe:[&:not([data-variant='link']):active]:translate-y-px [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          'border-primary bg-primary text-primary-foreground hover:bg-[color-mix(in_srgb,var(--color-primary)_88%,black)]',
        outline: 'border-border bg-background text-foreground hover:bg-accent',
        secondary: 'border-secondary bg-secondary text-secondary-foreground hover:bg-accent',
        destructive:
          'border-destructive bg-destructive text-destructive-foreground hover:brightness-[0.96]',
        'destructive-outline':
          'border-destructive bg-background text-destructive hover:bg-destructive hover:text-destructive-foreground',
        ghost: 'border-transparent bg-transparent text-foreground hover:bg-accent',
        link: 'border-transparent bg-transparent text-primary underline underline-offset-[0.25em] hover:text-foreground',
      },
      size: {
        xs: 'min-h-control-xs px-2.5 py-0.5 text-xs',
        sm: 'min-h-control-sm px-3 py-1 text-sm',
        md: 'min-h-control-md px-4 py-1 text-sm',
        lg: 'min-h-control-lg px-5 py-1.5 text-md',
        xl: 'min-h-control-xl px-6 py-2 text-lg',
        'icon-sm': 'size-control-sm min-w-control-sm gap-0 p-0',
        'icon-md': 'size-control-md min-w-control-md gap-0 p-0',
        'icon-lg': 'size-control-lg min-w-control-lg gap-0 p-0',
      },
    },
    compoundVariants: [{ variant: 'link', class: 'min-h-0 py-0' }],
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

const {
  dataPart = 'root',
  dataScope = 'button',
  dataSlot = 'button-root',
  asChild = false,
  class: className,
  disabled = false,
  loading = false,
  onClick,
  onClickCapture,
  size = 'md',
  type,
  variant = 'default',
} = defineProps<Props>();

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const ariaBusy = computed(() => attrs['aria-busy'] as Booleanish | undefined);
const ariaDisabled = computed(() => attrs['aria-disabled'] as Booleanish | undefined);
const isDisabled = computed(
  () => disabled || loading || ariaDisabled.value === true || ariaDisabled.value === 'true',
);

const handleClickCapture = (event: MouseEvent) => {
  if (isDisabled.value) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  onClickCapture?.(event);
};

const handleClick = (event: MouseEvent) => {
  if (isDisabled.value) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  onClick?.(event);
};
</script>

<template>
  <ark.button
    v-bind="attrs"
    :as-child="asChild"
    :type="asChild ? type : (type ?? 'button')"
    :disabled="asChild ? undefined : isDisabled"
    :aria-busy="loading ? true : ariaBusy"
    :aria-disabled="isDisabled ? true : ariaDisabled"
    @click.capture="handleClickCapture"
    @click="handleClick"
    :data-scope="dataScope"
    :data-part="dataPart"
    :data-slot="dataSlot"
    :data-variant="variant"
    :data-size="size"
    :data-disabled="isDisabled ? '' : undefined"
    :data-loading="loading ? '' : undefined"
    :class="cn(buttonVariants({ variant, size }), className)"
  >
    <slot />
  </ark.button>
</template>