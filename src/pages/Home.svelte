<script>
    import { Link } from "svelte-routing";
    import { t } from 'svelte-intl-precompile';
    import Button from "../lib/Button.svelte";

    let props = $props()
</script>

<div>
    <h1>{$t("home")}</h1>
    <Link to={"/about"}>about</Link>
</div>


<style lang="scss">
    h1{
        font-size: 65px;
    }
</style>