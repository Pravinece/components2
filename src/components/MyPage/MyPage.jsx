import { useState } from 'react'
import TimeOfDayBg from '../TimeOfDayBg/TimeOfDayBg.jsx'
// import TimeOfDayBg, { TIME_PRESETS } from './components/TimeOfDayBg/TimeOfDayBg.jsx'

export default function MyPage() {
  const [time, setTime] = useState('morning')

//   PROMPT
//   Photorealistic interior room photo, shot during golden hour from a slightly low angle.
//   The room has large floor-to-ceiling windows on one side, letting in warm directional sunlight
//   that creates long dramatic light rays cutting through the air, visible as volumetric god rays.
//   Soft dust particles floating in the light beams. The space is spacious with clean modern
//   furniture — one statement piece like a sofa or reading chair positioned near the window.
//   Hardwood or polished floor that reflects subtle light streaks. Walls painted in neutral warm
//   tones — off-white or light grey. A large area rug defines the seating area. Minimalist decor,
//   very uncluttered with at least 40% of the frame intentionally empty to allow text overlay.
//   Shot on Canon EOS R5 with 24-70mm lens, f/8, natural lighting only.
//   Composition leaves clean negative space in the center-right for overlay content.
//   Ultra-detailed, architectural photography style, 8K resolution, cinematic depth of field.

//   ┌──────────────────────────┬─────────────────────────────────────────────────────────────────────────────────────────────┐
//   │ Instead of "room" try... │                             Modify the light description to...                              │
//   ├──────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────┤
//   │ forest                   │ dawn mist filtering through ancient trees, shafts of golden light breaking through canopy   │
//   ├──────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────┤
//   │ mountain landscape       │ sunrise cresting over peaks, alpine glow painting clouds in warm amber and pink tones       │
//   ├──────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────┤
//   │ ocean beach              │ sunset horizon with warm orange sky reflecting on wet sand, long calm waves rolling in      │
//   ├──────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────┤
//   │ city skyline             │ blue hour twilight, city lights beginning to twinkle, purple-to-orange gradient sky above   │
//   ├──────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────┤
//   │ coffee shop              │ cozy evening interior, warm string lights and amber table lamps creating soft pools of glow │
//   ├──────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────┤
//   │ bedroom                  │ morning light through sheer curtains, diffused soft beams across wooden bed frame and rug   │
//   └──────────────────────────┴─────────────────────────────────────────────────────────────────────────────────────────────┘

  return (
    <TimeOfDayBg
      backgroundImage="/roomImage.png"
      time={time}
      onTimeChange={setTime}
      title="Your Title"
      subtitle="Your description text here"
    />
  )
}