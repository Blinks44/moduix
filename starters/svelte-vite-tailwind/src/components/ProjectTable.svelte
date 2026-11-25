<script lang="ts">
  import { Badge } from '@moduix/svelte-tailwind/badge';
  import { Button } from '@moduix/svelte-tailwind/button';
  import { Input } from '@moduix/svelte-tailwind/input';
  import {
    SegmentGroup,
    SegmentGroupIndicator,
    SegmentGroupItems,
  } from '@moduix/svelte-tailwind/segment-group';
  import {
    Table,
    TableBody,
    TableCell,
    TableColumnHeader,
    TableHeader,
    TableRow,
    TableScrollArea,
  } from '@moduix/svelte-tailwind/table';
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

<div class="flex flex-wrap items-center gap-3">
  <Input
    bind:value={query}
    class="w-full md:w-[280px]"
    aria-label="Search projects"
    placeholder="Search projects..."
    oninput={() => (page = 1)}
  />
  <SegmentGroup
    bind:value={status}
    class="h-9 gap-0.5 rounded-lg border-none p-[3px] [&_[data-part=item]]:min-h-[30px] [&_[data-part=item]]:px-3 [&_[data-part=item]]:font-normal"
    aria-label="Project status"
    onValueChange={() => (page = 1)}
  >
    <SegmentGroupIndicator />
    <SegmentGroupItems items={filters} />
  </SegmentGroup>
</div>
<TableScrollArea
  class="rounded-xl [--moduix-table-bg:var(--moduix-card)] [--moduix-table-cell-padding-x:1rem]"
>
  <Table class="min-w-[760px] table-fixed md:min-w-0">
    <TableHeader>
      <TableRow>
        <TableColumnHeader
          class="h-10 w-[41%] bg-transparent py-0 text-xs font-normal text-muted-foreground"
          scope="col"
        >
          Name
        </TableColumnHeader>
        <TableColumnHeader
          class="h-10 w-[14.35%] bg-transparent py-0 text-xs font-normal text-muted-foreground"
          scope="col"
        >
          Status
        </TableColumnHeader>
        <TableColumnHeader
          class="h-10 w-[22.55%] bg-transparent py-0 text-xs font-normal text-muted-foreground"
          scope="col"
        >
          Owner
        </TableColumnHeader>
        <TableColumnHeader
          class="h-10 w-[16%] bg-transparent py-0 text-xs font-normal text-muted-foreground"
          scope="col"
        >
          Updated
        </TableColumnHeader>
        <TableColumnHeader
          class="h-10 w-11 bg-transparent py-0 text-xs font-normal text-muted-foreground"
          scope="col"
        >
          <span class="sr-only">Actions</span>
        </TableColumnHeader>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each rows as project (project.id)}
        <TableRow>
          <TableCell class="h-[60px] py-0">
            <button
              class="block max-w-full cursor-pointer text-left text-[13px] font-semibold hover:underline focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
              onclick={() => onEdit(project)}
            >
              {project.name}
            </button>
            <span class="mt-0.5 block text-xs leading-[18px] text-muted-foreground">
              {project.description}
            </span>
          </TableCell>
          <TableCell class="h-[60px] py-0">
            <Badge
              variant={project.status === 'Active'
                ? 'success'
                : project.status === 'Paused'
                  ? 'warning'
                  : 'secondary'}
            >
              {project.status}
            </Badge>
          </TableCell>
          <TableCell class="h-[60px] py-0">
            <span class="flex items-center gap-2 whitespace-nowrap">
              <span
                class="inline-grid size-6 shrink-0 place-items-center rounded-full bg-border text-xs text-muted-foreground"
              >
                {initials(project.owner)}
              </span>
              {project.owner}
            </span>
          </TableCell>
          <TableCell class="h-[60px] py-0 text-muted-foreground">{project.updated}</TableCell>
          <TableCell class="h-[60px] py-0 pr-3 pl-0">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Edit ${project.name}`}
              onclick={() => onEdit(project)}
            >
              •••
            </Button>
          </TableCell>
        </TableRow>
      {:else}
        <TableRow>
          <TableCell colspan={5} class="h-[60px] text-center text-muted-foreground">
            No projects found. Try another search or create a project.
          </TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</TableScrollArea>
<div class="flex flex-wrap items-start justify-between gap-4 text-muted-foreground md:items-center">
  <p>
    Showing {filtered.length ? (currentPage - 1) * 5 + 1 : 0}–{Math.min(
      currentPage * 5,
      filtered.length,
    )}
    of {filtered.length} projects
  </p>
  <div class="flex gap-2">
    <Button
      variant="outline"
      size="sm"
      disabled={currentPage === 1}
      onclick={() => (page = currentPage - 1)}
    >
      Previous
    </Button>
    <Button
      variant="outline"
      size="sm"
      disabled={currentPage === pages}
      onclick={() => (page = currentPage + 1)}
    >
      Next
    </Button>
  </div>
</div>