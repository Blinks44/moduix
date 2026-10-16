import {
  DatePicker as DatePickerPrimitive,
  useDatePicker,
  useDatePickerContext,
} from '@ark-ui/solid/date-picker';
import { useFieldContext } from '@ark-ui/solid/field';
import { useFieldsetContext } from '@ark-ui/solid/fieldset';
import type { ComponentProps } from 'solid-js';
import { children, For, Show, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/lib/moduix/icons/ui/Icons';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';

type DatePickerRootProps = ComponentProps<typeof DatePickerPrimitive.Root> & OverlayPortalProps;
type DatePickerRootProviderProps = ComponentProps<typeof DatePickerPrimitive.RootProvider> &
  OverlayPortalProps;
type DatePickerFieldProps = Omit<ComponentProps<typeof DatePickerPrimitive.Control>, 'children'> & {
  clearLabel?: string;
  clearTriggerProps?: ComponentProps<typeof DatePickerPrimitive.ClearTrigger>;
  inputProps?: ComponentProps<typeof DatePickerPrimitive.Input>;
  placeholder?: ComponentProps<typeof DatePickerPrimitive.Input>['placeholder'];
  triggerLabel?: string;
  triggerProps?: ComponentProps<typeof DatePickerPrimitive.Trigger>;
};
type DatePickerRangeFieldProps = Omit<
  ComponentProps<typeof DatePickerPrimitive.Control>,
  'children'
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
  'children'
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

function DatePicker(props: DatePickerRootProps) {
  const [local, others] = splitProps(props, [
    'children',
    'class',
    'disabled',
    'invalid',
    'lazyMount',
    'portalled',
    'portalRef',
    'readOnly',
    'required',
    'unmountOnExit',
  ]);
  const field = useFieldContext();
  const fieldset = useFieldsetContext();

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <DatePickerPrimitive.Root
        class={cn(rootClass, local.class)}
        disabled={local.disabled ?? field?.()?.disabled ?? fieldset?.()?.disabled}
        invalid={local.invalid ?? field?.()?.invalid ?? fieldset?.()?.invalid}
        lazyMount={local.lazyMount ?? true}
        readOnly={local.readOnly ?? field?.()?.readOnly}
        required={local.required ?? field?.()?.required}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
        data-slot="date-picker-root"
      >
        {local.children}
      </DatePickerPrimitive.Root>
    </OverlayPortalProvider>
  );
}

