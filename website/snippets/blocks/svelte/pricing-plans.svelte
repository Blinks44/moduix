<script lang="ts">
  import Check from '@lucide/svelte/icons/check';
  import { Badge } from '@/components/ui/badge';
  import { Button } from '@/components/ui/button';
  import {
    Card,
    CardBody,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import {
    SegmentGroup,
    SegmentGroupIndicator,
    SegmentGroupItems,
  } from '@/components/ui/segment-group';
  import styles from './pricing-plans.module.css';

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'For side projects and early prototypes.',
      monthly: 0,
      yearly: 0,
      cta: 'Start free',
      featured: false,
      features: ['Up to 3 projects', 'Community support', '10k monthly events', 'Basic analytics'],
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For product teams shipping continuously.',
      monthly: 29,
      yearly: 23,
      cta: 'Upgrade to Pro',
      featured: true,
      features: [
        'Unlimited projects',
        'Priority email support',
        '1M monthly events',
        'Custom themes & SSO',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For organizations with compliance needs.',
      monthly: 99,
      yearly: 79,
      cta: 'Contact sales',
      featured: false,
      features: [
        'Dedicated SLA',
        'Audit logs & SAML',
        'Unlimited events',
        'Private registry mirror',
      ],
    },
  ];

  const billingOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  let billing = $state<'monthly' | 'yearly'>('yearly');
  let selectedPlan = $state<string | null>(null);
</script>

<section class={styles.root} aria-label="Pricing plans">
  <header class={styles.header}>
    <div>
      <h2 class={styles.title}>Simple, predictable pricing</h2>
      <p class={styles.subtitle}>Switch plans or cancel anytime. No hidden seats.</p>
    </div>
    <div class={styles.billing}>
      <SegmentGroup
        size="sm"
        value={billing}
        onValueChange={(details) => {
          if (details.value === 'monthly' || details.value === 'yearly') {
            billing = details.value;
          }
        }}
      >
        <SegmentGroupIndicator />
        <SegmentGroupItems items={billingOptions} />
      </SegmentGroup>
      <Badge variant="secondary">Save 20%</Badge>
    </div>
  </header>

  <div class={styles.grid}>
    {#each plans as plan (plan.id)}
      <Card class={plan.featured ? `${styles.card} ${styles.featured}` : styles.card}>
        <CardHeader>
          <div class={styles.cardHead}>
            <CardTitle>{plan.name}</CardTitle>
            {#if plan.featured}
              <Badge>Most popular</Badge>
            {/if}
          </div>
          <CardDescription>{plan.description}</CardDescription>
          <div class={styles.priceRow}>
            <span class={styles.price}>${billing === 'yearly' ? plan.yearly : plan.monthly}</span>
            <span class={styles.cadence}>/ month</span>
          </div>
        </CardHeader>
        <CardBody class={styles.body}>
          <ul class={styles.features}>
            {#each plan.features as feature (feature)}
              <li class={styles.feature}>
                <Check aria-hidden="true" />
                <span>{feature}</span>
              </li>
            {/each}
          </ul>
        </CardBody>
        <CardFooter>
          <Button
            class={styles.cta}
            variant={plan.featured ? 'default' : 'outline'}
            onclick={() => (selectedPlan = plan.id)}
          >
            {selectedPlan === plan.id ? 'Selected' : plan.cta}
          </Button>
        </CardFooter>
      </Card>
    {/each}
  </div>

  {#if selectedPlan}
    <p class={styles.notice} role="status">
      Selected {plans.find((item) => item.id === selectedPlan)?.name} ({billing} billing).
    </p>
  {/if}
</section>