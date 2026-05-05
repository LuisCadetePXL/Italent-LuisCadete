# Project State: Luis Architectuur - Spatial Neural Experience

Dit document is het technisch manifest en de handleiding voor de "Luis Architectuur", de definitieve upgrade van het I-Talent portfolio van Luis Alberto Cadete Rosario. Versie 3.0 is getransformeerd naar een volledig roterend en zoombaar 3D neuraal netwerk.

## 1. Concept & Visie: De Luis Architectuur
**Thema:** "Luis - De Digitale Neurale Hub"
De website is niet langer alleen een presentatie, maar een ruimtelijke ervaring die Luis' identiteit als architect en innovator weerspiegelt.

- **Navigatie:** Gebruikers hebben volledige vrijheid via `OrbitControls`. Het netwerk kan gedraaid, gesleept en gezoomd worden voor een 360-graden perspectief.
- **Centraal Anker:** Het 3D brein (`brain.glb`) staat precies in het midden als de bron van alle neurale impulsen.
- **Visuele Stijl:** Diepzwart (`#000000`) gecombineerd met hoog contrast wit en de kenmerkende **Muntgroene** accentkleur (`#00ffcc`).

## 2. Technische Stack
- **Frontend Framework:** Vue 3 (Composition API) met Vite.
- **3D Engine:** Three.js met **InstancedMesh** voor GPU-optimalisatie.
- **Animatie Engine:** **GSAP** voor vloeibare camera-navigatie en transities naar specifieke neuronen.
- **Styling:** TailwindCSS 4.0 met geavanceerde Glassmorphism (pure black overlays met 40px blur).
- **AI/Spraak:** Web Speech API voor STT & TTS.

## 3. Kerncomponenten & Performance

### 3.1 NeuralGrowthEngine.vue (Optimized Space)
- **InstancedMesh:** De statische neuronenwolk (500+ deeltjes) wordt gerenderd via instancing, waardoor draw calls tot een minimum worden beperkt en de GPU wordt ontlast.
- **Active Neurons:** De belangrijkste knooppunten pulseren dynamisch met GSAP en hebben zwevende labels die altijd leesbaar blijven.
- **Orbit Experience:** Volledige rotatie-vrijheid met gedempte beweging (`enableDamping`) voor een premium gevoel.

### 3.2 Chatbot.vue (Virtual Luis)
- **Identiteit:** Geen assistent, maar een digitale extensie van Luis zelf. De AI praat direct en "to-the-point" met een kalme mentaliteit.
- **UI Integratie:** De 3D avatar van Luis is visueel geïntegreerd en lijkt half uit de zijkant van de interface te komen, wat de diepte van de Spatial UI benadrukt.
- **RAG Systeem:** Gebruikt `bio.md` en `state.md` als exclusieve bronnen om feitelijke antwoorden te geven over Luis' geschiedenis en de systeemarchitectuur.

### 3.3 Navigatie & Modals
- **Heads-Up Display:** Een minimalistische HUD die de navigatie en de status van de "Spatial Neural Experience" toont.
- **Neural Modals:** Content-vensters met een diepe zwarte glassmorphism look, ontworpen voor maximale leesbaarheid bovenop de 3D-achtergrond.

## 4. Netwerk Structuur (De Neuronen)

1.  **BRAIN CORE (Anker):** Het startpunt en het visuele hart.
2.  **VOORSTELLING:** De reis van Spanje via de Dominicaanse Republiek naar België.
3.  **OVERZICHT:** Seminaries en trajecten in een modern grid.
4.  **SELECTIE:** Diepe duiken in de Studiereis, Hackathon en SAP AI.
5.  **REFLECTIE:** De X-Factor en toekomstvisie.
6.  **STABILITEIT (BJJ/Honkbal):** De discipline en teamgeest achter de architect.
7.  **CONTACT HUB:** Directe toegang tot LinkedIn, GitHub en de Neural CV download.

## 5. Contact & Locatie
- **Naam:** Luis Alberto Cadete Rosario
- **Locatie:** Leopoldsburg 3970, België
- **Contact:** +32466252507 | lluisalberto24@gmail.com
- **Call to Action:** Een geanimeerde CV-downloadknop in de kenmerkende neurale stijl.

## 6. Onderhoud
- **Content:** Update `.vue` bestanden in `src/views/` voor tekstuele wijzigingen.
- **AI Knowledge:** De chatbot haalt data uit `bio.md` en `state.md`; houd deze actueel voor accurate AI-antwoorden.
- **Deployment:** `npm run build` genereert de geoptimaliseerde `dist/` map.

---
*Gegenereerd door Gemini CLI - Luis Architectuur Update - Mei 2026*
