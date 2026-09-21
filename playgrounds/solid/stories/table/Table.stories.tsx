import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Badge } from '@/components/badge/Badge';
import { Button } from '@/components/button/Button';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/card/Card';
import { Table } from '@/components/table/Table';
import styles from './Table.stories.module.css';

const invoices = [
  { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
  { id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
  { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
  { id: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
];

const projects = [
  { name: 'Docs redesign', owner: 'Product Design', updated: '2 hours ago', issues: '3 open' },
  { name: 'Billing migration', owner: 'Growth', updated: 'Yesterday', issues: '1 blocked' },
  { name: 'Command palette', owner: 'Platform', updated: 'Today', issues: 'Healthy' },
];

const meta = {
  title: 'Components/Table',
  component: Table.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div class={styles.showcase}>
      <Table.ScrollArea>
        <Table class={styles.table}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Invoice</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Method</Table.ColumnHeader>
              <Table.ColumnHeader numeric>Amount</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {invoices.map((invoice) => (
              <Table.Row>
                <Table.Cell class={styles.code}>{invoice.id}</Table.Cell>
                <Table.Cell>
                  <Badge variant={invoice.status === 'Paid' ? 'secondary' : 'outline'}>
                    {invoice.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{invoice.method}</Table.Cell>
                <Table.Cell numeric>{invoice.amount}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Table.ScrollArea>
    </div>
  ),
};

export const WithCaptionAndFooter: Story = {
  render: () => (
    <div class={styles.showcase}>
      <Table.ScrollArea>
        <Table class={styles.table}>
          <Table.Caption side="top">
            A list of recent invoices for the current billing cycle.
          </Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Invoice</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Method</Table.ColumnHeader>
              <Table.ColumnHeader numeric>Amount</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {invoices.map((invoice) => (
              <Table.Row>
                <Table.Cell class={styles.code}>{invoice.id}</Table.Cell>
                <Table.Cell>{invoice.status}</Table.Cell>
                <Table.Cell>{invoice.method}</Table.Cell>
                <Table.Cell numeric>{invoice.amount}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.Cell colSpan={3}>Total</Table.Cell>
              <Table.Cell numeric>$1,200.00</Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Table.ScrollArea>
    </div>
  ),
};

export const StripedRows: Story = {
  render: () => (
    <div class={styles.showcase}>
      <Table.ScrollArea>
        <Table striped interactive class={styles.table}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Project</Table.ColumnHeader>
              <Table.ColumnHeader>Owner</Table.ColumnHeader>
              <Table.ColumnHeader>Updated</Table.ColumnHeader>
              <Table.ColumnHeader numeric>Open issues</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {projects.map((project, index) => (
              <Table.Row>
                <Table.Cell class={styles.emphasis}>{project.name}</Table.Cell>
                <Table.Cell>{project.owner}</Table.Cell>
                <Table.Cell>{project.updated}</Table.Cell>
                <Table.Cell numeric>{index + 1}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Table.ScrollArea>
    </div>
  ),
};

export const InteractiveRows: Story = {
  render: () => (
    <div class={styles.showcase}>
      <Table.ScrollArea>
        <Table interactive class={styles.table}>
          <Table.Caption side="top">
            Focus a row action to keep its row context visible for keyboard users.
          </Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Project</Table.ColumnHeader>
              <Table.ColumnHeader>Owner</Table.ColumnHeader>
              <Table.ColumnHeader>Updated</Table.ColumnHeader>
              <Table.ColumnHeader numeric>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {projects.map((project) => (
              <Table.Row>
                <Table.Cell class={styles.emphasis}>{project.name}</Table.Cell>
                <Table.Cell>{project.owner}</Table.Cell>
                <Table.Cell>{project.updated}</Table.Cell>
                <Table.Cell numeric>
                  <Button size="sm" variant="ghost">
                    View
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Table.ScrollArea>
    </div>
  ),
};

export const SizesAndVariants: Story = {
  render: () => (
    <div class={styles.stack}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Table.ScrollArea>
          <Table size={size} variant={size === 'md' ? 'outline' : 'line'} class={styles.table}>
            <Table.Caption side="top">{size.toUpperCase()} project summary</Table.Caption>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Project</Table.ColumnHeader>
                <Table.ColumnHeader>Owner</Table.ColumnHeader>
                <Table.ColumnHeader numeric>Open issues</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {projects.slice(0, 2).map((project, index) => (
                <Table.Row>
                  <Table.Cell class={styles.emphasis}>{project.name}</Table.Cell>
                  <Table.Cell>{project.owner}</Table.Cell>
                  <Table.Cell numeric>{index + 1}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Table.ScrollArea>
      ))}
    </div>
  ),
};

export const ColumnGroupAndBorders: Story = {
  render: () => (
    <div class={styles.showcase}>
      <Table.ScrollArea>
        <Table showColumnBorder class={styles.table}>
          <Table.ColumnGroup>
            <Table.Column htmlWidth="42%" />
            <Table.Column htmlWidth="28%" />
            <Table.Column htmlWidth="30%" />
          </Table.ColumnGroup>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Product</Table.ColumnHeader>
              <Table.ColumnHeader>Category</Table.ColumnHeader>
              <Table.ColumnHeader numeric>Price</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell class={styles.emphasis}>Laptop</Table.Cell>
              <Table.Cell>Electronics</Table.Cell>
              <Table.Cell numeric>$999.99</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell class={styles.emphasis}>Coffee Maker</Table.Cell>
              <Table.Cell>Home Appliances</Table.Cell>
              <Table.Cell numeric>$49.99</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell class={styles.emphasis}>Desk Chair</Table.Cell>
              <Table.Cell>Furniture</Table.Cell>
              <Table.Cell numeric>$150.00</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Table.ScrollArea>
    </div>
  ),
};

export const StickyHeaderAndColumn: Story = {
  render: () => (
    <div class={styles.showcase}>
      <Table.ScrollArea class={styles.stickyScrollArea}>
        <Table stickyHeader interactive class={styles.wideTable}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader data-sticky="start">Project</Table.ColumnHeader>
              <Table.ColumnHeader>Owner</Table.ColumnHeader>
              <Table.ColumnHeader>Environment</Table.ColumnHeader>
              <Table.ColumnHeader>Updated</Table.ColumnHeader>
              <Table.ColumnHeader numeric>Open issues</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Array.from({ length: 10 }, (_, index) => projects[index % projects.length]).map(
              (project, index) => (
                <Table.Row>
                  <Table.Cell data-sticky="start" class={styles.emphasis}>
                    {project.name}
                  </Table.Cell>
                  <Table.Cell>{project.owner}</Table.Cell>
                  <Table.Cell>Production</Table.Cell>
                  <Table.Cell>{project.updated}</Table.Cell>
                  <Table.Cell numeric>{index + 1}</Table.Cell>
                </Table.Row>
              ),
            )}
          </Table.Body>
        </Table>
      </Table.ScrollArea>
    </div>
  ),
};

export const InsideCard: Story = {
  render: () => (
    <Card class={styles.card}>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardBody class={styles.cardContent}>
        <Table.ScrollArea>
          <Table class={styles.table}>
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
                <Table.Row>
                  <Table.Cell class={styles.emphasis}>{project.name}</Table.Cell>
                  <Table.Cell>{project.owner}</Table.Cell>
                  <Table.Cell>{project.updated}</Table.Cell>
                  <Table.Cell>{project.issues}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Table.ScrollArea>
      </CardBody>
    </Card>
  ),
};

export const Empty: Story = {
  render: () => (
    <div class={styles.showcase}>
      <Table.ScrollArea>
        <Table>
          <Table.Caption side="top">
            Projects filtered by the current workspace query.
          </Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Project</Table.ColumnHeader>
              <Table.ColumnHeader>Owner</Table.ColumnHeader>
              <Table.ColumnHeader>Updated</Table.ColumnHeader>
              <Table.ColumnHeader numeric>Open issues</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Empty colSpan={4}>No projects matched the current filters.</Table.Empty>
          </Table.Body>
        </Table>
      </Table.ScrollArea>
    </div>
  ),
};