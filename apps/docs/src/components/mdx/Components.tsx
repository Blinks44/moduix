import { PackageManagerTabs, Tab, Tabs } from '@rspress/core/theme-original';
import type { ComponentProps, ReactNode } from 'react';
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
  copiedSource = false,
  dependencies = [],
}: {
  packageName: string | string[];
  itemLabel?: string;
  copiedSource?: boolean;
  dependencies?: string[];
}) {
  const packageNames = Array.isArray(packageName) ? packageName : [packageName];

  return (
    <div className={styles.install}>
      <p>
        {copiedSource ? (
          <>
            Copy this {itemLabel} and its CSS from the tabs above, then add the moduix components it
            uses:
          </>
        ) : (
          <>
            If you want this {itemLabel} in your project source instead of <code>node_modules</code>
            , install it from the hosted moduix registry:
          </>
        )}
      </p>
      <PackageManagerTabs
        command={`shadcn@latest add ${packageNames.map((name) => `@moduix-react/${name}`).join(' ')}`}
        dlx
      />
      {dependencies.length > 0 ? (
        <>
          <p>
            This example also requires{' '}
            {dependencies.map((dependency, index) => (
              <code key={dependency}>{index > 0 ? ` ${dependency}` : dependency}</code>
            ))}
            .
          </p>
          <PackageManagerTabs command={`install ${dependencies.join(' ')}`} />
        </>
      ) : null}
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

function PreviewMeta({ children, ...props }: ComponentProps<'div'>) {
  return (
    <div {...props} data-preview-meta>
      {children}
    </div>
  );
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