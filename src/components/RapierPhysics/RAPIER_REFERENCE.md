# React Three Rapier - Quick Reference

## `<Physics>` Props

| Prop | What it does |
|------|-------------|
| `gravity={[x, y, z]}` | Direction and strength of gravity. `[0, -9.81, 0]` = real-world Earth gravity pulling down. `[0, 0, 0]` = zero gravity (space) |
| `debug` | Shows wireframe collider outlines — essential during development to see collision shapes |
| `timeStep={1/60}` | Physics simulation step rate. Default `1/60`. Use `"vary"` to sync with frame rate |
| `paused={true}` | Freezes the entire physics world — useful for pause menus |
| `interpolate={true}` | Smooths rendering between physics steps (default true). Prevents jittery movement |
| `maxStabilizationIterations={1}` | How hard the solver tries to prevent overlap. Higher = more stable but slower |
| `maxVelocityIterations={4}` | Accuracy of velocity solving. Higher = more accurate collisions |

---

## What is `RigidBody`?

A `RigidBody` is a physics-enabled wrapper. Any mesh inside it becomes a physical object that can:
- Fall with gravity
- Collide with other rigid bodies
- Be pushed, thrown, or moved

Without `RigidBody`, a mesh is just visual — it has no physics. Think of it as giving a 3D object a "physical body" in the simulation.

### Three types:

| Type | Use case |
|------|----------|
| `type="dynamic"` (default) | Affected by gravity and forces (player, falling boxes) |
| `type="fixed"` | Never moves, other things collide with it (floor, walls) |
| `type="kinematicPosition"` | You control its position manually, it pushes dynamic bodies (moving platforms, elevators) |

---

## RigidBody Props Explained

```jsx
<RigidBody
  ref={rigidRef}
  // ↑ Ref to access the physics API imperatively
  //   rigidRef.current.setLinvel() — set velocity
  //   rigidRef.current.applyImpulse() — push it
  //   rigidRef.current.translation() — get position

  position={[0, 2, 0]}
  // ↑ Starting position [x, y, z]. Y=2 means spawn 2 units above ground
  //   so it drops onto the floor (proves gravity works)

  enabledRotations={[false, false, false]}
  // ↑ Lock rotation on [x, y, z] axes
  //   All false = character won't tip over when hitting walls
  //   Without this, your player would tumble like a box

  colliders="cuboid"
  // ↑ Auto-generates a box-shaped collider around the mesh
  //   Options:
  //   "cuboid"   — box (good for crates, walls)
  //   "ball"     — sphere (good for balls)
  //   "hull"     — convex wrap around the mesh (good for simple shapes)
  //   "trimesh"  — exact mesh shape (accurate but expensive, only for fixed bodies)
  //   false      — no auto collider, you add your own manually

  mass={1}
  // ↑ How heavy the object is. Heavier = harder to push
  //   mass=1 is light, mass=100 is heavy

  friction={1}
  // ↑ How grippy the surface is (0 = ice, 1 = rubber)
  //   Affects sliding when walking on floor or hitting walls
/>
```

---

## Other Useful RigidBody Props

| Prop | What it does |
|------|-------------|
| `restitution={0.5}` | Bounciness. `0` = no bounce, `1` = full bounce like a rubber ball |
| `linearDamping={0.5}` | Air resistance for movement. Higher = stops faster after force is removed. Good for making player feel less "slidey" |
| `angularDamping={0.5}` | Air resistance for rotation. Higher = stops spinning faster |
| `gravityScale={0}` | Per-body gravity multiplier. `0` = floats, `2` = double gravity, `-1` = falls upward |
| `ccd={true}` | Continuous Collision Detection. Prevents fast objects from passing through walls (bullets, fast player) |
| `lockTranslations={true}` | Freezes all position movement. Object can still rotate |
| `enabledTranslations={[true, true, false]}` | Lock movement per axis. `[true, true, false]` = can't move on Z |
| `sensor={true}` | Detects overlap but doesn't block. Like a trigger zone (checkpoints, damage areas) |
| `onCollisionEnter={(e) => {}}` | Callback when something hits this body |
| `onCollisionExit={(e) => {}}` | Callback when collision ends |

---

## Examples

### Bouncy Ball

```jsx
<RigidBody restitution={1} mass={0.5} colliders="ball">
  <mesh>
    <sphereGeometry />
    <meshStandardMaterial color="red" />
  </mesh>
</RigidBody>
```

### Heavy Crate (barely moves when hit)

```jsx
<RigidBody mass={50} friction={1} restitution={0} colliders="cuboid">
  <mesh>
    <boxGeometry />
    <meshStandardMaterial color="brown" />
  </mesh>
</RigidBody>
```

### Trigger Zone (no physical blocking)

```jsx
<RigidBody sensor onCollisionEnter={() => console.log("entered zone!")}>
  <mesh>
    <boxGeometry args={[5, 5, 5]} />
    <meshStandardMaterial transparent opacity={0.2} />
  </mesh>
</RigidBody>
```

---

## Useful Ref Methods

```js
const rigidRef = useRef();

// Set velocity directly
rigidRef.current.setLinvel({ x: 0, y: 5, z: 0 }, true);

// Apply a one-time push
rigidRef.current.applyImpulse({ x: 10, y: 0, z: 0 }, true);

// Get current position
const pos = rigidRef.current.translation(); // { x, y, z }

// Get current velocity
const vel = rigidRef.current.linvel(); // { x, y, z }

// Teleport (reset position)
rigidRef.current.setTranslation({ x: 0, y: 5, z: 0 }, true);

// Reset all forces and velocity
rigidRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
rigidRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
```
