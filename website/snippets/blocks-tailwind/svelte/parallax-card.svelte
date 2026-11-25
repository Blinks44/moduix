<script lang="ts">
  import {
    Card,
    CardBackground,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';

  const handlePointerMove = (event: PointerEvent) => {
    if (!(event.currentTarget instanceof HTMLElement)) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--parallax-rotate-x', `${-y * 10}deg`);
    event.currentTarget.style.setProperty('--parallax-rotate-y', `${x * 10}deg`);
  };
  const handlePointerLeave = (event: PointerEvent) => {
    if (!(event.currentTarget instanceof HTMLElement)) return;
    event.currentTarget.style.removeProperty('--parallax-rotate-x');
    event.currentTarget.style.removeProperty('--parallax-rotate-y');
  };
</script>

<div
  role="presentation"
  class="w-[min(100%,24rem)] [perspective:75rem]"
  onpointermove={handlePointerMove}
  onpointerleave={handlePointerLeave}
>
  <Card
    class="min-h-96 [transform:rotateX(var(--parallax-rotate-x,0deg))_rotateY(var(--parallax-rotate-y,0deg))] overflow-hidden border-0 bg-muted shadow-lg transition-transform duration-300 ease-in-out [transform-style:preserve-3d] motion-reduce:transform-none motion-reduce:transition-none [@media(hover:none),(pointer:coarse)]:transform-none"
    variant="elevated"
  >
    <CardBackground>
      <img
        class="size-full scale-106 object-cover"
        src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85"
        alt=""
      />
      <div
        aria-hidden="true"
        class="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/4%)_24%,rgb(0_0_0/78%)_100%)]"
      ></div>
    </CardBackground>
    <CardHeader
      class="relative z-1 mt-auto [transform:translateZ(24px)] py-6 text-white [text-shadow:0_1px_16px_rgb(0_0_0/32%)] motion-reduce:transform-none"
    >
      <span class="col-start-1 text-xs font-medium tracking-[0.08em] text-white/76 uppercase"
        >Weekend guide</span
      >
      <CardTitle class="text-inherit">A quieter way to travel</CardTitle>
      <CardDescription class="text-white/80">
        Three places to slow down, look around, and stay a little longer.
      </CardDescription>
    </CardHeader>
  </Card>
</div>