import {
  useListCollection,
  type UseListCollectionProps,
  type UseListCollectionReturn,
} from '@ark-ui/vue/collection';
import { useFilter, type UseFilterProps } from '@ark-ui/vue/locale';
import { toValue, type MaybeRefOrGetter } from 'vue';

export type UseFilteredCollectionProps<T> = UseListCollectionProps<T> & {
  filterOptions?: UseFilterProps;
};

export type UseFilteredCollectionReturn<T> = UseListCollectionReturn<T>;

export function useFilteredCollection<T>(
  props: MaybeRefOrGetter<UseFilteredCollectionProps<T>>,
): UseFilteredCollectionReturn<T> {
  const defaultFilter = useFilter({ sensitivity: 'base', ...toValue(props).filterOptions });

  return useListCollection<T>(() => {
    const { filter, filterOptions: _filterOptions, ...options } = toValue(props);
    return {
      ...options,
      filter: filter ?? defaultFilter.value.contains,
    };
  });
}