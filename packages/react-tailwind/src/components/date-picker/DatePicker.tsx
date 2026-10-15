'use client';

import {
  DatePicker as DatePickerPrimitive,
  useDatePicker,
  useDatePickerContext,
} from '@ark-ui/react/date-picker';
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
type DatePickerFieldProps = Omit<
  ComponentProps<typeof DatePickerPrimitive.Control>,
  'asChild' | 'children'
> & {
  clearLabel?: string;
  clearTriggerProps?: ComponentProps<typeof DatePickerPrimitive.ClearTrigger>;
  inputProps?: ComponentProps<typeof DatePickerPrimitive.Input>;
  placeholder?: ComponentProps<typeof DatePickerPrimitive.Input>['placeholder'];
  triggerLabel?: string;
  triggerProps?: ComponentProps<typeof DatePickerPrimitive.Trigger>;
};
type DatePickerRangeFieldProps = Omit<
  ComponentProps<typeof DatePickerPrimitive.Control>,
  'asChild' | 'children'
> & {
  clearLabel?: string;
  clearTriggerProps?: ComponentProps<typeof DatePickerPrimitive.ClearTrigger>;
  endInputProps?: ComponentProps<typeof DatePickerPrimitive.Input>;
  endPlaceholder?: ComponentProps<typeof DatePickerPrimitive.Input>['placeholder'];
  startInputProps?: ComponentProps<typeof DatePickerPrimitive.Input>;
  startPlaceholder?: ComponentProps<typeof DatePickerPrimitive.Input>['placeholder'];
  triggerLabel?: string;
  triggerProps?: ComponentProps<typeof DatePickerPrimitive.Trigger>;
};
type DatePickerTableSugarProps = Omit<
  ComponentProps<typeof DatePickerPrimitive.Table>,
  'asChild' | 'children'
> & {
  showHeader?: boolean;
};
type DatePickerDayTableProps = Omit<DatePickerTableSugarProps, 'columns'> & {
  /** Shows the month this many months after the visible one, for multi-month layouts. */
  offset?: number;
};
type DatePickerMonthTableProps = DatePickerTableSugarProps & {
  format?: 'short' | 'long';
};
type DatePickerYearTableProps = DatePickerTableSugarProps;

const rootClass =
  "group/date-picker inline-flex w-75 max-w-full flex-col items-start gap-1 text-foreground has-[input[data-index='1']]:w-96 data-disabled:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100";
const actionClass =
  'box-border inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm bg-transparent p-0 leading-none text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):hover]:text-foreground';
const tableHeaderClass =
  'h-7 w-control-sm text-center text-xs leading-4 font-medium text-muted-foreground tabular-nums';
const selectControlClass = 'relative grid min-w-0';
const selectClass =
  'peer/date-picker-select box-border h-control-sm w-full min-w-0 cursor-pointer appearance-none rounded-md border border-border bg-background py-1 ps-3.5 pe-[calc(var(--moduix-spacing-2)+var(--moduix-size-xs)+var(--moduix-spacing-3-5))] text-sm leading-5 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 motion-reduce:transition-none forced-colors:appearance-auto forced-colors:pe-3.5';
const selectIndicatorClass =
  'pointer-events-none absolute end-2 top-1/2 inline-flex size-control-xs -translate-y-1/2 items-center justify-center text-muted-foreground peer-disabled/date-picker-select:opacity-50 forced-colors:hidden [&>svg]:block [&>svg]:size-4';

