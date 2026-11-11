<script lang="ts">
  import { useAsyncList } from '@ark-ui/svelte/collection';

  type User = { id: number; name: string };
  type UsersResponse = { users: User[]; nextCursor?: string };

  let sortDirection = $state<'ascending' | 'descending'>('ascending');

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

  const sortByName = () => {
    sortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';
    list().sort({ column: 'name', direction: sortDirection });
  };

  const handleSearch = (event: Event) => {
    if (event.currentTarget instanceof HTMLInputElement)
      list().setFilterText(event.currentTarget.value);
  };
</script>

<section aria-labelledby="server-users-heading">
  <h3 id="server-users-heading">Project members</h3>
  <label for="user-search">Search users</label>
  <input id="user-search" type="search" value={list().filterText} oninput={handleSearch} />
  <button type="button" onclick={sortByName}>Sort by name ({sortDirection})</button>
  {#if list().error}
    <p role="alert">Users could not be loaded.</p>
  {/if}
  {#if list().loading && !list().items.length}
    <p role="status">Loading users…</p>
  {/if}
  {#if !list().loading && list().empty}
    <p>No members found.</p>
  {/if}
  {#if list().items.length}
    <ul aria-busy={list().loading}>
      {#each list().items as user (user.id)}
        <li>{user.name}</li>
      {/each}
    </ul>
  {/if}
  {#if list().hasMore}
    <button type="button" disabled={list().loading} onclick={() => list().loadMore()}>
      {list().loading ? 'Loading…' : 'Load more'}
    </button>
  {/if}
  {#if list().error}
    <button type="button" onclick={() => list().reload()}>Try again</button>
  {/if}
</section>