function DatePickerRootProvider(props: DatePickerRootProviderProps) {
  const [local, others] = splitProps(props, [
    'children',
    'class',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <DatePickerPrimitive.RootProvider
        class={cn(rootClass, local.class)}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
        data-slot="date-picker-root-provider"
      >
        {local.children}
      </DatePickerPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

function DatePickerLabel(props: ComponentProps<typeof DatePickerPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.Label
      class={cn('text-sm leading-5 font-medium text-foreground select-none', local.class)}
      {...others}
      data-slot="date-picker-label"
    />
  );
}

function DatePickerControl(props: ComponentProps<typeof DatePickerPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.Control
      class={cn('relative flex w-full min-w-0 items-center gap-2', local.class)}
      {...others}
      data-slot="date-picker-control"
    />
  );
}

function DatePickerField(props: DatePickerFieldProps) {
  const [local, others] = splitProps(props, [
    'clearLabel',
    'clearTriggerProps',
    'inputProps',
    'placeholder',
    'triggerLabel',
    'triggerProps',
  ]);

  return (
    <DatePickerControl {...others}>
      <DatePickerInput placeholder={local.placeholder} {...(local.inputProps ?? {})} index={0} />
      <DatePickerClearTrigger aria-label={local.clearLabel} {...(local.clearTriggerProps ?? {})} />
      <DatePickerTrigger aria-label={local.triggerLabel} {...(local.triggerProps ?? {})} />
    </DatePickerControl>
  );
}

function DatePickerRangeField(props: DatePickerRangeFieldProps) {
  const [local, others] = splitProps(props, [
    'clearLabel',
    'clearTriggerProps',
    'endInputProps',
    'endPlaceholder',
    'startInputProps',
    'startPlaceholder',
    'triggerLabel',
    'triggerProps',
  ]);

  return (
    <DatePickerControl {...others}>
      <DatePickerInput
        placeholder={local.startPlaceholder}
        {...(local.startInputProps ?? {})}
        index={0}
      />
      <DatePickerInput
        placeholder={local.endPlaceholder}
        {...(local.endInputProps ?? {})}
        index={1}
      />
      <DatePickerClearTrigger aria-label={local.clearLabel} {...(local.clearTriggerProps ?? {})} />
      <DatePickerTrigger aria-label={local.triggerLabel} {...(local.triggerProps ?? {})} />
    </DatePickerControl>
  );
}

function DatePickerInput(props: ComponentProps<typeof DatePickerPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.Input
      class={cn(
        "box-border h-control-md w-full min-w-30 flex-1 rounded-md border border-border bg-background py-1 ps-3.5 pe-17 text-md leading-6 text-current outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out group-has-[input[data-index='1']]/date-picker:pe-3.5 placeholder:text-muted-foreground read-only:cursor-default focus:border-ring focus:outline-ring disabled:cursor-default data-invalid:border-destructive data-invalid:outline-destructive data-[index='1']:pe-17 motion-reduce:transition-none",
        local.class,
      )}
      {...others}
      data-slot="date-picker-input"
    />
  );
}

function DatePickerTrigger(props: ComponentProps<typeof DatePickerPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <DatePickerPrimitive.Trigger
      asChild={local.asChild}
      class={cn(
        !local.asChild && [actionClass, 'absolute end-2 top-1/2 size-control-xs -translate-y-1/2'],
        local.class,
      )}
      {...others}
      data-slot="date-picker-trigger"
    >
      {resolvedChildren() ?? <CalendarIcon />}
    </DatePickerPrimitive.Trigger>
  );
}

function DatePickerClearTrigger(props: ComponentProps<typeof DatePickerPrimitive.ClearTrigger>) {
  const [local, others] = splitProps(props, [
    'aria-label',
    'aria-labelledby',
    'asChild',
    'children',
    'class',
  ]);
  const triggerClass = () =>
    cn('absolute end-[2.125rem] top-1/2 size-control-xs -translate-y-1/2', local.class);

  if (local.asChild) {
    return (
      <DatePickerPrimitive.ClearTrigger
        asChild={local.asChild}
        aria-label={local['aria-label']}
        aria-labelledby={local['aria-labelledby']}
        class={triggerClass()}
        {...others}
        data-slot="date-picker-clear-trigger"
      >
        {local.children}
      </DatePickerPrimitive.ClearTrigger>
    );
  }

  return (
    <DatePickerPrimitive.ClearTrigger
      asChild={(triggerProps) => {
        const resolvedProps = triggerProps();

        return (
          <CloseButton
            {...resolvedProps}
            {...(local['aria-label'] === undefined ? {} : { 'aria-label': local['aria-label'] })}
            {...(local['aria-labelledby'] === undefined
              ? {}
              : { 'aria-labelledby': local['aria-labelledby'] })}
          >
            {local.children}
          </CloseButton>
        );
      }}
      class={triggerClass()}
      {...others}
      data-slot="date-picker-clear-trigger"
    />
  );
}

function DatePickerPositioner(props: ComponentProps<typeof DatePickerPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DatePickerPrimitive.Positioner
        class={cn('z-[var(--z-index)]', local.class)}
        {...others}
        data-slot="date-picker-positioner"
      />
    </OverlayPortal>
  );
}

