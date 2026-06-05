import type { ComponentProps } from 'react';
import {
  Button,
  ComputerIcon,
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
  MapIcon,
} from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './empty.module.css';

export const emptyOverrideCssProperties: CssPropertyInput[] = [
  ['--empty-actions-gap', 'var(--spacing-2)', 'Controls spacing between action items.'],
  [
    '--empty-bg',
    'color-mix(in oklab, var(--color-card) 92%, var(--color-muted))',
    'Controls the empty-state surface background.',
  ],
  ['--empty-border-color', 'var(--color-border)', 'Controls the root border color.'],
  ['--empty-border-width', 'var(--border-width-sm)', 'Controls the root border width.'],
  ['--empty-color', 'var(--color-card-foreground)', 'Controls the root foreground color.'],
  ['--empty-content-gap', 'var(--spacing-1)', 'Controls spacing between title and description.'],
  ['--empty-content-max-width', '28rem', 'Controls maximum width of the text block.'],
  [
    '--empty-description-color',
    'var(--color-muted-foreground)',
    'Controls description text color.',
  ],
  ['--empty-description-font-size', 'var(--text-sm)', 'Controls description font size.'],
  [
    '--empty-description-line-height',
    'var(--line-height-text-sm)',
    'Controls description line-height.',
  ],
  ['--empty-gap', 'var(--spacing-4)', 'Controls spacing between the major sections.'],
  ['--empty-icon-bg', 'var(--color-muted)', 'Controls the icon container background.'],
  ['--empty-icon-color', 'var(--color-muted-foreground)', 'Controls the icon color.'],
  ['--empty-icon-padding', 'var(--spacing-3)', 'Controls the icon container padding.'],
  ['--empty-icon-size', '1.5rem', 'Controls nested SVG icon size.'],
  ['--empty-padding', 'var(--spacing-8)', 'Controls root padding.'],
  ['--empty-radius', 'var(--radius-xl)', 'Controls root border radius.'],
  ['--empty-shadow', 'none', 'Controls root shadow.'],
  ['--empty-title-color', 'currentColor', 'Controls title color.'],
  ['--empty-title-font-size', 'var(--text-xl)', 'Controls title font size.'],
  ['--empty-title-font-weight', 'var(--weight-semibold)', 'Controls title font weight.'],
  ['--empty-title-line-height', 'var(--line-height-text-xl)', 'Controls title line-height.'],
];

export const emptyPlaygroundCssProperties: CssPropertyInput[] = [
  [
    '--empty-bg',
    'color-mix(in oklab, var(--color-card) 92%, var(--color-muted))',
    'Surface background.',
  ],
  ['--empty-border-color', 'var(--color-border)', 'Surface border color.'],
  ['--empty-gap', 'var(--spacing-4)', 'Gap between major sections.'],
  ['--empty-icon-bg', 'var(--color-muted)', 'Icon container background.'],
  ['--empty-icon-color', 'var(--color-muted-foreground)', 'Icon color.'],
  ['--empty-padding', 'var(--spacing-8)', 'Surface padding.'],
];

export function EmptyCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={emptyOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function EmptyCssPlaygroundPanel({ values, onChange, onReset }: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={emptyPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function EmptyExample(props: ComponentProps<typeof Empty>) {
  return (
    <Empty className={styles.empty} {...props}>
      <EmptyIcon>
        <ComputerIcon />
      </EmptyIcon>
      <EmptyContent>
        <EmptyTitle>No deployments yet</EmptyTitle>
        <EmptyDescription>
          Connect a repository to start tracking release status and deployment history.
        </EmptyDescription>
      </EmptyContent>
      <EmptyActions>
        <Button>Connect repository</Button>
        <Button variant="outline">Read setup guide</Button>
      </EmptyActions>
    </Empty>
  );
}

export function EmptyWithoutActionsExample() {
  return (
    <Empty className={styles.empty}>
      <EmptyIcon>
        <MapIcon />
      </EmptyIcon>
      <EmptyContent>
        <EmptyTitle>No saved places</EmptyTitle>
        <EmptyDescription>
          Save frequently used destinations to keep them close to your workspace.
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
}

export function EmptyWithoutIconExample() {
  return (
    <Empty className={styles.empty}>
      <EmptyContent>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          Try changing the search query or clearing one of the active filters.
        </EmptyDescription>
      </EmptyContent>
      <EmptyActions>
        <Button variant="outline">Clear filters</Button>
      </EmptyActions>
    </Empty>
  );
}

export function EmptyCustomStylesExample() {
  return (
    <Empty className={styles.customEmpty}>
      <EmptyIcon className={styles.customIcon}>
        <ComputerIcon />
      </EmptyIcon>
      <EmptyContent>
        <EmptyTitle>Invite your team</EmptyTitle>
        <EmptyDescription>
          Shared projects, comments, and approvals appear here after the first teammate joins.
        </EmptyDescription>
      </EmptyContent>
      <EmptyActions>
        <Button>Send invite</Button>
      </EmptyActions>
    </Empty>
  );
}