<script>
  import { Router, Route, useLocation } from "svelte-routing";

  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Login from "./pages/Login.svelte";
  import Nav from "./lib/Nav.svelte";
  import Profile from "./pages/Profile.svelte";
  import Faq from "./pages/FAQ.svelte";
  import Contact from "./pages/Contact.svelte";
  import Shop from "./pages/Shop.svelte";
  import Favorites from "./pages/Favorites.svelte";
  import Cart from "./pages/Cart.svelte";
  import Product from "./pages/Product.svelte";

  let logged = $state(false)

  const setLogged = (_logged) => {
    logged = _logged
  }

  let currentPage = $state("")

  const setCurrentPage = (_currentPage) => {
    currentPage = _currentPage
  }

  const location = useLocation()

  $effect(()=>{
    if(!logged){
      let authToken = window.localStorage.getItem('authToken')
      if(authToken) setLogged(true)
    }

    console.log(location)
  })

  const disconnect = () => {
    window.localStorage.removeItem('authToken')
    setLogged(false)
  }

  let url = "";
</script>


<Router url={url}>
  <div class="AppContainer">
    {#if logged}
      <Nav currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      <div class="AppContent">
        <Route path="/profile"><Profile disconnect={disconnect}/></Route>
        <Route path="/favorites"><Favorites/></Route>
        <Route path="/cart"><Cart/></Route>
        <Route path="/contact"><Contact/></Route>
        <Route path="/faq"><Faq/></Route>
        <Route path="/about"><About/></Route>
        <Route path="/shop"><Shop/></Route>
        <Route path="/shop/:id" let:params><Product id={params.id}/></Route>
        <Route path="/*"><Home setCurrentPage={setCurrentPage}/></Route>
      </div>
    {:else}
      <div class="AppContent">
        <Route path="/*"><Login setLogged={setLogged} logged={logged}/></Route>
        <Route path="/:page" let:params><Login params={params.page} setLogged={setLogged} logged={logged}/></Route>
        <Route path="/:page/:token" let:params><Login params={params.page} token={params.token} setLogged={setLogged} logged={logged}/></Route>
      </div>
    {/if}
  </div>
</Router> 

<style lang="scss">
  .AppContainer{
    width: 100%;
    height: 100%;
    position: relative;
    overflow-x: hidden;
    background-color: var(--neutral0);

    .AppContent{
      z-index: 1;
      width: 100%;
      position: absolute;
      top: 0;
      min-height: 100%;
    }
  }
</style>