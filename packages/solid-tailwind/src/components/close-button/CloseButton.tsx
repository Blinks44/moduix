import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import type { JSX } from 'solid-js';
import { children as resolveChildren, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { CloseIcon } from '@/lib/moduix/icons/ui/Icons';

type CloseButtonProps = HTMLArkProps<'button'> & {
  'data-disabled'?: string;
  'data-part'?: string;
  'data-scope'?: string;
  'data-slot'?: string;
  onClickCapture?: (event: MouseEvent) => void;
};

const ArkButton = ark.button as (
  props: CloseButtonProps & {
    'oncapture:click'?: (event: MouseEvent) => void;
  },
) => JSX.Element;

function CloseButton(props: CloseButtonProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'aria-disabled',
    'aria-label',
    'aria-labelledby',
    'children',
    'class',
    'data-disabled',
    'data-part',
    'data-scope',
    'data-slot',
    'disabled',
    'onClick',
    'onClickCapture',
    'type',
  ]);
  const resolvedChildren = resolveChildren(() => local.children);
  const isDisabled = () =>
    local.disabled ||
    local['aria-disabled'] === true ||
    local['aria-disabled'] === 'true' ||
    local['data-disabled'] !== undefined;
  const handleClickCapture = (event: MouseEvent) => {
    if (isDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    local.onClickCapture?.(event);
  };
  const handleClick = (event: MouseEvent) => {
    if (isDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    (local.onClick as ((event: MouseEvent) => void) | undefined)?.(event);
  };

  return (
    <ArkButton
      asChild={local.asChild}
      {...others}
      type={local.asChild ? local.type : (local.type ?? 'button')}
      disabled={local.asChild ? undefined : local.disabled}
      data-scope={local['data-scope'] ?? 'close-button'}
      data-part={local['data-part'] ?? 'root'}
      data-slot={local['data-slot'] ?? 'close-button-root'}
      data-disabled={local['data-disabled'] ?? (isDisabled() ? '' : undefined)}
      class={cn(
        "m-0 box-border inline-flex size-7 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 [&:active:not([data-disabled])]:opacity-[0.94] [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-3 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-foreground",
        local.class,
      )}
      aria-disabled={local.asChild && local.disabled ? true : local['aria-disabled']}
      aria-label={local['aria-label'] ?? (local['aria-labelledby'] == null ? 'Close' : undefined)}
      aria-labelledby={local['aria-labelledby']}
      oncapture:click={handleClickCapture}
      onClick={handleClick}
    >
      {local.asChild ? undefined : resolvedChildren() || <CloseIcon class="size-3 shrink-0" />}
    </ArkButton>
  );
}

export { CloseButton };