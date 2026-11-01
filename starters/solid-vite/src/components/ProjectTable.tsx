import { Badge } from '@moduix/solid/badge';
import { Button } from '@moduix/solid/button';
import { Input } from '@moduix/solid/input';
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/solid/segment-group';
import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@moduix/solid/table';
import { createMemo, createSignal, For, Show } from 'solid-js';
import { initials, type Project } from '../data';

export default function ProjectTable(props: {
  projects: Project[];
  onEdit: (project: Project) => void;
}) {
  const [query, setQuery] = createSignal('');
  const [status, setStatus] = createSignal('All');
  const [page, setPage] = createSignal(1);
  const filtered = createMemo(() =>
    props.projects.filter(
      (project) =>
        (status() === 'All' || project.status === status()) &&
        `${project.name} ${project.description} ${project.owner}`
          .toLowerCase()
          .includes(query().toLowerCase()),
    ),
  );
  const pages = () => Math.max(1, Math.ceil(filtered().length / 5));
  const currentPage = () => Math.min(page(), pages());
  const rows = () => filtered().slice((currentPage() - 1) * 5, currentPage() * 5);

  return (
    <>
      <div class="toolbar">
        <Input
          class="search"
          aria-label="Search projects"
          placeholder="Search projects..."
          value={query()}
          onInput={(event) => {
            setQuery(event.currentTarget.value);
            setPage(1);
          }}
        />
        <SegmentGroup
          class="status-filter"
          aria-label="Project status"
          value={status()}
          onValueChange={(details) => {
            setStatus(details.value ?? 'All');
            setPage(1);
          }}
        >
          <SegmentGroupIndicator />
          <SegmentGroupItems
            items={['All', 'Active', 'Archived'].map((value) => ({
              value,
              label: `${value}  ${value === 'All' ? props.projects.length : props.projects.filter((project) => project.status === value).length}`,
            }))}
          />
        </SegmentGroup>
      </div>
      <TableScrollArea class="project-table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableColumnHeader scope="col">Name</TableColumnHeader>
              <TableColumnHeader scope="col">Status</TableColumnHeader>
              <TableColumnHeader scope="col">Owner</TableColumnHeader>
              <TableColumnHeader scope="col">Updated</TableColumnHeader>
              <TableColumnHeader scope="col">
                <span class="sr-only">Actions</span>
              </TableColumnHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            <For each={rows()}>
              {(project) => (
                <TableRow>
                  <TableCell>
                    <button class="project-name" onClick={() => props.onEdit(project)}>
                      {project.name}
                    </button>
                    <span class="project-description">{project.description}</span>
                  </TableCell>
                  <TableCell>
                    <Badge class="status-badge" data-status={project.status}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span class="owner">
                      <span class="avatar">{initials(project.owner)}</span>
                      {project.owner}
                    </span>
                  </TableCell>
                  <TableCell class="updated">{project.updated}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Edit ${project.name}`}
                      onClick={() => props.onEdit(project)}
                    >
                      •••
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </For>
            <Show when={!rows().length}>
              <TableRow>
                <TableCell colSpan={5} class="empty">
                  No projects found. Try another search or create a project.
                </TableCell>
              </TableRow>
            </Show>
          </TableBody>
        </Table>
      </TableScrollArea>
      <div class="table-footer">
        <p>
          Showing {filtered().length ? (currentPage() - 1) * 5 + 1 : 0}–
          {Math.min(currentPage() * 5, filtered().length)} of {filtered().length} projects
        </p>
        <div class="pager">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage() === 1}
            onClick={() => setPage(currentPage() - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage() === pages()}
            onClick={() => setPage(currentPage() + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}