<script>
    import Body from "./Body.svelte";

    import {t} from "svelte-intl-precompile"

    let props = $props()

    const onChangeValue = (e) => {
        if(props.onChange) props.onChange(e.target.value)
    }
</script>

<div class="InputContainer">
    {#if props.title}
    <div class="InputTitle">
        <Body>{$t(props.title)}</Body>
    </div>
    {/if}
    <input value={props.value} type={props.type ? props.type : "text"} on:input={onChangeValue}/>
</div>

<style lang="scss">
    .InputContainer{
        width: 100%;
        .InputTitle{
            margin-bottom: 8px;
        }

        input{
            width: 100%;
            height: 50px;
            background-color: transparent;
            border: 2px solid var(--neutral500);
            border-radius: 15px;
            padding: 0 10px;
            color: white;
            transition: all .2s;

            &:focus{
                background-color: #464646;
                border: 2px solid var(--neutral500);
            }
        }
    }
</style>