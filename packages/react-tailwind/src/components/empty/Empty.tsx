import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const EmptyRoot = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(function EmptyRoot(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-scope="empty"
      data-part="root"
      data-slot="empty-root"
      className={cn(
        'grid w-full min-w-0 justify-items-center gap-4 rounded-xl border border-border bg-card p-8 text-center text-card-foreground',
        className,
      )}
      {...props}
    />
  );
});

const EmptyIcon = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(function EmptyIcon(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-scope="empty"
      data-part="icon"
      data-slot="empty-icon"
      className={cn(
        'inline-flex min-w-0 items-center justify-center rounded-full bg-muted p-3 text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0',
        className,
      )}
      {...props}
    />
  );
});

const EmptyContent = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function EmptyContent({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="empty"
        data-part="content"
        data-slot="empty-content"
        className={cn('grid max-w-md min-w-0 justify-items-center gap-1', className)}
        {...props}
      />
    );
  },
);

const EmptyTitle = forwardRef<ComponentRef<typeof ark.h3>, HTMLArkProps<'h3'>>(function EmptyTitle(
  { className, ...props },
  ref,
) {
  return (
    <ark.h3
      ref={ref}
      data-scope="empty"
      data-part="title"
      data-slot="empty-title"
      className={cn('min-w-0 text-xl font-semibold wrap-anywhere', className)}
      {...props}
    />
  );
});

const EmptyDescription = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function EmptyDescription({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="empty"
        data-part="description"
        data-slot="empty-description"
        className={cn(
          'min-w-0 text-sm wrap-anywhere text-muted-foreground [&>:first-child]:mt-0 [&>:last-child]:mb-0',
          className,
        )}
        {...props}
      />
    );
  },
);

const EmptyActions = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function EmptyActions({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="empty"
        data-part="actions"
        data-slot="empty-actions"
        className={cn(
          'flex max-w-full min-w-0 flex-wrap items-center justify-center gap-2 [&>*]:max-w-full [&>*]:min-w-0 [&>:is(button,a)]:wrap-anywhere [&>:is(button,a)]:whitespace-normal',
          className,
        )}
        {...props}
      />
    );
  },
);

const Empty = Object.assign(EmptyRoot, {
  Root: EmptyRoot,
  Icon: EmptyIcon,
  Content: EmptyContent,
  Title: EmptyTitle,
  Description: EmptyDescription,
  Actions: EmptyActions,
});

export { Empty };