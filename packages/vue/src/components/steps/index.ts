import {
  StepsContext,
  StepsItemContext,
  useSteps,
  useStepsContext,
  useStepsItemContext,
} from '@ark-ui/vue/steps';
import type { Steps as ArkSteps } from '@ark-ui/vue/steps';
import Steps from './Steps.vue';
import StepsCompletedContent from './StepsCompletedContent.vue';
import StepsContent from './StepsContent.vue';
import StepsIndicator from './StepsIndicator.vue';
import StepsItem from './StepsItem.vue';
import StepsList from './StepsList.vue';
import StepsNextTrigger from './StepsNextTrigger.vue';
import StepsPrevTrigger from './StepsPrevTrigger.vue';
import StepsProgress from './StepsProgress.vue';
import StepsRootProvider from './StepsRootProvider.vue';
import StepsSeparator from './StepsSeparator.vue';
import StepsTrigger from './StepsTrigger.vue';

export {
  Steps,
  StepsCompletedContent,
  StepsContext,
  StepsContent,
  StepsIndicator,
  StepsItem,
  StepsItemContext,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsProgress,
  StepsRootProvider,
  StepsSeparator,
  StepsTrigger,
  useSteps,
  useStepsContext,
  useStepsItemContext,
};

export type {
  StepChangeDetails,
  StepsCompletedContentProps,
  StepsContentProps,
  StepsContextProps,
  StepsIndicatorProps,
  StepsItemContextProps,
  StepsItemProps,
  StepsListProps,
  StepsNextTriggerProps,
  StepsPrevTriggerProps,
  StepsProgressProps,
  StepsRootProps,
  StepsRootProviderProps,
  StepsSeparatorProps,
  StepsTriggerProps,
  UseStepsContext,
  UseStepsItemContext,
  UseStepsProps,
  UseStepsReturn,
} from '@ark-ui/vue/steps';

export type StepsRootEmits = ArkSteps.RootEmits;