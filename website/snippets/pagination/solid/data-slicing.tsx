import { Pagination } from '@moduix/solid/pagination';
import { For } from 'solid-js';
import styles from '@/components/examples/pagination/pagination-data-slicing.module.css';

const users = [
  { id: 1, name: 'Emma Wilson', email: 'emma@example.com' },
  { id: 2, name: 'Liam Johnson', email: 'liam@example.com' },
  { id: 3, name: 'Olivia Brown', email: 'olivia@example.com' },
  { id: 4, name: 'Noah Davis', email: 'noah@example.com' },
  { id: 5, name: 'Ava Martinez', email: 'ava@example.com' },
  { id: 6, name: 'Ethan Garcia', email: 'ethan@example.com' },
  { id: 7, name: 'Sophia Rodriguez', email: 'sophia@example.com' },
  { id: 8, name: 'Mason Lee', email: 'mason@example.com' },
  { id: 9, name: 'Isabella Walker', email: 'isabella@example.com' },
  { id: 10, name: 'James Hall', email: 'james@example.com' },
  { id: 11, name: 'Mia Allen', email: 'mia@example.com' },
  { id: 12, name: 'Benjamin Young', email: 'benjamin@example.com' },
];

export default function PaginationDataSlicingDemo() {
  return (
    <Pagination count={users.length} pageSize={4}>
      <Pagination.Context>
        {(pagination) => (
          <div class={styles.stack}>
            <div class={styles.users}>
              <For each={pagination().slice(users)}>
                {(user) => (
                  <div class={styles.user}>
                    <strong>{user.name}</strong>
                    <span class={styles.muted}>{user.email}</span>
                  </div>
                )}
              </For>
            </div>
            <div class={styles.row}>
              <Pagination.PrevTrigger />
              <For each={pagination().pages}>
                {(page, index) =>
                  page.type === 'page' ? (
                    <Pagination.Item {...page}>{page.value}</Pagination.Item>
                  ) : (
                    <Pagination.Ellipsis index={index()} />
                  )
                }
              </For>
              <Pagination.NextTrigger />
            </div>
          </div>
        )}
      </Pagination.Context>
    </Pagination>
  );
}