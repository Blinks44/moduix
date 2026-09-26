<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CloseIcon } from '@/internal/icons/ui/Icons';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

type Booleanish = boolean | 'false' | 'true';

export interface Props extends /* @vue-ignore */ HTMLArkProps<'button'> {
  asChild?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  class?: HTMLAttributes['class'];
  dataDisabled?: string;
  dataPart?: string;
  dataScope?: string;
  dataSlot?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
  onClickCapture?: (event: MouseEvent) => void;
  type?: 'button' | 'reset' | 'submit';
}

const {
  asChild = false,
  ariaLabel,
  ariaLabelledby,
  class: className,
  dataDisabled,
  dataPart = 'root',
  dataScope = 'close-button',
  dataSlot = 'close-button-root',
  disabled = false,
  onClick,
  onClickCapture,
  type,
} = defineProps<Props>();

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const ariaDisabled = computed(() => attrs['aria-disabled'] as Booleanish | undefined);
const isDisabled = computed(
  () =>
    disabled ||
    ariaDisabled.value === true ||
    ariaDisabled.value === 'true' ||
    dataDisabled !== undefined,
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
    :disabled="asChild ? undefined : disabled"
    :aria-disabled="asChild && disabled ? true : ariaDisabled"
    :aria-label="ariaLabel ?? (ariaLabelledby == null ? 'Close' : undefined)"
    :aria-labelledby="ariaLabelledby"
    @click.capture="handleClickCapture"
    @click="handleClick"
    :data-scope="dataScope"
    :data-part="dataPart"
    :data-slot="dataSlot"
    :data-disabled="dataDisabled ?? (isDisabled ? '' : undefined)"
    :class="
      cn(
        `m-0 box-border inline-flex size-7 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 [&:active:not([data-disabled])]:opacity-[0.94] [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-3 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-foreground`,
        className,
      )
    "
  >
    <slot><CloseIcon class="size-3 shrink-0" /></slot>
  </ark.button>
</template>