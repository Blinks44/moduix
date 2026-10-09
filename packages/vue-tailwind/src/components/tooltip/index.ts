import { TooltipContext, useTooltip, useTooltipContext } from '@ark-ui/vue/tooltip';
import Tooltip from './Tooltip.vue';
import TooltipArrow from './TooltipArrow.vue';
import TooltipArrowTip from './TooltipArrowTip.vue';
import TooltipBody from './TooltipBody.vue';
import TooltipContent from './TooltipContent.vue';
import TooltipDisabledTrigger from './TooltipDisabledTrigger.vue';
import TooltipPositioner from './TooltipPositioner.vue';
import TooltipRootProvider from './TooltipRootProvider.vue';
import TooltipTrigger from './TooltipTrigger.vue';

export {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipBody,
  TooltipContext,
  TooltipContent,
  TooltipDisabledTrigger,
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