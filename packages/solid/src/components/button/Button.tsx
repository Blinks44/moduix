import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Button.module.css';

type ButtonProps = HTMLArkProps<'button'> & {
  loading?: boolean;
  variant?:
    | 'default'
    | 'outline'
    | 'secondary'
    | 'destructive'
    | 'destructive-outline'
    | 'ghost'
    | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon-md' | 'icon-lg';
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
  onClickCapture?: (event: MouseEvent) => void;
};

const ArkButton = ark.button as (
  props: ButtonProps & {
    'oncapture:click'?: (event: MouseEvent) => void;
  },
) => JSX.Element;

function Button(props: ButtonProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'disabled',
    'loading',
    'onClick',
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
      onClick={local.onClick}
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