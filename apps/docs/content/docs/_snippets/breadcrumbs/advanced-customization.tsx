import type { ComponentProps } from 'react';
//#region demo
import { Breadcrumbs, SeparatorMarkIcon } from '@moduix/react';

const separatorIconStyle = {
  width: '0.75rem',
  height: '0.25rem',
};

function AppLink(props: ComponentProps<'a'>) {
  return <a data-framework-link {...props} />;
}

export function BreadcrumbsAdvancedCustomizationDemo() {
  return (
    <Breadcrumbs className="breadcrumbs-long-label">
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link asChild>
            <AppLink href="/">Home</AppLink>
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Link asChild>
            <AppLink href="/docs">Docs</AppLink>
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator>
          <SeparatorMarkIcon className="separator-icon" style={separatorIconStyle} />
        </Breadcrumbs.Separator>
        <Breadcrumbs.Item>
          <Breadcrumbs.Page>
            <span title="Go lang developer to production team with cross-functional ownership and platform support">
              Go lang developer to production team with cross-functional ownership and platform
              support
            </span>
          </Breadcrumbs.Page>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
}
//#endregion