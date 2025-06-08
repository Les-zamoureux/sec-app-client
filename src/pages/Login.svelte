<script>
    import Heading from './../lib/Heading.svelte'
    import LogoSvg from "./../assets/logo.svg"

    import { Link, navigate } from 'svelte-routing';

    import {t} from 'svelte-intl-precompile'
    import Input from '../lib/Input.svelte';
    import Button from '../lib/Button.svelte';
    
	let props = $props();

    let email = $state("")
    let password = $state("")

    let currentPage = $state("login")

    $effect(() => {
        console.log(props.params)
        //ROUTING
        
        switch(props.params){
            case "":
                if(currentPage !== "login"){
                    currentPage = "login"
                    navigate('/')
                }
                break
            case "login":
                if(currentPage !== "login"){
                    currentPage = "login"
                    navigate('/')
                }
                break
            case "signin":
                if(currentPage !== "signin"){
                    currentPage = "signin"
                    navigate('/signin')
                }
                break
            case "forgotpassword":
                if(currentPage !== "forgotpassword"){
                    currentPage = "forgotpassword"
                    navigate('/forgotpassword')
                }
                break
            default :
                navigate('/')
                break
        }
	});

    const onLogin = () => {
        console.log("oui", email, password)
    }

    const onSwitchPage = (page) => {
        switch(page){
            case "login":
                navigate('/')
                break
            case "signin":
                navigate('/signin')
                break
            case "forgotpassword":
                navigate('/forgotpassword')
                break
            default :
                navigate('/')
                break
        }
    }
</script>

<div class="LoginPage">
    <div class="FormContainer">
        <div class="FormHeader">
            <img src={LogoSvg}/>
        </div>
        <div class="FormContent">
            <div class="FormTitle">
                <Heading size="h2">{$t("connection")}</Heading>
            </div>
            <div class="FormField">
                <Input value={email} onChange={(val) => email = val} title={'emailOrUsername'}/>
            </div>
            <div class="FormField">
                <Input value={password} type={"password"} onChange={(val) => password = val} title={'password'}/>
            </div>
            <div class="FormField" style="margin-top:30px">
                <Button type={1} size={"small"} disabled={email === "" || password === ""} label={"validate"} onClick={()=>onLogin()}/>
            </div>
            <div class="FormField">
                <Button type={3} label={"noAccount"} onClick={()=>onSwitchPage("signin")}/>
                <div style="margin-top:10px"><Button type={3} label={"forgottenPassword"} onClick={()=>onSwitchPage("forgotpassword")}/></div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .LoginPage{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .FormContainer{
            width: 500px;
            display: flex;
            flex-direction: column;
            background-color: var(--neutral100);
            border-radius: 15px;
            box-shadow: 0px 0px 50px rgba($color: #000000, $alpha: .25);

            .FormHeader{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 40px 0;
                flex-grow: 0;
            }

            .FormContent{
                padding: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                width: 100%;

                .FormTitle{
                    width: 100%;
                }

                .FormField{
                    width: 100%;
                    margin-top: 20px;
                }
            }
        }
    }
</style>