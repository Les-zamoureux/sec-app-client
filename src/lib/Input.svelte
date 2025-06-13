<script>
    import Body from "./Body.svelte";
    import SearchIcon from "./../assets/search.svg"

    import {t} from "svelte-intl-precompile"

    let props = $props()
    
    let focus = $state(false)

    const onChangeValue = (e) => {
        if(props.onChange) props.onChange(e.target.value)
    }

    const onKeyPress = (e) => {
        if(e.code === "Enter" && props.onEnterPress) props.onEnterPress()
    }
</script>

<div class={"InputContainer"}>
    {#if props.title}
    <div class="InputTitle">
        <Body error={props.error}>{$t(props.title)}</Body>
    </div>
    {/if}
    <div class={"InputContent" + (props.error ? ' error' : "") + (focus ? ' focus' : "") + (props.type == 'search' ? ' search' : "")}>
        <input value={props.value} placeholder={props.placeholder ? $t(props.placeholder) : null} type={props.type ? props.type : "text"} onkeypress={onKeyPress} onfocusin={(e)=>{focus=true}} onfocusout={(e)=>{focus=false}} oninput={onChangeValue}/>
        {#if props.type === "search"}
            <div class="SearchIcon">
                <img src={SearchIcon} alt="Search icon">
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    .InputContainer{
        width: 100%;
        .InputTitle{
            margin-bottom: 8px;
        }

        .InputContent{
            width: 100%;
            height: 50px;
            position: relative;
            border: 2px solid var(--neutral500);
            background-color: transparent;
            transition: opacity .2s;
            border-radius: 15px;
            transition: all .2s;

            &.focus{
                background-color: var(--neutral150);
            }
        
            &.search{
                input{
                    width: calc(100% - 40px);
                    margin-left: 40px;

                    &:focus{
                        width: 100%;
                        margin-left: 0;
                    }

                    &:focus ~ .SearchIcon{
                        margin-left: 0px;
                        opacity: 0;
                    }
                }
            }
        
            .SearchIcon{
                position: absolute;
                left: 5px;
                top: 50%;
                transform: translateY(-50%);
                width: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 40px;
                z-index: 100;
                padding: 5px;
        
                img{
                    width: 100%;
                    pointer-events: none;
                }
            }
        
            input{
                width: 100%;
                box-sizing: border-box;
                height: 100%;
                border-radius: 15px;
                font-size: 16px;
                background-color: transparent;
                padding: 10px 15px;
                color: white;
                transition: all .2s;
                border: none;
                text-decoration: none;
        
                &.error{
                    border: 2px solid var(--red100);
                }

                &:focus{
                    width: 100%;
                    margin-left: 0;
                    outline: none;
                }

                &:focus ~ .SearchIcon{
                    margin-left: 0px;
                    opacity: 0;
                }
            }

            @media screen and (max-width : 1100px){
                input{
                    font-size: 14px;
                }
            }

            @media screen and (max-width : 650px){
                input{
                    font-size: 12px;
                }
            }
        }
    }
</style>