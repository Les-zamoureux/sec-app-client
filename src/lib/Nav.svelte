<script>
    import { navigate } from 'svelte-routing';
    import Logo from './../assets/logo.svg'
    import ProfileIcon from './../assets/person.svg'
    import CartIcon from './../assets/cart.svg'
    import LikeIcon from './../assets/heart.svg'
    import BurgerIcon from './../assets/burger.svg'
    import CrossIcon from './../assets/cross.svg'
    import Body from './Body.svelte';
    import { t } from 'svelte-intl-precompile';
    import Button from './Button.svelte';
    let props = $props()

    let options = [
        {name:"shop", link:"/shop"},
        {name:"about", link:"/about"},
        {name:"home", image:Logo, link:"/"},
        {name:"faq", link:"/faq"},
        {name:"contact", link:"/contact"}
    ]

    let currentPage = $state('home')
    let open = $state(false)
    let noTransition = $state(false)

    let timeout = null

    const onNavigate = (page, link) => {
        open = false
        currentPage = page
        navigate(link)
    }

</script>

<svelte:window
    onresize={(e)=>{
        console.log("iui")
        clearTimeout(timeout)
        noTransition = true
        if(open) open = false
        timeout = setTimeout(()=>{
            noTransition = false
        }, 100)
    }}
/>

<nav>
    <div class="navContainer">
        <div class="Logo" onclick={()=>{onNavigate("home", '/')}}>
            <img src={Logo} alt="Logo">
        </div>
        <div class="burgerIcon" onclick={()=>{open=!open}}>
            <img src={BurgerIcon} alt="Burger Icon">
        </div>
    </div>
    <div class={"Options" + (open ? " open" : "") + (noTransition ? " noTransition" : "")}>
        {#each options as option}
        <button class={"Option" + (option.image ? ' logo' : '') + (option === options[options.length-1] ? ' last' : '')} onclick={()=>{onNavigate(option.name, option.link)}}>
            {#if option.image}
                <img src={option.image} alt="Logo">
            {:else if option.name}
                <Body large primary={currentPage === option.name} uppercase hover>{$t(option.name)}</Body>
            {/if}
        </button>
        {/each}
        <div class="icons">
            <Button size={"small"} nude icon={LikeIcon} onClick={()=>{onNavigate("favorites", '/favorites')}}/>
            <Button size={"small"} nude icon={CartIcon} onClick={()=>{onNavigate("cart", '/cart')}}/>
            <Button size={"small"} nude icon={ProfileIcon} onClick={()=>{onNavigate("profile", '/profile')}}/>
        </div>
        <div class="closeIcon" onclick={()=>{open=!open}}>
            <img src={CrossIcon} alt="Close Icon">
        </div>    
    </div>
</nav>

<style lang="scss">
    nav{
        width: 100%;
        height: 120px;
        z-index: 100;
        overflow: hidden;

        .navContainer{
            height: 100%;
            width: 100%;
            position: relative;
            display: none;
            
            .burgerIcon{
                width: 32px;
                position: absolute;
                right: 30px;
                top: 50%;
                transform: translateY(-50%);
                height: 32px;
                cursor: pointer;
                display: none;
                align-items: center;
                justify-content: center;

                img{
                    width: 100%;
                }
            }

            .Logo{
                height: 80px;
                display: none;
                position: absolute;
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
                cursor: pointer;

                img{
                    height: 100%;
                    pointer-events: none;
                }
            }
        }
        
        .Options{
            display: flex;
            position: relative;
            height: 100%;
            align-items: center;
            justify-content: center;
            width: 100%;

            .closeIcon{
                width: 46px;
                position: absolute;
                cursor: pointer;
                right: 10px;
                top: 30px;
                height: 46px;
                display: none;
                align-items: center;
                justify-content: center;

                img{
                    width: 100%;
                }
            }

            .icons{
                position: absolute;
                right: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                top: 50%;
                transform: translateY(-50%);
            }

            .Option{
                margin: 0 40px;
                width: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: transparent;
                border: none;
                cursor: pointer;

                img{
                    height: 90px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                }
            }
        }

        @media screen and (max-width : 1250px){
            .Options{
                .Option{
                    margin: 0 30px;
                    width: 80px;

                    img{
                        height: 80px;
                    }
                }
            }
        }

        @media screen and (max-width : 1024px){
            .Options{
                position:fixed;
                right: 0;
                flex-direction: column;
                width: 300px;
                height: 100vh;
                transform: translateX(100%);
                top: 0;
                justify-content: start;
                padding-top: 120px;
                transition: transform .3s ease-in-out;
                background-color: var(--neutral100);
                z-index: 1000;

                &.noTransition{
                    transition: none;
                }

                &.open{
                    transform: translateX(0);
                }

                .closeIcon{
                    display: flex;
                }
                
                .Option{
                    width: 100%;
                    margin: 0;
                    height: 100px;
                    border-top: 2px solid var(--neutral500);
                    transition: all .2s;
                    
                    &.last{
                        border-bottom: 2px solid var(--neutral500);
                    }

                    &.logo{
                        position: absolute;
                        top: 20px;
                        height: 70px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 100px;
                        border: none;

                        &:hover{
                            background-color: transparent;
                        }
                    }

                    &:hover{
                        background-color: var(--primary);
                    }
                }

                

                .icons{
                    position: absolute;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    bottom: 20px;
                    left: 50%;
                    top: auto;
                    transform: translateX(-50%);
                }
            }

            .navContainer{
                display: flex;
                .burgerIcon{
                    display: flex;
                }

                .Logo{
                    display: flex;
                }
            }
        }
    }
</style>