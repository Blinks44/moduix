import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../badge';
import { Card } from '../card';
import { Table } from './Table';
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
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div className={styles.showcase}>
      <Table.ScrollArea>
        <Table className={styles.table}>
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
              <Table.Row key={invoice.id}>
                <Table.Cell className={styles.code}>{invoice.id}</Table.Cell>
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
    <div className={styles.showcase}>
      <Table.ScrollArea>
        <Table className={styles.table}>
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
              <Table.Row key={invoice.id}>
                <Table.Cell className={styles.code}>{invoice.id}</Table.Cell>
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
    <div className={styles.showcase}>
      <Table.ScrollArea>
        <Table striped interactive className={styles.table}>
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
              <Table.Row key={project.name}>
                <Table.Cell className={styles.emphasis}>{project.name}</Table.Cell>
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

export const SizesAndVariants: Story = {
  render: () => (
    <div className={styles.stack}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Table.ScrollArea key={size}>
          <Table size={size} variant={size === 'md' ? 'outline' : 'line'} className={styles.table}>
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
                <Table.Row key={project.name}>
                  <Table.Cell className={styles.emphasis}>{project.name}</Table.Cell>
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
    <div className={styles.showcase}>
      <Table.ScrollArea>
        <Table showColumnBorder className={styles.table}>
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
              <Table.Cell className={styles.emphasis}>Laptop</Table.Cell>
              <Table.Cell>Electronics</Table.Cell>
              <Table.Cell numeric>$999.99</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className={styles.emphasis}>Coffee Maker</Table.Cell>
              <Table.Cell>Home Appliances</Table.Cell>
              <Table.Cell numeric>$49.99</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className={styles.emphasis}>Desk Chair</Table.Cell>
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
    <div className={styles.showcase}>
      <Table.ScrollArea className={styles.stickyScrollArea}>
        <Table stickyHeader interactive className={styles.wideTable}>
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
                <Table.Row key={`${project.name}-${index}`}>
                  <Table.Cell data-sticky="start" className={styles.emphasis}>
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
    <Card className={styles.card}>
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
                  <Table.Cell className={styles.emphasis}>{project.name}</Table.Cell>
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
  ),
};

export const Empty: Story = {
  render: () => (
    <div className={styles.showcase}>
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