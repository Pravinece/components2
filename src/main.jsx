import { Profiler, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PhysicsScene from './components/RapierPhysics/PhysicsScene.jsx'
import Canvasss from './components/Canvas/Canvasss.jsx'
import SplitImage from './components/SplitImage.jsx'
import Icon from './Icon.jsx'
import CardSplit from './CardSplit.jsx'
import CardList from './components/CardList.jsx'
import GlbAnimate from './components/GlbAnimate/GlbAnimate.jsx'
import Bee from './Bee/Bee.jsx'
import ClipPath from './components/ClipPath/ClipPath.jsx'
import TextAnim from './components/TextAnim/TextAnim.jsx'
import SVGSplit from './components/SVGSplit/SVGSplit.jsx'
import Hero from './components/3JsHoverTransition/Hero.jsx'
import AnthropicCard from './components/AnthropicCard/AnthropicCard.jsx'
import ScrollCard from './components/ScrollCard/ScrollCard.jsx'
import DayLightEffect from './components/DayLightEffect/DayLightEffect.jsx'

createRoot(document.getElementById('root')).render(
  <>
    {/* <App /> */}
    {/* <Canvasss /> */}
    {/* <SplitImage /> */}
    {/* <Icon /> */}
    {/* <CardSplit  /> */}
    {/* <CardList /> */}
    {/* <GlbAnimate /> */}
    {/* <Hero />  */}
    {/* <PremiunmHero /> */}
    {/* <Bee /> */}
    {/* <ClipPath /> */}
    {/* <TextAnim /> */}
    {/* <SVGSplit /> */}
    {/* <AnthropicCard /> */}
    {/* <Profiler id="ScrollCard" >
    <ScrollCard />
    </Profiler> */}
    <DayLightEffect />
  </>,
)