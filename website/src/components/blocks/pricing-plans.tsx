'use client';

import { Check } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/registry/react/ui/badge';
import { Button } from '@/registry/react/ui/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/react/ui/card';
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@/registry/react/ui/segment-group';
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
    features: ['Dedicated SLA', 'Audit logs & SAML', 'Unlimited events', 'Private registry mirror'],
  },
];

const billingOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

export function PricingPlans() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <section className={styles.root} aria-label="Pricing plans">
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Simple, predictable pricing</h2>
          <p className={styles.subtitle}>Switch plans or cancel anytime. No hidden seats.</p>
        </div>
        <div className={styles.billing}>
          <SegmentGroup
            size="sm"
            value={billing}
            onValueChange={(details) => {
              if (details.value === 'monthly' || details.value === 'yearly') {
                setBilling(details.value);
              }
            }}
          >
            <SegmentGroupIndicator />
            <SegmentGroupItems items={billingOptions} />
          </SegmentGroup>
          <Badge variant="secondary">Save 20%</Badge>
        </div>
      </header>

      <div className={styles.grid}>
        {plans.map((plan) => {
          const price = billing === 'yearly' ? plan.yearly : plan.monthly;
          const isSelected = selectedPlan === plan.id;
          return (
            <Card
              key={plan.id}
              className={plan.featured ? `${styles.card} ${styles.featured}` : styles.card}
            >
              <CardHeader>
                <div className={styles.cardHead}>
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.featured ? <Badge>Most popular</Badge> : null}
                </div>
                <CardDescription>{plan.description}</CardDescription>
                <div className={styles.priceRow}>
                  <span className={styles.price}>${price}</span>
                  <span className={styles.cadence}>/ month</span>
                </div>
              </CardHeader>
              <CardBody className={styles.body}>
                <ul className={styles.features}>
                  {plan.features.map((feature) => (
                    <li key={feature} className={styles.feature}>
                      <Check aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
              <CardFooter>
                <Button
                  className={styles.cta}
                  variant={plan.featured ? 'default' : 'outline'}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {isSelected ? 'Selected' : plan.cta}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {selectedPlan ? (
        <p className={styles.notice} role="status">
          Selected {plans.find((item) => item.id === selectedPlan)?.name} ({billing} billing).
        </p>
      ) : null}
    </section>
  );
}

export default PricingPlans;