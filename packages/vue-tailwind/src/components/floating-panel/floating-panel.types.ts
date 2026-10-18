import type {
  FloatingPanelResizeTriggerAxis,
  FloatingPanelStage,
} from '@ark-ui/vue/floating-panel';
import { MaximizeIcon, MinusIcon, RestoreIcon } from '@/lib/moduix/icons/ui';

export const resizeTriggerAxes = [
  'n',
  'e',
  's',
  'w',
  'ne',
  'se',
  'sw',
  'nw',
] satisfies FloatingPanelResizeTriggerAxis[];

export const stageIcons = {
  default: RestoreIcon,
  maximized: MaximizeIcon,
  minimized: MinusIcon,
} satisfies Record<FloatingPanelStage, unknown>;

export const controlButtonClass =
  'inline-flex size-control-sm cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-0 transition-[background-color,opacity] duration-normal ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 [&>svg]:size-4 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent';