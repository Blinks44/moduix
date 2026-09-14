'use client';

import {
  useDatePicker,
  useDatePickerContext,
  type UseDatePickerReturn,
} from '@ark-ui/react/date-picker';
import { DatePicker as DatePickerPrimitive } from '@ark-ui/react/date-picker';
import { useFieldContext } from '@ark-ui/react/field';
import { useFieldsetContext } from '@ark-ui/react/fieldset';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/lib/moduix/icons/ui';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';

type DatePickerRootProps = ComponentProps<typeof DatePickerPrimitive.Root> & OverlayPortalProps;
type DatePickerRootProviderProps = ComponentProps<typeof DatePickerPrimitive.RootProvider> &
  OverlayPortalProps;
type DatePickerFieldProps = ComponentProps<typeof DatePickerPrimitive.Control> & {
  clearLabel?: string;
  clearTriggerProps?: ComponentProps<typeof DatePickerPrimitive.ClearTrigger>;
  inputProps?: ComponentProps<typeof DatePickerPrimitive.Input>;
  placeholder?: ComponentProps<typeof DatePickerPrimitive.Input>['placeholder'];
  triggerLabel?: string;
  triggerProps?: ComponentProps<typeof DatePickerPrimitive.Trigger>;
};
type DatePickerRangeFieldProps = ComponentProps<typeof DatePickerPrimitive.Control> & {
  clearLabel?: string;
  clearTriggerProps?: ComponentProps<typeof DatePickerPrimitive.ClearTrigger>;
  endInputProps?: ComponentProps<typeof DatePickerPrimitive.Input>;
  endPlaceholder?: ComponentProps<typeof DatePickerPrimitive.Input>['placeholder'];
  startInputProps?: ComponentProps<typeof DatePickerPrimitive.Input>;
  startPlaceholder?: ComponentProps<typeof DatePickerPrimitive.Input>['placeholder'];
  triggerLabel?: string;
  triggerProps?: ComponentProps<typeof DatePickerPrimitive.Trigger>;
};
type DatePickerOffset = ReturnType<UseDatePickerReturn['getOffset']>;
type DatePickerDayTableProps = ComponentProps<typeof DatePickerPrimitive.Table> & {
  offset?: DatePickerOffset;
  showHeader?: boolean;
  showWeekNumbers?: boolean;
};

const DatePickerRoot = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Root>,
  DatePickerRootProps
>(function DatePickerRoot(
  {
    className,
    disabled,
    invalid,
    lazyMount = true,
    portalled,
    portalRef,
    readOnly,
    required,
    unmountOnExit = true,
    ...props
  },
  ref,
) {
  const field = useFieldContext();
  const fieldset = useFieldsetContext();

  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DatePickerPrimitive.Root
        ref={ref}
        data-slot="date-picker-root"
        className={cn(
          "group/date-picker inline-flex w-75 max-w-full flex-col items-start gap-1 text-foreground has-[input[data-index='1']]:w-96 data-disabled:opacity-50 data-readonly:opacity-50",
          className,
        )}
        disabled={disabled ?? field?.disabled ?? fieldset?.disabled}
        invalid={invalid ?? field?.invalid ?? fieldset?.invalid}
        lazyMount={lazyMount}
        readOnly={readOnly ?? field?.readOnly}
        required={required ?? field?.required}
        unmountOnExit={unmountOnExit}
        {...props}
      />
    </OverlayPortalProvider>
  );
});

const DatePickerRootProvider = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.RootProvider>,
  DatePickerRootProviderProps
>(function DatePickerRootProvider(
  { className, lazyMount = true, portalled, portalRef, unmountOnExit = true, ...props },
  ref,
) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DatePickerPrimitive.RootProvider
        ref={ref}
        data-slot="date-picker-root-provider"
        className={cn(
          "group/date-picker inline-flex w-75 max-w-full flex-col items-start gap-1 text-foreground has-[input[data-index='1']]:w-96 data-disabled:opacity-50 data-readonly:opacity-50",
          className,
        )}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
      />
    </OverlayPortalProvider>
  );
});

const DatePickerLabel = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Label>,
  ComponentProps<typeof DatePickerPrimitive.Label>
>(function DatePickerLabel({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.Label
      ref={ref}
      data-slot="date-picker-label"
      className={cn(
        'inline-flex items-center text-sm leading-5 font-medium text-foreground select-none',
        className,
      )}
      {...props}
    />
  );
});

const DatePickerControl = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Control>,
  ComponentProps<typeof DatePickerPrimitive.Control>
