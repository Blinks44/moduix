<script setup lang="ts">
import { useAsyncList } from '@ark-ui/vue/collection';
import { ref } from 'vue';
type User = { id: number; name: string };
type UsersResponse = { users: User[]; nextCursor?: string };
const sortDirection = ref<'ascending' | 'descending'>('ascending');
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
  sortDirection.value = sortDirection.value === 'ascending' ? 'descending' : 'ascending';
  list.value.sort({ column: 'name', direction: sortDirection.value });
};
const handleSearch = (event: Event) => {
  if (event.currentTarget instanceof HTMLInputElement)
    list.value.setFilterText(event.currentTarget.value);
};
</script>
<template>
  <section aria-labelledby="server-users-heading">
    <h3 id="server-users-heading">Project members</h3>
    <label for="user-search">Search users</label>
    <input id="user-search" type="search" :value="list.filterText" @input="handleSearch" />
    <button type="button" @click="sortByName">Sort by name ({{ sortDirection }})</button>
    <p v-if="list.error" role="alert">Users could not be loaded.</p>
    <p v-if="list.loading && !list.items.length" role="status">Loading users…</p>
    <p v-if="!list.loading && list.empty">No members found.</p>
    <ul v-if="list.items.length" :aria-busy="list.loading">
      <li v-for="user in list.items" :key="user.id">{{ user.name }}</li>
    </ul>
    <button v-if="list.hasMore" type="button" :disabled="list.loading" @click="list.loadMore()">
      {{ list.loading ? 'Loading…' : 'Load more' }}
    </button>
    <button v-if="list.error" type="button" @click="list.reload()">Try again</button>
  </section>
</template>