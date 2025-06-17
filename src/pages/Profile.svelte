<script>
    import Button from "../lib/Button.svelte";
    import Page from "../lib/Page.svelte";

    let props = $props()
</script>

<div class="ProfilePage">
    <Page title={"profile"}>
        <Button size={'small'} label={'commons.disconnect'} onClick={props.disconnect}/>
    </Page>
</div>

<style>
    .ProfilePage{
        width: 100%;
        height: 100%;
    }
</style>