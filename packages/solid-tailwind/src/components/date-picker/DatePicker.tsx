import {
  DatePicker as DatePickerPrimitive,
  useDatePicker,
  useDatePickerContext,
  type UseDatePickerReturn,
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
type DatePickerApi = ReturnType<UseDatePickerReturn>;
type DatePickerOffset = ReturnType<DatePickerApi['getOffset']>;
type DatePickerDayTableProps = ComponentProps<typeof DatePickerPrimitive.Table> & {
  offset?: DatePickerOffset;
  showHeader?: boolean;
  showWeekNumbers?: boolean;
};

function DatePickerRoot(props: DatePickerRootProps) {
  const [local, others] = splitProps(props, [
    'asChild',
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
        asChild={local.asChild}
        class={cn(
          "group/date-picker inline-flex w-75 max-w-full flex-col items-start gap-1 text-foreground has-[input[data-index='1']]:w-96 data-disabled:opacity-50 data-readonly:opacity-50",
          local.class,
        )}
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
    'asChild',
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
        asChild={local.asChild}
        class={cn(
          "group/date-picker inline-flex w-75 max-w-full flex-col items-start gap-1 text-foreground has-[input[data-index='1']]:w-96 data-disabled:opacity-50 data-readonly:opacity-50",
          local.class,
        )}
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
      class={cn(
        'inline-flex items-center text-sm leading-5 font-medium text-foreground select-none',
        local.class,
      )}
      {...others}
      data-slot="date-picker-label"
    />
  );
}

function DatePickerControl(props: ComponentProps<typeof DatePickerPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.Control
      class={cn(
        'group/date-picker-control relative flex w-full min-w-0 items-center gap-2 text-foreground',
        local.class,
      )}
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
        "readonly:cursor-default h-control-md w-full min-w-30 flex-1 rounded-md border border-border bg-background ps-3.5 pe-17 text-md leading-6 text-current outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,color,outline-color,opacity] duration-200 ease-in-out group-has-[input[data-index='1']]/date-picker:pe-3.5 group-data-focus/date-picker-control:border-ring group-data-focus/date-picker-control:outline-ring placeholder:text-muted-foreground focus:border-ring focus:outline-ring disabled:cursor-default aria-invalid:border-destructive aria-invalid:outline-destructive data-disabled:cursor-default data-invalid:border-destructive data-invalid:outline-destructive data-readonly:cursor-default data-[index='1']:pe-17 motion-reduce:transition-none",
        'py-1',
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
        !local.asChild &&
          'absolute end-2 top-1/2 inline-flex size-control-xs shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm bg-transparent p-0 leading-none text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground',
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
  const resolvedChildren = children(() => local.children);
  if (local.asChild) {
    return (
      <DatePickerPrimitive.ClearTrigger
        asChild={local.asChild}
        aria-label={local['aria-label']}
        aria-labelledby={local['aria-labelledby']}
        class={cn(
          'absolute end-[2.125rem] top-1/2 inline-flex size-control-xs shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm bg-transparent p-0 leading-none text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground',
          local.class,
        )}
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
          <CloseButton.Root
            {...resolvedProps}
            {...(local['aria-label'] === undefined ? {} : { 'aria-label': local['aria-label'] })}
            {...(local['aria-labelledby'] === undefined
              ? {}
              : { 'aria-labelledby': local['aria-labelledby'] })}
            class={cn(resolvedProps.class, 'size-control-xs [&>svg]:size-4', local.class)}
          >
            {resolvedChildren()}
          </CloseButton.Root>
        );
      }}
      class={cn(
        'absolute end-[2.125rem] top-1/2 inline-flex size-control-xs shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm bg-transparent p-0 leading-none text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground',
        local.class,
      )}
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
        class={cn('z-[var(--z-index)] outline-0', local.class)}
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
        'z-[calc(60+var(--layer-index,0))] w-75 max-w-[min(calc(100vw-2rem),var(--available-width))] min-w-[min(18.75rem,var(--available-width))] origin-[var(--transform-origin)] rounded-md border border-border bg-popover p-3 text-popover-foreground shadow-lg outline-0 data-inline:min-w-72 data-inline:shadow-none data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
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
        !local.asChild &&
          'inline-flex size-control-sm shrink-0 cursor-pointer items-center justify-center rounded-sm bg-transparent p-0 leading-none text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground',
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
        !local.asChild &&
          'inline-flex size-control-sm shrink-0 cursor-pointer items-center justify-center rounded-sm bg-transparent p-0 leading-none text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground',
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
        !local.asChild &&
          'inline-flex min-h-control-sm min-w-0 flex-1 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-sm bg-transparent px-2 text-sm leading-5 font-medium text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground',
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
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.TableHead
      class={local.class}
      {...others}
      data-slot="date-picker-table-head"
    />
  );
}

function DatePickerTableBody(props: ComponentProps<typeof DatePickerPrimitive.TableBody>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.TableBody
      class={local.class}
      {...others}
      data-slot="date-picker-table-body"
    />
  );
}

function DatePickerTableRow(props: ComponentProps<typeof DatePickerPrimitive.TableRow>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.TableRow
      class={local.class}
      {...others}
      data-slot="date-picker-table-row"
    />
  );
}

