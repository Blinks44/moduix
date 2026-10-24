import { Toggle as TogglePrimitive, ToggleContext, useToggleContext } from '@ark-ui/solid/toggle';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { toggleVariants } from './Toggle.variants';

type ToggleVariant = 'default' | 'outline' | 'ghost';
type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg';
type ToggleRootProps = ComponentProps<typeof TogglePrimitive.Root> & {
  variant?: ToggleVariant;
  size?: ToggleSize;
};

function Toggle(props: ToggleRootProps) {
  const [local, others] = splitProps(props, ['class', 'size', 'variant']);

  return (
    <TogglePrimitive.Root
      {...others}
      data-slot="toggle-root"
      data-variant={local.variant ?? 'default'}
      data-size={local.size ?? 'md'}
      class={cn(toggleVariants({ variant: local.variant, size: local.size }), local.class)}
    />
  );
}

function ToggleIndicator(props: ComponentProps<typeof TogglePrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TogglePrimitive.Indicator
      {...others}
      data-slot="toggle-indicator"
      class={cn(
        "inline-flex items-center justify-center [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4",
        local.class,
      )}
    />
  );
}

export { Toggle, ToggleContext, ToggleIndicator, useToggleContext };
export type {
  ToggleContextProps,
  ToggleIndicatorProps,
  UseToggleContext,
  UseToggleProps,
  UseToggleReturn,
} from '@ark-ui/solid/toggle';
export type { ToggleRootProps, ToggleSize, ToggleVariant };