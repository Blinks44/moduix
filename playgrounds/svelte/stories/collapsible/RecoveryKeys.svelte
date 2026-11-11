<script lang="ts">
  import styles from './Collapsible.stories.module.css';

  const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];
</script>

<ul class={styles.keysList}>
  {#each recoveryKeys as key (key)}
    <li>{key}</li>
  {/each}
</ul>