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
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './empty.module.css';

export const emptyOverrideCssProperties = [
  {
    name: '--empty-actions-gap',
    defaultValue: 'var(--spacing-2)',
    description: 'Controls spacing between action items.',
  },
  {
    name: '--empty-bg',
    defaultValue: 'color-mix(in oklab, var(--color-card) 92%, var(--color-muted))',
    description: 'Controls the empty-state surface background.',
  },
  {
    name: '--empty-border-color',
    defaultValue: 'var(--color-border)',
    description: 'Controls the root border color.',
  },
  {
    name: '--empty-border-width',
    defaultValue: 'var(--border-width-sm)',
    description: 'Controls the root border width.',
  },
  {
    name: '--empty-color',
    defaultValue: 'var(--color-card-foreground)',
    description: 'Controls the root foreground color.',
  },
  {
    name: '--empty-content-gap',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls spacing between title and description.',
  },
  {
    name: '--empty-content-max-width',
    defaultValue: '28rem',
    description: 'Controls maximum width of the text block.',
  },
  {
    name: '--empty-description-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls description text color.',
  },
  {
    name: '--empty-description-font-size',
    defaultValue: 'var(--text-sm)',
    description: 'Controls description font size.',
  },
  {
    name: '--empty-description-line-height',
    defaultValue: 'var(--line-height-text-sm)',
    description: 'Controls description line-height.',
  },
  {
    name: '--empty-gap',
    defaultValue: 'var(--spacing-4)',
    description: 'Controls spacing between the major sections.',
  },
  {
    name: '--empty-icon-bg',
    defaultValue: 'var(--color-muted)',
    description: 'Controls the icon container background.',
  },
  {
    name: '--empty-icon-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls the icon color.',
  },
  {
    name: '--empty-icon-padding',
    defaultValue: 'var(--spacing-3)',
    description: 'Controls the icon container padding.',
  },
  {
    name: '--empty-icon-size',
    defaultValue: '1.5rem',
    description: 'Controls nested SVG icon size.',
  },
  {
    name: '--empty-padding',
    defaultValue: 'var(--spacing-8)',
    description: 'Controls root padding.',
  },
  {
    name: '--empty-radius',
    defaultValue: 'var(--radius-xl)',
    description: 'Controls root border radius.',
  },
  { name: '--empty-shadow', defaultValue: 'none', description: 'Controls root shadow.' },
  {
    name: '--empty-title-color',
    defaultValue: 'currentColor',
    description: 'Controls title color.',
  },
  {
    name: '--empty-title-font-size',
    defaultValue: 'var(--text-xl)',
    description: 'Controls title font size.',
  },
  {
    name: '--empty-title-font-weight',
    defaultValue: 'var(--weight-semibold)',
    description: 'Controls title font weight.',
  },
  {
    name: '--empty-title-line-height',
    defaultValue: 'var(--line-height-text-xl)',
    description: 'Controls title line-height.',
  },
] satisfies CssPropertyInput[];

export function EmptyCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={emptyOverrideCssProperties} />;
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