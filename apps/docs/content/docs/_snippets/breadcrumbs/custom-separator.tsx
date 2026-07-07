//#region demo
import { Breadcrumbs, SeparatorMarkIcon } from '@moduix/react';

const items = [
  { href: '/', label: 'Home' },
  { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
  { label: 'Go Developer' },
] as const;

const separatorIconStyle = {
  width: '0.75rem',
  height: '0.25rem',
};

export function BreadcrumbsSeparatorDemo() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Path
        items={items}
        separator={<SeparatorMarkIcon className="separator-icon" style={separatorIconStyle} />}
      />
    </Breadcrumbs>
  );
}
//#endregion