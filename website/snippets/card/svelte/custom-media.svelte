<script lang="ts">
  import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/svelte/card';
  import styles from '@/components/examples/card/card-custom-media.module.css';
</script>

<Card class={styles.root}>
  <div class={styles.media}>
    <img
      class={styles.image}
      src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1280&q=80"
      alt="A warehouse with neatly stacked delivery boxes."
    />
  </div>
  <CardHeader>
    <CardTitle>
      {#snippet asChild(props)}
        <h2 {...props()}>System load</h2>
      {/snippet}
    </CardTitle>
    <CardDescription
      >Bypasses <code>CardMedia</code> to fully control media framing.</CardDescription
    >
  </CardHeader>
  <CardBody>
    <div class={styles.metric}>
      <span>64%</span>
      <div class={styles.progress}>
        <div class={styles.progressValue}></div>
      </div>
    </div>
  </CardBody>
</Card>