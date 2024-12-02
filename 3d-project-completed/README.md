# 3D Mob Survival Game

## Game Overview
A fast-paced 3D survival game where the player must avoid and eliminate incoming mobs while collecting points.

## Game Design Document (GDD)

### 1. Core Gameplay
- **Genre**: Survival, Action
- **Perspective**: Third-person 3D
- **Objective**: Survive as long as possible and achieve the highest score by defeating mobs

### 2. Game Mechanics
- **Player Movement**: 
  - WASD or Arrow Keys for movement
  - Ability to dodge and evade incoming mobs
- **Scoring System**:
  - Points are earned by defeating mobs
  - Score is displayed on-screen and updates in real-time
- **Mob Spawning**:
  - Mobs spawn dynamically in the game world
  - Each defeated mob triggers a smoke puff effect
- **Fail Condition**:
  - Touching the "kill plane" resets the current scene
  - Player must restart the game upon failure

### 3. Technical Details
- **Engine**: Godot (version 5.x)
- **Programming Language**: GDScript
- **Project Structure Detailed Analysis**:

#### Player Directory (`/player`)
- **Core Components**:
  - `player_controller.gd`: Player movement and interaction logic
    - First-person camera control
    - WASD/Arrow key movement
    - Mouse look implementation
    - Gravity and jumping mechanics
  - `gun.gd`: Weapon handling script
  - `bullet_3d.gd`: Projectile management
  - **Key Features**:
    - Mouse capture and camera rotation
    - Clamped vertical camera angle (-80 to 80 degrees)
    - Shooting mechanism with recoil simulation
    - Physics-based movement with gravity

#### Mob Directory (`/mob`)
- **Core Components**:
  - `mob.gd`: Mob behavior and interaction script
    - Dynamic speed generation (2-4 units)
    - Health system (3 hit points)
    - Player tracking AI
  - `spawner_3d.gd`: Mob spawning logic
  - **Key Features**:
    - Procedural speed variation
    - Directional movement towards player
    - Dynamic audio pitch for damage sounds
    - Physics-based death animation
    - Signal-based death event system

#### Level Directory (`/level`)
- **Environment Assets**:
  - `temporary_level.tscn`: Primary game scene
  - Texture assets:
    - `checkboard.png`: Level texture
  - Material resources:
    - `bridges.tres`
    - `platforms.tres`

#### Addons Directory
- Contains additional Godot engine extensions and custom plugins

#### Core Game Mechanics
- **Movement System**:
  - Physics-based character controller
  - Smooth interpolation between states
  - Gravity and jumping simulation
- **Combat System**:
  - Projectile-based shooting
  - Mob health and damage tracking
  - Dynamic mob behavior

#### Performance Considerations
- Lightweight GDScript implementation
- Efficient physics calculations
- Minimal state management overhead

#### Input Handling
- Captured mouse input
- WASD/Arrow key movement
- Jump and shoot actions
- Pause menu integration

#### Audio Design
- Positional sound effects
- Pitch variation for immersion
- Sound cues for actions (shooting, mob damage)

#### Rendering and Graphics
- 3D rendering with basic lighting
- Simple particle effects (smoke puffs)
- Minimalist art style
- Performance-optimized scene management

### 4. Current Features
- Dynamic mob spawning
- Score tracking
- Smoke effect on mob defeat
- Scene reset on failure

### 5. Roadmap
#### Short-term Goals
- [ ] Implement difficulty progression
- [ ] Add more variety of mobs
- [ ] Create power-up system
- [ ] Enhance visual effects

#### Long-term Goals
- [ ] Implement persistent high score
- [ ] Add multiple levels
- [ ] Create character customization
- [ ] Develop advanced AI for mobs

## Setup and Installation
1. Ensure Godot 5.x is installed
2. Clone the repository
3. Open the project in Godot
4. Press F5 or click "Play" to start the game

## Controls
- **Move Left**: A or Left Arrow
- **Move Right**: D or Right Arrow
- **Move Forward**: W or Up Arrow
- **Move Backward**: S or Down Arrow

## Contributing
Contributions are welcome! Please read the contributing guidelines before submitting pull requests.

## License
[Specify your license here]

## Credits
[Add credits for developers, artists, and any third-party assets]
