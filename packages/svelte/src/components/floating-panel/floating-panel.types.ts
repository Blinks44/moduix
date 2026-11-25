import type {
  FloatingPanelResizeTriggerAxis,
  FloatingPanelStage,
} from '@ark-ui/svelte/floating-panel';
import type { UiIconName } from '@/lib/moduix/icons/ui';

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
  default: 'restore',
  maximized: 'maximize',
  minimized: 'minus',
} satisfies Record<FloatingPanelStage, UiIconName>;