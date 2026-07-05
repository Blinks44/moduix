import { Menu, PlusIcon, SplitButton } from '@moduix/react';
import { ArrowUpRight as ArrowUpRightIcon } from 'lucide-react';
import { useState } from 'react';
import styles from './split-button.module.css';

const basicItems = [
  { value: 'save-draft', label: 'Save as Draft' },
  { value: 'duplicate', label: 'Duplicate' },
  { value: 'publish', label: 'Publish Now' },
];

const variants = [
  { value: 'default', label: 'Default' },
  { value: 'outline', label: 'Outline' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'destructive', label: 'Destructive' },
  { value: 'destructive-outline', label: 'Destructive Outline' },
  { value: 'ghost', label: 'Ghost' },
] as const;

const sizes = [
  { value: 'xs', label: 'Extra-small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra-large' },
] as const;

export const splitButtonExampleCss = `
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-3);
}
`;

export const splitButtonItemsData = `
const items = [
  { value: "save-draft", label: "Save as Draft" },
  { value: "duplicate", label: "Duplicate" },
  { value: "publish", label: "Publish Now" },
];
`;

export const splitButtonVariantsData = `
const variants = ["default", "outline", "secondary", "destructive", "destructive-outline", "ghost"] as const;
`;

export const splitButtonSizesData = `
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
`;

export const splitButtonMenuCompositionData = `
const clipboardItems = ["Copy", "Duplicate"];
const exportItems = ["Export PDF", "Export CSV"];
`;

function SplitButtonMenuItems({ includeSeparator = true }: { includeSeparator?: boolean }) {
  return (
    <>
      {basicItems.slice(0, 2).map((item) => (
        <Menu.Item key={item.value} value={item.value}>
          {item.label}
        </Menu.Item>
      ))}
      {includeSeparator ? <Menu.Separator /> : null}
      <Menu.Item value={basicItems[2].value}>{basicItems[2].label}</Menu.Item>
    </>
  );
}

export function SplitButtonExample() {
  return (
    <SplitButton>
      <SplitButton.Action>Save Changes</SplitButton.Action>
      <SplitButton.Trigger />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <SplitButtonMenuItems />
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}

export function SplitButtonVariantsExample() {
  return (
    <div className={styles.row}>
      {variants.map((variant) => (
        <SplitButton key={variant.value} variant={variant.value}>
          <SplitButton.Action>{variant.label}</SplitButton.Action>
          <SplitButton.Trigger />
          <SplitButton.Positioner>
            <SplitButton.Content>
              <Menu.Item value={`${variant.value}-edit`}>Edit</Menu.Item>
              <Menu.Item value={`${variant.value}-duplicate`}>Duplicate</Menu.Item>
            </SplitButton.Content>
          </SplitButton.Positioner>
        </SplitButton>
      ))}
    </div>
  );
}

export function SplitButtonSizesExample() {
  return (
    <div className={styles.row}>
      {sizes.map((size) => (
        <SplitButton key={size.value} size={size.value} variant="outline">
          <SplitButton.Action>{size.label}</SplitButton.Action>
          <SplitButton.Trigger />
          <SplitButton.Positioner>
            <SplitButton.Content>
              <Menu.Item value={`${size.value}-create`}>Create</Menu.Item>
              <Menu.Item value={`${size.value}-create-open`}>Create and Open</Menu.Item>
            </SplitButton.Content>
          </SplitButton.Positioner>
        </SplitButton>
      ))}
    </div>
  );
}

export function SplitButtonIconExample() {
  return (
    <SplitButton>
      <SplitButton.Action>
        <PlusIcon />
        Create Item
      </SplitButton.Action>
      <SplitButton.Trigger aria-label="More create actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.Item value="create-blank">Create Blank</Menu.Item>
          <Menu.Item value="create-template">Create From Template</Menu.Item>
          <Menu.Separator />
          <Menu.Item value="import-existing">Import Existing</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}

export function SplitButtonControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <SplitButton open={open} onOpenChange={(details) => setOpen(details.open)} variant="outline">
      <SplitButton.Action>Share</SplitButton.Action>
      <SplitButton.Trigger aria-label="More share actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.Item value="copy-link">Copy Link</Menu.Item>
          <Menu.Item value="invite-email">Invite by Email</Menu.Item>
          <Menu.Separator />
          <Menu.Item value="close-menu" onSelect={() => setOpen(false)}>
            Close Menu
          </Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}

export function SplitButtonCustomPositioningExample() {
  return (
    <SplitButton positioning={{ placement: 'bottom-start', gutter: 8 }} variant="outline">
      <SplitButton.Action>Export</SplitButton.Action>
      <SplitButton.Trigger aria-label="More export actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.Item value="export-pdf">Export PDF</Menu.Item>
          <Menu.Item value="export-csv">Export CSV</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}

export function SplitButtonMenuCompositionExample() {
  return (
    <SplitButton variant="outline">
      <SplitButton.Action>Copy</SplitButton.Action>
      <SplitButton.Trigger aria-label="More copy actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Clipboard</Menu.ItemGroupLabel>
            <Menu.Item value="copy">Copy</Menu.Item>
            <Menu.Item value="duplicate">Duplicate</Menu.Item>
          </Menu.ItemGroup>
          <Menu.Separator />
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Export</Menu.ItemGroupLabel>
            <Menu.Item value="export-pdf">Export PDF</Menu.Item>
            <Menu.Item value="export-csv">Export CSV</Menu.Item>
          </Menu.ItemGroup>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}

export function SplitButtonStylingExample() {
  return (
    <SplitButton className={styles.brandSplitButton} variant="outline">
      <SplitButton.Action>Review</SplitButton.Action>
      <SplitButton.Trigger aria-label="More review actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.Item value="approve">Approve</Menu.Item>
          <Menu.Item value="request-changes">Request Changes</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}

export function SplitButtonLinkActionExample() {
  return (
    <SplitButton variant="outline">
      <SplitButton.Action asChild>
        <a href="#split-button">
          Open Docs
          <ArrowUpRightIcon />
        </a>
      </SplitButton.Action>
      <SplitButton.Trigger aria-label="More docs actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.Item value="copy-link">Copy Link</Menu.Item>
          <Menu.Item value="open-new-tab">Open in New Tab</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}