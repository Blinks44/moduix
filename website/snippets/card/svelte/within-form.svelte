<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Card,
    CardBody,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@moduix/svelte/card';
  import styles from '@/components/examples/card/card-within-form.module.css';

  const copy = {
    title: 'Create account',
    description: 'Enter the contact details for the new member.',
  };
  const fields = [
    { label: 'First name', name: 'firstName', autocomplete: 'given-name' },
    { label: 'Last name', name: 'lastName', autocomplete: 'family-name' },
  ] as const;
</script>

<Card class={styles.root}>
  {#snippet asChild(props)}
    <form {...props()}>
      <CardHeader>
        <CardTitle>{copy.title}</CardTitle>
        <CardDescription>{copy.description}</CardDescription>
      </CardHeader>
      <CardBody class={styles.body}>
        {#each fields as field (field.name)}
          <label class={styles.field}>
            {field.label}
            <input name={field.name} autocomplete={field.autocomplete} />
          </label>
        {/each}
      </CardBody>
      <CardFooter>
        <Button type="reset" variant="outline">Cancel</Button>
        <Button type="submit">Create account</Button>
      </CardFooter>
    </form>
  {/snippet}
</Card>