import {
  useSegmentGroup as useSegmentGroupPrimitive,
  type UseSegmentGroupProps,
  type UseSegmentGroupReturn,
} from '@ark-ui/vue/segment-group';
import { computed, toValue } from 'vue';
import type { MaybeRef } from 'vue';

const useSegmentGroup = (
  props: MaybeRef<UseSegmentGroupProps> = {},
  emit?: Parameters<typeof useSegmentGroupPrimitive>[1],
): UseSegmentGroupReturn =>
  useSegmentGroupPrimitive(
    computed(() => {
      const machineProps = toValue(props) ?? {};
      return { ...machineProps, orientation: machineProps.orientation ?? 'horizontal' };
    }),
    emit,
  );

export default useSegmentGroup;