import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import type { JSX } from 'solid-js';
import { children as resolveChildren, splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import { CloseIcon } from '@/lib/moduix/icons/ui';

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
    'onClickCapture',
    'type',
  ]);
  const resolvedChildren = resolveChildren(() => local.children);
  // A parent Ark part that composes CloseButton through asChild passes its own data-disabled.
  const isDisabled = () =>
    local.disabled ||
    local['aria-disabled'] === true ||
    local['aria-disabled'] === 'true' ||
    local['data-disabled'] !== undefined;
  // Stopping capture also keeps the click from reaching delegated onClick handlers.
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
      disabled={local.asChild ? undefined : local.disabled}
      data-scope={local['data-scope'] ?? 'close-button'}
      data-part={local['data-part'] ?? 'root'}
      data-slot={local['data-slot'] ?? 'close-button-root'}
      data-disabled={isDisabled() ? (local['data-disabled'] ?? '') : undefined}
      class={cn(
        "m-0 inline-flex size-7 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-[background-color,color,opacity] duration-normal ease-in-out select-none focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-disabled [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-foreground",
        local.class,
      )}
      aria-disabled={local.asChild && local.disabled ? true : local['aria-disabled']}
      aria-label={
        local['aria-label'] ?? (local['aria-labelledby'] == null ? a11yLabels.close : undefined)
      }
      aria-labelledby={local['aria-labelledby']}
      oncapture:click={handleClickCapture}
    >
      {local.asChild ? undefined : resolvedChildren() || <CloseIcon />}
    </ArkButton>
  );
}

export { CloseButton };
export type { CloseButtonProps };