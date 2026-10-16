import type {
  FloatingPanelResizeTriggerAxis,
  FloatingPanelStage,
} from '@ark-ui/vue/floating-panel';
import { MaximizeIcon, MinusIcon, RestoreIcon } from '@/lib/moduix/icons/ui/Icons';

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