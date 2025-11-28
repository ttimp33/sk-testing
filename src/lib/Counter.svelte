<script lang="ts">
  import { onMount } from 'svelte';

  let { initialCount } = $props();
  let count = $derived(initialCount);
  let mounted = $state(false);

  onMount(() => {
    // A simple way to check if component is mounted/running in a browser
    mounted = true;
  });

  function increment() {
    count += 1;
  };

  // Derived state for syline
  let isActive = $derived(count > 0);

</script>

<div data-testid="counter-wrapper">
  {#if mounted}
    <p>This component is running in the browser.</p>
  {/if}
  <button 
  onclick={increment}
  class="counter-button"
  class:active={isActive}
  >
    Count is {count}
  </button>
</div>

<style>
    .counter-button {
        padding: 10px 20px;
        border: 2px solid #333;
        background-color: white;
        color: #333;
        transition: background-color 0.2s;
    }

    .counter-button:hover {
        background-color: #eee;
    }

    .counter-button.active {
        background-color: #007bff;
        color: white;
        border-color: #007bff;
    }
</style>