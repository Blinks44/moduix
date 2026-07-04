//#region demo
import { Breadcrumbs, SeparatorMarkIcon } from '@moduix/react';

const separatorIconStyle = {
  width: '0.75rem',
  height: '0.25rem',
};

export function BreadcrumbsSeparatorDemo() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator>
          <SeparatorMarkIcon className="separator-icon" style={separatorIconStyle} />
        </Breadcrumbs.Separator>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="/docs/breadcrumbs">Breadcrumbs</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator>
          <SeparatorMarkIcon className="separator-icon" style={separatorIconStyle} />
        </Breadcrumbs.Separator>
        <Breadcrumbs.Item>
          <Breadcrumbs.Page>Go Developer</Breadcrumbs.Page>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
}
//#endregion