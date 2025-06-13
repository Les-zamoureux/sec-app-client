<script>
    import { Route, Router } from "svelte-routing";
    import App from "./App.svelte"

    export let url = ""
</script>

<Router url={url}>
    <Route path="/" let:params>
        <App params={params}/>
    </Route>
    <Route path="/:params" let:params>
        <App params={params.params}/>
    </Route>
</Router>