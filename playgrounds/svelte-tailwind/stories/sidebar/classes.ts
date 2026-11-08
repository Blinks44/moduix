export const classes = {
  accountButton: 'h-auto',
  accountMenu: 'min-w-56 max-w-72',
  accountMeta:
    'grid flex-1 text-start [&>strong]:truncate [&>strong]:font-medium [&>span]:truncate [&>span]:text-xs [&>span]:leading-5 [&>span]:text-muted-foreground',
  brand: 'flex min-w-0 items-center gap-2 font-semibold',
  brandMark:
    'grid size-control-sm flex-none place-items-center rounded-sm bg-primary text-xs text-primary-foreground',
  collapsible: 'w-full max-w-full text-inherit',
  customAccent:
    'data-active:bg-[color-mix(in_oklab,var(--color-primary)_14%,var(--color-accent))] [&:not(:disabled):not([aria-disabled=true])]:hover:bg-[color-mix(in_oklab,var(--color-primary)_14%,var(--color-accent))]',
  customPanel: 'bg-[color-mix(in_oklab,var(--color-primary)_5%,var(--color-card))]',
  demo: 'h-152 w-[min(68rem,calc(100vw-4rem))] rounded-lg shadow-md',
  footerStack: 'grid w-full',
  headerStack: 'grid w-full gap-3',
  main: 'grid gap-4 p-6 [&>h2]:m-0 [&>p]:m-0',
  placeholder: 'min-h-72 rounded-lg border border-dashed border-border bg-muted/55',
  scrollAreaContent: 'overflow-hidden',
  sidebarScrollArea: 'rounded-none',
  topbar: 'flex min-h-14 items-center gap-3 border-b border-border px-6',
  workspaceMark:
    'grid size-control-sm flex-none place-items-center rounded-sm bg-accent text-xs font-semibold text-accent-foreground',
  workspaceSelect: 'w-full',
};