import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Badge } from '@/components/badge/Badge';
import { Button } from '@/components/button/Button';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/card/Card';
import { Table, TableBody, TableCaption, TableCell, TableColumn, TableColumnGroup, TableColumnHeader, TableEmpty, TableFooter, TableHeader, TableRow, TableScrollArea } from '@/components/table/Table';
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
    <div class={styles.showcase}>
      <TableScrollArea>
        <Table class={styles.table}>
          <TableHeader>
            <TableRow>
              <TableColumnHeader>Invoice</TableColumnHeader>
              <TableColumnHeader>Status</TableColumnHeader>
              <TableColumnHeader>Method</TableColumnHeader>
              <TableColumnHeader numeric>Amount</TableColumnHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow>
                <TableCell class={styles.code}>{invoice.id}</TableCell>
                <TableCell>
                  <Badge variant={invoice.status === 'Paid' ? 'secondary' : 'outline'}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>{invoice.method}</TableCell>
                <TableCell numeric>{invoice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableScrollArea>
    </div>
  ),
};

export const WithCaptionAndFooter: Story = {
  render: () => (
    <div class={styles.showcase}>
      <TableScrollArea>
        <Table class={styles.table}>
          <TableCaption side="top">
            A list of recent invoices for the current billing cycle.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableColumnHeader>Invoice</TableColumnHeader>
              <TableColumnHeader>Status</TableColumnHeader>
              <TableColumnHeader>Method</TableColumnHeader>
              <TableColumnHeader numeric>Amount</TableColumnHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow>
                <TableCell class={styles.code}>{invoice.id}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>{invoice.method}</TableCell>
                <TableCell numeric>{invoice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell numeric>$1,200.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableScrollArea>
    </div>
  ),
};

export const StripedRows: Story = {
  render: () => (
    <div class={styles.showcase}>
      <TableScrollArea>
        <Table striped interactive class={styles.table}>
          <TableHeader>
            <TableRow>
              <TableColumnHeader>Project</TableColumnHeader>
              <TableColumnHeader>Owner</TableColumnHeader>
              <TableColumnHeader>Updated</TableColumnHeader>
              <TableColumnHeader numeric>Open issues</TableColumnHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow>
                <TableCell class={styles.emphasis}>{project.name}</TableCell>
                <TableCell>{project.owner}</TableCell>
                <TableCell>{project.updated}</TableCell>
                <TableCell numeric>{index + 1}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableScrollArea>
    </div>
  ),
};

export const InteractiveRows: Story = {
  render: () => (
    <div class={styles.showcase}>
      <TableScrollArea>
        <Table interactive class={styles.table}>
          <TableCaption side="top">
            Focus a row action to keep its row context visible for keyboard users.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableColumnHeader>Project</TableColumnHeader>
              <TableColumnHeader>Owner</TableColumnHeader>
              <TableColumnHeader>Updated</TableColumnHeader>
              <TableColumnHeader numeric>Actions</TableColumnHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow>
                <TableCell class={styles.emphasis}>{project.name}</TableCell>
                <TableCell>{project.owner}</TableCell>
                <TableCell>{project.updated}</TableCell>
                <TableCell numeric>
                  <Button size="sm" variant="ghost">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableScrollArea>
    </div>
  ),
};

export const SizesAndVariants: Story = {
  render: () => (
    <div class={styles.stack}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <TableScrollArea>
          <Table size={size} variant={size === 'md' ? 'outline' : 'line'} class={styles.table}>
            <TableCaption side="top">{size.toUpperCase()} project summary</TableCaption>
            <TableHeader>
              <TableRow>
                <TableColumnHeader>Project</TableColumnHeader>
                <TableColumnHeader>Owner</TableColumnHeader>
                <TableColumnHeader numeric>Open issues</TableColumnHeader>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.slice(0, 2).map((project, index) => (
                <TableRow>
                  <TableCell class={styles.emphasis}>{project.name}</TableCell>
                  <TableCell>{project.owner}</TableCell>
                  <TableCell numeric>{index + 1}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableScrollArea>
      ))}
    </div>
  ),
};

export const ColumnGroupAndBorders: Story = {
  render: () => (
    <div class={styles.showcase}>
      <TableScrollArea>
        <Table showColumnBorder class={styles.table}>
          <TableColumnGroup>
            <TableColumn htmlWidth="42%" />
            <TableColumn htmlWidth="28%" />
            <TableColumn htmlWidth="30%" />
          </TableColumnGroup>
          <TableHeader>
            <TableRow>
              <TableColumnHeader>Product</TableColumnHeader>
              <TableColumnHeader>Category</TableColumnHeader>
              <TableColumnHeader numeric>Price</TableColumnHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell class={styles.emphasis}>Laptop</TableCell>
              <TableCell>Electronics</TableCell>
              <TableCell numeric>$999.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class={styles.emphasis}>Coffee Maker</TableCell>
              <TableCell>Home Appliances</TableCell>
              <TableCell numeric>$49.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class={styles.emphasis}>Desk Chair</TableCell>
              <TableCell>Furniture</TableCell>
              <TableCell numeric>$150.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableScrollArea>
    </div>
  ),
};

export const StickyHeaderAndColumn: Story = {
  render: () => (
    <div class={styles.showcase}>
      <TableScrollArea class={styles.stickyScrollArea}>
        <Table stickyHeader interactive class={styles.wideTable}>
          <TableHeader>
            <TableRow>
              <TableColumnHeader data-sticky="start">Project</TableColumnHeader>
              <TableColumnHeader>Owner</TableColumnHeader>
              <TableColumnHeader>Environment</TableColumnHeader>
              <TableColumnHeader>Updated</TableColumnHeader>
              <TableColumnHeader numeric>Open issues</TableColumnHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }, (_, index) => projects[index % projects.length]).map(
              (project, index) => (
                <TableRow>
                  <TableCell data-sticky="start" class={styles.emphasis}>
                    {project.name}
                  </TableCell>
                  <TableCell>{project.owner}</TableCell>
                  <TableCell>Production</TableCell>
                  <TableCell>{project.updated}</TableCell>
                  <TableCell numeric>{index + 1}</TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TableScrollArea>
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
        <TableScrollArea>
          <Table class={styles.table}>
            <TableHeader>
              <TableRow>
                <TableColumnHeader>Project</TableColumnHeader>
                <TableColumnHeader>Owner</TableColumnHeader>
                <TableColumnHeader>Updated</TableColumnHeader>
                <TableColumnHeader>Health</TableColumnHeader>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow>
                  <TableCell class={styles.emphasis}>{project.name}</TableCell>
                  <TableCell>{project.owner}</TableCell>
                  <TableCell>{project.updated}</TableCell>
                  <TableCell>{project.issues}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableScrollArea>
      </CardBody>
    </Card>
  ),
};

export const Empty: Story = {
  render: () => (
    <div class={styles.showcase}>
      <TableScrollArea>
        <Table>
          <TableCaption side="top">
            Projects filtered by the current workspace query.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableColumnHeader>Project</TableColumnHeader>
              <TableColumnHeader>Owner</TableColumnHeader>
              <TableColumnHeader>Updated</TableColumnHeader>
              <TableColumnHeader numeric>Open issues</TableColumnHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableEmpty colSpan={4}>No projects matched the current filters.</TableEmpty>
          </TableBody>
        </Table>
      </TableScrollArea>
    </div>
  ),
};
