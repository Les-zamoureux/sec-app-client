<script>
  import { Router, Route, navigate } from "svelte-routing";
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
    import Admin from "./pages/Admin.svelte";

  let props = $props()

  let logged = $state(false)

  const setLogged = (_logged) => {
    logged = _logged
  }

  let currentPage = $state(null)

  const setCurrentPage = (_currentPage) => {
    currentPage = _currentPage
  }

  $effect(()=>{
    if(!logged){
      let authToken = window.localStorage.getItem('authToken')
      if(authToken) setLogged(true)
    }

    if(props.params){
      if(props.params['*'] && props.params['*'] !== ''){
        setCurrentPage('home')
        navigate('/')
      }else{
        setCurrentPage('home')
      }
    }else{
      switch (props.tab){
        case 'home' :
          if(props.id) navigate('/home')
          if(currentPage !== "home"){
            setCurrentPage('home')
          }
          break;
        case 'shop' :
          if(props.id){
            if(currentPage !== "product"){
              setCurrentPage('product')
            }
          }else{
            if(currentPage !== "shop"){
              setCurrentPage('shop')
            }
          }
          break;
        case 'about' :
          if(props.id) navigate('/about')
          if(currentPage !== "about"){
            setCurrentPage('about')
          }
          break;
        case 'faq' :
          if(props.id) navigate('/faq')
          if(currentPage !== "faq"){
            setCurrentPage('faq')
          }
          break;
        case 'contact' :
          if(props.id) navigate('/contact')
          if(currentPage !== "contact"){
            setCurrentPage('contact')
          }
          break;
        case 'admin' :
          if(props.id) navigate('/admin')
          if(window.localStorage.getItem('isAdmin') !== "true") navigate('/')
          if(currentPage !== "admin"){
            setCurrentPage('admin')
          }
          break;
        case 'favorites' :
          if(!logged) navigate('/')
          if(props.id) navigate('/favorites')
          if(currentPage !== "favorites"){
            setCurrentPage('favorites')
          }
          break;
        case 'cart' :
          if(!logged) navigate('/')
          if(props.id) navigate('/cart')
          if(currentPage !== "cart"){
            setCurrentPage('cart')
          }
          break;
        case 'profile' :
          if(!logged) navigate('/')
          if(props.id) navigate('/profile')
          if(currentPage !== "profile"){
            setCurrentPage('profile')
          }
          break;
        case 'login' :
          if(logged) navigate('/')
          if(props.id) navigate('/login')
          if(currentPage !== "login"){
            setCurrentPage('login')
          }
          break;
        case "sign-in":
          if(logged) navigate('/')
          if(props.id) navigate('/sign-in')
          if(currentPage !== "signIn"){
            currentPage = "signIn"
          }
          break
        case "forgot-password":
          if(logged) navigate('/')
          if(props.id) navigate('/forgot-password')
          if(currentPage !== "forgotPassword"){
            currentPage = "forgotPassword"
          }
          break
        case "change-password":
          if(logged || !props.id) navigate('/')
          if(currentPage !== "changePassword"){
            currentPage = "changePassword"
          }
          break
        case "verify-account":
          if(logged || !props.id) navigate('/')
          if(currentPage !== "verifyAccount"){
            currentPage = "verifyAccount"
          }
          break
        default :
          setCurrentPage('home')
          navigate('/')
          break
      }
    }
  })

  const disconnect = () => {
    window.localStorage.removeItem('authToken')
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('isAdmin')
    setLogged(false)
  }

  let url = "";
</script>


<Router url={url}>
  <div class="AppContainer">
    {#if currentPage === "login" || currentPage === "signIn" || currentPage === "forgotPassword" || currentPage === "changePassword" || currentPage === "verifyAccount"}
      <div class="AppContent">
        <Login currentPage={currentPage} setLogged={setLogged} logged={logged} id={props.id}/>
      </div>
    {:else}
      <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} logged={logged}/>
      <div class="AppContent">
        {#if currentPage === "home"} <Home setCurrentPage={setCurrentPage}/>
        {:else if currentPage === "shop"} <Shop/>
        {:else if currentPage === "product"} <Product id={props.id}/>
        {:else if currentPage === "about"} <About/>
        {:else if currentPage === "faq"} <Faq/>
        {:else if currentPage === "admin"} <Admin/>
        {:else if currentPage === "contact"} <Contact/>
        {:else if currentPage === "favorites"} <Favorites/>
        {:else if currentPage === "cart"} <Cart/>
        {:else if currentPage === "profile"} <Profile disconnect={disconnect}/>
        {/if}
      </div>
    {/if}
    
    
    <!-- {#if logged}
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
        {#if currentPage === }
        <Route path="/*"><Login setLogged={setLogged} logged={logged}/></Route>
        <Route path="/:page" let:params><Login params={params.page} setLogged={setLogged} logged={logged}/></Route>
        <Route path="/:page/:token" let:params><Login params={params.page} token={params.token} setLogged={setLogged} logged={logged}/></Route>
      </div>
    {/if} -->
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