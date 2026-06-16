import type { ComponentProps, ReactNode } from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableEmpty,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
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
  ['--table-container-bg', 'var(--color-card)', 'Controls `TableContainer` background color.'],
  [
    '--table-container-border-color',
    'var(--table-border-color, var(--color-border))',
    'Controls `TableContainer` border color.',
  ],
  [
    '--table-container-border-width',
    'var(--table-border-width, var(--border-width-sm))',
    'Controls `TableContainer` border width.',
  ],
  ['--table-container-radius', 'var(--radius-lg)', 'Controls `TableContainer` border radius.'],
  ['--table-container-shadow', 'none', 'Controls `TableContainer` shadow.'],
  ['--table-empty-color', 'var(--color-muted-foreground)', 'Controls `TableEmpty` text color.'],
  [
    '--table-empty-padding-y',
    'calc(var(--table-cell-padding-y, var(--spacing-3)) * 2)',
    'Controls `TableEmpty` vertical padding.',
  ],
  ['--table-font-family', 'var(--font-sans)', 'Controls table font family.'],
  ['--table-font-size', 'var(--text-sm)', 'Controls table font size.'],
  ['--table-footer-bg', 'var(--color-muted)', 'Controls footer background color.'],
  ['--table-footer-color', 'var(--table-color, var(--color-foreground))', 'Controls footer color.'],
  ['--table-footer-font-weight', 'var(--weight-medium)', 'Controls footer font weight.'],
  ['--table-head-color', 'var(--color-muted-foreground)', 'Controls header cell color.'],
  ['--table-head-font-weight', 'var(--weight-medium)', 'Controls header cell font weight.'],
  ['--table-line-height', 'var(--line-height-text-sm)', 'Controls table line height.'],
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
] as const;

