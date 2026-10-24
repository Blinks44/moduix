import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Button.module.css';

type ButtonVariant =
  | 'default'
  | 'outline'
  | 'secondary'
  | 'destructive'
  | 'destructive-outline'
  | 'ghost'
  | 'link';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon-md' | 'icon-lg';

type ButtonRootProps = HTMLArkProps<'button'> & {
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
  onClickCapture?: (event: MouseEvent) => void;
};

const ArkButton = ark.button as (
  props: ButtonRootProps & {
    'oncapture:click'?: (event: MouseEvent) => void;
  },
) => JSX.Element;

function Button(props: ButtonRootProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'disabled',
    'loading',
    'onClickCapture',
    'size',
    'type',
    'data-scope',
    'data-part',
    'data-slot',
    'variant',
    'aria-busy',
    'aria-disabled',
  ]);
  const isDisabled = () =>
    local.disabled ||
    local.loading ||
    local['aria-disabled'] === true ||
    local['aria-disabled'] === 'true';
  const handleClickCapture = (event: MouseEvent) => {
    if (isDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    local.onClickCapture?.(event);
  };
  return (
    <ArkButton
      asChild={local.asChild}
      {...others}
      type={local.asChild ? local.type : (local.type ?? 'button')}
      disabled={local.asChild ? undefined : isDisabled()}
      aria-busy={local.loading ? true : local['aria-busy']}
      aria-disabled={isDisabled() ? true : local['aria-disabled']}
      oncapture:click={handleClickCapture}
      data-scope={local['data-scope'] ?? 'button'}
      data-part={local['data-part'] ?? 'root'}
      data-slot={local['data-slot'] ?? 'button-root'}
      data-variant={local.variant ?? 'default'}
      data-size={local.size ?? 'md'}
      data-disabled={isDisabled() ? '' : undefined}
      data-loading={local.loading ? '' : undefined}
      class={clsx(styles.root, local.class)}
    />
  );
}

export { Button };
export type { ButtonRootProps, ButtonSize, ButtonVariant };