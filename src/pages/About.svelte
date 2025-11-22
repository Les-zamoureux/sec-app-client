<script>
import Page from "../lib/Page.svelte";
import Body from "../lib/Body.svelte";
import { t } from "svelte-intl-precompile";
import Puce from "../assets/puce.svg"
import Logo from "./../assets/logo.svg";

let props = $props();
</script>

<div class="AboutPage">
    <Page title="nav.about" slogan={'about.slogan'}>
        <div class="AboutContainer">
            <div class="AboutParts">
                <div class="AboutContent">
                    <div class="LogoContainer">
                        <img src={Logo} alt="MySweet logo">
                    </div>
                </div>
                <div class="AboutContent">
                    <div class="ContentTitle">
                        <Body weight={'semiBold'} size={'veryLarge'}>{$t("about.project-1")}</Body>
                    </div>
                    <Body size={'large'}>{$t('about.project-1-1')}</Body>
                    <div class="List">
                        <div class="ListItem">
                            <img src={Puce} alt={"puce"}/>
                            <div class="textItem"><Body size={'large'}>{$t('about.project-1-2-1')}</Body></div>
                        </div>
                        <div class="ListItem">
                            <img src={Puce} alt={"puce"}/>
                            <div class="textItem"><Body size={'large'}>{$t('about.project-1-2-2')}</Body></div>
                        </div>
                        <div class="ListItem">
                            <img src={Puce} alt={"puce"}/>
                            <div class="textItem"><Body size={'large'}>{$t('about.project-1-2-3')}</Body></div>
                        </div>
                        <div class="ListItem">
                            <img src={Puce} alt={"puce"}/>
                            <div class="textItem"><Body size={'large'}>{$t('about.project-1-2-4')}</Body></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="AboutContent">
                <Body size={'large'}>{$t('about.project-2')}</Body>
            </div>

            <div class="AboutContent">
                <Body size={'large'}>{$t('about.project-3')}</Body>
            </div>

            <div class="AboutContent">
                <Body size={'large'}>{$t('about.project-4-1')}</Body>
                <div class="List">
                    <div class="ListItem">
                        <img src={Puce} alt={"puce"}/>
                        <div class="textItem"><Body size={'large'}>{$t('about.project-4-2-1')}</Body></div>
                    </div>
                    <div class="ListItem">
                        <img src={Puce} alt={"puce"}/>
                        <div class="textItem"><Body size={'large'}>{$t('about.project-4-2-2')}</Body></div>
                    </div>
                    <div class="ListItem">
                        <img src={Puce} alt={"puce"}/>
                        <div class="textItem"><Body size={'large'}>{$t('about.project-4-2-3')}</Body></div>
                    </div>
                </div>
            </div>

            <div class="AboutContent">
                <Body size={'large'}>{$t('about.project-5')}</Body>
            </div>

            <div class="AboutContent">
                <Body size={'large'}>{$t('about.project-6')}</Body>
            </div>
        </div>
    </Page>
</div>

<style lang="scss">
    .AboutPage{
        width: 100%;
        flex-grow: 1;
        display: flex;
        height: 100%;

        .AboutContainer{
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 30px;

            .AboutParts{
                display: flex;
                gap: 40px;
            }

            .AboutContent{
                display: flex;
                flex-direction: column;
                gap: 15px;

                .LogoContainer{
                    height: 100%;
                    width: 225px;
                    aspect-ratio: 1/1;
                    background-color: var(--neutral100);
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    padding: 20px;
                    justify-content: center;

                    img{
                        pointer-events: none;
                        width: 100%;
                    }
                }

                .List{
                    display: flex;
                    flex-direction: column;
                    gap: 10px;

                    .ListItem{
                        display: flex;
                        gap: 10px;
                        position: relative;
                        align-items: center;

                        img{
                            width: 20px;
                            position: absolute;
                            top: 0px;
                            left: 0;
                            height: 20px;
                        }

                        .textItem{
                            width: calc(100% - 40px);
                            margin-left: 40px;
                        }
                    }
                }
            }

            @media screen and (max-width:800px){
                .AboutParts{
                    flex-direction: column;
                    gap: 25px;
                }

                .AboutContent{
                    .LogoContainer{
                        width: 100%;
                        height: 225px;
                        padding: 40px;

                        img{
                            width: auto;
                            height: 100%;
                            max-width: 100%;
                        }
                    }
                }
            }
        }
    }
</style>