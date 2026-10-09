import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Badge } from '@/components/badge/Badge';
import { Button } from '@/components/button/Button';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/card/Card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumn,
  TableColumnGroup,
  TableColumnHeader,
  TableEmpty,
  TableFooter,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@/components/table/Table';

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

const showcaseClass = 'w-[min(44rem,calc(100vw-2rem))]';
const tableClass = 'min-w-160';
const wideTableClass = 'min-w-224';
const stackClass = 'grid w-[min(44rem,calc(100vw-2rem))] gap-4';
const stickyScrollAreaClass = 'max-h-72';
const cardClass = 'w-[min(44rem,calc(100vw-2rem))]';
const cardContentClass = 'min-w-0 pt-0';
const codeClass = 'font-mono font-medium tabular-nums';
const emphasisClass = 'font-medium';

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
    <div class={showcaseClass}>
      <TableScrollArea>
        <Table class={tableClass}>
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
                <TableCell class={codeClass}>{invoice.id}</TableCell>
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
    <div class={showcaseClass}>
      <TableScrollArea>
        <Table class={tableClass}>
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
                <TableCell class={codeClass}>{invoice.id}</TableCell>
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
    <div class={showcaseClass}>
      <TableScrollArea>
        <Table striped interactive class={tableClass}>
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
                <TableCell class={emphasisClass}>{project.name}</TableCell>
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
    <div class={showcaseClass}>
      <TableScrollArea>
        <Table interactive class={tableClass}>
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
                <TableCell class={emphasisClass}>{project.name}</TableCell>
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
    <div class={stackClass}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <TableScrollArea>
          <Table size={size} variant={size === 'md' ? 'outline' : 'line'} class={tableClass}>
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
                  <TableCell class={emphasisClass}>{project.name}</TableCell>
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
    <div class={showcaseClass}>
      <TableScrollArea>
        <Table showColumnBorder class={tableClass}>
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
              <TableCell class={emphasisClass}>Laptop</TableCell>
              <TableCell>Electronics</TableCell>
              <TableCell numeric>$999.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class={emphasisClass}>Coffee Maker</TableCell>
              <TableCell>Home Appliances</TableCell>
              <TableCell numeric>$49.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class={emphasisClass}>Desk Chair</TableCell>
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
    <div class={showcaseClass}>
      <TableScrollArea class={stickyScrollAreaClass}>
        <Table stickyHeader interactive class={wideTableClass}>
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
                  <TableCell data-sticky="start" class={emphasisClass}>
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
    <Card class={cardClass}>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardBody class={cardContentClass}>
        <TableScrollArea>
          <Table class={tableClass}>
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
                  <TableCell class={emphasisClass}>{project.name}</TableCell>
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
    <div class={showcaseClass}>
      <TableScrollArea>
        <Table>
          <TableCaption side="top">Projects filtered by the current workspace query.</TableCaption>
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