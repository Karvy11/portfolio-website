/* ================================================================
   projects.js — YOUR PROJECT DATA FILE
   ================================================================
   HOW TO ADD A NEW PROJECT:
   Copy one of the objects below, paste it at the end of the array
   (before the closing ]), fill in your details, save.
   That's it — the site updates automatically.

   FIELDS:
   id          — unique short string, no spaces (used internally)
   title       — project name shown on card and modal
   category    — one of: "game" | "xr" | "system" | "prototype" | "other"
   badge       — short tag shown on card e.g. "VR", "AR", "2D", "Unity"
   description — 1–2 sentences shown on the card
   thumbnail   — path to image OR null for auto gradient placeholder
                 e.g. "images/my-project.jpg"
   thumbnailFit — how the thumbnail fills the card:
                 "cover"   → zoom to fill (default, good for landscape screenshots)
                 "contain" → show full image with dark bars (good for portrait/mobile screenshots)
   detail      — shown inside the modal when user clicks the card:
     .longDesc   — longer description paragraph(s) (HTML allowed)
     .tech       — array of tech stack strings
     .media      — array of media items, each is one of:
                   { type:"youtube", url:"https://youtu.be/..." }
                   { type:"vimeo",   url:"https://vimeo.com/..." }
                   { type:"video",   url:"video.mp4" }
                   { type:"image",   url:"images/screenshot.jpg" }
                   { type:"image",   url:"images/mobile-screen.jpg", fit:"contain" }
                     ↑ add  fit:"contain"  for portrait/mobile screenshots
                     ↑ omit fit (or use fit:"cover") for normal landscape images
     .links      — array of { label:"GitHub", url:"https://..." }
================================================================ */