>(function DatePickerControl({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.Control
      ref={ref}
      data-slot="date-picker-control"
      className={cn(
        'group/date-picker-control relative flex w-full min-w-0 items-center gap-2 text-foreground',
        className,
      )}
      {...props}
    />
  );
});

const DatePickerField = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Control>,
  DatePickerFieldProps
>(function DatePickerField(
  { clearLabel, clearTriggerProps, inputProps, placeholder, triggerLabel, triggerProps, ...props },
  ref,
) {
  return (
    <DatePickerControl ref={ref} {...props}>
      <DatePickerInput
        {...(placeholder === undefined ? {} : { placeholder })}
        {...inputProps}
        index={0}
      />
      <DatePickerClearTrigger
        {...(clearLabel === undefined ? {} : { 'aria-label': clearLabel })}
        {...clearTriggerProps}
      />
      <DatePickerTrigger
        {...(triggerLabel === undefined ? {} : { 'aria-label': triggerLabel })}
        {...triggerProps}
      />
    </DatePickerControl>
  );
});

const DatePickerRangeField = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Control>,
  DatePickerRangeFieldProps
>(function DatePickerRangeField(
  {
    clearLabel,
    clearTriggerProps,
    endInputProps,
    endPlaceholder,
    startInputProps,
    startPlaceholder,
    triggerLabel,
    triggerProps,
    ...props
  },
  ref,
) {
  return (
    <DatePickerControl ref={ref} {...props}>
      <DatePickerInput
        {...(startPlaceholder === undefined ? {} : { placeholder: startPlaceholder })}
        {...startInputProps}
        index={0}
      />
      <DatePickerInput
        {...(endPlaceholder === undefined ? {} : { placeholder: endPlaceholder })}
        {...endInputProps}
        index={1}
      />
      <DatePickerClearTrigger
        {...(clearLabel === undefined ? {} : { 'aria-label': clearLabel })}
        {...clearTriggerProps}
      />
      <DatePickerTrigger
        {...(triggerLabel === undefined ? {} : { 'aria-label': triggerLabel })}
        {...triggerProps}
      />
    </DatePickerControl>
  );
});

const DatePickerInput = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Input>,
  ComponentProps<typeof DatePickerPrimitive.Input>
>(function DatePickerInput({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.Input
      ref={ref}
      data-slot="date-picker-input"
      className={cn(
        "readonly:cursor-default h-control-md w-full min-w-30 flex-1 rounded-md border border-border bg-background ps-3.5 pe-17 text-md leading-6 text-current outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,color,outline-color,opacity] duration-200 ease-in-out group-has-[input[data-index='1']]/date-picker:pe-3.5 group-data-focus/date-picker-control:border-ring group-data-focus/date-picker-control:outline-ring placeholder:text-muted-foreground focus:border-ring focus:outline-ring disabled:cursor-default aria-invalid:border-destructive aria-invalid:outline-destructive data-disabled:cursor-default data-invalid:border-destructive data-invalid:outline-destructive data-readonly:cursor-default data-[index='1']:pe-17 motion-reduce:transition-none",
        'py-1',
        className,
      )}
      {...props}
    />
  );
});

const DatePickerTrigger = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Trigger>,
  ComponentProps<typeof DatePickerPrimitive.Trigger>
>(function DatePickerTrigger({ asChild, className, children, ...props }, ref) {
  return (
    <DatePickerPrimitive.Trigger
      ref={ref}
      data-slot="date-picker-trigger"
      asChild={asChild}
      className={cn(
        !asChild &&
          'absolute end-2 top-1/2 inline-flex size-control-xs shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm bg-transparent p-0 leading-none text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground',
        className,
      )}
      {...props}
    >
      {children ?? <CalendarIcon />}
    </DatePickerPrimitive.Trigger>
  );
});

const DatePickerClearTrigger = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.ClearTrigger>,
  ComponentProps<typeof DatePickerPrimitive.ClearTrigger>
>(function DatePickerClearTrigger(
  {
    asChild,
    className,
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  },
  ref,
) {
  return (
    <DatePickerPrimitive.ClearTrigger
      ref={ref}
      asChild
      data-slot="date-picker-clear-trigger"
      className={cn(
        'absolute end-[2.125rem] top-1/2 inline-flex size-control-xs shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm bg-transparent p-0 leading-none text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground',
        className,
      )}
      {...(asChild && ariaLabel !== undefined ? { 'aria-label': ariaLabel } : {})}
      {...(asChild && ariaLabelledBy !== undefined ? { 'aria-labelledby': ariaLabelledBy } : {})}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <CloseButton.Root
          {...(ariaLabel === undefined ? {} : { 'aria-label': ariaLabel })}
          {...(ariaLabelledBy === undefined ? {} : { 'aria-labelledby': ariaLabelledBy })}
          className={cn('size-control-xs [&>svg]:size-4', className)}
        >
          {children}
        </CloseButton.Root>
      )}
    </DatePickerPrimitive.ClearTrigger>
  );
});