export const tablePlaygroundCssProperties: CssPropertyInput[] = [
  ['--table-border-color', 'var(--color-border)', 'Controls table divider color.'],
  ['--table-caption-color', 'var(--color-muted-foreground)', 'Controls caption text color.'],
  ['--table-caption-padding-edge', 'var(--spacing-2)', 'Controls outer caption inset.'],
  ['--table-caption-padding-y', 'var(--spacing-3)', 'Controls caption-to-table spacing.'],
  ['--table-cell-padding-x', 'var(--spacing-4)', 'Controls cell horizontal padding.'],
  ['--table-cell-padding-y', 'var(--spacing-3)', 'Controls cell vertical padding.'],
  ['--table-container-bg', 'var(--color-card)', 'Controls container background color.'],
  [
    '--table-container-border-color',
    'var(--table-border-color, var(--color-border))',
    'Controls container border color.',
  ],
  ['--table-container-radius', 'var(--radius-lg)', 'Controls container border radius.'],
  ['--table-empty-color', 'var(--color-muted-foreground)', 'Controls empty-state text color.'],
  ['--table-footer-bg', 'var(--color-muted)', 'Controls footer background color.'],
  ['--table-head-color', 'var(--color-muted-foreground)', 'Controls header cell color.'],
  ['--table-row-bg-hover', 'var(--color-muted)', 'Controls body row hover background.'],
  [
    '--table-row-bg-striped',
    'color-mix(in oklab, var(--color-muted) 35%, transparent)',
    'Controls striped even-row background.',
  ],
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

export function TableCssPlaygroundPanel({ values, onChange, onReset }: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={tablePlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

export function TableExample() {
  return (
    <TableContainer className={styles.showcase}>
      <Table className={styles.table}>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead numeric>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className={styles.code}>{invoice.id}</TableCell>
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
    </TableContainer>
  );
}

export function TableCaptionExample() {
  return (
    <TableContainer className={styles.showcase}>
      <Table className={styles.table}>
        <TableCaption side="top">
          A list of recent invoices for the current billing cycle.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead numeric>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className={styles.code}>{invoice.id}</TableCell>
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
    </TableContainer>
  );
}

export function NumericTableExample() {
  return (
    <TableContainer className={styles.showcase}>
      <Table className={styles.table}>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead numeric>Requests</TableHead>
            <TableHead numeric>Error rate</TableHead>
            <TableHead numeric>Latency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className={styles.emphasis}>Search API</TableCell>
            <TableCell numeric>1,204,122</TableCell>
            <TableCell numeric>0.12%</TableCell>
            <TableCell numeric>128 ms</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={styles.emphasis}>Billing API</TableCell>
            <TableCell numeric>248,421</TableCell>
            <TableCell numeric>0.04%</TableCell>
            <TableCell numeric>96 ms</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={styles.emphasis}>Docs site</TableCell>
            <TableCell numeric>82,304</TableCell>
            <TableCell numeric>0.00%</TableCell>
            <TableCell numeric>42 ms</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function StripedTableExample() {
  return (
    <TableContainer className={styles.showcase}>
      <Table striped className={styles.table}>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead numeric>Open issues</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project, index) => (
            <TableRow key={project.name}>
              <TableCell className={styles.emphasis}>{project.name}</TableCell>
              <TableCell>{project.owner}</TableCell>
              <TableCell>{project.updated}</TableCell>
              <TableCell numeric>{index + 1}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function EmptyTableExample() {
  return (
    <TableContainer className={styles.showcase}>
      <Table>
        <TableCaption side="top">Projects filtered by the current workspace query.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead numeric>Open issues</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableEmpty colSpan={4}>No projects matched the current filters.</TableEmpty>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function TableInCardExample() {
  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <TableContainer>
          <Table className={styles.table}>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Health</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.name}>
                  <TableCell className={styles.emphasis}>{project.name}</TableCell>
                  <TableCell>{project.owner}</TableCell>
                  <TableCell>{project.updated}</TableCell>
                  <TableCell>{project.issues}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

function TableRowActionsMenu({ itemName }: { itemName: string }) {
  return (
    <Menu>
      <MenuTriggerButton aria-label={`Open actions for ${itemName}`}>...</MenuTriggerButton>
      <MenuContent align="end">
        <MenuItem closeOnClick>Open project</MenuItem>
        <MenuItem closeOnClick>Copy link</MenuItem>
        <MenuItem closeOnClick>Duplicate</MenuItem>
        <MenuSeparator />
        <MenuItem closeOnClick tone="destructive">
          Archive
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}

function MenuTriggerButton({
  children,
  ...props
}: Omit<ComponentProps<typeof Button>, 'children'> & {
  children: ReactNode;
}) {
  return (
    <MenuTrigger
      render={<Button variant="ghost" size="icon-md" className={styles.actionTrigger} {...props} />}
    >
      <span aria-hidden className={styles.actionEllipsis}>
        {children}
      </span>
    </MenuTrigger>
  );
}

export function TableRowActionsExample() {
  return (
    <TableContainer className={styles.showcase}>
      <Table className={styles.table}>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Environment</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className={styles.actionsHead}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deploymentRows.map((row) => (
            <TableRow key={row.name}>
              <TableCell className={styles.emphasis}>{row.name}</TableCell>
              <TableCell>{row.owner}</TableCell>
              <TableCell>{row.environment}</TableCell>
              <TableCell>{row.updated}</TableCell>
              <TableCell className={styles.actionsCell}>
                <TableRowActionsMenu itemName={row.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function CustomCompositionTableExample() {
  return (
    <div className={styles.shell}>
      <Table className={styles.table}>
        <TableCaption side="bottom">
          This version uses a plain wrapper instead of `TableContainer`.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Plan</TableHead>
            <TableHead>Seats</TableHead>
            <TableHead numeric>Monthly cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className={styles.emphasis}>Starter</TableCell>
            <TableCell>Up to 5</TableCell>
            <TableCell numeric>$19</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={styles.emphasis}>Team</TableCell>
            <TableCell>Up to 25</TableCell>
            <TableCell numeric>$79</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={styles.emphasis}>Enterprise</TableCell>
            <TableCell>Custom</TableCell>
            <TableCell numeric>Contact sales</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}