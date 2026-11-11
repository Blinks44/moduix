<script lang="ts">
  import { useAsyncList } from '@ark-ui/svelte/collection';

  type User = { id: number; name: string };

  const users: User[] = [
    { id: 1, name: 'Avery Stone' },
    { id: 2, name: 'Morgan Lee' },
    { id: 3, name: 'Sam Ortiz' },
  ];

  const list = useAsyncList<User>({
    autoReload: true,
    async load() {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { items: users };
    },
  });
</script>

{#if list().loading && !list().items.length}
  <p role="status">Loading users…</p>
{:else if list().error}
  <div>
    <p role="alert">Users could not be loaded.</p>
    <button type="button" onclick={() => list().reload()}>Try again</button>
  </div>
{:else}
  <section aria-labelledby="users-heading">
    <h3 id="users-heading">Project members</h3>
    {#if list().empty}
      <p>No members found.</p>
    {:else}
      <ul>
        {#each list().items as user (user.id)}
          <li>{user.name}</li>
        {/each}
      </ul>
    {/if}
    <button type="button" disabled={list().loading} onclick={() => list().reload()}>
      {list().loading ? 'Refreshing…' : 'Refresh'}
    </button>
  </section>
{/if}