<script setup lang="ts">
import { Check } from '@lucide/vue';
import { ref } from 'vue';
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

const billing = ref<'monthly' | 'yearly'>('yearly');
const selectedPlan = ref<string | null>(null);
</script>

<template>
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
          :model-value="billing"
          @update:model-value="
            (value) => {
              if (value === 'monthly' || value === 'yearly') billing = value;
            }
          "
        >
          <SegmentGroupIndicator />
          <SegmentGroupItems :items="billingOptions" />
        </SegmentGroup>
        <Badge variant="secondary">Save 20%</Badge>
      </div>
    </header>

    <div class="grid gap-4 md:grid-cols-3">
      <Card
        v-for="plan in plans"
        :key="plan.id"
        :class="
          plan.featured ? 'flex flex-col border-primary ring-1 ring-primary' : 'flex flex-col'
        "
      >
        <CardHeader>
          <div class="flex items-center justify-between gap-2">
            <CardTitle>{{ plan.name }}</CardTitle>
            <Badge v-if="plan.featured">Most popular</Badge>
          </div>
          <CardDescription>{{ plan.description }}</CardDescription>
          <div class="mt-3 flex items-baseline gap-1">
            <span class="text-[2rem] leading-none font-semibold tracking-tight tabular-nums">
              ${{ billing === 'yearly' ? plan.yearly : plan.monthly }}
            </span>
            <span class="text-sm text-muted-foreground">/ month</span>
          </div>
        </CardHeader>
        <CardBody class="flex-1">
          <ul class="m-0 grid list-none gap-2.5 p-0 text-sm">
            <li
              v-for="feature in plan.features"
              :key="feature"
              class="flex items-center gap-2 text-foreground"
            >
              <Check class="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </CardBody>
        <CardFooter>
          <Button
            class="w-full"
            :variant="plan.featured ? 'default' : 'outline'"
            @click="selectedPlan = plan.id"
          >
            {{ selectedPlan === plan.id ? 'Selected' : plan.cta }}
          </Button>
        </CardFooter>
      </Card>
    </div>

    <p v-if="selectedPlan" class="m-0 text-center text-[13px] text-muted-foreground" role="status">
      Selected {{ plans.find((item) => item.id === selectedPlan)?.name }} ({{ billing }} billing).
    </p>
  </section>
</template>