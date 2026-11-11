<script lang="ts">
  import {
    Card,
    CardBackground,
    CardBody,
    CardFooter,
    CardHeader,
    CardLink,
    CardTitle,
  } from '@/components/card';
</script>

<Card>
  <CardBackground><div></div></CardBackground>
  <CardHeader>
    <CardTitle><CardLink href="#guide">Weekend guide</CardLink></CardTitle>
  </CardHeader>
  <CardBody data-testid="body">Three places to slow down.</CardBody>
  <CardFooter><button type="button">Save</button></CardFooter>
</Card>