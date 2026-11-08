<script lang="ts">
  const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];
</script>

<ul class="m-0 flex flex-col gap-1 ps-0">
  {#each recoveryKeys as key (key)}
    <li>{key}</li>
  {/each}
</ul>