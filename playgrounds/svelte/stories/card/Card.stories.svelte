<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Badge } from '@/components/badge';
  import { Button } from '@/components/button';
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
  } from '@/components/card';
  import styles from './Card.stories.module.css';
  import Input from './TempInput.svelte';

  const variants = ['elevated', 'outline', 'subtle'] as const;
  const sizes = ['sm', 'md', 'lg'] as const;

  const { Story } = defineMeta({
    title: 'Components/Card',
    component: Card,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Basic" asChild>
  <Card class={styles.card}>
    <CardHeader>
      <CardTitle>Release health</CardTitle>
      <CardDescription>Summary for the current production rollout.</CardDescription>
    </CardHeader>
    <CardBody>
      <div class={styles.releaseSummary}>
        <div>
          <span class={styles.statValue}>98.4%</span><span class={styles.statLabel}
            >successful sessions</span
          >
        </div>
        <div>
          <span class={styles.statValue}>12</span><span class={styles.statLabel}>checks passed</span
          >
        </div>
      </div>
    </CardBody>
    <CardFooter
      ><Button variant="outline">View log</Button><Button>Promote release</Button></CardFooter
    >
  </Card>
</Story>

<Story name="With Action" asChild>
  <Card class={styles.card}>
    <CardHeader>
      <CardTitle>Incident response</CardTitle>
      <CardDescription>Owner rotation and escalation readiness.</CardDescription>
      <CardAction><Badge variant="secondary">Stable</Badge></CardAction>
    </CardHeader>
    <CardBody>
      <div class={styles.statsGrid}>
        <div>
          <span class={styles.statValue}>18 min</span><span class={styles.statLabel}
            >median response</span
          >
        </div>
        <div>
          <span class={styles.statValue}>99.97%</span><span class={styles.statLabel}
            >service uptime</span
          >
        </div>
      </div>
    </CardBody>
  </Card>
</Story>

<Story name="Compact" asChild>
  <Card size="sm" class={styles.card}>
    <CardHeader
      ><CardTitle>Billing plan</CardTitle><CardDescription
        >Team workspace, monthly billing.</CardDescription
      ></CardHeader
    >
    <CardBody
      ><div class={styles.metric}>
        <span class={styles.metricValue}>$48</span><span class={styles.metricLabel}>per month</span>
      </div></CardBody
    >
    <CardFooter><Button variant="outline">Cancel</Button><Button>Upgrade</Button></CardFooter>
  </Card>
</Story>

<Story name="Variants" asChild>
  <div class={styles.cardGrid}>
    {#each variants as variant (variant)}<Card {variant} class={styles.cardGridItem}>
        <CardHeader
          ><CardTitle>{variant}</CardTitle><CardDescription
            >Card surface using the {variant} visual treatment.</CardDescription
          ></CardHeader
        >
        <CardBody>Use variants to communicate surface hierarchy.</CardBody>
      </Card>{/each}
  </div>
</Story>

<Story name="Sizes" asChild>
  <div class={styles.cardGrid}>
    {#each sizes as size (size)}<Card {size} class={styles.cardGridItem}>
        <CardHeader
          ><CardTitle>Card {size}</CardTitle><CardDescription
            >Spacing and title scale for the {size} size.</CardDescription
          ></CardHeader
        >
        <CardBody>Shared content with size-specific density.</CardBody>
      </Card>{/each}
  </div>
</Story>

<Story name="Content Stress" asChild>
  <Card class={styles.card}>
    <CardHeader>
      <CardTitle>Production-readiness-review-for-the-international-warehouse-platform</CardTitle>
      <CardDescription
        >A deliberately long description verifies wrapping at narrow widths and increased text
        scaling without forcing the trailing content outside the card.</CardDescription
      >
      <CardAction><Badge variant="secondary">Needs review</Badge></CardAction>
    </CardHeader>
    <CardBody
      >Owners in logistics, reliability engineering, and customer support are coordinating the final
      rollout window.</CardBody
    >
    <CardFooter
      ><Button variant="outline">Review dependencies</Button><Button>Approve rollout</Button
      ></CardFooter
    >
  </Card>
</Story>

<Story name="Within Form" asChild>
  <Card class={styles.card}
    >{#snippet asChild(props)}<form {...props()}>
        <CardHeader
          ><CardTitle>Create account</CardTitle><CardDescription
            >Enter the contact details for the new member.</CardDescription
          ></CardHeader
        >
        <CardBody>
          <div class={styles.formGrid}>
            <label>First name<Input name="firstName" /></label>
            <label>Last name<Input name="lastName" /></label>
          </div>
        </CardBody>
        <CardFooter
          ><Button type="reset" variant="outline">Cancel</Button><Button type="submit"
            >Create account</Button
          ></CardFooter
        >
      </form>{/snippet}</Card
  >
</Story>

<Story name="With Image" asChild>
  <Card class={styles.card}>
    <CardMedia
      ><img
        class={styles.image}
        alt="A warehouse with neatly stacked delivery boxes."
        src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=960&q=80"
      /></CardMedia
    >
    <CardHeader
      ><CardTitle>Warehouse capacity</CardTitle><CardDescription
        >North region allocation for the next planning cycle.</CardDescription
      ></CardHeader
    >
    <CardBody
      ><div class={styles.capacity}>
        <span>72%</span>
        <div class={styles.capacityBar}><div></div></div>
      </div></CardBody
    >
    <CardFooter class={styles.footerBetween}
      ><Badge variant="outline">Forecast</Badge><Button variant="outline">Open report</Button
      ></CardFooter
    >
  </Card>
</Story>

<Story name="With Background" asChild>
  <Card variant="elevated" class={styles.backgroundCard}>
    <CardBackground>
      <img
        class={styles.backgroundImage}
        alt=""
        src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85"
      />
      <div aria-hidden="true" class={styles.backgroundOverlay}></div>
    </CardBackground>
    <CardHeader class={styles.backgroundHeader}>
      <CardTitle>Weekend guide</CardTitle>
      <CardDescription class={styles.backgroundDescription}
        >Three places to slow down, look around, and stay a little longer.</CardDescription
      >
    </CardHeader>
  </Card>
</Story>

<Story name="Horizontal" asChild>
  <Card class={styles.horizontalCard}>
    <img
      alt="Caffè latte in a ceramic cup."
      class={styles.horizontalImage}
      src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=720&q=80"
    />
    <div class={styles.horizontalContent}>
      <CardHeader
        ><CardTitle>The perfect latte</CardTitle><CardDescription
          >Espresso balanced with steamed milk and a light foam.</CardDescription
        ></CardHeader
      >
      <CardBody><Badge variant="secondary">Hot</Badge></CardBody>
      <CardFooter><Button>Buy latte</Button></CardFooter>
    </div>
  </Card>
</Story>

<Story name="With Avatar" asChild>
  <Card class={styles.card}>
    <CardHeader>
      <div class={styles.profile}>
        <span aria-hidden="true" class={styles.avatar}>NF</span>
        <div><CardTitle>Nate Foss</CardTitle><CardDescription>@natefoss</CardDescription></div>
      </div>
    </CardHeader>
    <CardBody>Nate has requested to join your team.</CardBody>
    <CardFooter><Button variant="outline">Decline</Button><Button>Approve</Button></CardFooter>
  </Card>
</Story>

<Story name="As Link" asChild>
  <Card class={styles.card}
    >{#snippet asChild(props)}<a {...props()} href="/docs/card">
        <CardHeader
          ><CardTitle>Release health</CardTitle><CardDescription
            >Summary for the current production rollout.</CardDescription
          ></CardHeader
        >
        <CardBody>
          <div class={styles.releaseSummary}>
            <div>
              <span class={styles.statValue}>98.4%</span><span class={styles.statLabel}
                >successful sessions</span
              >
            </div>
            <div>
              <span class={styles.statValue}>12</span><span class={styles.statLabel}
                >checks passed</span
              >
            </div>
          </div>
        </CardBody>
      </a>{/snippet}</Card
  >
</Story>

<Story name="Link With Actions" asChild>
  <Card class={styles.card}>
    <CardHeader>
      <CardTitle><CardLink href="/docs/card">Incident response</CardLink></CardTitle>
      <CardDescription>Owner rotation and escalation readiness.</CardDescription>
      <CardAction><Button variant="outline" size="sm">Acknowledge</Button></CardAction>
    </CardHeader>
    <CardBody>
      <div class={styles.statsGrid}>
        <div>
          <span class={styles.statValue}>18 min</span><span class={styles.statLabel}
            >median response</span
          >
        </div>
        <div>
          <span class={styles.statValue}>99.97%</span><span class={styles.statLabel}
            >service uptime</span
          >
        </div>
      </div>
    </CardBody>
  </Card>
</Story>

<Story name="Custom Composition" asChild>
  <Card class={styles.customCard}>
    <CardHeader>
      <CardTitle>{#snippet asChild(props)}<h2 {...props()}>System load</h2>{/snippet}</CardTitle>
      <CardDescription>Aggregated worker utilization across the current batch.</CardDescription>
    </CardHeader>
    <CardBody>
      <div class={styles.capacity}>
        <span>64%</span>
        <div class={styles.capacityBar}><div></div></div>
      </div>
    </CardBody>
  </Card>
</Story>

<Story name="Custom Spacing" asChild>
  <Card class={styles.customSpacingCard}>
    <CardHeader
      ><CardTitle>Scheduled reports</CardTitle><CardDescription
        >Weekly snapshots with denser card spacing.</CardDescription
      ></CardHeader
    >
    <CardBody
      ><div class={styles.metric}>
        <span class={styles.metricValue}>24</span><span class={styles.metricLabel}
          >active report schedules</span
        >
      </div></CardBody
    >
    <CardFooter
      ><Button variant="outline">See details</Button><Button>Set up report</Button></CardFooter
    >
  </Card>
</Story>