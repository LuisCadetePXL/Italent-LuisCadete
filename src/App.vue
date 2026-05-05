<template>
  <div class="min-h-screen text-white overflow-hidden font-sans">
    <NeuralGrowthEngine 
      ref="engine" 
      :sentiment="currentSentiment"
      @node-selected="handleNodeSelection"
      @overview-requested="activeNode = null"
    />

    <!-- Minimalist HUD -->
    <nav class="fixed top-0 left-0 w-full z-50 p-10 flex justify-between items-start pointer-events-none" :class="{ 'hidden': isPresentationMode }">
      <div class="flex items-center gap-6 group cursor-pointer pointer-events-auto" @click="resetNavigation">
        <div class="w-16 h-16 rounded-3xl bg-mint-green flex items-center justify-center text-black font-black shadow-[0_0_30px_rgba(0,255,204,0.4)] group-hover:scale-110 transition-transform">
          L
        </div>
        <div class="flex flex-col">
          <span class="text-2xl font-black tracking-[0.3em] text-white">LUIS ARCHITECTUUR</span>
          <span class="text-[11px] text-mint-green font-bold uppercase tracking-widest opacity-90">Neural Growth System v3.0</span>
        </div>
      </div>

      <div class="flex gap-4 pointer-events-auto">
        <button 
          @click="isPresentationMode = !isPresentationMode"
          class="px-6 py-4 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/20 transition-all text-white flex items-center gap-3"
        >
          <CpuIcon class="w-4 h-4" /> {{ isPresentationMode ? 'Exit Pitch' : 'Presentation Mode' }}
        </button>
        <button 
          v-if="activeNode"
          @click="resetNavigation"
          class="px-10 py-4 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full text-xs font-black uppercase tracking-[0.3em] hover:bg-mint-green hover:text-black transition-all text-white flex items-center gap-4 shadow-2xl"
        >
          <MinimizeIcon class="w-4 h-4" /> Reset Orbit
        </button>
      </div>
    </nav>

    <!-- Floating Exit button for Presentation Mode -->
    <button 
      v-if="isPresentationMode"
      @click="isPresentationMode = false"
      class="fixed top-10 right-10 z-[60] p-4 bg-mint-green text-black rounded-full shadow-2xl hover:scale-110 transition-all"
    >
      <XIcon class="w-6 h-6" />
    </button>

    <!-- Content Modals (High Contrast & Glass) -->
    <transition name="scale-fade">
      <div v-if="activeNode" class="fixed inset-0 z-40 flex items-center justify-center p-8 pointer-events-none">
        <div class="glass-card w-full max-w-6xl max-h-[85vh] overflow-y-auto p-20 pointer-events-auto relative shadow-[0_0_100px_rgba(0,0,0,0.8)] border-white/10 bg-black/80 backdrop-blur-[40px] rounded-[3rem]">
          <button @click="resetNavigation" class="absolute top-10 right-10 p-4 hover:bg-white/10 rounded-full transition-colors border border-white/10">
            <XIcon class="w-8 h-8 text-white" />
          </button>
          
          <Introduction v-if="activeNode === 'introduction'" />
          <Overview v-if="activeNode === 'overview'" />
          
          <div v-if="activeNode === 'personal_basis'" class="space-y-10">
            <h2 class="text-6xl font-black text-white uppercase tracking-tighter border-l-8 border-mint-green pl-10">Persoonlijke Basis</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div class="glass-card p-10 space-y-6">
                <h3 class="text-2xl font-bold text-mint-green">BJJ: Discipline</h3>
                <p class="text-xl text-slate-300 leading-relaxed">
                  Braziliaans Jiu-Jitsu leert me kalmte onder druk en strategisch denken. Elke beweging is een berekening.
                </p>
              </div>
              <div class="glass-card p-10 space-y-6">
                <h3 class="text-2xl font-bold text-mint-green">Honkbal: Focus</h3>
                <p class="text-xl text-slate-300 leading-relaxed">
                  Mijn favoriete sport uit de Dominicaanse Republiek. Het staat voor precisie en team-synergie.
                </p>
              </div>
            </div>
          </div>

          <div v-if="activeNode === 'development'" class="space-y-10">
            <h2 class="text-6xl font-black text-white uppercase tracking-tighter border-l-8 border-mint-green pl-10">Ontwikkeling</h2>
            <p class="text-2xl text-slate-300 leading-relaxed">
              POP sessies en projectweken vormen de ruggengraat van mijn groei als AI-professional. Hier leer ik de vertaling van theorie naar praktijk.
            </p>
            <div class="aspect-video bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center">
              <span class="text-mint-green/50 font-black uppercase tracking-[0.5em]">Growth Pipeline Active</span>
            </div>
          </div>

          <div v-if="activeNode === 'hard_skills'" class="space-y-10">
            <h2 class="text-6xl font-black text-white uppercase tracking-tighter border-l-8 border-mint-green pl-10">Hard Skills</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="glass-card p-8 rounded-3xl">
                <h3 class="text-2xl font-bold text-mint-green mb-4">AI & Data</h3>
                <ul class="space-y-2 text-slate-300">
                  <li>Python & Machine Learning</li>
                  <li>Faster-Whisper & OpenVoice</li>
                  <li>Llama 3 & Ollama (Local RAG)</li>
                  <li>Model Distillation</li>
                </ul>
              </div>
              <div class="glass-card p-8 rounded-3xl">
                <h3 class="text-2xl font-bold text-[#007bff] mb-4">Web & 3D</h3>
                <ul class="space-y-2 text-slate-300">
                  <li>Vue 3 & Composition API</li>
                  <li>Three.js & WebGL</li>
                  <li>GSAP Animations</li>
                  <li>TailwindCSS 4.0</li>
                </ul>
              </div>
              <div class="glass-card p-8 rounded-3xl">
                <h3 class="text-2xl font-bold text-white mb-4">Systems</h3>
                <ul class="space-y-2 text-slate-300">
                  <li>Linux & SSH</li>
                  <li>PostgreSQL & SQL</li>
                  <li>SAP BTP</li>
                </ul>
              </div>
            </div>
          </div>

          <div v-if="activeNode === 'soft_skills'" class="space-y-10">
            <h2 class="text-6xl font-black text-white uppercase tracking-tighter border-l-8 border-mint-green pl-10">Soft Skills</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div class="space-y-6">
                <h3 class="text-3xl font-bold text-mint-green">Calm Under Pressure</h3>
                <p class="text-xl text-slate-300 leading-relaxed">
                  Gevoed door Braziliaans Jiu-Jitsu. In kritieke situaties (zoals crashende databases tijdens hackathons) behoud ik het overzicht en analyseer ik methodisch.
                </p>
              </div>
              <div class="space-y-6">
                <h3 class="text-3xl font-bold text-[#007bff]">Team Synergy</h3>
                <p class="text-xl text-slate-300 leading-relaxed">
                  Samenwerken op één laptop tijdens challenges leerde me de kracht van heldere, actieve communicatie. Empathie en directheid gaan hand in hand.
                </p>
              </div>
            </div>
          </div>

          <div v-if="activeNode === 'school_projects'" class="space-y-10">
            <h2 class="text-6xl font-black text-white uppercase tracking-tighter border-l-8 border-mint-green pl-10">School Projects</h2>
            <div class="glass-card p-10 space-y-6">
              <h3 class="text-3xl font-bold text-mint-green">Project Gemini</h3>
              <p class="text-xl text-slate-300 leading-relaxed">
                Mijn magnum opus. Een lokaal draaiende AI-pipeline op een RTX 3060. Geen cloud, geen API kosten. Het combineert spraakherkenning, een lokaal LLM, stemkloning en 3D lip-sync in één geïntegreerd systeem.
              </p>
            </div>
            <div class="glass-card p-10 space-y-6">
              <h3 class="text-3xl font-bold text-[#007bff]">Research Project 2TIN</h3>
              <p class="text-xl text-slate-300 leading-relaxed">
                Een diepgaand onderzoek naar de nieuwste technologieën, waarbij academische nauwkeurigheid en praktische implementatie werden gecombineerd.
              </p>
            </div>
          </div>

          <Selection v-if="['studiereis', 'hackathon', 'sap_ai'].includes(activeNode)" :initial-tab="activeNode" />
          
          <Reflection v-if="activeNode === 'reflection'" />

          <div v-if="activeNode === 'contact'" class="space-y-16">
            <h2 class="text-7xl font-black text-white uppercase tracking-tighter">The Contact Core</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div class="space-y-8">
                <div class="flex flex-col p-8 bg-white/5 rounded-3xl border border-white/10">
                  <span class="text-[12px] text-mint-green uppercase font-black tracking-widest mb-2">Naam</span>
                  <span class="text-3xl font-bold">Luis Alberto Cadete Rosario</span>
                </div>
                <div class="flex flex-col p-8 bg-white/5 rounded-3xl border border-white/10">
                  <span class="text-[12px] text-mint-green uppercase font-black tracking-widest mb-2">Locatie</span>
                  <span class="text-3xl font-bold">Leopoldsburg 3970, België</span>
                </div>
                <div class="flex flex-col p-8 bg-white/5 rounded-3xl border border-white/10">
                  <span class="text-[12px] text-mint-green uppercase font-black tracking-widest mb-2">E-mail</span>
                  <a href="mailto:lluisalberto24@gmail.com" class="text-3xl font-bold text-mint-green hover:underline">lluisalberto24@gmail.com</a>
                </div>
                <div class="flex flex-col p-8 bg-white/5 rounded-3xl border border-white/10">
                  <span class="text-[12px] text-mint-green uppercase font-black tracking-widest mb-2">Telefoon</span>
                  <span class="text-3xl font-bold">+32 466 25 25 07</span>
                </div>
              </div>
              <div class="space-y-8">
                <a href="https://www.linkedin.com/in/luisalbertocadete" target="_blank" class="glass-card p-10 flex items-center justify-between group hover:bg-mint-green/10 transition-all border-white/10 rounded-3xl">
                  <div class="flex items-center gap-8">
                    <LinkedinIcon class="w-12 h-12 text-mint-green" />
                    <span class="text-2xl font-bold text-white">LinkedIn</span>
                  </div>
                  <ArrowUpRightIcon class="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="https://github.com/luiscadetepxl" target="_blank" class="glass-card p-10 flex items-center justify-between group hover:bg-mint-green/10 transition-all border-white/10 rounded-3xl">
                  <div class="flex items-center gap-8">
                    <GithubIcon class="w-12 h-12 text-white" />
                    <span class="text-2xl font-bold text-white">GitHub</span>
                  </div>
                  <ArrowUpRightIcon class="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                
                <div class="pt-6 space-y-6">
                  <button @click="handleNodeSelection('selection')" class="w-full py-6 bg-white/5 rounded-2xl font-bold text-white border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-4 text-xl">
                    Project Selectie <ArrowRightIcon class="w-6 h-6 text-mint-green" />
                  </button>
                  <a href="/Luis_Cadete_CV.pdf.pdf" download class="w-full py-8 bg-mint-green rounded-3xl font-black text-black shadow-[0_0_50px_rgba(0,255,204,0.3)] hover:scale-[1.02] transition-all flex items-center justify-center gap-4 text-xl uppercase tracking-widest">
                    <FileTextIcon class="w-8 h-8" /> Download Neural CV
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeNode === 'code'" class="space-y-10">
            <h2 class="text-6xl font-black text-white uppercase tracking-tighter border-l-8 border-mint-green pl-10">Dynamic Architecture</h2>
            <p class="text-2xl text-slate-300">Interactieve weergave van neurale netwerk structuren en AI gewichten.</p>
            <div class="aspect-video bg-black/60 rounded-[3rem] border border-white/10 flex items-center justify-center overflow-hidden relative shadow-inner">
              <div class="absolute inset-0 bg-gradient-to-br from-mint-green/10 to-transparent animate-pulse"></div>
              <div class="flex flex-col items-center gap-6">
                <CpuIcon class="w-24 h-24 text-mint-green/50 animate-spin-slow" />
                <span class="text-sm font-black uppercase tracking-[0.8em] text-mint-green/60">Neural Sync Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Virtual Luis Interface -->
    <Chatbot v-if="!isPresentationMode" @sentiment-change="s => currentSentiment = s" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { 
  XIcon, 
  LinkedinIcon, 
  GithubIcon, 
  MinimizeIcon, 
  FileTextIcon, 
  ArrowUpRightIcon,
  ArrowRightIcon,
  CpuIcon
} from 'lucide-vue-next'
import NeuralGrowthEngine from './components/NeuralGrowthEngine.vue'
import Introduction from './views/Introduction.vue'
import Overview from './views/Overview.vue'
import Selection from './views/Selection.vue'
import Reflection from './views/Reflection.vue'
import Chatbot from './components/Chatbot.vue'

