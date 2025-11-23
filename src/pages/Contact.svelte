<script>
    import { t } from "svelte-intl-precompile";
    import Heading from "../lib/Heading.svelte";
    import Page from "../lib/Page.svelte";
    import Body from "../lib/Body.svelte";
    import EmailIcon from "./../assets/email.svg"
    import PhoneIcon from "./../assets/phone.svg"
    import PlaceIcon from "./../assets/place.svg"
    import Logo from "./../assets/logo.svg"
    import CandysBG from "./../assets/bg-logo.jpg";
    import Input from "../lib/Input.svelte";
    import Button from "../lib/Button.svelte";
    import { emailCheck } from "../utils/helpers";

    let name = $state("")
    let email = $state("")
    let object = $state("")
    let message = $state("")

    let error = $state(false)
</script>

<div class="ContactPage">
    <Page title="nav.contact" slogan={"contact.slogan"}>
        <div class="ContactContainer">
            <div class="ContactContent fix">
                <div class="CoordinateContainer">
                    <div class="ContactTitle"><Heading size={'h6'}>{$t("contact.coordinate.title")}</Heading></div>
                    <div class="CoordinateContent">
                        <div class="ContentLogo">
                            <img src={EmailIcon} alt="Email icon">
                        </div>
                        <div class="ContentText">
                            <Body>{$t("contact.coordinate.email")}</Body>
                        </div>
                    </div>
                    <div class="CoordinateContent">
                        <div class="ContentLogo">
                            <img src={PhoneIcon} alt="Phone icon">
                        </div>
                        <div class="ContentText">
                            <Body>{$t("contact.coordinate.phone")}</Body>
                        </div>
                    </div>
                    <div class="CoordinateContent">
                        <div class="ContentLogo">
                            <img src={PlaceIcon} alt="Place icon">
                        </div>
                        <div class="ContentText">
                            <Body>{$t("contact.coordinate.place")}</Body>
                        </div>
                    </div>
                </div>
                <div class="LogoContainer">
                    <div class="LogoBackground">
                        <img src={CandysBG} alt="Candys">
                    </div>
                    <div class="LogoContent">
                        <img src={Logo} alt="MySweet Logo">
                    </div>
                </div>
            </div>
            <div class="ContactContent">
                <div class="ContactForm">
                    <div class="ContactTitle"><Heading size={'h6'}>{$t("contact.form.title")}</Heading></div>
                    <div class="ContactField">
                        <Input title={$t("contact.form.name.title")} placeholder={$t("contact.form.name.placeholder")} value={name} onChange={(value)=>{name = value}}/>
                    </div>
                    <div class="ContactField">
                        <Input title={$t("contact.form.email.title")} placeholder={$t("contact.form.email.placeholder")} value={email} onChange={(value)=>{email = value}}/>
                    </div>
                    <div class="ContactField">
                        <Input title={$t("contact.form.object.title")} placeholder={$t("contact.form.object.placeholder")} value={object} onChange={(value)=>{object = value}}/>
                    </div>
                    <div class="ContactField">
                        <Input title={$t("contact.form.message.title")} type={'textarea'} placeholder={$t("contact.form.message.placeholder")} value={message} onChange={(value)=>{message = value}}/>
                    </div>
                    <div class="ContactField">
                        <div class="ContactButton">
                            <Button disabled={name === "" || (email === ""  || !emailCheck(email))|| object === "" || message === ""} label={$t("commons.send")} type={1} onClick={()=>{error=true; console.log("error")}}/>
                        </div>
                        {#if error === true}
                            <Body error={"contact.form.error"}>{""}</Body>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </Page>
</div>

<style lang="scss">
    .ContactPage{
        width: 100%;
        height: 100%;

        .ContactContainer{
            width: 100%;
            display: flex;
            gap: 40px;

            .ContactContent{
                display: flex;
                flex-direction: column;
                gap: 25px;
                width: calc(100% - 350px);

                &.fix{
                    width: 350px;
                }

                .CoordinateContainer{
                    background-color: var(--neutral100);
                    padding: 25px;
                    border-radius: 20px;
                    display: flex;
                    width: 100%;
                    flex-direction: column;
                    gap: 25px;

                    .CoordinateContent{
                        display: flex;
                        gap: 20px;
                        align-items: center;

                        .ContentLogo{
                            width: 35px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                }

                .LogoContainer{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-grow: 1;
                    border: 5px solid var(--neutral500);
                    border-radius: 20px;
                    position: relative;
                    overflow: hidden;

                    .LogoBackground{
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        opacity: .4;
                        z-index: 0;
                        height: 100%;

                        img{
                            height: 100%;
                            pointer-events: none;
                        }
                    }

                    .LogoContent{
                        z-index: 1;
                        width: 225px;

                        img{
                            width: 100%;
                            pointer-events: none;
                        }
                    }
                }

                .ContactForm{
                    padding: 25px;
                    background-color: var(--neutral100);
                    border-radius: 20px;
                    width: 100%;
                    gap: 25px;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;

                    .ContactButton{
                        width: 200px;
                        margin: 5px 0;
                    }

                    .ContactField{
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                }
            }
        }

        @media screen and (max-width:1250px){
            .ContactContainer{
                flex-direction: column;

                .ContactContent{
                    flex-direction: row;
                    width:100%;
                    gap: 25px;

                    &.fix{
                        width: 100%;
                    }

                    .LogoContainer{
                        .LogoBackground{
                            img{
                                width: 100%;
                                height: auto;
                            }
                        }

                        .LogoContent{
                            max-width: 225px;
                            width: 100%;
                        }
                    }
                }
            }
        }

        @media screen and (max-width : 750px){
            .ContactContainer{
                .ContactContent{
                    flex-direction: column;
                    
                    .LogoContainer{
                        height: 250px;

                        .LogoBackground{
                            img{
                                min-height: 100%;
                            }
                        }

                        .LogoContent{
                            max-width: 225px;
                            width: auto;
                            width: 100%;
                            padding: 20px;
                            align-items: center;
                            justify-content: center;
                            display: flex;
                        }
                    }
                }
            }
        }
    }
</style>