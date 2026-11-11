<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Badge, BadgeDot, BadgeLabel } from '@/components/badge';
  import { ChevronRightIcon } from '@/lib/moduix/icons/ui';
  import styles from './Badge.stories.module.css';

  const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const;
  const statuses = [
    { label: 'Online', variant: 'default' },
    { label: 'Draft', variant: 'secondary' },
    { label: 'Failed', variant: 'destructive' },
  ] as const;
  const iconBadges = [
    { label: 'Release', variant: 'default' },
    { label: 'Details', variant: 'secondary' },
    { label: 'Read more', variant: 'outline' },
  ] as const;

  const { Story } = defineMeta({
    title: 'Components/Badge',
    component: Badge,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Basic" asChild>
  <Badge>New</Badge>
</Story>

<Story name="Variants" asChild>
  <div class={styles.row}>
    {#each variants as variant (variant)}<Badge {variant}>{variant}</Badge>{/each}
  </div>
</Story>

<Story name="With Dot" asChild>
  <div class={styles.row}>
    {#each statuses as status (status.label)}<Badge variant={status.variant}>
        <BadgeDot />
        <BadgeLabel>{status.label}</BadgeLabel>
      </Badge>{/each}
  </div>
</Story>

<Story name="With Icon" asChild>
  <div class={styles.row}>
    {#each iconBadges as item (item.label)}<Badge variant={item.variant}>
        <BadgeLabel>{item.label}</BadgeLabel>
        <ChevronRightIcon />
      </Badge>{/each}
    <Badge variant="link"
      >{#snippet asChild(props)}<a {...props()} href="#badge-link-story">
          <BadgeLabel>Styling guide</BadgeLabel>
          <ChevronRightIcon />
        </a>{/snippet}</Badge
    >
  </div>
</Story>

<Story name="Link" asChild>
  <Badge variant="link"
    >{#snippet asChild(props)}<a {...props()} href="#badge-link-story"
        >Open badge composition guidance</a
      >{/snippet}</Badge
  >
</Story>

<Story name="Disabled Button" asChild>
  <Badge variant="secondary"
    >{#snippet asChild(props)}<button {...props({ class: styles.disabledButton })} disabled
        >Archived</button
      >{/snippet}</Badge
  >
</Story>

<Story name="Truncated Label" asChild>
  <Badge class={styles.constrained} title="Ready for stakeholder review after legal approval">
    <BadgeLabel>Ready for stakeholder review after legal approval</BadgeLabel>
  </Badge>
</Story>

<Story name="Custom Styling" asChild>
  <div class={styles.row}>
    <Badge size="sm">Small</Badge>
    <Badge>Default</Badge>
    <Badge size="lg">Large</Badge>
    <Badge class={styles.customBadge}>
      <BadgeDot />
      <BadgeLabel>Priority</BadgeLabel>
    </Badge>
  </div>
</Story>