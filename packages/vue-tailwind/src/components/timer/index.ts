import { TimerContext, useTimer, useTimerContext } from '@ark-ui/vue/timer';
import Timer from './Timer.vue';
import TimerActionTrigger from './TimerActionTrigger.vue';
import TimerArea from './TimerArea.vue';
import TimerControl from './TimerControl.vue';
import TimerItem from './TimerItem.vue';
import TimerRootProvider from './TimerRootProvider.vue';
import TimerSegments from './TimerSegments.vue';
import TimerSeparator from './TimerSeparator.vue';

export {
  Timer,
  TimerActionTrigger,
  TimerArea,
  TimerContext,
  TimerControl,
  TimerItem,
  TimerRootProvider,
  TimerSegments,
  TimerSeparator,
  useTimer,
  useTimerContext,
};

export type { Props as TimerSegmentsProps } from './TimerSegments.vue';
export type { TimerTickDetails } from './Timer.vue';

export type {
  TimerActionTriggerBaseProps,
  TimerActionTriggerProps,
  TimerAreaBaseProps,
  TimerAreaProps,
  TimerContextProps,
  TimerControlBaseProps,
  TimerControlProps,
  TimerItemBaseProps,
  TimerItemProps,
  TimerRootEmits,
  TimerRootProps,
  TimerRootProviderBaseProps,
  TimerRootProviderProps,
  TimerSeparatorBaseProps,
  TimerSeparatorProps,
  UseTimerContext,
  UseTimerProps,
  UseTimerReturn,
} from '@ark-ui/vue/timer';