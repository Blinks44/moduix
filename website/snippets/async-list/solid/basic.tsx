import { useAsyncList } from '@ark-ui/solid/collection';
import { For, Show } from 'solid-js';

type User = {
  id: number;
  name: string;
};

const users: User[] = [
  { id: 1, name: 'Avery Stone' },
  { id: 2, name: 'Morgan Lee' },
  { id: 3, name: 'Sam Ortiz' },
];

export default function AsyncListDemo() {
  const list = useAsyncList<User>({
    autoReload: true,
    async load() {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { items: users };
    },
  });

  return (
    <Show
      when={!list().loading || list().items.length > 0}
      fallback={<p role="status">Loading users…</p>}
    >
      <Show
        when={!list().error}
        fallback={
          <div>
            <p role="alert">Users could not be loaded.</p>
            <button type="button" onClick={() => list().reload()}>
              Try again
            </button>
          </div>
        }
      >
        <section aria-labelledby="users-heading">
          <h3 id="users-heading">Project members</h3>
          <Show when={!list().empty} fallback={<p>No members found.</p>}>
            <ul>
              <For each={list().items}>{(user) => <li>{user.name}</li>}</For>
            </ul>
          </Show>
          <button type="button" onClick={() => list().reload()} disabled={list().loading}>
            {list().loading ? 'Refreshing…' : 'Refresh'}
          </button>
        </section>
      </Show>
    </Show>
  );
}