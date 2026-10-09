<script setup lang="ts">
import { useAsyncList } from '@ark-ui/vue/collection';
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
<template>
  <p v-if="list.loading && !list.items.length" role="status">Loading users…</p>
  <div v-else-if="list.error">
    <p role="alert">Users could not be loaded.</p>
    <button type="button" @click="list.reload()">Try again</button>
  </div>
  <section v-else aria-labelledby="users-heading">
    <h3 id="users-heading">Project members</h3>
    <p v-if="list.empty">No members found.</p>
    <ul v-else>
      <li v-for="user in list.items" :key="user.id">{{ user.name }}</li>
    </ul>
    <button type="button" :disabled="list.loading" @click="list.reload()">
      {{ list.loading ? 'Refreshing…' : 'Refresh' }}
    </button>
  </section>
</template>