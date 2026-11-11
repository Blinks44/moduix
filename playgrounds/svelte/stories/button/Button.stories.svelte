<script module lang="ts">
  import Plus from '@lucide/svelte/icons/plus';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import { Spinner } from '@/components/spinner';
  import styles from './Button.stories.module.css';
  import StarIcon from './StarIcon.svelte';

  const { Story } = defineMeta({
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const variants = [
    'default',
    'outline',
    'secondary',
    'destructive',
    'destructive-outline',
    'ghost',
    'link',
  ] as const;

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<script lang="ts">
  let focusTarget: Element | null = $state(null);
  let pending = $state(false);

  const focusButton = () => {
    if (focusTarget instanceof HTMLButtonElement) focusTarget.focus();
  };

  const save = () => {
    pending = true;
    setTimeout(() => (pending = false), 1800);
  };
</script>

<Story name="Basic" asChild>
  <Button>Button</Button>
</Story>

<Story name="Variants" asChild>
  <div class={styles.row}>
    {#each variants as variant (variant)}
      <Button {variant}>{variant}</Button>
    {/each}
  </div>
</Story>

<Story name="Sizes" asChild>
  <div class={styles.row}>
    {#each sizes as size (size)}
      <Button {size}>{size}</Button>
    {/each}
  </div>
</Story>

<Story name="Disabled" asChild>
  <div class={styles.row}>
    <Button disabled>Disabled</Button>
    <Button disabled variant="outline">
      {#snippet asChild(props)}<a {...props()} href="#button">Disabled link</a>{/snippet}
    </Button>
  </div>
</Story>

<Story name="With Icons" asChild>
  <div class={styles.row}>
    <Button>
      <Plus aria-hidden="true" focusable="false" strokeWidth={3} />
      Create Item
    </Button>
    <Button size="icon-sm" variant="outline" aria-label="Small favorite"><StarIcon /></Button>
    <Button size="icon-md" variant="outline" aria-label="Favorite"><StarIcon /></Button>
    <Button size="icon-lg" variant="outline" aria-label="Large favorite"><StarIcon /></Button>
    <Button variant="link">
      Open Docs
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path
          d="M7 17 17 7M9 7h8v8"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Button>
  </div>
</Story>

<Story name="As Child Link" asChild>
  <Button variant="outline">
    {#snippet asChild(props)}<a {...props()} href="#button">Open Button Docs</a>{/snippet}
  </Button>
</Story>

<Story name="Forwarded Ref" asChild>
  <div class={styles.row}>
    <Button bind:ref={focusTarget}>Focus target</Button>
    <Button variant="outline" onclick={focusButton}>Focus first button</Button>
  </div>
</Story>

<Story name="Pending State" asChild>
  <Button loading={pending} onclick={save}>
    {#if pending}<Spinner decorative size="sm" />{/if}
    {pending ? 'Saving' : 'Save Changes'}
  </Button>
</Story>

<Story name="Content Stress" asChild>
  <div class={styles.contentStress}>
    <Button class={styles.wrappingButton}>Approve the updated account recovery settings</Button>
    <Button class={styles.wrappingButton} dir="rtl" variant="outline">
      اعتماد إعدادات استرداد الحساب المحدّثة
    </Button>
  </div>
</Story>