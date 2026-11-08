<script module lang="ts">
  import type { HTMLProps, RefAttribute } from '@ark-ui/svelte';
  import type { Snippet } from 'svelte';

  export type BreadcrumbsPathContent = string | Snippet;

  export type BreadcrumbsPathLink = {
    href: string;
    label: BreadcrumbsPathContent;
  };

  export interface BreadcrumbsPathProps extends Omit<HTMLProps<'ol'>, 'children'>, RefAttribute {
    links: readonly BreadcrumbsPathLink[];
    page: BreadcrumbsPathContent;
    separator?: BreadcrumbsPathContent | null;
  }
</script>

<script lang="ts">
  import BreadcrumbsItem from './BreadcrumbsItem.svelte';
  import BreadcrumbsLink from './BreadcrumbsLink.svelte';
  import BreadcrumbsList from './BreadcrumbsList.svelte';
  import BreadcrumbsPage from './BreadcrumbsPage.svelte';
  import BreadcrumbsSeparator from './BreadcrumbsSeparator.svelte';

  let {
    links,
    page,
    ref = $bindable(null),
    separator = undefined,
    ...props
  }: BreadcrumbsPathProps = $props();
</script>

{#snippet outlet(value: BreadcrumbsPathContent)}
  {#if typeof value === 'string'}
    {value}
  {:else}
    {@render value()}
  {/if}
{/snippet}

{#snippet separatorContent()}
  {@render outlet(separator!)}
{/snippet}

<BreadcrumbsList {...props} bind:ref>
  {#each links as link, index (index)}
    <BreadcrumbsItem>
      <BreadcrumbsLink href={link.href}>{@render outlet(link.label)}</BreadcrumbsLink>
    </BreadcrumbsItem>
    <BreadcrumbsSeparator children={separator != null ? separatorContent : undefined} />
  {/each}
  <BreadcrumbsItem>
    <BreadcrumbsPage>{@render outlet(page)}</BreadcrumbsPage>
  </BreadcrumbsItem>
</BreadcrumbsList>