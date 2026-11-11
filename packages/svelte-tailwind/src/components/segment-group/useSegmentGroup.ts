import {
  useSegmentGroup as useSegmentGroupPrimitive,
  type UseSegmentGroupProps,
  type UseSegmentGroupReturn,
} from '@ark-ui/svelte/segment-group';

const useSegmentGroup = (
  props: UseSegmentGroupProps | (() => UseSegmentGroupProps) = {},
): UseSegmentGroupReturn =>
  useSegmentGroupPrimitive(() => {
    const machineProps = typeof props === 'function' ? props() : props;
    return { ...machineProps, orientation: machineProps.orientation ?? 'horizontal' };
  });

export { useSegmentGroup };