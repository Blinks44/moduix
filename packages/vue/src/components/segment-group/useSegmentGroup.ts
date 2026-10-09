import { useFieldContext } from '@ark-ui/vue/field';
import { useFieldsetContext } from '@ark-ui/vue/fieldset';
import {
  useSegmentGroup as useSegmentGroupPrimitive,
  type UseSegmentGroupProps,
  type UseSegmentGroupReturn,
} from '@ark-ui/vue/segment-group';
import { computed, toValue, unref } from 'vue';
import type { MaybeRef } from 'vue';

function omitUndefined<T extends object>(props: T) {
  return Object.fromEntries(Object.entries(props).filter(([, value]) => value !== undefined)) as T;
}

function normalizeBoolean(value: unknown) {
  return value === true || value === 'true'
    ? true
    : value === false || value === 'false'
      ? false
      : undefined;
}

const useSegmentGroup = (
  props: MaybeRef<UseSegmentGroupProps> = {},
  emit?: Parameters<typeof useSegmentGroupPrimitive>[1],
): UseSegmentGroupReturn => {
  const field = useFieldContext();
  const fieldset = useFieldsetContext();

  return useSegmentGroupPrimitive(
    computed<UseSegmentGroupProps>(() => ({
      orientation: 'horizontal' as const,
      disabled: normalizeBoolean(unref(field)?.disabled ?? unref(fieldset)?.disabled),
      invalid: normalizeBoolean(unref(field)?.invalid ?? unref(fieldset)?.invalid),
      readOnly: normalizeBoolean(unref(field)?.readOnly),
      required: normalizeBoolean(unref(field)?.required),
      ...omitUndefined(toValue(props) ?? {}),
    })),
    emit,
  );
};

export default useSegmentGroup;