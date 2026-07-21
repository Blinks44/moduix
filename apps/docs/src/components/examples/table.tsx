import { Badge, Button, Card, Menu, ScrollArea, Table } from '@moduix/react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/preview';
import { CSSPropertiesReferenceTable } from '../mdx/preview';
import styles from './table.module.css';

const invoices = [
  { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
  { id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
  { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
  { id: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
] as const;

const projects = [
  { name: 'Docs redesign', owner: 'Product Design', updated: '2 hours ago', issues: '3 open' },
  { name: 'Billing migration', owner: 'Growth', updated: 'Yesterday', issues: '1 blocked' },
  { name: 'Command palette', owner: 'Platform', updated: 'Today', issues: 'Healthy' },
] as const;

const deploymentRows = [
  {
    name: 'Docs redesign',
    owner: 'Product Design',
    environment: 'Production',
    updated: '2 hours ago',
  },
  { name: 'Billing migration', owner: 'Growth', environment: 'Staging', updated: 'Yesterday' },
  { name: 'Command palette', owner: 'Platform', environment: 'Preview', updated: 'Today' },
] as const;

export const tableOverrideCssProperties: CssPropertyInput[] = [
  ['--table-border-color', 'var(--color-border)', 'Controls table divider color.'],
  ['--table-border-width', 'var(--border-width-sm)', 'Controls table divider thickness.'],
  ['--table-caption-color', 'var(--color-muted-foreground)', 'Controls caption text color.'],
  ['--table-caption-font-size', 'var(--text-sm)', 'Controls caption font size.'],
  ['--table-caption-line-height', 'var(--line-height-text-sm)', 'Controls caption line height.'],
  [
    '--table-caption-padding-edge',
    'var(--spacing-2)',
    'Controls the outer top or bottom inset around the caption.',
  ],
  [
    '--table-caption-padding-x',
    'var(--table-cell-padding-x, var(--spacing-4))',
    'Controls caption horizontal inset.',
  ],
  [
    '--table-caption-padding-y',
    'var(--spacing-3)',
    'Controls spacing between the caption and the table.',
  ],
  ['--table-cell-padding-x', 'var(--spacing-4)', 'Controls cell horizontal padding.'],
  ['--table-cell-padding-y', 'var(--spacing-3)', 'Controls cell vertical padding.'],
  ['--table-color', 'var(--color-foreground)', 'Controls table text color.'],
  [
    '--table-column-border-color',
    'var(--table-border-color, var(--color-border))',
    'Controls column border color.',
  ],
  [
    '--table-column-border-width',
    'var(--table-border-width, var(--border-width-sm))',
    'Controls column border width.',
  ],
  [
    '--table-column-header-color',
    'var(--color-muted-foreground)',
    'Controls column header cell color.',
  ],
  [
    '--table-column-header-font-weight',
    'var(--weight-medium)',
    'Controls column header font weight.',
  ],
  ['--table-scroll-area-bg', 'var(--color-card)', 'Controls `Table.ScrollArea` background color.'],
  [
    '--table-scroll-area-border-color',
    'var(--table-border-color, var(--color-border))',
    'Controls `Table.ScrollArea` border color.',
  ],
  [
    '--table-scroll-area-border-width',
    'var(--table-border-width, var(--border-width-sm))',
    'Controls `Table.ScrollArea` border width.',
  ],
  ['--table-scroll-area-radius', 'var(--radius-lg)', 'Controls `Table.ScrollArea` border radius.'],
  ['--table-scroll-area-shadow', 'none', 'Controls `Table.ScrollArea` shadow.'],
  ['--table-empty-color', 'var(--color-muted-foreground)', 'Controls `Table.Empty` text color.'],
  [
    '--table-empty-padding-y',
    'calc(var(--table-cell-padding-y, var(--spacing-3)) * 2)',
    'Controls `Table.Empty` vertical padding.',
  ],
  ['--table-font-family', 'var(--font-sans)', 'Controls table font family.'],
  ['--table-font-size', 'var(--text-sm)', 'Controls table font size.'],
  ['--table-font-size-lg', 'var(--text-md)', 'Controls large table font size.'],
  ['--table-font-size-sm', 'var(--text-xs)', 'Controls small table font size.'],
  ['--table-footer-bg', 'var(--color-muted)', 'Controls footer background color.'],
  ['--table-footer-color', 'var(--table-color, var(--color-foreground))', 'Controls footer color.'],
  ['--table-footer-font-weight', 'var(--weight-medium)', 'Controls footer font weight.'],
  ['--table-line-height', 'var(--line-height-text-sm)', 'Controls table line height.'],
  ['--table-line-height-lg', 'var(--line-height-text-md)', 'Controls large table line height.'],
  ['--table-line-height-sm', 'var(--line-height-text-xs)', 'Controls small table line height.'],
  ['--table-row-bg-hover', 'var(--color-muted)', 'Controls body row hover background.'],
  [
    '--table-row-bg-striped',
    'color-mix(in oklab, var(--color-muted) 35%, transparent)',
    'Controls striped even-row background.',
  ],
  [
    '--table-row-transition',
    'background-color var(--transition-default)',
    'Controls body row hover transition.',
  ],
  [
    '--table-sticky-column-bg',
    'var(--table-scroll-area-bg, var(--color-card))',
    'Controls sticky column background.',
  ],
  ['--table-sticky-column-z-index', '2', 'Controls sticky column stacking.'],
  [
    '--table-sticky-header-bg',
    'var(--table-scroll-area-bg, var(--color-card))',
    'Controls sticky header background.',
  ],
  ['--table-sticky-header-z-index', '3', 'Controls sticky header stacking.'],
  ['--table-sticky-intersection-z-index', '4', 'Controls sticky header/column stacking.'],
] as const;

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { defaultValue: property[1], description: property[2], name: property[0] };
  }

  return property;
}

export function TableCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={tableOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function TableExample() {
  return (
    <Table.ScrollArea className={styles.showcase}>
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
  );
}

export function TableCaptionExample() {
  return (
    <Table.ScrollArea className={styles.showcase}>
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
  );
}

export function NumericTableExample() {
  return (
    <Table.ScrollArea className={styles.showcase}>
      <Table className={styles.table}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Service</Table.ColumnHeader>
            <Table.ColumnHeader numeric>Requests</Table.ColumnHeader>
            <Table.ColumnHeader numeric>Error rate</Table.ColumnHeader>
            <Table.ColumnHeader numeric>Latency</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell className={styles.emphasis}>Search API</Table.Cell>
            <Table.Cell numeric>1,204,122</Table.Cell>
            <Table.Cell numeric>0.12%</Table.Cell>
            <Table.Cell numeric>128 ms</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className={styles.emphasis}>Billing API</Table.Cell>
            <Table.Cell numeric>248,421</Table.Cell>
            <Table.Cell numeric>0.04%</Table.Cell>
            <Table.Cell numeric>96 ms</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className={styles.emphasis}>Docs site</Table.Cell>
            <Table.Cell numeric>82,304</Table.Cell>
            <Table.Cell numeric>0.00%</Table.Cell>
            <Table.Cell numeric>42 ms</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Table.ScrollArea>
  );
}

export function StripedTableExample() {
  return (
    <Table.ScrollArea className={styles.showcase}>
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
  );
}

export function TableSizesAndVariantsExample() {
  return (
    <div className={styles.stack}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Table.ScrollArea key={size} className={styles.showcase}>
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
  );
}

export function ColumnGroupTableExample() {
  return (
    <Table.ScrollArea className={styles.showcase}>
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
  );
}

export function StickyTableExample() {
  return (
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
          {Array.from(
            { length: 10 },
            (_, index) => deploymentRows[index % deploymentRows.length],
          ).map((row, index) => (
            <Table.Row key={`${row.name}-${index}`}>
              <Table.Cell data-sticky="start" className={styles.emphasis}>
                {row.name}
              </Table.Cell>
              <Table.Cell>{row.owner}</Table.Cell>
              <Table.Cell>{row.environment}</Table.Cell>
              <Table.Cell>{row.updated}</Table.Cell>
              <Table.Cell numeric>{index + 1}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.ScrollArea>
  );
}

export function EmptyTableExample() {
  return (
    <Table.ScrollArea className={styles.showcase}>
      <Table>
        <Table.Caption side="top">Projects filtered by the current workspace query.</Table.Caption>
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
  );
}

export function TableInCardExample() {
  return (
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
  );
}

function TableRowActionsMenu({ itemName }: { itemName: string }) {
  return (
    <Menu positioning={{ placement: 'bottom-end' }}>
      <Menu.Trigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className={styles.actionTrigger}
          aria-label={`Open actions for ${itemName}`}
        >
          <span aria-hidden className={styles.actionEllipsis}>
            ...
          </span>
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="open">Open project</Menu.Item>
          <Menu.Item value="copy-link">Copy link</Menu.Item>
          <Menu.Item value="duplicate">Duplicate</Menu.Item>
          <Menu.Separator />
          <Menu.Item value="archive" tone="destructive">
            Archive
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}

export function TableRowActionsExample() {
  return (
    <Table.ScrollArea className={styles.showcase}>
      <Table className={styles.table}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Project</Table.ColumnHeader>
            <Table.ColumnHeader>Owner</Table.ColumnHeader>
            <Table.ColumnHeader>Environment</Table.ColumnHeader>
            <Table.ColumnHeader>Updated</Table.ColumnHeader>
            <Table.ColumnHeader className={styles.actionsHead}>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {deploymentRows.map((row) => (
            <Table.Row key={row.name}>
              <Table.Cell className={styles.emphasis}>{row.name}</Table.Cell>
              <Table.Cell>{row.owner}</Table.Cell>
              <Table.Cell>{row.environment}</Table.Cell>
              <Table.Cell>{row.updated}</Table.Cell>
              <Table.Cell className={styles.actionsCell}>
                <TableRowActionsMenu itemName={row.name} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.ScrollArea>
  );
}

export function CustomCompositionTableExample() {
  return (
    <div className={styles.shell}>
      <Table className={styles.table}>
        <Table.Caption side="bottom">
          This version uses a plain wrapper instead of `Table.ScrollArea`.
        </Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Plan</Table.ColumnHeader>
            <Table.ColumnHeader>Seats</Table.ColumnHeader>
            <Table.ColumnHeader numeric>Monthly cost</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell className={styles.emphasis}>Starter</Table.Cell>
            <Table.Cell>Up to 5</Table.Cell>
            <Table.Cell numeric>$19</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className={styles.emphasis}>Team</Table.Cell>
            <Table.Cell>Up to 25</Table.Cell>
            <Table.Cell numeric>$79</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className={styles.emphasis}>Enterprise</Table.Cell>
            <Table.Cell>Custom</Table.Cell>
            <Table.Cell numeric>Contact sales</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

export function TableWithScrollAreaExample() {
  return (
    <ScrollArea className={styles.scrollArea}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <Table className={styles.wideTable}>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Project</Table.ColumnHeader>
                <Table.ColumnHeader>Owner</Table.ColumnHeader>
                <Table.ColumnHeader>Environment</Table.ColumnHeader>
                <Table.ColumnHeader>Updated</Table.ColumnHeader>
                <Table.ColumnHeader numeric>Open issues</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Array.from(
                { length: 12 },
                (_, index) => deploymentRows[index % deploymentRows.length],
              ).map((row, index) => (
                <Table.Row key={`${row.name}-${index}`}>
                  <Table.Cell className={styles.emphasis}>{row.name}</Table.Cell>
                  <Table.Cell>{row.owner}</Table.Cell>
                  <Table.Cell>{row.environment}</Table.Cell>
                  <Table.Cell>{row.updated}</Table.Cell>
                  <Table.Cell numeric>{index + 1}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  );
}