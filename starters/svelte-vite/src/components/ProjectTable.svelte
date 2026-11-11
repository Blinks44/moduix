<script lang="ts">
  import { Badge } from '@moduix/svelte/badge';
  import { Button } from '@moduix/svelte/button';
  import { Input } from '@moduix/svelte/input';
  import {
    SegmentGroup,
    SegmentGroupIndicator,
    SegmentGroupItems,
  } from '@moduix/svelte/segment-group';
  import {
    Table,
    TableBody,
    TableCell,
    TableColumnHeader,
    TableHeader,
    TableRow,
    TableScrollArea,
  } from '@moduix/svelte/table';
  import { initials, type Project } from '../data';

  let { projects, onEdit }: { projects: Project[]; onEdit: (project: Project) => void } = $props();
  let query = $state('');
  let status = $state<string | null>('All');
  let page = $state(1);
  const filtered = $derived(
    projects.filter(
      (project) =>
        (status === 'All' || project.status === status) &&
        `${project.name} ${project.description} ${project.owner}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    ),
  );
  const pages = $derived(Math.max(1, Math.ceil(filtered.length / 5)));
  const currentPage = $derived(Math.min(page, pages));
  const rows = $derived(filtered.slice((currentPage - 1) * 5, currentPage * 5));
  const filters = $derived(
    ['All', 'Active', 'Archived'].map((value) => ({
      value,
      label: `${value}  ${value === 'All' ? projects.length : projects.filter((project) => project.status === value).length}`,
    })),
  );
</script>

<div class="toolbar">
  <Input
    bind:value={query}
    class="search"
    aria-label="Search projects"
    placeholder="Search projects..."
    oninput={() => (page = 1)}
  />
  <SegmentGroup
    bind:value={status}
    class="status-filter"
    aria-label="Project status"
    onValueChange={() => (page = 1)}
    ><SegmentGroupIndicator /><SegmentGroupItems items={filters} /></SegmentGroup
  >
</div>
<TableScrollArea class="project-table"
  ><Table>
    <TableHeader
      ><TableRow
        ><TableColumnHeader scope="col">Name</TableColumnHeader><TableColumnHeader scope="col"
          >Status</TableColumnHeader
        ><TableColumnHeader scope="col">Owner</TableColumnHeader><TableColumnHeader scope="col"
          >Updated</TableColumnHeader
        ><TableColumnHeader scope="col"><span class="sr-only">Actions</span></TableColumnHeader
        ></TableRow
      ></TableHeader
    >
    <TableBody
      >{#each rows as project (project.id)}<TableRow>
          <TableCell
            ><button class="project-name" onclick={() => onEdit(project)}>{project.name}</button
            ><span class="project-description">{project.description}</span></TableCell
          >
          <TableCell
            ><Badge class="status-badge" data-status={project.status}>{project.status}</Badge
            ></TableCell
          >
          <TableCell
            ><span class="owner"
              ><span class="avatar">{initials(project.owner)}</span>{project.owner}</span
            ></TableCell
          >
          <TableCell class="updated">{project.updated}</TableCell>
          <TableCell
            ><Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Edit ${project.name}`}
              onclick={() => onEdit(project)}>•••</Button
            ></TableCell
          >
        </TableRow>{:else}<TableRow
          ><TableCell colspan={5} class="empty"
            >No projects found. Try another search or create a project.</TableCell
          ></TableRow
        >{/each}</TableBody
    >
  </Table></TableScrollArea
>
<div class="table-footer">
  <p>
    Showing {filtered.length ? (currentPage - 1) * 5 + 1 : 0}–{Math.min(
      currentPage * 5,
      filtered.length,
    )}
    of {filtered.length} projects
  </p>
  <div class="pager">
    <Button
      variant="outline"
      size="sm"
      disabled={currentPage === 1}
      onclick={() => (page = currentPage - 1)}>Previous</Button
    ><Button
      variant="outline"
      size="sm"
      disabled={currentPage === pages}
      onclick={() => (page = currentPage + 1)}>Next</Button
    >
  </div>
</div>