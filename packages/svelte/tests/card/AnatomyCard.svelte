<script lang="ts">
  import {
    Card,
    CardAction,
    CardBackground,
    CardBody,
    CardDescription,
    CardFooter,
    CardHeader,
    CardLink,
    CardMedia,
    CardTitle,
    type CardRootProps,
  } from '@/components/card';

  let { ...props }: CardRootProps = $props();

  let rootRef: Element | null = $state(null);
  let titleRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, titleRef });
</script>

<Card {...props} bind:ref={rootRef}>
  <CardBackground aria-hidden="true">
    <img alt="" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>" />
  </CardBackground>
  <CardMedia>
    <img alt="Warehouse" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>" />
  </CardMedia>
  <CardHeader data-probe="header">
    <CardTitle bind:ref={titleRef}>Release health</CardTitle>
    <CardDescription>Summary for the current production rollout.</CardDescription>
    <CardAction><button type="button">Open menu</button></CardAction>
  </CardHeader>
  <CardBody data-probe="body">98.4% successful sessions</CardBody>
  <CardFooter><CardLink href="/reports/release-health">View report</CardLink></CardFooter>
</Card>