import { StrictMode } from 'react'
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Canvasss /> */}
    {/* <SplitImage /> */}
    {/* <Icon /> */}
    {/* <CardSplit  /> */}
    {/* <CardList /> */}
    {/* <GlbAnimate /> */}
    {/* <Hero /> */} 
    {/* <PremiunmHero /> */}
    {/* <Bee /> */}
    {/* <ClipPath /> */}
    {/* <TextAnim /> */}
    <SVGSplit />
  </StrictMode>,
)