const DatePicker = forwardRef<ComponentRef<typeof DatePickerPrimitive.Root>, DatePickerRootProps>(
  function DatePicker(
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
          className={cn(rootClass, className)}
          disabled={disabled ?? field?.disabled ?? fieldset?.disabled}
          invalid={invalid ?? field?.invalid ?? fieldset?.invalid}
          lazyMount={lazyMount}
          readOnly={readOnly ?? field?.readOnly}
          required={required ?? field?.required}
          unmountOnExit={unmountOnExit}
          {...props}
          data-slot="date-picker-root"
        />
      </OverlayPortalProvider>
    );
  },
);

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
        className={cn(rootClass, className)}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
        data-slot="date-picker-root-provider"
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
      className={cn('text-sm leading-5 font-medium text-foreground select-none', className)}
      {...props}
      data-slot="date-picker-label"
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
      className={cn('relative flex w-full min-w-0 items-center gap-2', className)}
      {...props}
      data-slot="date-picker-control"
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
    <DatePickerControl ref={ref} {...props} asChild={false}>
      <DatePickerInput placeholder={placeholder} {...inputProps} index={0} />
      <DatePickerClearTrigger aria-label={clearLabel} {...clearTriggerProps} />
      <DatePickerTrigger aria-label={triggerLabel} {...triggerProps} />
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
    <DatePickerControl ref={ref} {...props} asChild={false}>
      <DatePickerInput placeholder={startPlaceholder} {...startInputProps} index={0} />
      <DatePickerInput placeholder={endPlaceholder} {...endInputProps} index={1} />
      <DatePickerClearTrigger aria-label={clearLabel} {...clearTriggerProps} />
      <DatePickerTrigger aria-label={triggerLabel} {...triggerProps} />
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
      className={cn(
        "box-border h-control-md w-full min-w-30 flex-1 rounded-md border border-border bg-background py-1 ps-3.5 pe-17 text-md leading-6 text-current outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out group-has-[input[data-index='1']]/date-picker:pe-3.5 placeholder:text-muted-foreground read-only:cursor-default focus:border-ring focus:outline-ring disabled:cursor-default data-invalid:border-destructive data-invalid:outline-destructive data-[index='1']:pe-17 motion-reduce:transition-none",
        className,
      )}
      {...props}
      data-slot="date-picker-input"
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
      asChild={asChild}
      className={cn(
        !asChild && [actionClass, 'absolute end-2 top-1/2 size-control-xs -translate-y-1/2'],
        className,
      )}
      {...props}
      data-slot="date-picker-trigger"
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
  const triggerClassName = cn(
    'absolute end-[2.125rem] top-1/2 size-control-xs -translate-y-1/2',
    className,
  );

  return (
    <DatePickerPrimitive.ClearTrigger
      ref={ref}
      asChild
      className={triggerClassName}
      aria-label={asChild ? ariaLabel : undefined}
      aria-labelledby={asChild ? ariaLabelledBy : undefined}
      {...props}
      data-slot="date-picker-clear-trigger"
    >
      {asChild ? (
        children
      ) : (
        <CloseButton aria-label={ariaLabel} aria-labelledby={ariaLabelledBy}>
          {children}
        </CloseButton>
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
        className={cn('z-[var(--z-index)]', className)}
        {...props}
        data-slot="date-picker-positioner"
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
      className={cn(
        'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] box-border max-h-[min(var(--available-height,100dvh),calc(100dvh-2rem))] w-80 max-w-[min(calc(100vw-2rem),var(--available-width,100%))] origin-[var(--transform-origin)] overflow-auto rounded-md border border-border bg-popover p-3 text-popover-foreground shadow-lg outline-0 data-inline:shadow-none data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:data-[state]:[animation-delay:0ms] motion-reduce:data-[state]:[animation-duration:1ms]',
        className,
      )}
      {...props}
      data-slot="date-picker-content"
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
      className={cn('grid gap-3', className)}
      {...props}
      data-slot="date-picker-view"
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
      className={cn('flex min-w-0 items-center justify-between gap-2', className)}
      {...props}
      data-slot="date-picker-view-control"
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
      asChild={asChild}
      className={cn(!asChild && [actionClass, 'size-control-sm disabled:opacity-50'], className)}
      {...props}
      data-slot="date-picker-prev-trigger"
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
      asChild={asChild}
      className={cn(!asChild && [actionClass, 'size-control-sm disabled:opacity-50'], className)}
      {...props}
      data-slot="date-picker-next-trigger"
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
      className={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', className)}
      {...props}
      data-slot="date-picker-range-text"
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
      asChild={asChild}
      className={cn(
        !asChild && [
          actionClass,
          'min-h-control-sm min-w-0 flex-1 gap-2 px-2 text-sm leading-5 font-medium text-foreground disabled:opacity-50',
        ],
        className,
      )}
      {...props}
      data-slot="date-picker-view-trigger"
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
      className={cn('w-full table-fixed border-separate border-spacing-0.5', className)}
      {...props}
      data-slot="date-picker-table"
    />
  );
});

const DatePickerTableHead = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableHead>,
  ComponentProps<typeof DatePickerPrimitive.TableHead>
>(function DatePickerTableHead(props, ref) {
  return <DatePickerPrimitive.TableHead ref={ref} {...props} data-slot="date-picker-table-head" />;
});

const DatePickerTableBody = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableBody>,
  ComponentProps<typeof DatePickerPrimitive.TableBody>
>(function DatePickerTableBody(props, ref) {
  return <DatePickerPrimitive.TableBody ref={ref} {...props} data-slot="date-picker-table-body" />;
});

const DatePickerTableRow = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableRow>,
  ComponentProps<typeof DatePickerPrimitive.TableRow>
>(function DatePickerTableRow(props, ref) {
  return <DatePickerPrimitive.TableRow ref={ref} {...props} data-slot="date-picker-table-row" />;
});

const DatePickerTableHeader = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.TableHeader>,
  ComponentProps<typeof DatePickerPrimitive.TableHeader>
>(function DatePickerTableHeader({ className, ...props }, ref) {
  return (
    <DatePickerPrimitive.TableHeader
      ref={ref}
      className={cn(tableHeaderClass, className)}
      {...props}
      data-slot="date-picker-table-header"
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
      className={cn(tableHeaderClass, className)}
      {...props}
      data-slot="date-picker-week-number-header-cell"
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
      className={cn(tableHeaderClass, className)}
      {...props}
      data-slot="date-picker-week-number-cell"
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
      className={cn('h-control-sm w-control-sm p-0 text-center', className)}
      {...props}
      data-slot="date-picker-table-cell"
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
      className={cn(
        'box-border inline-flex h-control-sm w-full min-w-control-sm cursor-pointer items-center justify-center rounded-sm border border-transparent bg-transparent p-0 text-sm leading-5 outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,color,outline-color] duration-200 ease-in-out focus-visible:outline-ring data-disabled:cursor-default data-disabled:opacity-50 data-in-hover-range:bg-muted data-in-hover-range:text-foreground data-in-range:bg-muted data-in-range:text-foreground data-outside-range:not-data-disabled:text-muted-foreground data-selected:bg-primary data-selected:text-primary-foreground data-today:border-ring motion-reduce:transition-none [@media(hover:hover)]:[&:not([data-disabled]):not([data-selected]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):not([data-selected]):hover]:text-accent-foreground',
        className,
      )}
      {...props}
      data-slot="date-picker-table-cell-trigger"
    />
  );
});

function DatePickerHeader() {
  return (
    <DatePickerViewControl>
      <DatePickerPrevTrigger />
      <DatePickerViewTrigger />
      <DatePickerNextTrigger />
    </DatePickerViewControl>
  );
}

const DatePickerDayTable = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Table>,
  DatePickerDayTableProps
>(function DatePickerDayTable({ offset, showHeader = true, ...props }, ref) {
  const datePicker = useDatePickerContext();
  const offsetMonth = offset ? datePicker.getOffset({ months: offset }) : undefined;

  return (
    <>
      {showHeader ? <DatePickerHeader /> : null}
      <DatePickerTable ref={ref} {...props} asChild={false}>
        <DatePickerTableHead>
          <DatePickerTableRow>
            {datePicker.showWeekNumbers ? <DatePickerWeekNumberHeaderCell /> : null}
            {datePicker.weekDays.map((weekDay) => (
              <DatePickerTableHeader key={weekDay.value.toString()}>
                {weekDay.short}
              </DatePickerTableHeader>
            ))}
          </DatePickerTableRow>
        </DatePickerTableHead>
        <DatePickerTableBody>
          {(offsetMonth?.weeks ?? datePicker.weeks).map((week, weekIndex) => (
            <DatePickerTableRow key={week[0]?.toString()}>
              {datePicker.showWeekNumbers ? (
                <DatePickerWeekNumberCell week={week} weekIndex={weekIndex}>
                  {datePicker.getWeekNumber(week)}
                </DatePickerWeekNumberCell>
              ) : null}
              {week.map((day) => (
                <DatePickerTableCell
                  key={day.toString()}
                  value={day}
                  visibleRange={offsetMonth?.visibleRange}
                >
                  <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
                </DatePickerTableCell>
              ))}
            </DatePickerTableRow>
          ))}
        </DatePickerTableBody>
      </DatePickerTable>
    </>
  );
});

const DatePickerMonthTable = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Table>,
  DatePickerMonthTableProps
>(function DatePickerMonthTable(
  { columns = 4, format = 'short', showHeader = true, ...props },
  ref,
) {
  const datePicker = useDatePickerContext();

  return (
    <>
      {showHeader ? <DatePickerHeader /> : null}
      <DatePickerTable ref={ref} columns={columns} {...props} asChild={false}>
        <DatePickerTableBody>
          {datePicker.getMonthsGrid({ columns, format }).map((months) => (
            <DatePickerTableRow key={months[0]?.value}>
              {months.map((month) => (
                <DatePickerTableCell key={month.value} value={month.value}>
                  <DatePickerTableCellTrigger>{month.label}</DatePickerTableCellTrigger>
                </DatePickerTableCell>
              ))}
            </DatePickerTableRow>
          ))}
        </DatePickerTableBody>
      </DatePickerTable>
    </>
  );
});

const DatePickerYearTable = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.Table>,
  DatePickerYearTableProps
>(function DatePickerYearTable({ columns = 4, showHeader = true, ...props }, ref) {
  const datePicker = useDatePickerContext();

  return (
    <>
      {showHeader ? <DatePickerHeader /> : null}
      <DatePickerTable ref={ref} columns={columns} {...props} asChild={false}>
        <DatePickerTableBody>
          {datePicker.getYearsGrid({ columns }).map((years) => (
            <DatePickerTableRow key={years[0]?.value}>
              {years.map((year) => (
                <DatePickerTableCell key={year.value} value={year.value} disabled={year.disabled}>
                  <DatePickerTableCellTrigger>{year.label}</DatePickerTableCellTrigger>
                </DatePickerTableCell>
              ))}
            </DatePickerTableRow>
          ))}
        </DatePickerTableBody>
      </DatePickerTable>
    </>
  );
});

const DatePickerMonthSelect = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.MonthSelect>,
  ComponentProps<typeof DatePickerPrimitive.MonthSelect>
>(function DatePickerMonthSelect({ className, ...props }, ref) {
  return (
    <span className={selectControlClass} data-slot="date-picker-month-select-control">
      <DatePickerPrimitive.MonthSelect
        ref={ref}
        {...props}
        className={cn(selectClass, className)}
        data-slot="date-picker-month-select"
      />
      <span
        aria-hidden="true"
        className={selectIndicatorClass}
        data-slot="date-picker-month-select-indicator"
      >
        <ChevronDownIcon />
      </span>
    </span>
  );
});

const DatePickerYearSelect = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.YearSelect>,
  ComponentProps<typeof DatePickerPrimitive.YearSelect>
>(function DatePickerYearSelect({ className, ...props }, ref) {
  return (
    <span className={selectControlClass} data-slot="date-picker-year-select-control">
      <DatePickerPrimitive.YearSelect
        ref={ref}
        {...props}
        className={cn(selectClass, className)}
        data-slot="date-picker-year-select"
      />
      <span
        aria-hidden="true"
        className={selectIndicatorClass}
        data-slot="date-picker-year-select-indicator"
      >
        <ChevronDownIcon />
      </span>
    </span>
  );
});

const DatePickerPresetTrigger = forwardRef<
  ComponentRef<typeof DatePickerPrimitive.PresetTrigger>,
  ComponentProps<typeof DatePickerPrimitive.PresetTrigger>
>(function DatePickerPresetTrigger({ asChild, className, ...props }, ref) {
  return (
    <DatePickerPrimitive.PresetTrigger
      ref={ref}
      asChild={asChild}
      className={cn(
        !asChild && [
          actionClass,
          'min-h-control-sm bg-muted px-2 text-sm leading-5 text-foreground disabled:opacity-50 [@media(hover:hover)]:[&:not(:disabled):hover]:bg-accent [@media(hover:hover)]:[&:not(:disabled):hover]:text-accent-foreground',
        ],
        className,
      )}
      {...props}
      data-slot="date-picker-preset-trigger"
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
      className={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', className)}
      {...props}
      data-slot="date-picker-value-text"
    />
  );
});

const DatePickerContext = DatePickerPrimitive.Context;

export {
  DatePicker,
  DatePickerClearTrigger,
  DatePickerContext,
  DatePickerContent,
  DatePickerControl,
  DatePickerDayTable,
  DatePickerField,
  DatePickerInput,
  DatePickerLabel,
  DatePickerMonthSelect,
  DatePickerMonthTable,
  DatePickerNextTrigger,
  DatePickerPositioner,
  DatePickerPresetTrigger,
  DatePickerPrevTrigger,
  DatePickerRangeField,
  DatePickerRangeText,
  DatePickerRootProvider,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerValueText,
  DatePickerView,
  DatePickerViewControl,
  DatePickerViewTrigger,
  DatePickerWeekNumberCell,
  DatePickerWeekNumberHeaderCell,
  DatePickerYearSelect,
  DatePickerYearTable,
  useDatePicker,
  useDatePickerContext,
};
export type {
  DatePickerDayTableProps,
  DatePickerFieldProps,
  DatePickerMonthTableProps,
  DatePickerRangeFieldProps,
  DatePickerRootProps,
  DatePickerRootProviderProps,
  DatePickerYearTableProps,
};
export type {
  DatePickerDateRangePreset,
  DatePickerDateView,
  DatePickerFocusChangeDetails,
  DatePickerOpenChangeDetails,
  DatePickerSelectionMode,
  DatePickerValueChangeDetails,
  DatePickerViewChangeDetails,
  DatePickerVisibleRangeChangeDetails,
  DateValue,
  UseDatePickerProps,
  UseDatePickerReturn,
} from '@ark-ui/react/date-picker';