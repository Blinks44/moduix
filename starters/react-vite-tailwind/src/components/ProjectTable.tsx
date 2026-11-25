import { Badge } from '@moduix/react-tailwind/badge';
import { Button } from '@moduix/react-tailwind/button';
import { Input } from '@moduix/react-tailwind/input';
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/react-tailwind/segment-group';
import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@moduix/react-tailwind/table';
import { useState } from 'react';
import { initials, type Project } from '../data';

export default function ProjectTable({
  projects,
  onEdit,
}: {
  projects: Project[];
  onEdit: (project: Project) => void;
}) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const filtered = projects.filter(
    (project) =>
      (status === 'All' || project.status === status) &&
      `${project.name} ${project.description} ${project.owner}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const pages = Math.max(1, Math.ceil(filtered.length / 5));
  const currentPage = Math.min(page, pages);
  const rows = filtered.slice((currentPage - 1) * 5, currentPage * 5);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Input
          className="w-full md:w-[280px]"
          aria-label="Search projects"
          placeholder="Search projects..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
        />
        <SegmentGroup
          className="h-9 gap-0.5 rounded-lg border-none p-[3px] [&_[data-part=item]]:min-h-[30px] [&_[data-part=item]]:px-3 [&_[data-part=item]]:font-normal"
          aria-label="Project status"
          value={status}
          onValueChange={(details) => {
            setStatus(details.value ?? 'All');
            setPage(1);
          }}
        >
          <SegmentGroupIndicator />
          <SegmentGroupItems
            items={['All', 'Active', 'Archived'].map((value) => ({
              value,
              label: `${value}  ${value === 'All' ? projects.length : projects.filter((project) => project.status === value).length}`,
            }))}
          />
        </SegmentGroup>
      </div>
      <TableScrollArea className="rounded-xl [--moduix-table-bg:var(--moduix-card)] [--moduix-table-cell-padding-x:1rem]">
        <Table className="min-w-[760px] table-fixed md:min-w-0">
          <TableHeader>
            <TableRow>
              <TableColumnHeader
                className="h-10 w-[41%] bg-transparent py-0 text-xs font-normal text-muted-foreground"
                scope="col"
              >
                Name
              </TableColumnHeader>
              <TableColumnHeader
                className="h-10 w-[14.35%] bg-transparent py-0 text-xs font-normal text-muted-foreground"
                scope="col"
              >
                Status
              </TableColumnHeader>
              <TableColumnHeader
                className="h-10 w-[22.55%] bg-transparent py-0 text-xs font-normal text-muted-foreground"
                scope="col"
              >
                Owner
              </TableColumnHeader>
              <TableColumnHeader
                className="h-10 w-[16%] bg-transparent py-0 text-xs font-normal text-muted-foreground"
                scope="col"
              >
                Updated
              </TableColumnHeader>
              <TableColumnHeader
                className="h-10 w-11 bg-transparent py-0 text-xs font-normal text-muted-foreground"
                scope="col"
              >
                <span className="sr-only">Actions</span>
              </TableColumnHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="h-[60px] py-0">
                  <button
                    className="block max-w-full cursor-pointer text-left text-[13px] font-semibold hover:underline focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
                    onClick={() => onEdit(project)}
                  >
                    {project.name}
                  </button>
                  <span className="mt-0.5 block text-xs leading-[18px] text-muted-foreground">
                    {project.description}
                  </span>
                </TableCell>
                <TableCell className="h-[60px] py-0">
                  <Badge
                    variant={
                      project.status === 'Active'
                        ? 'success'
                        : project.status === 'Paused'
                          ? 'warning'
                          : 'secondary'
                    }
                  >
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell className="h-[60px] py-0">
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <span className="inline-grid size-6 shrink-0 place-items-center rounded-full bg-border text-xs text-muted-foreground">
                      {initials(project.owner)}
                    </span>
                    {project.owner}
                  </span>
                </TableCell>
                <TableCell className="h-[60px] py-0 text-muted-foreground">
                  {project.updated}
                </TableCell>
                <TableCell className="h-[60px] py-0 pr-3 pl-0">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Edit ${project.name}`}
                    onClick={() => onEdit(project)}
                  >
                    •••
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {!rows.length && (
              <TableRow>
                <TableCell colSpan={5} className="h-[60px] text-center text-muted-foreground">
                  No projects found. Try another search or create a project.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableScrollArea>
      <div className="flex flex-wrap items-start justify-between gap-4 text-muted-foreground md:items-center">
        <p>
          Showing {filtered.length ? (currentPage - 1) * 5 + 1 : 0}–
          {Math.min(currentPage * 5, filtered.length)} of {filtered.length} projects
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === pages}
            onClick={() => setPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}