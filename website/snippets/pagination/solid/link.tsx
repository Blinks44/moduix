import { Pagination } from '@moduix/solid/pagination';
import { For } from 'solid-js';
import styles from '@/components/examples/pagination/pagination-link.module.css';

export default function LinkPaginationDemo() {
  return (
    <Pagination
      class={styles.root}
      count={200}
      pageSize={10}
      siblingCount={2}
      type="link"
      getPageUrl={(details) => `?page=${details.page}`}
    >
      <Pagination.PrevTrigger asChild={(props) => <a {...props()}>Previous</a>} />
      <Pagination.Context>
        {(pagination) => (
          <For each={pagination().pages}>
            {(page, index) =>
              page.type === 'page' ? (
                <Pagination.Item asChild={(props) => <a {...props()}>{page.value}</a>} {...page} />
              ) : (
                <Pagination.Ellipsis index={index()} />
              )
            }
          </For>
        )}
      </Pagination.Context>
      <Pagination.NextTrigger asChild={(props) => <a {...props()}>Next</a>} />
    </Pagination>
  );
}