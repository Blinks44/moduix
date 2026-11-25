import {
  useListCollection,
  type UseListCollectionProps,
  type UseListCollectionReturn,
} from '@ark-ui/solid/collection';
import { useFilter, type UseFilterProps } from '@ark-ui/solid/locale';

export type UseFilteredCollectionProps<T> = UseListCollectionProps<T> & {
  filterOptions?: UseFilterProps;
};

export type UseFilteredCollectionReturn<T> = UseListCollectionReturn<T>;

export function useFilteredCollection<T>(
  props: UseFilteredCollectionProps<T> | (() => UseFilteredCollectionProps<T>),
): UseFilteredCollectionReturn<T> {
  const resolveProps = () => (typeof props === 'function' ? props() : props);
  const defaultFilter = useFilter({ sensitivity: 'base', ...resolveProps().filterOptions });

  return useListCollection<T>(() => {
    const { filter, filterOptions: _filterOptions, ...options } = resolveProps();
    return {
      ...options,
      filter: filter ?? defaultFilter().contains,
    };
  });
}