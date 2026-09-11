import { Pagination } from '@moduix/solid/pagination';
import { For } from 'solid-js';
import styles from '@/components/examples/pagination/pagination-advanced-customization.module.css';

export default function AdvancedCustomizationPaginationDemo() {
  return (
    <Pagination class={styles.root} count={200} pageSize={10} siblingCount={2}>
      <Pagination.PrevTrigger />
      <Pagination.Context>
        {(pagination) => (
          <For each={pagination().pages}>
            {(page, index) =>
              page.type === 'page' ? (
                <Pagination.Item {...page}>Page {page.value}</Pagination.Item>
              ) : (
                <Pagination.Ellipsis index={index()} />
              )
            }
          </For>
        )}
      </Pagination.Context>
      <Pagination.NextTrigger />
    </Pagination>
  );
}