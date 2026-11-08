<script module lang="ts">
  import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { MenuItem, MenuItemGroup, MenuItemGroupLabel, MenuSeparator } from '@/components/menu';
  import {
    SplitButton,
    SplitButtonAction,
    SplitButtonContent,
    SplitButtonPositioner,
    SplitButtonTrigger,
  } from '@/components/split-button';
  import { PlusIcon } from '@/lib/moduix/icons/ui';
  import styles from './SplitButton.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/SplitButton',
    component: SplitButton,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  const variants = [
    'default',
    'outline',
    'secondary',
    'destructive',
    'destructive-outline',
    'ghost',
  ] as const;
</script>

<script lang="ts">
  let open = $state(false);
</script>

<Story name="Basic" asChild>
  <SplitButton aria-label="Save actions">
    <SplitButtonAction>Save Changes</SplitButtonAction>
    <SplitButtonTrigger />
    <SplitButtonPositioner>
      <SplitButtonContent>
        <MenuItem value="save-draft">Save as Draft</MenuItem>
        <MenuItem value="duplicate">Duplicate</MenuItem>
        <MenuSeparator />
        <MenuItem value="publish">Publish Now</MenuItem>
      </SplitButtonContent>
    </SplitButtonPositioner>
  </SplitButton>
</Story>

<Story name="Variants" asChild>
  <div class={styles.row}>
    {#each variants as variant (variant)}
      <SplitButton aria-label={`${variant} actions`} {variant}>
        <SplitButtonAction>{variant}</SplitButtonAction><SplitButtonTrigger />
        <SplitButtonPositioner>
          <SplitButtonContent>
            <MenuItem value={`${variant}-edit`}>Edit</MenuItem>
            <MenuItem value={`${variant}-duplicate`}>Duplicate</MenuItem>
          </SplitButtonContent>
        </SplitButtonPositioner>
      </SplitButton>
    {/each}
  </div>
</Story>

<Story name="Sizes" asChild>
  <div class={styles.row}>
    {#each sizes as size (size)}
      <SplitButton aria-label={`${size} create actions`} {size} variant="outline">
        <SplitButtonAction>{size}</SplitButtonAction><SplitButtonTrigger />
        <SplitButtonPositioner>
          <SplitButtonContent>
            <MenuItem value={`${size}-create`}>Create</MenuItem>
            <MenuItem value={`${size}-create-open`}>Create and Open</MenuItem>
          </SplitButtonContent>
        </SplitButtonPositioner>
      </SplitButton>
    {/each}
  </div>
</Story>

<Story name="With Icons" exportName="WithIcons" asChild>
  <SplitButton aria-label="Create actions">
    <SplitButtonAction><PlusIcon />Create Item</SplitButtonAction>
    <SplitButtonTrigger aria-label="More create actions" />
    <SplitButtonPositioner>
      <SplitButtonContent>
        <MenuItem value="create-blank">Create Blank</MenuItem><MenuItem value="create-template"
          >Create From Template</MenuItem
        >
        <MenuSeparator /><MenuItem value="import-existing">Import Existing</MenuItem>
      </SplitButtonContent>
    </SplitButtonPositioner>
  </SplitButton>
</Story>

<Story name="Disabled Action" exportName="DisabledAction" asChild>
  <SplitButton aria-label="Save actions">
    <SplitButtonAction disabled>Save Changes</SplitButtonAction>
    <SplitButtonTrigger />
    <SplitButtonPositioner>
      <SplitButtonContent>
        <MenuItem value="save-draft">Save as Draft</MenuItem>
        <MenuItem value="duplicate">Duplicate</MenuItem>
      </SplitButtonContent>
    </SplitButtonPositioner>
  </SplitButton>
</Story>

<Story name="Disabled Trigger" exportName="DisabledTrigger" asChild>
  <SplitButton aria-label="Save actions">
    <SplitButtonAction>Save Changes</SplitButtonAction>
    <SplitButtonTrigger disabled aria-label="More save actions" />
    <SplitButtonPositioner>
      <SplitButtonContent>
        <MenuItem value="save-draft">Save as Draft</MenuItem>
        <MenuItem value="duplicate">Duplicate</MenuItem>
      </SplitButtonContent>
    </SplitButtonPositioner>
  </SplitButton>
</Story>

<Story name="Controlled Menu" exportName="ControlledMenu" asChild>
  <SplitButton
    aria-label="Share actions"
    {open}
    onOpenChange={(details) => (open = details.open)}
    variant="outline"
  >
    <SplitButtonAction>Share</SplitButtonAction>
    <SplitButtonTrigger aria-label="More share actions" />
    <SplitButtonPositioner>
      <SplitButtonContent>
        <MenuItem value="copy-link">Copy Link</MenuItem>
        <MenuItem value="invite-email">Invite by Email</MenuItem>
        <MenuSeparator />
        <MenuItem value="close-menu" onSelect={() => (open = false)}>Close Menu</MenuItem>
      </SplitButtonContent>
    </SplitButtonPositioner>
  </SplitButton>
</Story>

<Story name="Menu Composition" exportName="MenuComposition" asChild>
  <SplitButton aria-label="Copy and export actions" variant="outline">
    <SplitButtonAction>Copy</SplitButtonAction>
    <SplitButtonTrigger aria-label="More copy actions" />
    <SplitButtonPositioner>
      <SplitButtonContent>
        <MenuItemGroup
          ><MenuItemGroupLabel>Clipboard</MenuItemGroupLabel>
          <MenuItem value="copy">Copy</MenuItem><MenuItem value="duplicate">Duplicate</MenuItem>
        </MenuItemGroup>
        <MenuSeparator />
        <MenuItemGroup
          ><MenuItemGroupLabel>Export</MenuItemGroupLabel>
          <MenuItem value="export-pdf">Export PDF</MenuItem><MenuItem value="export-csv"
            >Export CSV</MenuItem
          >
        </MenuItemGroup>
      </SplitButtonContent>
    </SplitButtonPositioner>
  </SplitButton>
</Story>

<Story name="Link Action" exportName="LinkAction" asChild>
  <SplitButton aria-label="Documentation actions" variant="outline">
    <SplitButtonAction>
      {#snippet asChild(props)}
        <a {...props()} href="#split-button"
          >Open Docs<ArrowUpRightIcon aria-hidden="true" focusable="false" /></a
        >
      {/snippet}
    </SplitButtonAction>
    <SplitButtonTrigger aria-label="More docs actions" />
    <SplitButtonPositioner>
      <SplitButtonContent>
        <MenuItem value="copy-link">Copy Link</MenuItem>
        <MenuItem value="open-new-tab">Open in New Tab</MenuItem>
      </SplitButtonContent>
    </SplitButtonPositioner>
  </SplitButton>
</Story>