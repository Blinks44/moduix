import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type AlertStatus = 'info' | 'success' | 'warning' | 'error';

type AlertRootProps = HTMLArkProps<'div'> & {
  status?: AlertStatus;
};

const rootClassName =
  'box-border grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] items-start gap-y-[var(--moduix-alert-content-gap,var(--moduix-spacing-1))] gap-x-[var(--moduix-alert-gap,var(--moduix-spacing-3))] border-[length:var(--moduix-alert-border-width,var(--moduix-border-width-sm))] border-[var(--moduix-alert-border-color,var(--_alert-border-color-default,var(--moduix-color-border)))] rounded-[var(--moduix-alert-radius,var(--moduix-radius-lg))] p-[var(--moduix-alert-padding,var(--moduix-spacing-3))] bg-[var(--moduix-alert-bg,var(--_alert-bg-default,var(--moduix-color-card)))] text-[color:var(--moduix-alert-color,var(--_alert-color-default,var(--moduix-color-card-foreground)))] shadow-[var(--moduix-alert-shadow,none)] [--_alert-bg-default:var(--moduix-alert-info-bg,var(--moduix-color-card))] [--_alert-border-color-default:var(--moduix-alert-info-border-color,var(--moduix-color-border))] [--_alert-color-default:var(--moduix-alert-info-color,var(--moduix-color-card-foreground))] [--_alert-indicator-color-default:var(--moduix-alert-info-indicator-color,var(--moduix-color-muted-foreground))] data-[status=success]:[--_alert-bg-default:var(--moduix-alert-success-bg,color-mix(in_oklab,var(--moduix-color-success)_10%,var(--moduix-color-background)))] data-[status=success]:[--_alert-border-color-default:var(--moduix-alert-success-border-color,color-mix(in_oklab,var(--moduix-color-success)_34%,transparent))] data-[status=success]:[--_alert-color-default:var(--moduix-alert-success-color,var(--moduix-color-foreground))] data-[status=success]:[--_alert-indicator-color-default:var(--moduix-alert-success-indicator-color,var(--moduix-color-success))] data-[status=warning]:[--_alert-bg-default:var(--moduix-alert-warning-bg,color-mix(in_oklab,var(--moduix-color-warning)_13%,var(--moduix-color-background)))] data-[status=warning]:[--_alert-border-color-default:var(--moduix-alert-warning-border-color,color-mix(in_oklab,var(--moduix-color-warning)_38%,transparent))] data-[status=warning]:[--_alert-color-default:var(--moduix-alert-warning-color,var(--moduix-color-foreground))] data-[status=warning]:[--_alert-indicator-color-default:var(--moduix-alert-warning-indicator-color,var(--moduix-color-warning))] data-[status=error]:[--_alert-bg-default:var(--moduix-alert-error-bg,color-mix(in_oklab,var(--moduix-color-destructive)_9%,var(--moduix-color-background)))] data-[status=error]:[--_alert-border-color-default:var(--moduix-alert-error-border-color,color-mix(in_oklab,var(--moduix-color-destructive)_35%,transparent))] data-[status=error]:[--_alert-color-default:var(--moduix-alert-error-color,var(--moduix-color-foreground))] data-[status=error]:[--_alert-indicator-color-default:var(--moduix-alert-error-indicator-color,var(--moduix-color-destructive))]';

const rootChildClassName =
  "[&>[data-part='title']]:[grid-column:2] [&>[data-part='description']]:[grid-column:2] [&:not(:has(>[data-part='indicator']))]:grid-cols-[minmax(0,1fr)] [&:not(:has(>[data-part='indicator']))_>[data-part='content']]:[grid-column:1] [&:not(:has(>[data-part='indicator']))_>[data-part='title']]:[grid-column:1] [&:not(:has(>[data-part='indicator']))_>[data-part='description']]:[grid-column:1]";

const indicatorClassName =
  'inline-flex size-[var(--moduix-alert-indicator-size,var(--moduix-spacing-4))] shrink-0 items-center justify-center text-[color:var(--moduix-alert-indicator-color,var(--_alert-indicator-color-default,currentColor))] [margin-block-start:var(--moduix-alert-indicator-offset,var(--moduix-spacing-0-5))] [&_svg]:size-[var(--moduix-alert-indicator-size,var(--moduix-spacing-4))] [&_svg]:shrink-0 [&_svg]:pointer-events-none';

const contentClassName =
  'grid min-w-0 gap-[var(--moduix-alert-content-gap,var(--moduix-spacing-1))]';

const titleClassName =
  'm-0 min-w-0 text-[color:var(--moduix-alert-title-color,var(--moduix-alert-color,var(--_alert-color-default)))] text-[length:var(--moduix-alert-title-font-size,var(--moduix-text-sm))] leading-[var(--moduix-alert-title-line-height,var(--moduix-line-height-text-sm))] [font-weight:var(--moduix-alert-title-font-weight,var(--moduix-weight-semibold))] [overflow-wrap:anywhere]';

const descriptionClassName =
  'min-w-0 text-[color:var(--moduix-alert-description-color,var(--moduix-color-muted-foreground))] text-[length:var(--moduix-alert-description-font-size,var(--moduix-text-sm))] leading-[var(--moduix-alert-description-line-height,var(--moduix-line-height-text-sm))] [overflow-wrap:anywhere] [&>:first-child]:[margin-block-start:0] [&>:last-child]:mb-0';

const actionsClassName =
  'flex flex-wrap gap-[var(--moduix-alert-actions-gap,var(--moduix-spacing-2))] [margin-block-start:var(--moduix-alert-actions-margin-top,var(--moduix-spacing-2))]';

const AlertRoot = forwardRef<ComponentRef<typeof ark.div>, AlertRootProps>(function AlertRoot(
  { children, className, role, status = 'info', ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      role={role ?? (status === 'error' ? 'alert' : 'status')}
      data-scope="alert"
      data-part="root"
      data-slot="alert-root"
      data-status={status}
      className={cn(rootClassName, rootChildClassName, className)}
      {...props}
    >
      {children}
    </ark.div>
  );
});

const AlertIndicator = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function AlertIndicator({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        data-scope="alert"
        data-part="indicator"
        data-slot="alert-indicator"
        aria-hidden="true"
        className={cn(indicatorClassName, className)}
        {...props}
      />
    );
  },
);

const AlertContent = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function AlertContent({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="alert"
        data-part="content"
        data-slot="alert-content"
        className={cn(contentClassName, className)}
        {...props}
      />
    );
  },
);

const AlertTitle = forwardRef<ComponentRef<typeof ark.p>, HTMLArkProps<'p'>>(function AlertTitle(
  { className, ...props },
  ref,
) {
  return (
    <ark.p
      ref={ref}
      data-scope="alert"
      data-part="title"
      data-slot="alert-title"
      className={cn(titleClassName, className)}
      {...props}
    />
  );
});

const AlertDescription = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function AlertDescription({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="alert"
        data-part="description"
        data-slot="alert-description"
        className={cn(descriptionClassName, className)}
        {...props}
      />
    );
  },
);

const AlertActions = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function AlertActions({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="alert"
        data-part="actions"
        data-slot="alert-actions"
        className={cn(actionsClassName, className)}
        {...props}
      />
    );
  },
);

const Alert = Object.assign(AlertRoot, {
  Root: AlertRoot,
  Indicator: AlertIndicator,
  Content: AlertContent,
  Title: AlertTitle,
  Description: AlertDescription,
  Actions: AlertActions,
});

export { Alert };