const engine = ref<any>(null)
const activeNode = ref<string | null>(null)
const currentSentiment = ref('neutral')
const isPresentationMode = ref(false)

const chronologicalOrder = [
  'introduction', 'personal_basis', 'hard_skills', 'soft_skills', 
  'overview', 'development', 'school_projects', 
  'studiereis', 'hackathon', 'sap_ai', 
  'reflection', 'contact'
]

const visitedNodes = ref<Set<string>>(new Set())

const handleNodeSelection = (id: string) => {
  activeNode.value = id
  visitedNodes.value.add(id)
}

const resetNavigation = () => {
  activeNode.value = null
  engine.value?.resetCamera()
}

const progressPercentage = computed(() => {
  return Math.round((visitedNodes.value.size / chronologicalOrder.length) * 100)
})

const xFactorScores = computed(() => {
  let passie = 10, ondernemend = 10, samenwerken = 10, multi = 10
  if (visitedNodes.value.has('introduction')) passie += 15
  if (visitedNodes.value.has('personal_basis')) { passie += 10; samenwerken += 5 }
  if (visitedNodes.value.has('hard_skills')) { multi += 20 }
  if (visitedNodes.value.has('soft_skills')) { samenwerken += 15; passie += 5 }
  if (visitedNodes.value.has('school_projects')) { samenwerken += 10; multi += 10 }
  if (visitedNodes.value.has('studiereis')) { samenwerken += 20; passie += 10 }
  if (visitedNodes.value.has('hackathon')) { multi += 15; ondernemend += 10 }
  if (visitedNodes.value.has('sap_ai')) { ondernemend += 20; multi += 10 }
  if (visitedNodes.value.has('reflection')) { passie += 10; ondernemend += 10 }
  if (visitedNodes.value.has('contact')) { ondernemend += 20; samenwerken += 10 }
  
  return {
    passie: Math.min(100, passie),
    ondernemend: Math.min(100, ondernemend),
    samenwerken: Math.min(100, samenwerken),
    multi: Math.min(100, multi)
  }
})

const handleKeydown = (e: KeyboardEvent) => {
  if (isPresentationMode.value && e.key === 'Enter') {
    const currentIndex = activeNode.value ? chronologicalOrder.indexOf(activeNode.value) : -1
    if (currentIndex < chronologicalOrder.length - 1) {
      const nextId = chronologicalOrder[currentIndex + 1]
      activeNode.value = null 
      setTimeout(() => {
        engine.value?.zoomToNodeById(nextId)
      }, 500)
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style>
.scale-fade-enter-active, .scale-fade-leave-active { transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
.scale-fade-enter-from, .scale-fade-leave-to { opacity: 0; transform: scale(0.85) translateY(40px); }

.glass-card {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.animate-spin-slow {
  animation: spin 12s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: rgba(0,0,0,0.5); }
::-webkit-scrollbar-thumb { background: rgba(0, 255, 204, 0.2); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: rgba(0, 255, 204, 0.4); }
</style>
