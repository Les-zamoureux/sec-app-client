<script>
    let props = $props()
</script>

<div class="page">
    {@render props.children?.()}
</div>

<style>
    .page{
        width: 100%;
        height: calc(100vh - 120px);
        margin-top: 120px;
    }
</style>