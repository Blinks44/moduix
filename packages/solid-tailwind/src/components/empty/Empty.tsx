import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

function Empty(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      data-scope="empty"
      data-part="root"
      data-slot="empty-root"
      class={cn(
        'grid w-full min-w-0 justify-items-center gap-4 rounded-xl border border-border bg-[color-mix(in_oklab,var(--color-card)_92%,var(--color-muted))] p-8 text-center text-card-foreground',
        local.class,
      )}
    />
  );
}

function EmptyIcon(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      data-scope="empty"
      data-part="icon"
      data-slot="empty-icon"
      class={cn(
        'inline-flex min-w-0 items-center justify-center rounded-full bg-muted p-3 text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0',
        local.class,
      )}
    />
  );
}

function EmptyContent(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      data-scope="empty"
      data-part="content"
      data-slot="empty-content"
      class={cn('grid max-w-md min-w-0 justify-items-center gap-1', local.class)}
    />
  );
}

function EmptyTitle(props: HTMLArkProps<'h3'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.h3
      asChild={local.asChild}
      {...others}
      data-scope="empty"
      data-part="title"
      data-slot="empty-title"
      class={cn('min-w-0 text-xl font-semibold wrap-anywhere', local.class)}
    />
  );
}

function EmptyDescription(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      data-scope="empty"
      data-part="description"
      data-slot="empty-description"
      class={cn(
        'min-w-0 text-sm wrap-anywhere text-muted-foreground [&>:first-child]:mt-0 [&>:last-child]:mb-0',
        local.class,
      )}
    />
  );
}

function EmptyActions(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      data-scope="empty"
      data-part="actions"
      data-slot="empty-actions"
      class={cn(
        'flex max-w-full min-w-0 flex-wrap items-center justify-center gap-2 [&>*]:max-w-full [&>*]:min-w-0 [&>:is(button,a)]:wrap-anywhere [&>:is(button,a)]:whitespace-normal',
        local.class,
      )}
    />
  );
}

export { Empty, EmptyActions, EmptyContent, EmptyDescription, EmptyIcon, EmptyTitle };