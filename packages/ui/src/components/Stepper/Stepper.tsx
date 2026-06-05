import { useRender } from '@base-ui/react/use-render';
import { clsx } from 'clsx';
import { createContext, useContext, useMemo, type ComponentProps } from 'react';
import { CheckIcon } from '@/icons/ui';
import styles from './Stepper.module.css';

type StepperOrientation = 'horizontal' | 'vertical';
type StepperStatus = 'inactive' | 'current' | 'completed';

const StepperContext = createContext<{
  currentStep: number | undefined;
  orientation: StepperOrientation;
}>({
  currentStep: undefined,
  orientation: 'horizontal',
});

const StepperItemContext = createContext<{
  status: StepperStatus;
  step: number;
} | null>(null);

const getSafeStep = (step: number) => Math.max(1, Math.floor(step));

function resolveStatus({
  currentStep,
  status,
  step,
}: {
  currentStep: number | undefined;
  status: StepperStatus | undefined;
  step: number;
}) {
  if (status != null) {
    return status;
  }

  if (currentStep == null) {
    return 'inactive';
  }

  if (step < currentStep) {
    return 'completed';
  }

  if (step === currentStep) {
    return 'current';
  }

  return 'inactive';
}

function Stepper({
  className,
  currentStep,
  orientation = 'horizontal',
  'aria-label': ariaLabel = 'Steps',
  ...props
}: ComponentProps<'nav'> & {
  currentStep?: number;
  orientation?: StepperOrientation;
}) {
  const safeCurrentStep = currentStep == null ? undefined : getSafeStep(currentStep);
  const contextValue = useMemo(
    () => ({ currentStep: safeCurrentStep, orientation }),
    [orientation, safeCurrentStep],
  );

  return (
    <StepperContext.Provider value={contextValue}>
      <nav
        data-slot="stepper-root"
        data-orientation={orientation}
        aria-label={ariaLabel}
        className={clsx(styles.root, className)}
        {...props}
      />
    </StepperContext.Provider>
  );
}

function StepperList({ className, ...props }: ComponentProps<'ol'>) {
  const { orientation } = useContext(StepperContext);

  return (
    <ol
      data-slot="stepper-list"
      data-orientation={orientation}
      className={clsx(styles.list, className)}
      {...props}
    />
  );
}

function StepperItem({
  className,
  status,
  step,
  'aria-current': ariaCurrent,
  ...props
}: ComponentProps<'li'> & {
  status?: StepperStatus;
  step: number;
}) {
  const { currentStep, orientation } = useContext(StepperContext);
  const safeStep = getSafeStep(step);
  const resolvedStatus = resolveStatus({ currentStep, status, step: safeStep });
  const contextValue = useMemo(
    () => ({ status: resolvedStatus, step: safeStep }),
    [resolvedStatus, safeStep],
  );

  return (
    <StepperItemContext.Provider value={contextValue}>
      <li
        data-slot="stepper-item"
        data-orientation={orientation}
        data-state={resolvedStatus}
        aria-current={ariaCurrent ?? (resolvedStatus === 'current' ? 'step' : undefined)}
        className={clsx(styles.item, className)}
        {...props}
      />
    </StepperItemContext.Provider>
  );
}

function StepperTrigger({
  className,
  disabled,
  render,
  tabIndex,
  type,
  'aria-current': ariaCurrent,
  'aria-disabled': ariaDisabled,
  ...props
}: useRender.ComponentProps<'button'>) {
  const { orientation } = useContext(StepperContext);
  const item = useContext(StepperItemContext);

  return useRender({
    defaultTagName: 'button',
    render,
    props: {
      ...props,
      'aria-current': ariaCurrent ?? (item?.status === 'current' ? 'step' : undefined),
      'aria-disabled': ariaDisabled ?? (disabled ? true : undefined),
      'data-disabled': disabled ? '' : undefined,
      'data-orientation': orientation,
      'data-slot': 'stepper-trigger',
      'data-state': item?.status,
      className: clsx(styles.trigger, className),
      disabled: render == null ? disabled : undefined,
      tabIndex: disabled && render != null ? -1 : tabIndex,
      type: render == null ? (type ?? 'button') : type,
    },
  });
}

function StepperIndicator({ children, className, ...props }: ComponentProps<'span'>) {
  const { orientation } = useContext(StepperContext);
  const item = useContext(StepperItemContext);

  return (
    <span
      data-slot="stepper-indicator"
      data-orientation={orientation}
      data-state={item?.status}
      className={clsx(styles.indicator, className)}
      {...props}
    >
      {children ?? (item?.status === 'completed' ? <CheckIcon /> : item?.step)}
    </span>
  );
}

function StepperContent({ className, ...props }: ComponentProps<'div'>) {
  const { orientation } = useContext(StepperContext);
  const item = useContext(StepperItemContext);

  return (
    <div
      data-slot="stepper-content"
      data-orientation={orientation}
      data-state={item?.status}
      className={clsx(styles.content, className)}
      {...props}
    />
  );
}

function StepperTitle({ className, ...props }: ComponentProps<'span'>) {
  const item = useContext(StepperItemContext);

  return (
    <span
      data-slot="stepper-title"
      data-state={item?.status}
      className={clsx(styles.title, className)}
      {...props}
    />
  );
}

function StepperDescription({ className, ...props }: ComponentProps<'span'>) {
  const item = useContext(StepperItemContext);

  return (
    <span
      data-slot="stepper-description"
      data-state={item?.status}
      className={clsx(styles.description, className)}
      {...props}
    />
  );
}

export {
  Stepper,
  StepperList,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperContent,
  StepperTitle,
  StepperDescription,
};
export type { StepperOrientation, StepperStatus };