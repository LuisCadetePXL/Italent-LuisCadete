<template>
  <div class="space-y-12">
    <header class="text-center space-y-4">
      <h1 class="text-4xl font-extrabold tracking-tighter text-slate-900">CURRICULUM <span class="text-electric-blue">OVERZICHT</span></h1>
      <p class="text-slate-500 max-w-xl mx-auto">
        Een gestructureerd overzicht van de fundamenten die mijn expertise in de IT-sector hebben gevormd.
      </p>
    </header>

    <!-- Seminaries Grid -->
    <section class="space-y-6">
      <h2 class="text-xl font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
        <BookOpenIcon class="w-5 h-5" /> Seminaries
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="sem in seminars" :key="sem.title" class="glass-card p-6 hover:border-electric-blue/50 transition-all group">
          <component :is="sem.icon" class="w-8 h-8 text-electric-blue mb-4 group-hover:scale-110 transition-transform" />
          <h3 class="font-bold text-slate-800 text-sm leading-tight mb-2">{{ sem.title }}</h3>
          <p class="text-xs text-slate-500">{{ sem.description }}</p>
          <div class="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            {{ sem.duration }} • {{ sem.date }}
          </div>
        </div>
      </div>
    </section>

    <!-- Trajecten -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Innovatie -->
      <section class="space-y-4">
        <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
          <ZapIcon class="text-mint-green w-5 h-5" /> Innovatie
        </h2>
        <div class="space-y-3">
          <div v-for="item in innovation" :key="item" class="glass-card p-4 text-sm font-medium border-l-2 border-mint-green">
            {{ item }}
          </div>
        </div>
      </section>

      <!-- POP & Ontwikkeling -->
      <section class="space-y-4">
        <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
          <BrainIcon class="text-electric-blue w-5 h-5" /> POP & Focus
        </h2>
        <div class="space-y-3">
          <div v-for="item in pop" :key="item" class="glass-card p-4 text-sm font-medium border-l-2 border-electric-blue">
            {{ item }}
          </div>
        </div>
      </section>

      <!-- Internationaal -->
      <section class="space-y-4">
        <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
          <PlaneIcon class="text-slate-400 w-5 h-5" /> Internationalisering
        </h2>
        <div class="space-y-3">
          <div v-for="item in international" :key="item" class="glass-card p-4 text-sm font-medium border-l-2 border-slate-300">
            {{ item }}
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  BookOpenIcon, 
  ZapIcon, 
  BrainIcon, 
  PlaneIcon,
  CpuIcon,
  AtomIcon,
  BriefcaseIcon,
  SearchIcon,
  CodeIcon,
  MessageSquareIcon,
  GitPullRequestIcon,
  LayersIcon
} from 'lucide-vue-next'

const seminars = [
  { title: 'Seminarie AI', description: 'Impact van AI op IT-professionals.', date: '14 Okt 2025', duration: '3u', icon: CpuIcon },
  { title: 'Quantum Machine Learning', description: 'Qubits en error mitigation (IBM).', date: '5 Nov 2025', duration: '3u', icon: AtomIcon },
  { title: 'Bedrijf in bijberoep', description: 'Strategie voor eigen zaak.', date: '24 Nov 2025', duration: '2u', icon: BriefcaseIcon },
  { title: 'Digital Forensics', description: 'Data-analyse met Autopsy (Politie).', date: '17 Dec 2025', duration: '4u', icon: SearchIcon },
  { title: 'Low code/No code', description: 'Procesoptimalisatie (Flexso).', date: '4 Mrt 2025', duration: '3u', icon: LayersIcon },
  { title: 'Generatieve Diffusie', description: 'LLMs en Bias (Uncanny).', date: '11 Mrt 2025', duration: '3u', icon: MessageSquareIcon },
  { title: 'Pull Requests & Review', description: 'Softwarekwaliteit (BIQ).', date: '25 Mrt 2025', duration: '3u', icon: GitPullRequestIcon },
  { title: 'Postman AI Testing', description: 'API automation (Refleqt).', date: '22 Apr 2025', duration: '2u', icon: CodeIcon }
]

const innovation = [
  'Innovatieroute SAP AI (Flexso)',
  'Hack The Future: DBArrier Reef'
]

const pop = [
  'Projectweek 2TIN',
  'Brein aan het werk! (Focus)',
  'POPping (Groepsdynamiek)',
  'My Team and I (Lencioni)'
]

const international = [
  'Studiereis Duitsland (5 Dagen)'
]
</script>
