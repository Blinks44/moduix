import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
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

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = ['elevated', 'outline', 'subtle'];
const sizes = ['sm', 'md', 'lg'];
const storyComponents = {
  Badge,
  Button,
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
};

function renderStory(template: string) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { sizes, styles, variants };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Card :class="styles.card">
      <CardHeader>
        <CardTitle>Release health</CardTitle>
        <CardDescription>Summary for the current production rollout.</CardDescription>
      </CardHeader>
      <CardBody>
        <div :class="styles.releaseSummary">
          <div><span :class="styles.statValue">98.4%</span><span :class="styles.statLabel">successful sessions</span></div>
          <div><span :class="styles.statValue">12</span><span :class="styles.statLabel">checks passed</span></div>
        </div>
      </CardBody>
      <CardFooter><Button variant="outline">View log</Button><Button>Promote release</Button></CardFooter>
    </Card>
  `),
};

export const WithAction: Story = {
  render: renderStory(`
    <Card :class="styles.card">
      <CardHeader>
        <CardTitle>Incident response</CardTitle>
        <CardDescription>Owner rotation and escalation readiness.</CardDescription>
        <CardAction><Badge variant="secondary">Stable</Badge></CardAction>
      </CardHeader>
      <CardBody>
        <div :class="styles.statsGrid">
          <div><span :class="styles.statValue">18 min</span><span :class="styles.statLabel">median response</span></div>
          <div><span :class="styles.statValue">99.97%</span><span :class="styles.statLabel">service uptime</span></div>
        </div>
      </CardBody>
    </Card>
  `),
};

export const Compact: Story = {
  render: renderStory(`
    <Card size="sm" :class="styles.card">
      <CardHeader><CardTitle>Billing plan</CardTitle><CardDescription>Team workspace, monthly billing.</CardDescription></CardHeader>
      <CardBody><div :class="styles.metric"><span :class="styles.metricValue">$48</span><span :class="styles.metricLabel">per month</span></div></CardBody>
      <CardFooter><Button variant="outline">Cancel</Button><Button>Upgrade</Button></CardFooter>
    </Card>
  `),
};

export const Variants: Story = {
  render: renderStory(`
    <div :class="styles.cardGrid">
      <Card v-for="variant in variants" :key="variant" :variant="variant" :class="styles.cardGridItem">
        <CardHeader><CardTitle>{{ variant }}</CardTitle><CardDescription>Card surface using the {{ variant }} visual treatment.</CardDescription></CardHeader>
        <CardBody>Use variants to communicate surface hierarchy.</CardBody>
      </Card>
    </div>
  `),
};

export const Sizes: Story = {
  render: renderStory(`
    <div :class="styles.cardGrid">
      <Card v-for="size in sizes" :key="size" :size="size" :class="styles.cardGridItem">
        <CardHeader><CardTitle>Card {{ size }}</CardTitle><CardDescription>Spacing and title scale for the {{ size }} size.</CardDescription></CardHeader>
        <CardBody>Shared content with size-specific density.</CardBody>
      </Card>
    </div>
  `),
};

export const ContentStress: Story = {
  render: renderStory(`
    <Card :class="styles.card">
      <CardHeader>
        <CardTitle>Production-readiness-review-for-the-international-warehouse-platform</CardTitle>
        <CardDescription>A deliberately long description verifies wrapping at narrow widths and increased text scaling without forcing the trailing content outside the card.</CardDescription>
        <CardAction><Badge variant="secondary">Needs review</Badge></CardAction>
      </CardHeader>
      <CardBody>Owners in logistics, reliability engineering, and customer support are coordinating the final rollout window.</CardBody>
      <CardFooter><Button variant="outline">Review dependencies</Button><Button>Approve rollout</Button></CardFooter>
    </Card>
  `),
};

export const WithinForm: Story = {
  render: renderStory(`
    <Card as-child :class="styles.card">
      <form>
        <CardHeader><CardTitle>Create account</CardTitle><CardDescription>Enter the contact details for the new member.</CardDescription></CardHeader>
        <CardBody>
          <div :class="styles.formGrid">
            <label :class="styles.formField">First name<input name="firstName" /></label>
            <label :class="styles.formField">Last name<input name="lastName" /></label>
          </div>
        </CardBody>
        <CardFooter><Button type="reset" variant="outline">Cancel</Button><Button type="submit">Create account</Button></CardFooter>
      </form>
    </Card>
  `),
};

export const WithImage: Story = {
  render: renderStory(`
    <Card :class="styles.card">
      <CardMedia><img :class="styles.image" alt="A warehouse with neatly stacked delivery boxes." src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=960&q=80" /></CardMedia>
      <CardHeader><CardTitle>Warehouse capacity</CardTitle><CardDescription>North region allocation for the next planning cycle.</CardDescription></CardHeader>
      <CardBody><div :class="styles.capacity"><span>72%</span><div :class="styles.capacityBar"><div /></div></div></CardBody>
      <CardFooter :class="styles.footerBetween"><Badge variant="outline">Forecast</Badge><Button variant="outline">Open report</Button></CardFooter>
    </Card>
  `),
};

export const WithBackground: Story = {
  render: renderStory(`
    <Card variant="elevated" :class="styles.backgroundCard">
      <CardBackground>
        <img :class="styles.backgroundImage" alt="" src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85" />
        <div aria-hidden="true" :class="styles.backgroundOverlay" />
      </CardBackground>
      <CardHeader :class="styles.backgroundHeader">
        <CardTitle>Weekend guide</CardTitle>
        <CardDescription :class="styles.backgroundDescription">Three places to slow down, look around, and stay a little longer.</CardDescription>
      </CardHeader>
    </Card>
  `),
};

export const Horizontal: Story = {
  render: renderStory(`
    <Card :class="styles.horizontalCard">
      <img alt="Caffè latte in a ceramic cup." :class="styles.horizontalImage" src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=720&q=80" />
      <div :class="styles.horizontalContent">
        <CardHeader><CardTitle>The perfect latte</CardTitle><CardDescription>Espresso balanced with steamed milk and a light foam.</CardDescription></CardHeader>
        <CardBody><Badge variant="secondary">Hot</Badge></CardBody>
        <CardFooter><Button>Buy latte</Button></CardFooter>
      </div>
    </Card>
  `),
};

export const WithAvatar: Story = {
  render: renderStory(`
    <Card :class="styles.card">
      <CardHeader>
        <div :class="styles.profile">
          <span aria-hidden="true" :class="styles.avatar">NF</span>
          <div><CardTitle>Nate Foss</CardTitle><CardDescription>@natefoss</CardDescription></div>
        </div>
      </CardHeader>
      <CardBody>Nate has requested to join your team.</CardBody>
      <CardFooter><Button variant="outline">Decline</Button><Button>Approve</Button></CardFooter>
    </Card>
  `),
};

export const AsLink: Story = {
  render: renderStory(`
    <Card as-child :class="styles.card">
      <a href="/docs/card">
        <CardHeader><CardTitle>Release health</CardTitle><CardDescription>Summary for the current production rollout.</CardDescription></CardHeader>
        <CardBody>
          <div :class="styles.releaseSummary">
            <div><span :class="styles.statValue">98.4%</span><span :class="styles.statLabel">successful sessions</span></div>
            <div><span :class="styles.statValue">12</span><span :class="styles.statLabel">checks passed</span></div>
          </div>
        </CardBody>
      </a>
    </Card>
  `),
};

export const LinkWithActions: Story = {
  render: renderStory(`
    <Card :class="styles.card">
      <CardHeader>
        <CardTitle><CardLink href="/docs/card">Incident response</CardLink></CardTitle>
        <CardDescription>Owner rotation and escalation readiness.</CardDescription>
        <CardAction><Button variant="outline" size="sm">Acknowledge</Button></CardAction>
      </CardHeader>
      <CardBody>
        <div :class="styles.statsGrid">
          <div><span :class="styles.statValue">18 min</span><span :class="styles.statLabel">median response</span></div>
          <div><span :class="styles.statValue">99.97%</span><span :class="styles.statLabel">service uptime</span></div>
        </div>
      </CardBody>
    </Card>
  `),
};

export const CustomComposition: Story = {
  render: renderStory(`
    <Card :class="styles.customCard">
      <CardHeader>
        <CardTitle as-child><h2>System load</h2></CardTitle>
        <CardDescription>Aggregated worker utilization across the current batch.</CardDescription>
      </CardHeader>
      <CardBody>
        <div :class="styles.capacity"><span>64%</span><div :class="styles.capacityBar"><div /></div></div>
      </CardBody>
    </Card>
  `),
};

export const CustomSpacing: Story = {
  render: renderStory(`
    <Card :class="styles.customSpacingCard">
      <CardHeader><CardTitle>Scheduled reports</CardTitle><CardDescription>Weekly snapshots with denser card spacing.</CardDescription></CardHeader>
      <CardBody><div :class="styles.metric"><span :class="styles.metricValue">24</span><span :class="styles.metricLabel">active report schedules</span></div></CardBody>
      <CardFooter><Button variant="outline">See details</Button><Button>Set up report</Button></CardFooter>
    </Card>
  `),
};