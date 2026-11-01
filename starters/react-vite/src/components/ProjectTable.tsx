import { Badge } from '@moduix/react/badge';
import { Button } from '@moduix/react/button';
import { Input } from '@moduix/react/input';
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/react/segment-group';
import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@moduix/react/table';
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
      <div className="toolbar">
        <Input
          className="search"
          aria-label="Search projects"
          placeholder="Search projects..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
        />
        <SegmentGroup
          className="status-filter"
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
      <TableScrollArea className="project-table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableColumnHeader scope="col">Name</TableColumnHeader>
              <TableColumnHeader scope="col">Status</TableColumnHeader>
              <TableColumnHeader scope="col">Owner</TableColumnHeader>
              <TableColumnHeader scope="col">Updated</TableColumnHeader>
              <TableColumnHeader scope="col">
                <span className="sr-only">Actions</span>
              </TableColumnHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <button className="project-name" onClick={() => onEdit(project)}>
                    {project.name}
                  </button>
                  <span className="project-description">{project.description}</span>
                </TableCell>
                <TableCell>
                  <Badge className="status-badge" data-status={project.status}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="owner">
                    <span className="avatar">{initials(project.owner)}</span>
                    {project.owner}
                  </span>
                </TableCell>
                <TableCell className="updated">{project.updated}</TableCell>
                <TableCell>
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
                <TableCell colSpan={5} className="empty">
                  No projects found. Try another search or create a project.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableScrollArea>
      <div className="table-footer">
        <p>
          Showing {filtered.length ? (currentPage - 1) * 5 + 1 : 0}–
          {Math.min(currentPage * 5, filtered.length)} of {filtered.length} projects
        </p>
        <div className="pager">
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