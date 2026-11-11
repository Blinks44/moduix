<script setup lang="ts">
import { Badge } from '@moduix/vue/badge';
import { Button } from '@moduix/vue/button';
import { Input } from '@moduix/vue/input';
import { SegmentGroup, SegmentGroupIndicator, SegmentGroupItems } from '@moduix/vue/segment-group';
import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@moduix/vue/table';
import { computed, ref } from 'vue';
import { initials, type Project } from '../data';

const props = defineProps<{ projects: Project[] }>();
const emit = defineEmits<{ edit: [project: Project] }>();
const query = ref('');
const status = ref<string | null>('All');
const page = ref(1);
const filtered = computed(() =>
  props.projects.filter(
    (project) =>
      (status.value === 'All' || project.status === status.value) &&
      `${project.name} ${project.description} ${project.owner}`
        .toLowerCase()
        .includes(query.value.toLowerCase()),
  ),
);
const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / 5)));
const currentPage = computed(() => Math.min(page.value, pages.value));
const rows = computed(() =>
  filtered.value.slice((currentPage.value - 1) * 5, currentPage.value * 5),
);
const filters = computed(() =>
  ['All', 'Active', 'Archived'].map((value) => ({
    value,
    label: `${value}  ${value === 'All' ? props.projects.length : props.projects.filter((project) => project.status === value).length}`,
  })),
);
</script>

<template>
  <div class="toolbar">
    <Input
      v-model="query"
      class="search"
      aria-label="Search projects"
      placeholder="Search projects..."
      @update:model-value="page = 1"
    />
    <SegmentGroup
      v-model="status"
      class="status-filter"
      aria-label="Project status"
      @update:model-value="page = 1"
      ><SegmentGroupIndicator /><SegmentGroupItems :items="filters"
    /></SegmentGroup>
  </div>
  <TableScrollArea class="project-table"
    ><Table>
      <TableHeader
        ><TableRow
          ><TableColumnHeader scope="col">Name</TableColumnHeader
          ><TableColumnHeader scope="col">Status</TableColumnHeader
          ><TableColumnHeader scope="col">Owner</TableColumnHeader
          ><TableColumnHeader scope="col">Updated</TableColumnHeader
          ><TableColumnHeader scope="col"
            ><span class="sr-only">Actions</span></TableColumnHeader
          ></TableRow
        ></TableHeader
      >
      <TableBody
        ><TableRow v-for="project in rows" :key="project.id">
          <TableCell
            ><button class="project-name" @click="emit('edit', project)">{{ project.name }}</button
            ><span class="project-description">{{ project.description }}</span></TableCell
          >
          <TableCell
            ><Badge class="status-badge" :data-status="project.status">{{
              project.status
            }}</Badge></TableCell
          >
          <TableCell
            ><span class="owner"
              ><span class="avatar">{{ initials(project.owner) }}</span>{{ project.owner }}</span
            ></TableCell
          >
          <TableCell class="updated">{{ project.updated }}</TableCell>
          <TableCell
            ><Button
              variant="ghost"
              size="icon-sm"
              :aria-label="`Edit ${project.name}`"
              @click="emit('edit', project)"
              >•••</Button
            ></TableCell
          > </TableRow
        ><TableRow v-if="!rows.length"
          ><TableCell :col-span="5" class="empty"
            >No projects found. Try another search or create a project.</TableCell
          ></TableRow
        ></TableBody
      >
    </Table></TableScrollArea
  >
  <div class="table-footer">
    <p>
      Showing {{ filtered.length ? (currentPage - 1) * 5 + 1 : 0 }}–{{
        Math.min(currentPage * 5, filtered.length)
      }}
      of {{ filtered.length }} projects
    </p>
    <div class="pager">
      <Button
        variant="outline"
        size="sm"
        :disabled="currentPage === 1"
        @click="page = currentPage - 1"
        >Previous</Button
      ><Button
        variant="outline"
        size="sm"
        :disabled="currentPage === pages"
        @click="page = currentPage + 1"
        >Next</Button
      >
    </div>
  </div>
</template>