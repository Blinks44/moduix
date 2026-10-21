import {
  SegmentGroupContext,
  SegmentGroupItemContext,
  SegmentGroupItemHiddenInput,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
} from '@ark-ui/vue/segment-group';
import SegmentGroup from './SegmentGroup.vue';
import SegmentGroupIndicator from './SegmentGroupIndicator.vue';
import SegmentGroupItem from './SegmentGroupItem.vue';
import SegmentGroupItems from './SegmentGroupItems.vue';
import SegmentGroupItemText from './SegmentGroupItemText.vue';
import SegmentGroupLabel from './SegmentGroupLabel.vue';
import SegmentGroupRootProvider from './SegmentGroupRootProvider.vue';
import useSegmentGroup from './useSegmentGroup';

export {
  SegmentGroup,
  SegmentGroupContext,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemContext,
  SegmentGroupItemHiddenInput,
  SegmentGroupItems,
  SegmentGroupItemText,
  SegmentGroupLabel,
  SegmentGroupRootProvider,
  useSegmentGroup,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
};

export type {
  SegmentGroupContextProps,
  SegmentGroupIndicatorProps,
  SegmentGroupItemContextProps,
  SegmentGroupItemHiddenInputProps,
  SegmentGroupItemProps,
  SegmentGroupItemTextProps,
  SegmentGroupLabelProps,
  SegmentGroupValueChangeDetails,
  UseSegmentGroupContext,
  UseSegmentGroupItemContext,
  UseSegmentGroupProps,
  UseSegmentGroupReturn,
} from '@ark-ui/vue/segment-group';

export type {
  Emits as SegmentGroupRootEmits,
  Props as SegmentGroupRootProps,
} from './SegmentGroup.vue';
export type {
  SegmentGroupItemOption,
  Props as SegmentGroupItemsProps,
} from './SegmentGroupItems.vue';
export type { Props as SegmentGroupRootProviderProps } from './SegmentGroupRootProvider.vue';