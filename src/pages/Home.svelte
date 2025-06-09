<script>
    import { navigate } from 'svelte-routing';
    import Body from '../lib/Body.svelte';
    import Heading from '../lib/Heading.svelte';
    import CanabisImage from './../assets/canabis.svg'
    import Logo from './../assets/logo.svg'
    import { t } from 'svelte-intl-precompile';

    let props = $props()

    const onSwitchPage = (page) => {
        props.setCurrentPage(page)
        navigate('/' + page)
    }
</script>

<div class="HomePage">
    <div class="HomeContainer">
        <div class="HomeContent">
            <div class="ContentItems">
                <div class="ContentItem" onclick={()=>{onSwitchPage('shop')}}>
                    <Heading>{$t('shop')}</Heading>
                    <Body uppercase>{$t('shopDescription')}</Body>
                </div>

                <div class="ContentItem" onclick={()=>{onSwitchPage('about')}}>
                    <Heading>{$t('about')}</Heading>
                    <Body uppercase>{$t('aboutDescription')}</Body>
                </div>
            </div>
        </div>
        <div class="HomeContent">
            <div class="HomeBackground">
                <img src={CanabisImage} alt="Marie jeane">
            </div>
            <div class="Logo">
                <img src={Logo} alt="Marie jeane">
            </div>
        </div>
        <div class="HomeContent">
            <div class="ContentItems right">
                <div class="ContentItem" onclick={()=>{onSwitchPage('faq')}}>
                    <Heading right>{$t('faq')}</Heading>
                    <Body right uppercase>{$t('faqDescription')}</Body>
                </div>

                <div class="ContentItem" onclick={()=>{onSwitchPage('contact')}}>
                    <Heading right>{$t('contact')}</Heading>
                    <Body right uppercase>{$t('contactDescription')}</Body>
                </div>
            </div>
        </div>
    </div>
</div>


<style lang="scss">
    .HomePage{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;

        .HomeContainer{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .HomeContent{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;
                height: 600px;

                .HomeBackground{
                    position: absolute;
                    left: 50%;
                    z-index: 1;
                    top: 50%;
                    height: 700px;
                    transform: translate(-50%, -50%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    filter: drop-shadow(0 0 200px rgba(30, 175, 42, 0.644));
                    opacity: .4;

                    img{
                        height: 100%;
                        pointer-events: none;
                    }
                }

                .ContentItems{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-direction: column;
                    
                    .ContentItem{
                        width: 200px;
                        cursor: pointer;
                        transition: all .2s ease-in-out;

                        &:hover{
                            transform: scale(1.05);
                            filter: drop-shadow(0 0 50px rgb(10, 187, 25));
                        }
                    }
                }

                .Logo{
                    z-index: 100;
                    width: 800px;
                    height: 400px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img{
                        height: 100%;
                        pointer-events: none;
                    }
                }
            }
        }
    }
</style>