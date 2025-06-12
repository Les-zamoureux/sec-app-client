<script>
    import Heading from './../lib/Heading.svelte'
    import LogoSvg from "./../assets/logo.svg"

    import { Link, navigate } from 'svelte-routing';

    import {t} from 'svelte-intl-precompile'
    import Input from '../lib/Input.svelte';
    import Button from '../lib/Button.svelte';
    import Body from '../lib/Body.svelte';
    import { emailCheck } from '../utils/helpers';
    
	let props = $props();

    let username = $state("")
    let email = $state("")
    let password = $state("")
    let confirmPassword = $state("")

    let submitError = $state({})
    let submitSuccess = $state({})

    let currentPage = $state("login")

    $effect(() => {
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
            case "forgot-password":
                if(currentPage !== "forgotPassword"){
                    currentPage = "forgotPassword"
                    navigate('/forgot-password')
                }
                break
            case "change-password":
                if(!props.token) navigate('/')
                if(currentPage !== "changePassword"){
                    currentPage = "changePassword"
                }
                break
            default :
                navigate('/')
                break
        }
	});

    const onLogin = () => {
        if(email === "email" && password === "password"){
            submitError = {"loginError":true}
        }else{
            submitError = {}
            //REQUEST
            window.localStorage.setItem('authToken', "TOKEN")
            props.setLogged(true)
            navigate('/')
        }
    }

    const onSignIn = () => {
        submitError = {}
        if(password && confirmPassword && password !== confirmPassword) submitError["passwordError"] = true
        if(email && email === "email") submitError["emailAlreadyUse"] = true
        if(username && username === "username") submitError["usernameAlreadyUse"] = true
        
        if(Object.keys(submitError).length === 0){
            submitError = {}
            //REQUEST
            window.localStorage.setItem('authToken', "TOKEN")
            props.setLogged(true)
            navigate('/')
        }
    }

    const onPasswordRequested = () => {
        if(email && email === "email"){
            submitError["emailDoesntExist"] = true
        }else{
            submitError = {}
            //REQUEST
            submitSuccess = {'emailSent' : true}
        }
    }

    const onChangePassword = () => {
        if(!password || !confirmPassword || (password && confirmPassword && password !== confirmPassword)){
            submitError["passwordError"] = true
        }else if(props.token === "existepas"){
            submitError["invalidToken"] = true
        }else{
            submitError = {}
            //REQUEST
            navigate('/')
        }
    }

    const onSwitchPage = (page) => {
        email = ''
        password = ''
        confirmPassword = ''
        username = ''
        switch(page){
            case "login":
                navigate('/')
                break
            case "signin":
                navigate('/signin')
                break
            case "forgotPassword":
                navigate('/forgot-password')
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
            <img src={LogoSvg} alt="Logo"/>
        </div>
        {#if currentPage === "login"}
        <div class="FormContent">
            <div class="FormTitle">
                <Heading size="h3">{$t("login")}</Heading>
            </div>
            <div class="FormField">
                <Input onEnterPress={()=>onLogin()} error={submitError['loginError'] ? 'loginError' : null} value={email} onChange={(val) => email = val} title={'emailOrUsername'}/>
            </div>
            <div class="FormField">
                <Input onEnterPress={()=>onLogin()} error={submitError['loginError'] ? 'loginError' : null} value={password} type={"password"} onChange={(val) => password = val} title={'password'}/>
            </div>
            <div class="FormField" style="margin-top:30px">
                <Button type={1} size={"small"} disabled={email === "" || password === ""} label={"validate"} onClick={()=>onLogin()}/>
            </div>
            <div class="FormField">
                <Button type={3} label={"noAccount"} onClick={()=>onSwitchPage("signin")}/>
                <div style="margin-top:10px"><Button type={3} label={"forgottenPassword"} onClick={()=>onSwitchPage("forgotPassword")}/></div>
            </div>
        </div>
        {:else if currentPage === "signin"}
        <div class="FormContent">
            <div class="FormTitle">
                <Heading size="h3">{$t("signin")}</Heading>
            </div>
            <div class="FormField">
                <Input onEnterPress={()=>onSignIn()} error={submitError['usernameAlreadyUse'] ? 'usernameAlreadyUse' : null} value={username} onChange={(val) => username = val} title={'username'}/>
            </div>
            <div class="FormField">
                <Input onEnterPress={()=>onSignIn()} error={submitError["emailAlreadyUse"] ? 'emailAlreadyUse' : null} value={email} type={email} onChange={(val) => email = val} title={'email'}/>
            </div>
            <div class="FormField">
                <Input onEnterPress={()=>onSignIn()} error={submitError["passwordError"] ? 'passwordError' : null} value={password} type={"password"} onChange={(val) => password = val} title={'password'}/>
            </div>
            <div class="FormField">
                <Input onEnterPress={()=>onSignIn()} error={submitError["passwordError"] ? 'passwordError' : null} value={confirmPassword} type={"password"} onChange={(val) => confirmPassword = val} title={'confirmPassword'}/>
            </div>
            <div class="FormField" style="margin-top:30px">
                <Button type={1} size={"small"} disabled={(email === "" || !emailCheck(email)) || password === "" || username === "" || confirmPassword === ""} label={"validate"} onClick={()=>onSignIn()}/>
            </div>
            <div class="FormField">
                <Button type={3} label={"alreadyAccount"} onClick={()=>onSwitchPage("login")}/>
            </div>
        </div>
        {:else if currentPage === "forgotPassword"}
        <div class="FormContent">
            <div class="FormTitle">
                <Heading size="h3">{$t("forgotPassword")}</Heading>
            </div>
            <div class="FormField">
                <Input onEnterPress={()=>onPasswordRequested()} error={submitError["emailDoesntExist"] ? 'emailDoesntExist' : null} value={email} type={email} onChange={(val) => email = val} title={'email'}/>
            </div>
            <div class="FormField" style="margin-top:30px">
                <Button type={1} size={"small"} disabled={email === "" || !emailCheck(email)} label={"validate"} onClick={()=>onPasswordRequested()}/>
            </div>
            <div class="FormField">
                <Button type={3} label={"alreadyAccount"} onClick={()=>onSwitchPage("login")}/>
            </div>
            {#if submitSuccess["emailSent"]}
            <div class="FormField">
                <Body success={'emailSent'}/>
            </div>
            {/if}
        </div>
        {:else if currentPage === "changePassword"}
        <div class="FormContent">
            <div class="FormTitle">
                <Heading size="h3">{$t("changePassword")}</Heading>
            </div>
            <div class="FormField">
                <Input onEnterPress={()=>onChangePassword()} error={submitError["passwordError"] ? 'passwordError' : null} value={password} type={"password"} onChange={(val) => password = val} title={'password'}/>
            </div>
            <div class="FormField">
                <Input onEnterPress={()=>onChangePassword()} error={submitError["passwordError"] ? 'passwordError' : null} value={confirmPassword} type={"password"} onChange={(val) => confirmPassword = val} title={'confirmPassword'}/>
            </div>
            <div class="FormField" style="margin-top:30px">
                <Button type={1} size={"small"} disabled={password === '' || confirmPassword === ''} label={"validate"} onClick={()=>onChangePassword()}/>
            </div>
            {#if submitError["invalidToken"]}
            <div class="FormField">
                <Body error={'invalidToken'}/>
            </div>
            {/if}
        </div>
        {/if}
    </div>
</div>

<style lang="scss">
    .LoginPage{
        width: 100%;
        min-height: 100vh;
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

                img{
                    pointer-events: none;
                }
            }

            .FormContent{
                padding: 40px;
                padding-top: 10px;
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
                    margin-top: 15px;
                }
            }
        }

        @media screen and (max-width:600px){
            .FormContainer{
                width: 100vw;
                border-radius: 0;
                overflow-y: auto;
                // height: 100vh;
                min-height: 100vh;
                align-items: center;
                justify-content: center;
            }
        }
    }

    @media screen and (max-height:760px){
        .LoginPage{
            .FormContainer{
                width: 100vw;
                border-radius: 0;
                overflow-y: auto;
                // height: 100vh;
                min-height: 100vh;
                align-items: center;
                justify-content: center;
            }
        }
    }
</style>