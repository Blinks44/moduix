import {
  useListCollection,
  type UseListCollectionProps,
  type UseListCollectionReturn,
} from '@ark-ui/react/collection';
import { useFilter, type UseFilterProps } from '@ark-ui/react/locale';

export type UseFilteredCollectionProps<T> = UseListCollectionProps<T> & {
  filterOptions?: UseFilterProps;
};

export type UseFilteredCollectionReturn<T> = UseListCollectionReturn<T>;

export function useFilteredCollection<T>({
  filter,
  filterOptions,
  ...options
}: UseFilteredCollectionProps<T>): UseFilteredCollectionReturn<T> {
  const { contains } = useFilter({ sensitivity: 'base', ...filterOptions });

  return useListCollection<T>({
    ...options,
    filter: filter ?? contains,
  });
}