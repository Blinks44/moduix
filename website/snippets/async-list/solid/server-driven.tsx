import { useAsyncList } from '@ark-ui/solid/collection';
import { createSignal, For, Show } from 'solid-js';

type User = {
  id: number;
  name: string;
};

type UsersResponse = {
  users: User[];
  nextCursor?: string;
};

export default function AsyncListServerDrivenDemo() {
  const [sortDirection, setSortDirection] = createSignal<'ascending' | 'descending'>('ascending');
  const list = useAsyncList<User, string>({
    autoReload: true,
    async load({ cursor, filterText, signal, sortDescriptor }) {
      const params = new URLSearchParams({ query: filterText });

      if (cursor != null) params.set('cursor', cursor);
      if (sortDescriptor) {
        params.set('sort', String(sortDescriptor.column));
        params.set('direction', sortDescriptor.direction);
      }

      const response = await fetch(`/api/users?${params}`, { signal });
      if (!response.ok) throw new Error('Could not load users');

      const data: UsersResponse = await response.json();
      return { items: data.users, cursor: data.nextCursor };
    },
  });

  function sortByName() {
    const nextDirection = sortDirection() === 'ascending' ? 'descending' : 'ascending';
    setSortDirection(nextDirection);
    list().sort({ column: 'name', direction: nextDirection });
  }

  return (
    <section aria-labelledby="server-users-heading">
      <h3 id="server-users-heading">Project members</h3>
      <label for="user-search">Search users</label>
      <input
        id="user-search"
        type="search"
        value={list().filterText}
        onInput={(event) => list().setFilterText(event.currentTarget.value)}
      />
      <button type="button" onClick={sortByName}>
        Sort by name ({sortDirection()})
      </button>

      <Show when={list().error}>
        <p role="alert">Users could not be loaded.</p>
      </Show>
      <Show when={list().loading && list().items.length === 0}>
        <p role="status">Loading users…</p>
      </Show>
      <Show when={!list().loading && list().empty}>
        <p>No members found.</p>
      </Show>
      <Show when={list().items.length > 0}>
        <ul aria-busy={list().loading}>
          <For each={list().items}>{(user) => <li>{user.name}</li>}</For>
        </ul>
      </Show>

      <Show when={list().hasMore}>
        <button type="button" onClick={() => list().loadMore()} disabled={list().loading}>
          {list().loading ? 'Loading…' : 'Load more'}
        </button>
      </Show>
      <Show when={list().error}>
        <button type="button" onClick={() => list().reload()}>
          Try again
        </button>
      </Show>
    </section>
  );
}