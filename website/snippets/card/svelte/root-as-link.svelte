<script lang="ts">
  import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/svelte/card';
  import styles from '@/components/examples/card/card-root-as-link.module.css';

  const report = {
    href: '/reports/release-health',
    title: 'Release health',
    description: 'Summary for the current production rollout.',
    summary: '98.4% successful sessions',
  };
</script>

<Card class={styles.root}>
  {#snippet asChild(props)}
    <a {...props()} href={report.href}>
      <CardHeader>
        <CardTitle>{report.title}</CardTitle>
        <CardDescription>{report.description}</CardDescription>
      </CardHeader>
      <CardBody>{report.summary}</CardBody>
    </a>
  {/snippet}
</Card>