# Project State: The Neural Assembly Portfolio

Dit document bevat een gedetailleerde uitleg van de architectuur, functionaliteiten en de visuele stijl van het ontwikkelde portfolio voor Luis Alberto Cadete Rosario.

## 1. Concept & Visie
**Thema:** "The Neural Assembly"
De website is ontworpen als een levend, modulair systeem. Het symboliseert de professionele groei van een AI & Robotica student waarbij elke module (onderdeel van het portfolio) een nieuwe "bouwsteen" of "synaps" toevoegt aan het geheel.

## 2. Technische Architectuur
De applicatie is gebouwd als een moderne **Single Page Application (SPA)**.

- **Framework:** Vue 3 (Composition API) met Vite.
- **Programmeertaal:** TypeScript.
- **Styling:** TailwindCSS 4.0.
  - Maakt gebruik van de `@tailwindcss/vite` plugin voor directe verwerking van v4 features zoals `@theme`.
  - Gebruikt een **Glassmorphism** design (semi-transparante kaarten met achtergrondonscherpte).
- **3D Engine:** Three.js.
  - Verantwoordelijk voor de dynamische achtergrond en de interactieve avatar.
- **AI Integratie:** Web Speech API (Native Browser).
  - Ondersteunt Speech-to-Text (microfoon) en Text-to-Speech (stem).

## 3. Belangrijke Componenten

### 3.1 NeuralGrowthEngine.vue
Dit is het visuele hart van de site.
- **Wat het doet:** Rendert een 3D puntenwolk (particles) die neurale verbindingen simuleert.
- **Interactie:** De complexiteit en kleur van de deeltjes veranderen op basis van de pagina waar de gebruiker zich bevindt.
  - `/` (Home): Rustig blauw, lage densiteit.
  - `/reflection` (Einde): Helder muntgroen, hoge densiteit.

### 3.2 Chatbot.vue & 3D Gids
Een geavanceerde interactie-hub rechtsonder in het scherm.
- **3D Avatar:** Een roterende geometrische vorm (Icosahedron) die de "Neural Assistant" representeert.
- **Spraakfuncties:**
  - De gebruiker kan op het microfoon-icoon klikken om vragen te stellen.
  - De assistent antwoordt via tekstballonnen én een gesproken stem (Nederlands).
  - *Opmerking:* De logica is momenteel gesimuleerd voor de presentatie, maar voorbereid op een echte AI-backend (OpenAI).

### 3.3 Navigatie & Voortgang
- De navigatiebalk bovenaan bevat een **"Neurale Voortgangsmeter"**.
- Terwijl de gebruiker door de pagina's klikt, vult een blauwe lijn zich aan om de voortgang door het portfolio visueel te maken.

## 4. Pagina Structuur (Views)

1.  **Voorstelling (`Introduction.vue`):**
    - Focus op de "Reis" (Spanje -> DR -> België).
    - Gebruik van Lucide-icons voor interesses (BJJ, honkbal).
    - Visualisatie van de kernkracht: "Kalmte onder druk".
2.  **Overzicht (`Overview.vue`):**
    - Vervangt de standaard tabellen uit het Word-document door een modern grid van kaarten.
    - Bevat alle 8 seminaries en de trajecten (Innovatie, POP, Internationalisering).
3.  **Selectie (`Selection.vue`):**
    - Een interactieve tabbed interface.
    - Gedetailleerde verslagen van de Studiereis, Hackathon en SAP AI Route.
    - Bevat aparte secties voor "Showcase" en "Reflectie".
4.  **Eindreflectie (`Reflection.vue`):**
    - Mapping van persoonlijke groei aan de PXL X-Factor.
    - Toekomstvisie in de robotica en ondernemerschap.

## 5. Speciale Functionaliteiten

### Presentatiemodus (Pitch Mode)
- Geactiveerd via de knop "Presentation Mode" in de navigatiebalk.
- **Effect:** Verwijdert de navigatiebalk en maximaliseert de content. Dit is ideaal voor de 10-minuten pitch voor de jury, zodat de focus volledig op de visuele presentatie ligt.

## 6. Hoe te onderhouden?

- **Content aanpassen:** De teksten zijn direct te bewerken in de `.vue` files in `src/views/`.
- **Kleuren aanpassen:** Dit kan in `src/style.css` onder de `@theme` sectie.
- **Nieuwe build:** Gebruik `npm run build` om de `dist/` map te genereren voor hosting.

---
*Gegenereerd door Gemini CLI - Mei 2026*
