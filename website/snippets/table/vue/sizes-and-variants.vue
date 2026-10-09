<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@moduix/vue/table';
import styles from '@/components/examples/table/table-sizes-and-variants.module.css';

const projects = [
  { name: 'Docs redesign', owner: 'Product Design' },
  { name: 'Billing migration', owner: 'Growth' },
];
const sizes = ['sm', 'md', 'lg'] as const;
</script>

<template>
  <div :class="styles.root">
    <TableScrollArea v-for="size in sizes" :key="size">
      <Table :size="size" :variant="size === 'md' ? 'outline' : 'line'">
        <TableCaption side="top">{{ size.toUpperCase() }} project summary</TableCaption>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>Project</TableColumnHeader>
            <TableColumnHeader>Owner</TableColumnHeader>
            <TableColumnHeader numeric>Open issues</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(project, index) in projects" :key="project.name">
            <TableCell>{{ project.name }}</TableCell>
            <TableCell>{{ project.owner }}</TableCell>
            <TableCell numeric>{{ index + 1 }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableScrollArea>
  </div>
</template>