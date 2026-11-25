import { Check } from 'lucide-solid';
import { For, Show, createSignal } from 'solid-js';
import { Badge } from '@/registry/solid/ui/badge';
import { Button } from '@/registry/solid/ui/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/solid/ui/card';
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@/registry/solid/ui/segment-group';

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
  const [billing, setBilling] = createSignal<'monthly' | 'yearly'>('yearly');
  const [selectedPlan, setSelectedPlan] = createSignal<string | null>(null);

  return (
    <section class="grid w-[min(100%,60rem)] gap-7" aria-label="Pricing plans">
      <header class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 class="m-0 text-2xl leading-tight font-semibold tracking-tight">
            Simple, predictable pricing
          </h2>
          <p class="mt-1.5 mb-0 text-[15px] text-muted-foreground">
            Switch plans or cancel anytime. No hidden seats.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <SegmentGroup
            size="sm"
            value={billing()}
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

      <div class="grid gap-4 md:grid-cols-3">
        <For each={plans}>
          {(plan) => (
            <Card
              class={
                plan.featured ? 'flex flex-col border-primary ring-1 ring-primary' : 'flex flex-col'
              }
            >
              <CardHeader>
                <div class="flex items-center justify-between gap-2">
                  <CardTitle>{plan.name}</CardTitle>
                  <Show when={plan.featured}>
                    <Badge>Most popular</Badge>
                  </Show>
                </div>
                <CardDescription>{plan.description}</CardDescription>
                <div class="mt-3 flex items-baseline gap-1">
                  <span class="text-[2rem] leading-none font-semibold tracking-tight tabular-nums">
                    ${billing() === 'yearly' ? plan.yearly : plan.monthly}
                  </span>
                  <span class="text-sm text-muted-foreground">/ month</span>
                </div>
              </CardHeader>
              <CardBody class="flex-1">
                <ul class="m-0 grid list-none gap-2.5 p-0 text-sm">
                  <For each={plan.features}>
                    {(feature) => (
                      <li class="flex items-center gap-2 text-foreground">
                        <Check class="size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    )}
                  </For>
                </ul>
              </CardBody>
              <CardFooter>
                <Button
                  class="w-full"
                  variant={plan.featured ? 'default' : 'outline'}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {selectedPlan() === plan.id ? 'Selected' : plan.cta}
                </Button>
              </CardFooter>
            </Card>
          )}
        </For>
      </div>

      <Show when={selectedPlan()}>
        {(planId) => (
          <p class="m-0 text-center text-[13px] text-muted-foreground" role="status">
            Selected {plans.find((item) => item.id === planId())?.name} ({billing()} billing).
          </p>
        )}
      </Show>
    </section>
  );
}

export default PricingPlans;