function DatePickerContent(props: ComponentProps<typeof DatePickerPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.Content
      class={cn(
        'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] box-border max-h-[min(var(--available-height,100dvh),calc(100dvh-2rem))] w-80 max-w-[min(calc(100vw-2rem),var(--available-width,100%))] origin-[var(--transform-origin)] overflow-auto rounded-md border border-border bg-popover p-3 text-popover-foreground shadow-lg outline-0 data-inline:shadow-none data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:[animation-delay:0ms] motion-reduce:data-[state]:[animation-duration:1ms]',
        local.class,
      )}
      {...others}
      data-slot="date-picker-content"
    />
  );
}

function DatePickerView(props: ComponentProps<typeof DatePickerPrimitive.View>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.View
      class={cn('grid gap-3', local.class)}
      {...others}
      data-slot="date-picker-view"
    />
  );
}

function DatePickerViewControl(props: ComponentProps<typeof DatePickerPrimitive.ViewControl>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.ViewControl
      class={cn('flex min-w-0 items-center justify-between gap-2', local.class)}
      {...others}
      data-slot="date-picker-view-control"
    />
  );
}

function DatePickerPrevTrigger(props: ComponentProps<typeof DatePickerPrimitive.PrevTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <DatePickerPrimitive.PrevTrigger
      asChild={local.asChild}
      class={cn(
        !local.asChild && [actionClass, 'size-control-sm disabled:opacity-50'],
        local.class,
      )}
      {...others}
      data-slot="date-picker-prev-trigger"
    >
      {resolvedChildren() ?? <ChevronLeftIcon />}
    </DatePickerPrimitive.PrevTrigger>
  );
}

function DatePickerNextTrigger(props: ComponentProps<typeof DatePickerPrimitive.NextTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <DatePickerPrimitive.NextTrigger
      asChild={local.asChild}
      class={cn(
        !local.asChild && [actionClass, 'size-control-sm disabled:opacity-50'],
        local.class,
      )}
      {...others}
      data-slot="date-picker-next-trigger"
    >
      {resolvedChildren() ?? <ChevronRightIcon />}
    </DatePickerPrimitive.NextTrigger>
  );
}

function DatePickerRangeText(props: ComponentProps<typeof DatePickerPrimitive.RangeText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.RangeText
      class={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', local.class)}
      {...others}
      data-slot="date-picker-range-text"
    />
  );
}

function DatePickerViewTrigger(props: ComponentProps<typeof DatePickerPrimitive.ViewTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <DatePickerPrimitive.ViewTrigger
      asChild={local.asChild}
      class={cn(
        !local.asChild && [
          actionClass,
          'min-h-control-sm min-w-0 flex-1 gap-2 px-2 text-sm leading-5 font-medium text-foreground disabled:opacity-50',
        ],
        local.class,
      )}
      {...others}
      data-slot="date-picker-view-trigger"
    >
      {resolvedChildren() ?? (
        <>
          <DatePickerRangeText />
          <ChevronDownIcon />
        </>
      )}
    </DatePickerPrimitive.ViewTrigger>
  );
}

function DatePickerTable(props: ComponentProps<typeof DatePickerPrimitive.Table>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.Table
      class={cn('w-full table-fixed border-separate border-spacing-0.5', local.class)}
      {...others}
      data-slot="date-picker-table"
    />
  );
}

function DatePickerTableHead(props: ComponentProps<typeof DatePickerPrimitive.TableHead>) {
  return <DatePickerPrimitive.TableHead {...props} data-slot="date-picker-table-head" />;
}

function DatePickerTableBody(props: ComponentProps<typeof DatePickerPrimitive.TableBody>) {
  return <DatePickerPrimitive.TableBody {...props} data-slot="date-picker-table-body" />;
}

function DatePickerTableRow(props: ComponentProps<typeof DatePickerPrimitive.TableRow>) {
  return <DatePickerPrimitive.TableRow {...props} data-slot="date-picker-table-row" />;
}

function DatePickerTableHeader(props: ComponentProps<typeof DatePickerPrimitive.TableHeader>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.TableHeader
      class={cn(tableHeaderClass, local.class)}
      {...others}
      data-slot="date-picker-table-header"
    />
  );
}

