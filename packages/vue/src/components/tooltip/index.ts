import { TooltipContext, useTooltip, useTooltipContext } from '@ark-ui/vue/tooltip';
import Tooltip from './Tooltip.vue';
import TooltipArrow from './TooltipArrow.vue';
import TooltipArrowTip from './TooltipArrowTip.vue';
import TooltipContent from './TooltipContent.vue';
import TooltipDisabledTrigger from './TooltipDisabledTrigger.vue';
import TooltipPanel from './TooltipPanel.vue';
import TooltipPositioner from './TooltipPositioner.vue';
import TooltipRootProvider from './TooltipRootProvider.vue';
import TooltipTrigger from './TooltipTrigger.vue';

/** @deprecated Use `TooltipPanel` instead. */
const TooltipBody = TooltipPanel;

export {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipBody,
  TooltipContext,
  TooltipContent,
  TooltipDisabledTrigger,
  TooltipPanel,
  TooltipPositioner,
  TooltipRootProvider,
  TooltipTrigger,
  useTooltip,
  useTooltipContext,
};

export type {
  TooltipArrowProps,
  TooltipArrowTipProps,
  TooltipContentProps,
  TooltipContextProps,
  TooltipOpenChangeDetails,
  TooltipPositionerProps,
  TooltipRootEmits,
  TooltipRootProviderEmits,
  TooltipTriggerProps,
  TooltipTriggerValueChangeDetails,
  UseTooltipContext,
  UseTooltipProps,
  UseTooltipReturn,
} from '@ark-ui/vue/tooltip';

export type { Props as TooltipRootProps } from './Tooltip.vue';
export type { Props as TooltipRootProviderProps } from './TooltipRootProvider.vue';