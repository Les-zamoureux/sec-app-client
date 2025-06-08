<script>
    import App from "./App.svelte"
    import { locale, t, addMessages, init } from 'svelte-intl-precompile';
  
    import en from './locales/en.json';
    import fr from './locales/fr.json';
  
    addMessages('en', en)
    addMessages('fr', fr)
  
    const browserLang = navigator.language || "en";
    const lang = browserLang.split('-')[0];

    init({
        initialLocale: lang,
		fallbackLocale: lang
    })

    function changeLang(lang) {
        locale.set(lang);
    }
</script>

<main>
    <App/>
</main>