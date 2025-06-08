import { mount } from 'svelte'
import './app.css'
import Index from './Index.svelte'

const app = mount(Index, {
  target: document.getElementById('app'),
})

export default app
