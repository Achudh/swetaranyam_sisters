<script lang="ts">
  let pages = ["Home", "About", "Media", "Music", "Performances"];
</script>

<svelte:head>
  <title>Admin | Swetaranyam Sisters</title>
  <meta
    name="description"
    content="Prof. Dr. R Nithya & Prof. Dr. R Vidya - acclaimed Carnatic vocalists with over 25 years of concerts, teaching, and research across India and internationally."
  />
</svelte:head>
<div class="dashboard">
  <section class="pages">
    <h2>Pages</h2>
    <ul>
      {#each pages as p}
        <li>{p}</li>
      {/each}
    </ul>
  </section>

  <section class="canvas-area">
    <div class="placeholder-canvas">Works</div>
  </section>
</div>

<style>
  .dashboard {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 1rem;
  }
  .pages {
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    padding-right: 1rem;
  }
  .canvas-area {
    min-height: 60vh;
  }
  .placeholder-canvas {
    height: 60vh;
    border: 1px dashed rgba(0, 0, 0, 0.2);
    display: grid;
    place-items: center;
    color: rgba(0, 0, 0, 0.6);
  }
</style>