const PROJECTS = [
  /* ── PROJECT 1 ──────────────────────────────────────────────
     UPDATE: Replace everything below with your real project info
  ──────────────────────────────────────────────────────────── */
  {
    id: "solitary-island",
    title: "Solitary Island",
    category: "game",
    badge: "PC Game",
    description:
      "A third-person survival horror prototype inspired by Alan Wake, built around torch-based combat, cinematic cutscenes, and a boss fight encounter in a dark island forest.",
    thumbnail: "Assets/Projects/Solitary Island/SolitaryIsland.png",
    detail: {
      longDesc: `
      <p><span class="hl-dim">Gameplay</span></p>

      <p>Solitary Island is a third-person survival horror prototype <em>inspired by the mood and light-based combat style of Alan Wake</em>. The game places the player on a dark isolated island at night, surrounded by trees, fog, and low visibility. The main focus is not on weapons or shooting, but on using light as the core survival mechanic.</p>

      <p>The player faces a boss enemy in a night forest encounter where the only weapon is a torch. Aiming the torch directly at the enemy weakens it, stuns it, and gradually damages it. The mechanic creates a simple but tense loop — keep distance, aim the light properly, manage positioning, and avoid getting caught while the enemy pushes forward.</p>

      <p><strong>The main idea was to recreate a cinematic horror combat mechanic where light itself becomes the weapon.</strong> Instead of building a large game, this project focuses on capturing one strong gameplay feeling: vulnerability, pressure, and survival against a powerful enemy in a dark environment.</p>

      <p>The game also includes a small cutscene setup to introduce the mood and flow before gameplay begins. The scene uses camera movement, character placement, lighting, and timing to create a more cinematic experience rather than starting directly with combat.</p>

      <p>Visually, the project uses <em>a dark blue night atmosphere</em> with moonlight, forest silhouettes, a campfire/menu scene, and a glowing torch beam cutting through the darkness. The environment is designed to support the horror tone and make the torch feel important both visually and mechanically.</p>

      <p><span class="hl-dim">Under the Hood</span></p>

      <div class="desc-callout">The torch is not just a visual effect — it works as the primary combat system for stun and damage detection.</div>

      <p>The project helped me explore Unity's cinematic tools, especially <code>Timeline</code>, for creating a cutscene-driven opening sequence. Camera transitions, character positioning, and scene timing were handled through timeline tracks to understand how gameplay and cinematic presentation can be connected inside Unity.</p>

      <p>The torch combat system is built around directional aiming and enemy detection. When the player aims the torch at the boss, the system checks whether the enemy is inside the torch's effective range and direction. If the light stays focused on the enemy, it applies stun and damage over time. This keeps the mechanic readable for the player while still feeling connected to the visual beam.</p>

      <p><strong>The enemy encounter is separated into clear gameplay responsibilities</strong> — player movement, torch aiming, enemy health, stun behaviour, and game state are handled independently instead of being written as one large script. This makes the prototype easier to expand with more enemies, different torch types, or additional survival mechanics later.</p>

      <p>The boss behaviour is designed as a simple encounter system where the enemy can approach, react to light, take damage, and remain dangerous if the player fails to keep control. Health UI, torch feedback, and enemy response are connected through gameplay events, keeping the core loop simple but scalable.</p>

      <p>For structure, systems like <code>GameManager</code>, player controller, torch controller, and enemy health logic are kept separate. This keeps the code clean and makes the project suitable for future expansion, such as adding multiple enemy types, battery management, stronger cinematic sequences, or level-based progression.</p>
    `,
      tech: [
        "Unity",
        "C#",
        "Timeline",
        "Cinemachine",
        "Third-Person Controller",
        "AI Enemy",
        "Light-based Combat",
        "Boss Fight",
      ],
      media: [
        {
          type: "image",
          url: "Assets/Projects/Solitary Island/SolitaryIsland.png",
          fit: "cover",
        },
        {
          type: "youtube",
          url: "https://youtu.be/fS3VrvgSh80",
          fit: "contain",
        },
      ],
      links: [],
    },
  },
  {
    id: "sky-hop",
    title: "Sky Hop",
    category: "game",
    badge: "3D Hypercasual Game",
    description:
      "A vertical arcade platformer where you tap to spawn platforms for an octopus to climb. Timing is everything — mistimed taps send you flying. Built in Unity with original 3D assets.",
    thumbnail: "Assets/Projects/Skyhop/SkyhopThumbnail.png",
    detail: {
      longDesc: `
  <p><span class="hl-dim">Gameplay</span></p>

  <p>Sky Hop is a vertical arcade platformer built around a single mechanic that flips 
  the usual formula — <em>you don't control the character, you control the platforms.</em> 
  An octopus automatically jumps onto any platform that appears directly beneath it. 
  Platforms alternate between the left and right side of the screen, and a single tap 
  brings the next one to center. The octopus does the rest — but only if your timing 
  is right.</p>

  <p><strong>Tap too early or too late and the platform arrives while the octopus is 
  mid-air or overlapping from the side — instead of landing on top, it gets knocked 
  clean off the screen.</strong> That collision risk is the entire game. The higher you 
  climb, the higher your score, with no level cap — survival is the only measure of success.</p>

  <p>Power-ups are scattered across the climb to give the player tools when things get 
  tight — ghost mode to phase through a bad collision, high-jump boosts to clear a 
  difficult gap, and a size deform that shrinks the player's collision footprint, turning 
  a near-miss into a safe land. Each one changes how you approach the next few platforms.</p>

  <p>Built with <em>a stylised sky-and-ocean aesthetic</em> — a deep purple gradient sky, 
  layered floating clouds, and chunky teal platform blocks rising up from open water below. 
  All assets are original and built for this project.</p>

  <p><span class="hl-dim">Under the Hood</span></p>

  <div class="desc-callout">Collision is split by surface — top contact triggers the auto-jump, side contact triggers the knockoff. The game always knows whose fault it was.</div>

  <p>Each platform has two separate collider zones — one on the top surface for landing 
  and one on the sides for knockoff detection. This makes the timing risk feel fair and 
  readable rather than arbitrary. The spawner tracks platform position relative to the 
  player at all times, managing the left-right alternation and centering logic independently 
  of the player controller.</p>

  <p><strong>Power-ups use a component-based effect system</strong> — each effect is 
  self-contained, stackable, and time-limited. A <code>PowerUpHandler</code> on the player 
  applies and expires active effects independently, keeping the system open for new 
  additions without modifying existing code. The <code>GameManager</code> owns the session 
  state, score tracking, and reset flow — keeping game logic centralised and the player 
  controller focused only on movement and collision response.</p>
`,
      tech: [
        "Unity",
        "C#",
        "Android",
        "3D Modeling",
        "Mobile Input",
        "Trigger Collision",
      ],
      media: [
        {
          type: "image",
          url: "Assets/Projects/Skyhop/SkyhopThumbnail.png",
          fit: "cover",
        },
        {
          type: "youtube",
          url: "https://youtube.com/shorts/K7uM-O5WjZk",
          fit: "contain",
        },
      ],
      links: [],
    },
  },
  {
    id: "cannon-blitz",
    title: "Cannon Blitz",
    category: "game",
    badge: "2D Hypercasual Game",
    description:
      "A fast-paced arcade shooter inspired by the ball-blast genre. Swipe to aim, blast falling blocks, survive as long as possible. Built in Unity with original assets, object pooling, and a scalable power-up system.",
    thumbnail: "Assets/Projects/CannonBlitz/CannonBlitz.png",
    detail: {
      longDesc: `
  <p><span class="hl-dim">Gameplay</span></p>

  <p>Cannon Blitz is a mobile arcade game <em>inspired by the ball-blast genre</em>, 
  rebuilt from scratch with original assets and mechanics. A cannon sits at the bottom 
  of the screen — swipe left or right to aim, and it fires automatically. Blocks fall 
  from above with their remaining health displayed on them. Hit them enough times and 
  they shatter. Let one reach the ground and the run ends.</p>

  <p>As the game progresses, blocks fall faster, spawn more frequently, and arrive with 
  higher health values — the pressure compounds gradually until surviving becomes the 
  only objective. Power-ups drop mid-game to shift the balance: bullet speed boosts for 
  rapid-fire bursts, multi-shot spreads for hitting multiple blocks at once, and a shield 
  to absorb one hit you couldn't avoid in time.</p>

  <p>Visually the game has <em>a stylised dusk-to-night aesthetic</em> — silhouette pine 
  trees against rolling hills, a large glowing moon on the horizon, and a deep purple 
  starfield overhead. Every asset in the game is original, built specifically for this project.</p>

  <p><span class="hl-dim">Under the Hood</span></p>

  <div class="desc-callout">Zero runtime instantiation during gameplay — bullets and blocks run entirely through an object pool.</div>

  <p>Both bullets and blocks are managed through an object pooling system, eliminating 
  garbage collection spikes and keeping performance stable on mid-range Android devices. 
  A wave-based difficulty scaler controls spawn rate, block health, and fall speed over 
  time — all driven by a central <code>GameManager</code> that owns the game state machine 
  and session lifecycle.</p>

  <p><strong>Power-ups are built as a ScriptableObject-driven system</strong> — each 
  power-up is a self-contained asset defining its type, duration, and effect. A 
  <code>PowerUpHandler</code> component on the player stacks active effects and expires 
  them independently, meaning a new power-up can be added without touching any existing 
  logic. Collision between bullets and blocks uses Unity's trigger system with 
  <span class="hl">layer-based filtering</span> to avoid unnecessary physics checks. 
  Swipe input is handled through a dedicated input component, fully decoupled from the 
  cannon's movement and fire behaviour.</p>
`,
      tech: [
        "Unity",
        "C#",
        "Android",
        "Object Pooling",
        "ScriptableObjects",
        "State Machine",
        "Mobile Input",
        "Trigger-based Collision",
      ],
      media: [
        {
          type: "image",
          url: "Assets/Projects/CannonBlitz/CannonBlitz.png",
          fit: "cover",
        },
        {
          type: "youtube",
          url: "https://youtube.com/shorts/K_a3PiB0S5A?feature=share",
          fit: "contain",
        },
      ],
      links: [],
    },
  },
  {
    id: "flip-the-gun",
    title: "Flip The Gun",
    category: "game",
    badge: "2D Game",
    description:
      "A physics-driven arcade game where recoil is your only means of movement. Fire to push the gun upward, rotate mid-air, and survive as long as possible without running out of bullets.",
    thumbnail: "Assets/Projects/FlipTheGun/FlipTheGun.png",
    detail: {
      longDesc: `
      <p><span class="hl-dim">Gameplay</span></p>

      <p>Flip The Gun is a mobile arcade game built around one of the most satisfying 
      physics concepts in mobile gaming — <em>recoil as locomotion.</em> The gun rotates 
      freely in the air. When the barrel points downward and you fire, the recoil launches 
      it upward. The direction it faces when you shoot determines where it goes — aim wrong 
      and you drift into a wall or lose altitude fast.</p>

      <p>The challenge compounds through three things working against you simultaneously: 
      gravity pulling the gun down, red block obstacles scattered across the play area that 
      end the run on contact, and a limited bullet count that acts as a ticking clock. 
      <strong>Run out of bullets and the gun falls — so keeping yourself airborne and 
      collecting refills is as important as dodging obstacles.</strong></p>

      <p>Coins are scattered throughout the run to collect for score, alongside power-ups 
      that drop mid-game — boosts that give you a burst of upward momentum, bullet refills 
      to extend your run, and a handful of others that shift the dynamic just when the 
      pressure peaks. The longer you survive and the higher you climb, the higher your score.</p>

      <p>Built with <em>a minimal dark aesthetic</em> — glowing green bullets, spark burst 
      effects on fire, and gold coins against a stark black background. The visual language 
      keeps focus entirely on movement and timing.</p>

      <p><span class="hl-dim">Under the Hood</span></p>

      <div class="desc-callout">Movement is entirely physics-driven — there is no direct player input for direction, only the timing of each shot.</div>

      <p>The gun's movement is driven by Unity's Rigidbody2D — no manual velocity control, 
      just physics forces applied at the barrel's direction on each shot. Rotation is 
      continuous and free, which means the player reads the gun's current angle and decides 
      when to fire. The recoil force vector is calculated from the barrel's world-space 
      direction at the moment of firing, making every shot feel physically grounded.</p>

      <p><strong>Bullet count is tracked as a core resource</strong> rather than a simple 
      UI element — when it hits zero, the game doesn't end immediately, but the gun loses 
      its only means of upward thrust and gravity takes over. Refill pickups and power-ups 
      are spawned through a pooled object system, with a <code>PickupHandler</code> managing 
      collection detection and effect dispatch. The <code>GameManager</code> owns score 
      tracking, session state, and the run reset flow — keeping the gun controller focused 
      purely on physics and firing logic.</p>
    `,
      tech: [
        "Unity",
        "C#",
        "Android",
        "Rigidbody2D",
        "Physics-based Movement",
        "Object Pooling",
      ],
      media: [
        {
          type: "image",
          url: "Assets/Projects/FlipTheGun/FlipTheGun.png",
          fit: "cover",
        },
        {
          type: "youtube",
          url: "https://youtube.com/shorts/WO1LD_VRHi4?feature=share",
          fit: "contain",
        },
      ],
      links: [],
    },
  },

  //   {
  //     id: "qwr-navigator",
  //     title: "QWR XR Navigator",
  //     category: "xr",
  //     badge: "OpenXR",
  //     description:
  //       "Dual-app system — Unity XR app + Flutter companion over WiFi. Custom A* pathfinding with clearance-based routing and real-time obstacle avoidance.",
  //     thumbnail: null, // UPDATE: "images/qwr-thumb.jpg"
  //     detail: {
  //       longDesc: `
  //         A technical assignment for QWR (Question What's Real) — two interconnected apps built
  //         from scratch. The Unity XR side uses OpenXR standards and implements a custom
  //         A* pathfinding engine with OBB-based obstacle registration and clearance-based routing.
  //         The Flutter companion app renders a real-time minimap driven by UDP state broadcasts
  //         from Unity, with Bluetooth stubbed for future expansion.
  //       `,
  //       tech: [
  //         "Unity",
  //         "OpenXR",
  //         "C#",
  //         "Flutter",
  //         "Dart",
  //         "WiFi UDP",
  //         "A* Pathfinding",
  //         "OBB Collision",
  //       ],
  //       media: [
  //         {
  //           type: "youtube",
  //           url: "https://youtu.be/a1MRYzS8m8w",
  //           fit: "contain",
  //         },
  //         { type: "image", url: "assets/projects/Runner2.jpeg", fit: "contain" },
  //       ],
  //       links: [
  //         // UPDATE: Add your repo/demo links
  //         // { label: "GitHub", url: "https://github.com/..." },
  //         // { label: "Demo",   url: "https://..." }
  //       ],
  //     },
  //   },

  //   /* ── PROJECT 2 ──────────────────────────────────────────────
  //      UPDATE: Your HoloLens / MRTK project
  //   ──────────────────────────────────────────────────────────── */
  //   {
  //     id: "hololens-project",
  //     title: "[ HoloLens Project ]", // UPDATE
  //     category: "xr",
  //     badge: "AR",
  //     description:
  //       "Mixed-reality enterprise application built with MRTK on HoloLens 2. Spatial interaction and hand-tracking driven UI.", // UPDATE
  //     thumbnail: null, // UPDATE: "images/hololens-thumb.jpg"
  //     detail: {
  //       longDesc: `UPDATE: Write a longer description of your HoloLens project here.
  //         What does it do? Who is it for? What was technically interesting about it?`,
  //       tech: ["Unity", "HoloLens 2", "MRTK", "C#", "AR Foundation"], // UPDATE
  //       media: [],
  //       links: [],
  //     },
  //   },

  //   /* ── PROJECT 3 ──────────────────────────────────────────────
  //      UPDATE: Your Meta Quest app
  //   ──────────────────────────────────────────────────────────── */
  //   {
  //     id: "quest-app",
  //     title: "[ Meta Quest App ]", // UPDATE
  //     category: "xr",
  //     badge: "VR",
  //     description:
  //       "Immersive VR experience built for Meta Quest using the XR Interaction Toolkit. Hand presence, locomotion, and interactive object systems.", // UPDATE
  //     thumbnail: null,
  //     detail: {
  //       longDesc: `UPDATE: Describe your Quest project. What kind of experience?
  //         What interaction paradigm? Any custom locomotion or physics work?`,
  //       tech: ["Unity", "Meta Quest", "XR Interaction Toolkit", "OpenXR", "C#"], // UPDATE
  //       media: [],
  //       links: [],
  //     },
  //   },

  //   /* ── PROJECT 4 ──────────────────────────────────────────────
  //      UPDATE: A Unity game
  //   ──────────────────────────────────────────────────────────── */
  //   {
  //     id: "unity-game",
  //     title: "[ Your Game Title ]", // UPDATE
  //     category: "game",
  //     badge: "Game",
  //     description:
  //       "UPDATE: Genre, platform, and what makes this game mechanically interesting. One or two sharp sentences.",
  //     thumbnail: null,
  //     detail: {
  //       longDesc: `UPDATE: Tell the story of this game. What's the core loop?
  //         What did you build custom — AI, physics, procedural generation, shaders?`,
  //       tech: ["Unity", "C#"], // UPDATE: add your actual tools
  //       media: [],
  //       links: [
  //         // { label: "itch.io", url: "https://itch.io/..." },
  //         // { label: "GitHub",  url: "https://github.com/..." }
  //       ],
  //     },
  //   },

  //   /* ── PROJECT 5 ──────────────────────────────────────────────
  //      UPDATE: A system / tool / algorithm
  //   ──────────────────────────────────────────────────────────── */
  {
    id: "pathfinding-system",
    title: "Clearance-Based A* Pathfinder", // UPDATE
    category: "system",
    badge: "System",
    description:
      "Custom A* implementation with OBB obstacle registration, dynamic path revalidation, and agent clearance radius support built in Unity.",
    thumbnail: null,
    detail: {
      longDesc: `A standalone pathfinding module written in C# for Unity.
          Uses oriented bounding boxes (OBB) to register obstacles at runtime,
          computes clearance values per node, and continuously revalidates paths
          as the scene changes.`,
      tech: ["C#", "Unity", "A*", "OBB", "Spatial Partitioning"],
      media: [],
      links: [],
    },
  },

  //   /* ── PROJECT 6 ──────────────────────────────────────────────
  //      UPDATE: A prototype / jam project
  //   ──────────────────────────────────────────────────────────── */
  //   {
  //     id: "prototype-1",
  //     title: "[ Game Jam / Prototype ]", // UPDATE
  //     category: "prototype",
  //     badge: "Prototype",
  //     description:
  //       "UPDATE: What was the jam theme? What did you build in how many hours? What was the experiment?",
  //     thumbnail: null,
  //     detail: {
  //       longDesc: `UPDATE: Brief story of the jam or prototype sprint.
  //         What you tried, what worked, what you'd do differently.`,
  //       tech: ["Unity", "C#"], // UPDATE
  //       media: [],
  //       links: [],
  //     },
  //   },
];
/* ── ADD NEW PROJECTS ABOVE THIS LINE ────────────────────────── */
