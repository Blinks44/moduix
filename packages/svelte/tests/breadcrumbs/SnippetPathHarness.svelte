<script lang="ts">
  import { BreadcrumbsPath } from '@/components/breadcrumbs';
  import { Breadcrumbs } from '@/components/breadcrumbs';

  let {
    separatorKind = 'default',
  }: { separatorKind?: 'default' | 'null' | 'empty' | 'zero' | 'custom' | 'updated' } = $props();
</script>

{#snippet home()}
  <em data-label="home">Home</em>
{/snippet}
{#snippet overview()}
  <span title="Current page detail">Overview</span>
{/snippet}
{#snippet dot()}
  <span data-separator="custom">·</span>
{/snippet}
{#snippet slash()}
  <strong data-separator="updated">/</strong>
{/snippet}

<Breadcrumbs>
  <BreadcrumbsPath
    links={[{ href: '/', label: home }]}
    page={overview}
    separator={separatorKind === 'custom'
      ? dot
      : separatorKind === 'updated'
        ? slash
        : separatorKind === 'null'
          ? null
          : separatorKind === 'empty'
            ? ''
            : separatorKind === 'zero'
              ? '0'
              : undefined}
  />
</Breadcrumbs>