function DatePickerWeekNumberHeaderCell(
  props: ComponentProps<typeof DatePickerPrimitive.WeekNumberHeaderCell>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.WeekNumberHeaderCell
      class={cn(tableHeaderClass, local.class)}
      {...others}
      data-slot="date-picker-week-number-header-cell"
    />
  );
}

function DatePickerWeekNumberCell(
  props: ComponentProps<typeof DatePickerPrimitive.WeekNumberCell>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.WeekNumberCell
      class={cn(tableHeaderClass, local.class)}
      {...others}
      data-slot="date-picker-week-number-cell"
    />
  );
}

function DatePickerTableCell(props: ComponentProps<typeof DatePickerPrimitive.TableCell>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.TableCell
      class={cn('h-control-sm w-control-sm p-0 text-center', local.class)}
      {...others}
      data-slot="date-picker-table-cell"
    />
  );
}

function DatePickerTableCellTrigger(
  props: ComponentProps<typeof DatePickerPrimitive.TableCellTrigger>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.TableCellTrigger
      class={cn(
        'box-border inline-flex h-control-sm w-full min-w-control-sm cursor-pointer items-center justify-center rounded-sm border border-transparent bg-transparent p-0 text-sm leading-5 outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,color,outline-color] duration-200 ease-in-out focus-visible:outline-ring data-disabled:cursor-default data-disabled:opacity-50 data-in-hover-range:bg-muted data-in-hover-range:text-foreground data-in-range:bg-muted data-in-range:text-foreground data-outside-range:not-data-disabled:text-muted-foreground data-selected:bg-primary data-selected:text-primary-foreground data-today:border-ring motion-reduce:transition-none [@media(hover:hover)]:[&:not([data-disabled]):not([data-selected]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):not([data-selected]):hover]:text-accent-foreground',
        local.class,
      )}
      {...others}
      data-slot="date-picker-table-cell-trigger"
    />
  );
}

function DatePickerHeader() {
  return (
    <DatePickerViewControl>
      <DatePickerPrevTrigger />
      <DatePickerViewTrigger />
      <DatePickerNextTrigger />
    </DatePickerViewControl>
  );
}

function DatePickerDayTable(props: DatePickerDayTableProps) {
  const [local, others] = splitProps(props, ['offset', 'showHeader']);
  const datePicker = useDatePickerContext();
  const offsetMonth = () =>
    local.offset ? datePicker().getOffset({ months: local.offset }) : undefined;

  return (
    <>
      <Show when={local.showHeader ?? true}>
        <DatePickerHeader />
      </Show>
      <DatePickerTable {...others}>
        <DatePickerTableHead>
          <DatePickerTableRow>
            <Show when={datePicker().showWeekNumbers}>
              <DatePickerWeekNumberHeaderCell />
            </Show>
            <For each={datePicker().weekDays}>
              {(weekDay) => <DatePickerTableHeader>{weekDay.short}</DatePickerTableHeader>}
            </For>
          </DatePickerTableRow>
        </DatePickerTableHead>
        <DatePickerTableBody>
          <For each={offsetMonth()?.weeks ?? datePicker().weeks}>
            {(week, weekIndex) => (
              <DatePickerTableRow>
                <Show when={datePicker().showWeekNumbers}>
                  <DatePickerWeekNumberCell week={week} weekIndex={weekIndex()}>
                    {datePicker().getWeekNumber(week)}
                  </DatePickerWeekNumberCell>
                </Show>
                <For each={week}>
                  {(day) => (
                    <DatePickerTableCell value={day} visibleRange={offsetMonth()?.visibleRange}>
                      <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
                    </DatePickerTableCell>
                  )}
                </For>
              </DatePickerTableRow>
            )}
          </For>
        </DatePickerTableBody>
      </DatePickerTable>
    </>
  );
}