function DatePickerTableHeader(props: ComponentProps<typeof DatePickerPrimitive.TableHeader>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.TableHeader
      class={cn(
        'h-7 w-control-sm text-center text-xs leading-4 font-medium text-muted-foreground',
        local.class,
      )}
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
      class={cn(
        'h-7 w-control-sm text-center text-xs leading-4 font-medium text-muted-foreground tabular-nums',
        local.class,
      )}
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
      class={cn(
        'h-7 w-control-sm text-center text-xs leading-4 font-medium text-muted-foreground tabular-nums',
        local.class,
      )}
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
        'inline-flex h-control-sm w-full min-w-control-sm cursor-pointer items-center justify-center rounded-sm bg-transparent p-0 text-sm leading-5 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring data-in-hover-range:bg-muted data-in-hover-range:text-foreground data-in-range:bg-muted data-in-range:text-foreground data-outside-range:text-muted-foreground data-selected:bg-primary data-selected:text-primary-foreground data-today:border-ring data-unavailable:text-muted-foreground motion-reduce:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-selected]):hover]:bg-accent [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-selected]):hover]:text-accent-foreground',
        local.class,
      )}
      {...others}
      data-slot="date-picker-table-cell-trigger"
    />
  );
}

function DatePickerDayTable(props: DatePickerDayTableProps) {
  const [local, others] = splitProps(props, ['offset', 'showHeader', 'showWeekNumbers']);

  return (
    <DatePickerPrimitive.Context>
      {(datePicker) => (
        <>
          <Show when={local.showHeader ?? true}>
            <DatePickerViewControl>
              <DatePickerPrevTrigger />
              <DatePickerViewTrigger />
              <DatePickerNextTrigger />
            </DatePickerViewControl>
          </Show>
          <DatePickerTable {...others}>
            <DatePickerTableHead>
              <DatePickerTableRow>
                <Show when={local.showWeekNumbers ?? false}>
                  <DatePickerWeekNumberHeaderCell />
                </Show>
                <For each={datePicker().weekDays}>
                  {(weekDay) => <DatePickerTableHeader>{weekDay.short}</DatePickerTableHeader>}
                </For>
              </DatePickerTableRow>
            </DatePickerTableHead>
            <DatePickerTableBody>
              <For each={local.offset?.weeks ?? datePicker().weeks}>
                {(week, weekIndex) => (
                  <DatePickerTableRow>
                    <Show when={local.showWeekNumbers ?? false}>
                      <DatePickerWeekNumberCell week={week} weekIndex={weekIndex()}>
                        {datePicker().getWeekNumber(week)}
                      </DatePickerWeekNumberCell>
                    </Show>
                    <For each={week}>
                      {(day) => (
                        <DatePickerTableCell value={day} visibleRange={local.offset?.visibleRange}>
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
      )}
    </DatePickerPrimitive.Context>
  );
}

function DatePickerMonthSelect(props: ComponentProps<typeof DatePickerPrimitive.MonthSelect>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.MonthSelect
      class={cn(
        'min-h-control-sm w-full min-w-0 flex-1 cursor-pointer rounded-sm border border-border bg-background px-2 py-1 text-sm leading-5 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color] duration-200 ease-in-out focus:border-ring focus:outline-ring motion-reduce:transition-none',
        local.class,
      )}
      {...others}
      data-slot="date-picker-month-select"
    />
  );
}

function DatePickerYearSelect(props: ComponentProps<typeof DatePickerPrimitive.YearSelect>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DatePickerPrimitive.YearSelect
      class={cn(
        'min-h-control-sm w-full min-w-0 flex-1 cursor-pointer rounded-sm border border-border bg-background px-2 py-1 text-sm leading-5 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color] duration-200 ease-in-out focus:border-ring focus:outline-ring motion-reduce:transition-none',
        local.class,
      )}
      {...others}
      data-slot="date-picker-year-select"
    />
  );
}

function DatePickerPresetTrigger(props: ComponentProps<typeof DatePickerPrimitive.PresetTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <DatePickerPrimitive.PresetTrigger
      asChild={local.asChild}
      class={cn(
        !local.asChild &&
          'inline-flex min-h-control-sm shrink-0 cursor-pointer items-center justify-center rounded-sm bg-muted px-2 text-sm leading-5 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-focus:outline-ring data-selected:bg-primary data-selected:text-primary-foreground motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-selected]):hover]:bg-accent',
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

type DatePickerComponent = typeof DatePickerRoot & {
  Root: typeof DatePickerRoot;
  RootProvider: typeof DatePickerRootProvider;
  Context: typeof DatePickerPrimitive.Context;
  Label: typeof DatePickerLabel;
  Control: typeof DatePickerControl;
  Field: typeof DatePickerField;
  RangeField: typeof DatePickerRangeField;
  Input: typeof DatePickerInput;
  Trigger: typeof DatePickerTrigger;
  ClearTrigger: typeof DatePickerClearTrigger;
  Positioner: typeof DatePickerPositioner;
  Content: typeof DatePickerContent;
  View: typeof DatePickerView;
  ViewControl: typeof DatePickerViewControl;
  PrevTrigger: typeof DatePickerPrevTrigger;
  NextTrigger: typeof DatePickerNextTrigger;
  ViewTrigger: typeof DatePickerViewTrigger;
  RangeText: typeof DatePickerRangeText;
  ValueText: typeof DatePickerValueText;
  Table: typeof DatePickerTable;
  TableHead: typeof DatePickerTableHead;
  TableBody: typeof DatePickerTableBody;
  TableRow: typeof DatePickerTableRow;
  TableHeader: typeof DatePickerTableHeader;
  TableCell: typeof DatePickerTableCell;
  TableCellTrigger: typeof DatePickerTableCellTrigger;
  DayTable: typeof DatePickerDayTable;
  WeekNumberHeaderCell: typeof DatePickerWeekNumberHeaderCell;
  WeekNumberCell: typeof DatePickerWeekNumberCell;
  MonthSelect: typeof DatePickerMonthSelect;
  YearSelect: typeof DatePickerYearSelect;
  PresetTrigger: typeof DatePickerPresetTrigger;
};

const DatePicker: DatePickerComponent = Object.assign(DatePickerRoot, {
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