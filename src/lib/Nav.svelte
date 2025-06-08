<script>
    import { navigate } from 'svelte-routing';
    import Logo from './../assets/logo.svg'
    import ProfileIcon from './../assets/person.svg'
    import CartIcon from './../assets/cart.svg'
    import LikeIcon from './../assets/heart.svg'
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

    const onNavigate = (page, link) => {
        currentPage = page
        navigate(link)
    }

</script>

<nav>
    <div class="Options">
        {#each options as option}
        <button class="Option" onclick={()=>{onNavigate(option.name, option.link)}}>
            {#if option.image}
                <img src={option.image} alt="Logo">
            {:else if option.name}
                <Body large primary={currentPage === option.name} uppercase hover>{$t(option.name)}</Body>
            {/if}
        </button>
        {/each}
    </div>
    <div class="icons">
        <Button size={"medium"} nude icon={LikeIcon} onClick={()=>{onNavigate("favorites", '/favorites')}}/>
        <Button size={"medium"} nude icon={CartIcon} onClick={()=>{onNavigate("cart", '/cart')}}/>
        <Button size={"medium"} nude icon={ProfileIcon} onClick={()=>{onNavigate("profile", '/profile')}}/>
    </div>
</nav>

<style lang="scss">
    nav{
        width: 100%;
        height: 120px;
        position: relative;

        .icons{
            position: absolute;
            right: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .Options{
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: center;

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
                }
            }
        }
    }
</style>