function DatePickerMonthTable(props: DatePickerMonthTableProps) {
  const [local, others] = splitProps(props, ['columns', 'format', 'showHeader']);
  const datePicker = useDatePickerContext();
  const columns = () => local.columns ?? 4;

  return (
    <>
      <Show when={local.showHeader ?? true}>
        <DatePickerHeader />
      </Show>
      <DatePickerTable columns={columns()} {...others}>
        <DatePickerTableBody>
          <For
            each={datePicker().getMonthsGrid({
              columns: columns(),
              format: local.format ?? 'short',
            })}
          >
            {(months) => (
              <DatePickerTableRow>
                <For each={months}>
                  {(month) => (
                    <DatePickerTableCell value={month.value}>
                      <DatePickerTableCellTrigger>{month.label}</DatePickerTableCellTrigger>
                    </DatePickerTableCell>
                  )}
                </For>
              </DatePickerTableRow>
            )}
          </For>
        </DatePickerTableBody>
      </DatePickerTable>
    </>
  );
}

function DatePickerYearTable(props: DatePickerYearTableProps) {
  const [local, others] = splitProps(props, ['columns', 'showHeader']);
  const datePicker = useDatePickerContext();
  const columns = () => local.columns ?? 4;

  return (
    <>
      <Show when={local.showHeader ?? true}>
        <DatePickerHeader />
      </Show>
      <DatePickerTable columns={columns()} {...others}>
        <DatePickerTableBody>
          <For each={datePicker().getYearsGrid({ columns: columns() })}>
            {(years) => (
              <DatePickerTableRow>
                <For each={years}>
                  {(year) => (
                    <DatePickerTableCell value={year.value} disabled={year.disabled}>
                      <DatePickerTableCellTrigger>{year.label}</DatePickerTableCellTrigger>
                    </DatePickerTableCell>
                  )}
                </For>
              </DatePickerTableRow>
            )}
          </For>
        </DatePickerTableBody>
      </DatePickerTable>
    </>
  );
}

function DatePickerMonthSelect(props: ComponentProps<typeof DatePickerPrimitive.MonthSelect>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <span class={selectControlClass} data-slot="date-picker-month-select-control">
      <DatePickerPrimitive.MonthSelect
        {...others}
        class={cn(selectClass, local.class)}
        data-slot="date-picker-month-select"
      />
      <span
        aria-hidden="true"
        class={selectIndicatorClass}
        data-slot="date-picker-month-select-indicator"
      >
        <ChevronDownIcon />
      </span>
    </span>
  );
}

function DatePickerYearSelect(props: ComponentProps<typeof DatePickerPrimitive.YearSelect>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <span class={selectControlClass} data-slot="date-picker-year-select-control">
      <DatePickerPrimitive.YearSelect
        {...others}
        class={cn(selectClass, local.class)}
        data-slot="date-picker-year-select"
      />
      <span
        aria-hidden="true"
        class={selectIndicatorClass}
        data-slot="date-picker-year-select-indicator"
      >
        <ChevronDownIcon />
      </span>
    </span>
  );
}

function DatePickerPresetTrigger(props: ComponentProps<typeof DatePickerPrimitive.PresetTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <DatePickerPrimitive.PresetTrigger
      asChild={local.asChild}
      class={cn(
        !local.asChild && [
          actionClass,
          'min-h-control-sm bg-muted px-2 text-sm leading-5 text-foreground disabled:opacity-50 [@media(hover:hover)]:[&:not(:disabled):hover]:bg-accent [@media(hover:hover)]:[&:not(:disabled):hover]:text-accent-foreground',
        ],
        local.class,
      )}
      {...others}
      data-slot="date-picker-preset-trigger"
    />
  );
}

function DatePickerValueText(props: ComponentProps<typeof DatePickerPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.ValueText
      class={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', local.class)}
      {...others}
      data-slot="date-picker-value-text"
    />
  );
}

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
} from '@ark-ui/solid/date-picker';