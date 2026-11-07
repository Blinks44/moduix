export const styles = {
  stack: 'grid gap-3',
  hint: 'text-sm text-muted-foreground',
  presets: 'mb-3 flex flex-wrap gap-2',
  selectedDates:
    'flex min-h-control-md w-full flex-wrap items-center gap-1 rounded-md border border-border bg-background py-1 ps-3.5 pe-17',
  selectedDatesPlaceholder: 'text-sm text-muted-foreground',
  selectedDate:
    'inline-flex min-w-0 items-center gap-1 rounded-sm bg-muted px-1.5 py-0.5 text-sm leading-5 text-foreground',
  selectedDateRemove:
    'inline-flex size-4 items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground hover:bg-accent hover:text-accent-foreground',
  multipleRoot: 'w-80',
  monthYearControl: 'grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2',
  monthYearSelects:
    'grid min-w-0 grid-cols-[minmax(7rem,1fr)_minmax(6.25rem,1fr)] items-center gap-1',
  monthYearNav: 'inline-flex items-center gap-1',
  multipleMonthsContent: 'w-max max-w-[calc(100vw-2rem)]',
  multipleMonths: 'flex gap-3 overflow-x-auto',
  multipleMonthsTable: 'w-max shrink-0',
  customRoot:
    '[&_[data-slot=date-picker-input]]:border-primary [&_[data-slot=date-picker-input]]:bg-muted',
};