//#region demo
import { Breadcrumbs } from '@moduix/react';

const currentPage =
  'Go lang developer to production team with cross-functional ownership and platform support';

export function BreadcrumbsLongLabelDemo() {
  return (
    <Breadcrumbs className="breadcrumbs-long-label">
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="/docs/breadcrumbs">Breadcrumbs</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Page>
            <span title={currentPage}>{currentPage}</span>
          </Breadcrumbs.Page>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
}
//#endregion