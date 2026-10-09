<script setup lang="ts">
import {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/vue/pagination';
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
</script>

<template>
  <Pagination :count="users.length" :page-size="4">
    <PaginationContext v-slot="pagination">
      <div :class="styles.stack">
        <div :class="styles.users">
          <div v-for="user in pagination.slice(users)" :key="user.id" :class="styles.user">
            <strong>{{ user.name }}</strong>
            <span :class="styles.muted">{{ user.email }}</span>
          </div>
        </div>
        <div :class="styles.row">
          <PaginationPrevTrigger />
          <template v-for="(page, index) in pagination.pages" :key="index">
            <PaginationItem v-if="page.type === 'page'" :type="page.type" :value="page.value">
              {{ page.value }}
            </PaginationItem>
            <PaginationEllipsis v-else :index="index" />
          </template>
          <PaginationNextTrigger />
        </div>
      </div>
    </PaginationContext>
  </Pagination>
</template>