const DatePickerPositioner = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Positioner>,
  ComponentProps<typeof DatePickerPrimitive.Positioner>
>(function DatePickerPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <DatePickerPrimitive.Positioner
        ref={ref}
        data-slot="date-picker-positioner"
        className={cn('z-[var(--z-index)] outline-0', className)}
        {...props}
      />
    </OverlayPortal>
  );
});

const DatePickerContent = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Content>,
  ComponentProps<typeof DatePickerPrimitive.Content>
>(function DatePickerContent({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.Content
      ref={ref}
      data-slot="date-picker-content"
      className={cn(
        'z-[calc(60+var(--layer-index,0))] w-75 max-w-[min(calc(100vw-2rem),var(--available-width))] min-w-[min(18.75rem,var(--available-width))] origin-[var(--transform-origin)] rounded-md border border-border bg-popover p-3 text-popover-foreground shadow-lg outline-0 data-inline:min-w-72 data-inline:shadow-none data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
        className,
      )}
      {...props}
    />
  );
});

const DatePickerView = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.View>,
  ComponentProps<typeof DatePickerPrimitive.View>
>(function DatePickerView({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.View
      ref={ref}
      data-slot="date-picker-view"
      className={cn('grid gap-3', className)}
      {...props}
    />
  );
});

const DatePickerViewControl = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.ViewControl>,
  ComponentProps<typeof DatePickerPrimitive.ViewControl>
>(function DatePickerViewControl({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.ViewControl
      ref={ref}
      data-slot="date-picker-view-control"
      className={cn('flex min-w-0 items-center justify-between gap-2', className)}
      {...props}
    />
  );
});

const DatePickerPrevTrigger = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.PrevTrigger>,
  ComponentProps<typeof DatePickerPrimitive.PrevTrigger>
>(function DatePickerPrevTrigger({ asChild, className, children, ...props }, ref) {
  return (
    <DatePickerPrimitive.PrevTrigger
      ref={ref}
      data-slot="date-picker-prev-trigger"
      asChild={asChild}
      className={cn(
        !asChild &&
          'inline-flex size-control-sm shrink-0 cursor-pointer items-center justify-center rounded-sm bg-transparent p-0 leading-none text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground',
        className,
      )}
      {...props}
    >
      {children ?? <ChevronLeftIcon />}
    </DatePickerPrimitive.PrevTrigger>
  );
});

const DatePickerNextTrigger = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.NextTrigger>,
  ComponentProps<typeof DatePickerPrimitive.NextTrigger>
>(function DatePickerNextTrigger({ asChild, className, children, ...props }, ref) {
  return (
    <DatePickerPrimitive.NextTrigger
      ref={ref}
      data-slot="date-picker-next-trigger"
      asChild={asChild}
      className={cn(
        !asChild &&
          'inline-flex size-control-sm shrink-0 cursor-pointer items-center justify-center rounded-sm bg-transparent p-0 leading-none text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground',
        className,
      )}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </DatePickerPrimitive.NextTrigger>
  );
});

const DatePickerRangeText = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.RangeText>,
  ComponentProps<typeof DatePickerPrimitive.RangeText>
