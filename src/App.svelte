<script>
  import { Router, Link, Route } from "svelte-routing";

  import {t} from "svelte-intl-precompile"

  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  
  export let url = "";

</script>


<Router url={url}>
  <p>{$t('myWeed')}</p>
  <div>
    <Route path="/about"><About/></Route>
    <Route path="/"><Home/></Route>
  </div>
</Router>
