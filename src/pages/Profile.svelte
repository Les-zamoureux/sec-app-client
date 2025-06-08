<script>
    import Button from "../lib/Button.svelte";

    let props = $props()
</script>

<div class="ProfilePage">
    <Button size={'small'} label={'disconnect'} onClick={props.disconnect}/>
</div>

<style>
    .ProfilePage{
        width: 100%;
        height: 100%;
    }
</style>