import { useI18n } from '@rspress/core/runtime';
import { Link, PackageManagerTabs, Tab, Tabs } from '@rspress/core/theme';
import type { ComponentProps, ReactNode } from 'react';
import { useLocalizedPath } from '@/utils/localized-path';
import styles from './Components.module.css';
import { cssDescriptionKeys } from './css-description-keys';
import {
  CSSPropertiesReferenceTable,
  ExampleFrame,
  PreviewFrame,
  normalizeCssProperties,
  type CssPropertyInput,
} from './reference';

function PrimitiveReference({ href, label = 'Ark UI API' }: { href: string; label?: string }) {
  const t = useI18n<typeof import('i18n')>();

  return (
    <aside className={styles.reference}>
      <div>
        <strong>{t('primitiveReferenceTitle')}</strong>
        <p>{t('primitiveReferenceDescription')}</p>
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
  const t = useI18n<typeof import('i18n')>();
  const displayItemLabel = itemLabel === 'component' ? t('shadcnComponentLabel') : itemLabel;

  return (
    <div className={styles.install}>
      <p>
        {copiedSource ? (
          <>
            {t('shadcnCopyPrefix')} {displayItemLabel} {t('shadcnCopySuffix')}
          </>
        ) : (
          <>
            {t('shadcnInstallPrefix')} {displayItemLabel} {t('shadcnInstallMiddle')}{' '}
            <code>node_modules</code>
            {t('shadcnInstallSuffix')}
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
            {t('shadcnExampleRequires')}{' '}
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
  const t = useI18n<typeof import('i18n')>();
  const normalizedProperties = normalizeCssProperties(properties).map((property) => ({
    ...property,
    description: hasCssDescriptionKey(property.name)
      ? t(cssDescriptionKeys[property.name])
      : property.description,
  }));

  return (
    <div className={styles.cssProperties}>
      <Tabs values={[{ label: t('cssVariables'), value: 'CSS Variables' }]}>
        <Tab value="CSS Variables">
          <CSSPropertiesReferenceTable properties={normalizedProperties} />
        </Tab>
      </Tabs>
    </div>
  );
}

function hasCssDescriptionKey(name: string): name is keyof typeof cssDescriptionKeys {
  return Object.hasOwn(cssDescriptionKeys, name);
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
  const localizedHref = useLocalizedPath(href);

  return (
    <Link className={styles.card} href={localizedHref}>
      {icon ? <span className={styles.cardIcon}>{icon}</span> : null}
      <strong>{title}</strong>
      <span>{description}</span>
    </Link>
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