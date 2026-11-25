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
    <section className="grid w-[min(100%,60rem)] gap-7" aria-label="Pricing plans">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="m-0 text-2xl leading-tight font-semibold tracking-tight">
            Simple, predictable pricing
          </h2>
          <p className="mt-1.5 mb-0 text-[15px] text-muted-foreground">
            Switch plans or cancel anytime. No hidden seats.
          </p>
        </div>
        <div className="flex items-center gap-3">
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

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => {
          const price = billing === 'yearly' ? plan.yearly : plan.monthly;
          const isSelected = selectedPlan === plan.id;
          return (
            <Card
              key={plan.id}
              className={
                plan.featured ? 'flex flex-col border-primary ring-1 ring-primary' : 'flex flex-col'
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.featured ? <Badge>Most popular</Badge> : null}
                </div>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-[2rem] leading-none font-semibold tracking-tight tabular-nums">
                    ${price}
                  </span>
                  <span className="text-sm text-muted-foreground">/ month</span>
                </div>
              </CardHeader>
              <CardBody className="flex-1">
                <ul className="m-0 grid list-none gap-2.5 p-0 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-foreground">
                      <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
              <CardFooter>
                <Button
                  className="w-full"
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
        <p className="m-0 text-center text-[13px] text-muted-foreground" role="status">
          Selected {plans.find((item) => item.id === selectedPlan)?.name} ({billing} billing).
        </p>
      ) : null}
    </section>
  );
}

export default PricingPlans;