>(function DatePickerRangeText({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.RangeText
      ref={ref}
      data-slot="date-picker-range-text"
      className={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', className)}
      {...props}
    />
  );
});

const DatePickerViewTrigger = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.ViewTrigger>,
  ComponentProps<typeof DatePickerPrimitive.ViewTrigger>
>(function DatePickerViewTrigger({ asChild, className, children, ...props }, ref) {
  return (
    <DatePickerPrimitive.ViewTrigger
      ref={ref}
      data-slot="date-picker-view-trigger"
      asChild={asChild}
      className={cn(
        !asChild &&
          'inline-flex min-h-control-sm min-w-0 flex-1 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-sm bg-transparent px-2 text-sm leading-5 font-medium text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground',
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <DatePickerRangeText />
          <ChevronDownIcon />
        </>
      )}
    </DatePickerPrimitive.ViewTrigger>
  );
});

const DatePickerTable = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Table>,
  ComponentProps<typeof DatePickerPrimitive.Table>
>(function DatePickerTable({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.Table
      ref={ref}
      data-slot="date-picker-table"
      className={cn('w-full table-fixed border-separate border-spacing-0.5', className)}
      {...props}
    />
  );
});

const DatePickerTableHead = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableHead>,
  ComponentProps<typeof DatePickerPrimitive.TableHead>
>(function DatePickerTableHead({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.TableHead
      ref={ref}
      data-slot="date-picker-table-head"
      className={className}
      {...props}
    />
  );
});

const DatePickerTableBody = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableBody>,
  ComponentProps<typeof DatePickerPrimitive.TableBody>
>(function DatePickerTableBody({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.TableBody
      ref={ref}
      data-slot="date-picker-table-body"
      className={className}
      {...props}
    />
  );
});

const DatePickerTableRow = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableRow>,
  ComponentProps<typeof DatePickerPrimitive.TableRow>
>(function DatePickerTableRow({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.TableRow
      ref={ref}
      data-slot="date-picker-table-row"
      className={className}
      {...props}
    />
  );
});

const DatePickerTableHeader = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableHeader>,
  ComponentProps<typeof DatePickerPrimitive.TableHeader>
>(function DatePickerTableHeader({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.TableHeader
      ref={ref}
      data-slot="date-picker-table-header"
      className={cn(
        'h-7 w-control-sm text-center text-xs leading-4 font-medium text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
});

const DatePickerWeekNumberHeaderCell = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.WeekNumberHeaderCell>,
  ComponentProps<typeof DatePickerPrimitive.WeekNumberHeaderCell>
>(function DatePickerWeekNumberHeaderCell({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.WeekNumberHeaderCell
      ref={ref}
      data-slot="date-picker-week-number-header-cell"
      className={cn(
        'h-7 w-control-sm text-center text-xs leading-4 font-medium text-muted-foreground tabular-nums',
        className,
      )}
      {...props}
    />
  );
});

const DatePickerWeekNumberCell = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.WeekNumberCell>,
  ComponentProps<typeof DatePickerPrimitive.WeekNumberCell>
>(function DatePickerWeekNumberCell({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.WeekNumberCell
      ref={ref}
      data-slot="date-picker-week-number-cell"
      className={cn(
        'h-7 w-control-sm text-center text-xs leading-4 font-medium text-muted-foreground tabular-nums',
        className,
      )}
      {...props}
    />
  );
});

const DatePickerTableCell = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableCell>,
  ComponentProps<typeof DatePickerPrimitive.TableCell>
>(function DatePickerTableCell({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.TableCell
      ref={ref}
      data-slot="date-picker-table-cell"
      className={cn('h-control-sm w-control-sm p-0 text-center', className)}
      {...props}
    />
  );
});

const DatePickerTableCellTrigger = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableCellTrigger>,
  ComponentProps<typeof DatePickerPrimitive.TableCellTrigger>
>(function DatePickerTableCellTrigger({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.TableCellTrigger
      ref={ref}
      data-slot="date-picker-table-cell-trigger"
      className={cn(
        'inline-flex h-control-sm w-full min-w-control-sm cursor-pointer items-center justify-center rounded-sm bg-transparent p-0 text-sm leading-5 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring data-in-hover-range:bg-muted data-in-hover-range:text-foreground data-in-range:bg-muted data-in-range:text-foreground data-outside-range:text-muted-foreground data-selected:bg-primary data-selected:text-primary-foreground data-today:border-ring data-unavailable:text-muted-foreground motion-reduce:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-selected]):hover]:bg-accent [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-selected]):hover]:text-accent-foreground',
        className,
      )}
      {...props}
    />
  );
});

const DatePickerDayTable = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Table>,
  DatePickerDayTableProps
>(function DatePickerDayTable(
  { offset, showHeader = true, showWeekNumbers = false, ...props },
  ref,
) {
  return (
    <DatePickerPrimitive.Context>
      {(datePicker) => (
        <>
          {showHeader ? (
            <DatePickerViewControl>
              <DatePickerPrevTrigger />
              <DatePickerViewTrigger />
              <DatePickerNextTrigger />
            </DatePickerViewControl>
          ) : null}
          <DatePickerTable ref={ref} {...props}>
            <DatePickerTableHead>
              <DatePickerTableRow>
                {showWeekNumbers ? <DatePickerWeekNumberHeaderCell /> : null}
                {datePicker.weekDays.map((weekDay) => (
                  <DatePickerTableHeader key={weekDay.value.toString()}>
                    {weekDay.short}
                  </DatePickerTableHeader>
                ))}
              </DatePickerTableRow>
            </DatePickerTableHead>
            <DatePickerTableBody>
              {(offset?.weeks ?? datePicker.weeks).map((week, weekIndex) => (
                <DatePickerTableRow key={week[0]?.toString()}>
                  {showWeekNumbers ? (
                    <DatePickerWeekNumberCell week={week} weekIndex={weekIndex}>
                      {datePicker.getWeekNumber(week)}
                    </DatePickerWeekNumberCell>
                  ) : null}
                  {week.map((day) => (
                    <DatePickerTableCell
                      key={day.toString()}
                      value={day}
                      visibleRange={offset?.visibleRange}
                    >
                      <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
                    </DatePickerTableCell>
                  ))}
                </DatePickerTableRow>
              ))}
            </DatePickerTableBody>
          </DatePickerTable>
        </>
      )}
    </DatePickerPrimitive.Context>
  );
});

const DatePickerMonthSelect = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.MonthSelect>,
  ComponentProps<typeof DatePickerPrimitive.MonthSelect>
>(function DatePickerMonthSelect({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.MonthSelect
      ref={ref}
      data-slot="date-picker-month-select"
      className={cn(
        'min-h-control-sm w-full min-w-0 flex-1 cursor-pointer rounded-sm border border-border bg-background px-2 py-1 text-sm leading-5 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color] duration-200 ease-in-out focus:border-ring focus:outline-ring motion-reduce:transition-none',
        className,
      )}
      {...props}
    />
  );
});

const DatePickerYearSelect = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.YearSelect>,
  ComponentProps<typeof DatePickerPrimitive.YearSelect>
>(function DatePickerYearSelect({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.YearSelect
      ref={ref}
      data-slot="date-picker-year-select"
      className={cn(
        'min-h-control-sm w-full min-w-0 flex-1 cursor-pointer rounded-sm border border-border bg-background px-2 py-1 text-sm leading-5 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color] duration-200 ease-in-out focus:border-ring focus:outline-ring motion-reduce:transition-none',
        className,
      )}
      {...props}
    />
  );
});

const DatePickerPresetTrigger = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.PresetTrigger>,
  ComponentProps<typeof DatePickerPrimitive.PresetTrigger>
>(function DatePickerPresetTrigger({ asChild, className, ...props }, ref) {
  return (
    <DatePickerPrimitive.PresetTrigger
      ref={ref}
      data-slot="date-picker-preset-trigger"
      asChild={asChild}
      className={cn(
        !asChild &&
          'inline-flex min-h-control-sm shrink-0 cursor-pointer items-center justify-center rounded-sm bg-muted px-2 text-sm leading-5 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring data-selected:bg-primary data-selected:text-primary-foreground motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-selected]):hover]:bg-accent',
        className,
      )}
      {...props}
    />
  );
});

const DatePickerValueText = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.ValueText>,
  ComponentProps<typeof DatePickerPrimitive.ValueText>
>(function DatePickerValueText({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.ValueText
      ref={ref}
      data-slot="date-picker-value-text"
      className={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', className)}
      {...props}
    />
  );
});

const DatePicker = Object.assign(DatePickerRoot, {
  Root: DatePickerRoot,
  RootProvider: DatePickerRootProvider,
  Context: DatePickerPrimitive.Context,
  Label: DatePickerLabel,
  Control: DatePickerControl,
  Field: DatePickerField,
  RangeField: DatePickerRangeField,
  Input: DatePickerInput,
  Trigger: DatePickerTrigger,
  ClearTrigger: DatePickerClearTrigger,
  Positioner: DatePickerPositioner,
  Content: DatePickerContent,
  View: DatePickerView,
  ViewControl: DatePickerViewControl,
  PrevTrigger: DatePickerPrevTrigger,
  NextTrigger: DatePickerNextTrigger,
  ViewTrigger: DatePickerViewTrigger,
  RangeText: DatePickerRangeText,
  ValueText: DatePickerValueText,
  Table: DatePickerTable,
  TableHead: DatePickerTableHead,
  TableBody: DatePickerTableBody,
  TableRow: DatePickerTableRow,
  TableHeader: DatePickerTableHeader,
  TableCell: DatePickerTableCell,
  TableCellTrigger: DatePickerTableCellTrigger,
  DayTable: DatePickerDayTable,
  WeekNumberHeaderCell: DatePickerWeekNumberHeaderCell,
  WeekNumberCell: DatePickerWeekNumberCell,
  MonthSelect: DatePickerMonthSelect,
  YearSelect: DatePickerYearSelect,
  PresetTrigger: DatePickerPresetTrigger,
});

export { DatePicker, useDatePicker, useDatePickerContext };
export type {
  DatePickerDayTableProps,
  DatePickerFieldProps,
  DatePickerRangeFieldProps,
  DatePickerRootProps,
  DatePickerRootProviderProps,
};