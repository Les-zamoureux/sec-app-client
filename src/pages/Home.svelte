<script>
    import { Link } from "svelte-routing";
    import { t } from 'svelte-intl-precompile';
</script>

<div>
    <h1>{$t("home")}</h1>
    <Link to={"/about"}>about</Link>
</div>


<style>
    h1{
        font-size: 65px;
    }
</style>