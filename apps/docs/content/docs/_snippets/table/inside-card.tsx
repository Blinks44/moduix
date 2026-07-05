/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Card, Table, ScrollArea } from '@moduix/react';
import styles from '@/components/examples/table.module.css';

const projects = [
  {
    name: 'Docs redesign',
    owner: 'Product Design',
    updated: '2 hours ago',
    issues: '3 open',
  },
  {
    name: 'Billing migration',
    owner: 'Growth',
    updated: 'Yesterday',
    issues: '1 blocked',
  },
  {
    name: 'Command palette',
    owner: 'Platform',
    updated: 'Today',
    issues: 'Healthy',
  },
];

export function TableInsideCardDemo() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Projects</Card.Title>
      </Card.Header>
      <Card.Body className={styles.cardContent}>
        <Table.ScrollArea>
          <Table className={styles.table}>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Project</Table.ColumnHeader>
                <Table.ColumnHeader>Owner</Table.ColumnHeader>
                <Table.ColumnHeader>Updated</Table.ColumnHeader>
                <Table.ColumnHeader>Health</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {projects.map((project) => (
                <Table.Row key={project.name}>
                  <Table.Cell>{project.name}</Table.Cell>
                  <Table.Cell>{project.owner}</Table.Cell>
                  <Table.Cell>{project.updated}</Table.Cell>
                  <Table.Cell>{project.issues}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Table.ScrollArea>
      </Card.Body>
    </Card>
  );
}

//#endregion