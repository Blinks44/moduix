import { PackageManagerTabs, Tab, Tabs } from '@rspress/core/theme-original';
import type { ReactNode } from 'react';
import styles from './Components.module.css';
import {
  CSSPropertiesReferenceTable,
  ExampleFrame,
  PreviewFrame,
  normalizeCssProperties,
  type CssPropertyInput,
} from './reference';

function PrimitiveReference({ href, label = 'Ark UI API' }: { href: string; label?: string }) {
  return (
    <aside className={styles.reference}>
      <div>
        <strong>Upstream primitive API</strong>
        <p>Behavior, accessibility details, and low-level props live in the upstream reference.</p>
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        {label}
      </a>
    </aside>
  );
}

function ShadcnInstall({
  packageName,
  itemLabel = 'component',
}: {
  packageName: string;
  itemLabel?: string;
}) {
  return (
    <div className={styles.install}>
      <p>
        If you want this {itemLabel} in your project source instead of <code>node_modules</code>,
        install it from the hosted moduix registry:
      </p>
      <PackageManagerTabs command={`shadcn@latest add @moduix-react/${packageName}`} dlx />
    </div>
  );
}

function CssPropertiesSection({ properties }: { properties: CssPropertyInput[] }) {
  return (
    <div className={styles.cssProperties}>
      <Tabs values={[{ label: 'CSS Variables', value: 'CSS Variables' }]}>
        <Tab value="CSS Variables">
          <CSSPropertiesReferenceTable properties={normalizeCssProperties(properties)} />
        </Tab>
      </Tabs>
    </div>
  );
}

function Cards({ children }: { children: ReactNode }) {
  return <div className={styles.cards}>{children}</div>;
}

function Card({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
}) {
  return (
    <a className={styles.card} href={href}>
      {icon ? <span className={styles.cardIcon}>{icon}</span> : null}
      <strong>{title}</strong>
      <span>{description}</span>
    </a>
  );
}

function PreviewMeta({ children }: { children: ReactNode }) {
  return <div data-preview-meta>{children}</div>;
}

export {
  Card,
  Cards,
  CssPropertiesSection,
  ExampleFrame,
  PreviewFrame,
  PreviewMeta,
  PrimitiveReference,
  ShadcnInstall,
};