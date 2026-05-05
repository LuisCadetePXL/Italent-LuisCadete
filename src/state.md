# Project State: Luis Architectuur - Spatial Evolution V2.0

Dit document is het definitieve manifest en de technische blauwdruk van het portfolio-ecosysteem van Luis Alberto Cadete Rosario.

## 1. De Ruimtelijke Indeling (Layout)

De pagina is opgebouwd als een **feed-forward neuraal netwerk** in een diepe 3D-ruimte. De data en de professionele groei vloeien logisch van **links naar rechts**.

### 1.1 De Vier Strategische Zones
De actieve neuronen zijn verdeeld in vier verticale lagen:
- **Zone 1: Input Layer (Links)**
  - *Voorstelling*: De basis van Luis (Achtergrond en reis).
  - *Persoonlijke Basis*: De fundamenten van discipline (BJJ en Honkbal).
  - *Skill Set*: Opgesplitst in Hard Skills (AI, Robotica, Vue) en Soft Skills (Discipline, Leadership, Empathie).
- **Zone 2: Hidden Layer A (Midden-Links)**
  - *8 Seminaries*: De theoretische verbreding.
  - *Ontwikkeling*: POP-sessies en de groei van student naar professional.
  - *School Projects*: Een aparte hub voor academische realisaties.
- **Zone 3: Hidden Layer B (Midden-RECHTS)**
  - *Kernprojecten*: Studiereis Duitsland, Hackathon #109, SAP AI Innovatieroute.
  - **Centraal Anker**: Het `brain.glb` model zweeft precies in het centrum van deze drie projecten als symbool voor de AI-specialisatie.
- **Zone 4: Output Layer (Rechts)**
  - *Eindreflectie*: De transformatie naar de "Nieuwe Luis".
  - *Contact & Ondernemerschap*: De poort naar de toekomst en netwerken.

### 1.2 Achtergrond & Atmosfeer
- **Decoratieve Ruis**: Een wolk van ~180 kleine, niet-klikbare neuronen zweeft door de ruimte voor visuele diepte, onderling verbonden door ragfijne lijnen.
- **Thema**: *Deep Black & Mint Green*. Een extreem hoog contrast voor een futuristische, tech-focus uitstraling.

## 2. Interactie & Navigatie

- **Vrij bewegen**: Gebruik de muis om de neurale wolk te draaien en in/uit te zoomen (OrbitControls).
- **Selectie**: Klik op een neuraal knooppunt. De camera "vliegt" vloeibaar (via GSAP) naar het neuron toe.
- **Presentation Mode (Pitch Mode)**: Met een druk op de knop wordt de interface geminimaliseerd. Navigatie gebeurt chronologisch via de **Enter-toets**.
- **Neurale Voortgang & Skills Mapping**: De HUD toont een voortgangsbalk (0-100%) en een dynamische X-Factor Radar Chart die evolueert naarmate meer knooppunten worden bezocht.

## 3. Virtual Luis (De Digitale Tweeling)

Rechtsonder bevindt zich de AI-extensie van Luis. Configuratie is vastgelegd in `personality_config.json`.
- **Avatar**: Een grote, interactieve bubble met de `my_avatar.glb`.
- **Karakter**: Professional yet edgy, warm, energetisch.

## 4. Bestandsstructuur & Bronnen

- **`/assets/evidence`**: Map voor bewijsstukken (certificaten, foto's).
- **`personality_config.json`**: Parameters voor de AI-chatbot.
- **Frontend**: Vue 3 (Vite) + TypeScript.
- **3D Engine**: Three.js met Instanced Rendering.
- **Animatie**: GSAP.
- **Data Bronnen**: `bio.md`, `portfolio.md`, `state.md`.

---
*Status Update door Gemini CLI - Luis Neural Architecture Spatial Evolution V2.0 Live*