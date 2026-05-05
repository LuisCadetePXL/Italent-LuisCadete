<template>
  <div class="space-y-12">
    <header class="text-center space-y-4">
      <h1 class="text-4xl font-extrabold tracking-tighter text-slate-900">PROJECT <span class="text-mint-green">HIGHLIGHTS</span></h1>
      <p class="text-slate-500 max-w-xl mx-auto">
        Een diepgaande selectie van de meest impactvolle ervaringen tijdens mijn I-Talent traject.
      </p>
    </header>

    <!-- Tab Navigation -->
    <div class="flex justify-center gap-4">
      <button 
        v-for="(tab, index) in tabs" 
        :key="index"
        @click="activeTab = index"
        class="px-6 py-3 rounded-full text-sm font-bold transition-all border"
        :class="activeTab === index ? 'bg-slate-900 text-white border-slate-900' : 'bg-white/50 text-slate-500 border-slate-200 hover:border-slate-400'"
      >
        {{ tab.title }}
      </button>
    </div>

    <!-- Active Tab Content -->
    <transition name="fade" mode="out-in">
      <div :key="activeTab" class="glass-card p-10 space-y-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Text Content -->
          <div class="space-y-8">
            <div class="space-y-2">
              <h2 class="text-3xl font-bold text-slate-900">{{ tabs[activeTab].fullTitle }}</h2>
              <div class="flex items-center gap-2 text-xs font-bold text-mint-green uppercase tracking-widest">
                <CalendarIcon class="w-4 h-4" /> {{ tabs[activeTab].date }}
              </div>
            </div>

            <div class="space-y-4">
              <h3 class="text-lg font-bold text-electric-blue flex items-center gap-2">
                <StarIcon class="w-5 h-5" /> Showcase
              </h3>
              <p class="text-slate-600 leading-relaxed whitespace-pre-line">
                {{ tabs[activeTab].showcase }}
              </p>
            </div>

            <div class="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
                <ActivityIcon class="w-5 h-5" /> Reflectie
              </h3>
              <p class="text-slate-600 leading-relaxed italic">
                {{ tabs[activeTab].reflection }}
              </p>
            </div>
          </div>

          <!-- Visuals Content -->
          <div class="space-y-6">
            <div class="aspect-video rounded-3xl bg-slate-200 overflow-hidden flex items-center justify-center relative group">
              <div class="absolute inset-0 bg-gradient-to-br from-electric-blue/20 to-mint-green/20 mix-blend-overlay"></div>
              <component :is="tabs[activeTab].visualIcon" class="w-24 h-24 text-slate-400 group-hover:scale-110 transition-transform duration-500" />
              <div class="absolute bottom-4 left-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                [AI Generated Abstract Render]
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="glass-card p-4 border-mint-green/20">
                <div class="text-xs font-bold text-slate-400 uppercase mb-1">Resultaat</div>
                <div class="text-sm font-bold text-slate-800">{{ tabs[activeTab].stat1 }}</div>
              </div>
              <div class="glass-card p-4 border-electric-blue/20">
                <div class="text-xs font-bold text-slate-400 uppercase mb-1">Geleerd</div>
                <div class="text-sm font-bold text-slate-800">{{ tabs[activeTab].stat2 }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  CalendarIcon, 
  StarIcon, 
  ActivityIcon,
  PlaneIcon,
  DatabaseIcon,
  LightbulbIcon
} from 'lucide-vue-next'

const props = defineProps<{ initialTab?: string }>()
const activeTab = ref(0)

// Map node IDs to tab indices
const tabMap: Record<string, number> = {
  'studiereis': 0,
  'hackathon': 1,
  'sap_ai': 2
}

if (props.initialTab && tabMap[props.initialTab] !== undefined) {
  activeTab.value = tabMap[props.initialTab]
}

const tabs = [
  {
    title: 'Duitsland',
    fullTitle: 'Internationale Studiereis Duitsland',
    date: '22 Apr - 26 Apr 2026',
    showcase: `De reis naar Duitsland was een ervaring die me als IT-er maar ook als persoon heeft veranderd. Het begon bij de hogeschool in Bielefeld, waar de internationale sfeer me trots maakte op de samenwerkingen van PXL.

Daarna trokken we naar de Hannover Messe. Mijn aandacht werd direct getrokken door de robots. Waar ik drie jaar geleden nog naar een robot zou kijken als magie, kon ik nu de neurale netwerken en de logica erachter herkennen. Dat was een enorme opsteker voor mijn zelfvertrouwen.`,
    reflection: `Ik zag eindelijk hoe ik mijn technische kennis van mijn laptop kan vertalen naar een industriële omgeving. Mijn sterke punt was mijn oprechte nieuwsgierigheid; ik stapte makkelijk op mensen af om te vragen hoe hun systemen werkten.`,
    visualIcon: PlaneIcon,
    stat1: 'Bielefeld & Hannover',
    stat2: 'Industriële Robotica'
  },
  {
    title: 'Hackathon',
    fullTitle: 'Hack The Future - Challenge 109',
    date: '12 November 2025',
    showcase: `Mijn allereerste hackathon! In de challenge "Discoverers of the Great DBArrier Reef" doken we in een technisch doolhof. 

We werkten via SSH op een Linux server, pasten SQL injection toe voor privilege escalation en graafden diep in logs om een crashende database te herstellen. Het werken op één laptop met mijn teamgenoot dwong ons tot uiterst nauwe samenwerking. De kick die ik kreeg na het extraheren van de juiste codes bevestigde mijn passie voor IT.`,
    reflection: `Ik leerde dat een koel hoofd essentieel is. Mijn rust was een troef toen de database weigerde te starten. Een werkpunt is dat ik soms te lang alleen op een probleem staar voordat ik hulp vraag.`,
    visualIcon: DatabaseIcon,
    stat1: 'SSH & SQL Injection',
    stat2: 'Calm under pressure'
  },
  {
    title: 'SAP AI',
    fullTitle: 'Innovatieroute SAP AI',
    date: '9 Okt - 16 Okt 2025',
    showcase: `Bij Flexso leerden we over de evolutie van Generatieve AI, van LeNet tot Transformers. We verkenden Model Distillation en Joule Agents binnen het SAP BTP-ecosysteem.

Het bouwen van een festival-app toonde me dat 'vibe-coden' niet genoeg is; de realiteit van correcte configuratie vereist diepe expertise. Je moet begrijpen wat er onder de motorkap gebeurt om de controle te behouden.`,
    reflection: `Deze activiteit raakt de kern van mijn specialisatie. Ik heb geleerd hoe ik AI-modellen professioneel kan inzetten voor bedrijfsoplossingen in plaats van ze alleen als technisch experiment te gebruiken.`,
    visualIcon: LightbulbIcon,
    stat1: 'Model Distillation',
    stat2: 'Enterprise AI'
  }
]
</script>