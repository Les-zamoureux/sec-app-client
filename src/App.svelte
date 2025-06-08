<script>
  import { Router, Route } from "svelte-routing";

  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Login from "./pages/Login.svelte";

  let logged = $state(false)

  const setLogged = (_logged) => {
    logged = _logged
  }

  let url = "";
</script>


<div class="AppContainer">
  <Router url={url}>
    {#if logged}
      <div class="AppContent">
        <Route path="/about"><About/></Route>
        <Route path="/"><Home/></Route>
      </div>
    {:else}
      <div class="AppContent">
        <Route path="/"><Login setLogged={setLogged} logged={logged}/></Route>
        <Route path="/:page" let:params><Login params={params.page} setLogged={setLogged} logged={logged}/></Route>
      </div>
    {/if}
  </Router>
</div>

<style lang="scss">
  .AppContainer{
    width: 100%;
    height: 100%;
    background-color: var(--neutral0);

    .AppContent{
      width: 100%;
      height: 100%;
    }
  }
</style>