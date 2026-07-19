//#region demo
import { Breadcrumbs } from '@moduix/react';

const currentPage =
  'Go lang developer to production team with cross-functional ownership and platform support';

export function BreadcrumbsLongLabelDemo() {
  return (
    <Breadcrumbs className="breadcrumbs-long-label">
      <Breadcrumbs.Path
        items={[
          { href: '/', label: 'Home' },
          { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
          { label: <span title={currentPage}>{currentPage}</span> },
        ]}
      />
    </Breadcrumbs>
  );
}
//#endregion