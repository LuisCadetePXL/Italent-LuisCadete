<template>
  <div class="space-y-12">
    <header class="text-center space-y-4">
      <h1 class="text-4xl font-extrabold tracking-tighter text-slate-900">DE <span class="text-electric-blue">EINDREFLECTIE</span></h1>
      <p class="text-slate-500 max-w-xl mx-auto">
        Een terugblik op drie jaar groei, transformatie en de weg naar de toekomst.
      </p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Transformation Story -->
      <section class="lg:col-span-2 glass-card p-10 space-y-6 relative overflow-hidden">
        <div class="absolute top-0 right-0 p-8 opacity-10">
          <TrendingUpIcon class="w-32 h-32 text-electric-blue" />
        </div>
        <h2 class="text-2xl font-bold text-slate-900">Mijn Groeispurt</h2>
        <div class="space-y-4 text-slate-600 leading-relaxed">
          <p>
            Als ik vandaag terugkijk naar de Luis van drie jaar geleden, zie ik een persoon die ik bijna niet meer herken. 
            In het begin van mijn traject bij PXL vond ik mijn draai niet; ik nam mijn verantwoordelijkheden niet serieus.
          </p>
          <p class="font-bold text-slate-800">
            Vandaag sta ik hier als een gedreven professional. Ik ben enorm trots op de transformatie die ik heb doorgemaakt. 
            Succes is voor mij nu het resultaat van focus en hard werken.
          </p>
        </div>
        
        <div class="pt-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="xfactor in xfactors" :key="xfactor.label" class="space-y-1">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ xfactor.label }}</div>
            <div class="text-xs font-medium text-slate-700">{{ xfactor.value }}</div>
          </div>
        </div>
      </section>

      <!-- X-Factor Summary -->
      <section class="glass-card p-8 bg-slate-900 text-white space-y-6">
        <h2 class="text-xl font-bold flex items-center gap-2">
          <AwardIcon class="text-mint-green" /> PXL X-Factor
        </h2>
        <ul class="space-y-4">
          <li v-for="item in xfactorList" :key="item.title" class="space-y-1">
            <div class="text-xs font-bold text-mint-green uppercase tracking-tighter">{{ item.title }}</div>
            <div class="text-sm text-slate-300 leading-snug">{{ item.desc }}</div>
          </li>
        </ul>
      </section>
    </div>

    <!-- Future Vision -->
    <section class="glass-card p-12 text-center space-y-8 bg-gradient-to-br from-electric-blue to-mint-green text-white">
      <div class="max-w-2xl mx-auto space-y-4">
        <h2 class="text-4xl font-extrabold tracking-tighter">TOEKOMST IN DE <span class="underline decoration-white/30">ROBOTICA</span></h2>
        <p class="text-lg opacity-90 leading-relaxed">
          Mijn weg van Spanje via de Dominicaanse Republiek naar België heeft me de veerkracht gegeven die ik nodig heb om te slagen. 
          Ik wil mijn passie voor AI en hardware inzetten om oplossingen te bouwen die echt een verschil maken.
        </p>
      </div>
      
      <div class="flex justify-center gap-4">
        <div class="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold">
          Ondernemerschap
        </div>
        <div class="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold">
          Innovatieve Robotica
        </div>
        <div class="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold">
          Impactgedreven
        </div>
      </div>

      <div class="pt-8 text-sm font-medium opacity-70">
        "Doe de moeite en lever het werk, want dat is de enige manier om je dromen waar te maken."
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { 
  TrendingUpIcon, 
  AwardIcon 
} from 'lucide-vue-next'

const xfactors = [
  { label: 'Passie', value: 'AI & Robotica' },
  { label: 'Ondernemen', value: 'Toekomstplan' },
  { label: 'Innovatie', value: 'Deep Learning' },
  { label: 'Samenwerken', value: 'Hackathons' }
]

const xfactorList = [
  { title: 'Passie & Empathie', desc: 'Mijn vroege fascinatie is omgezet in professionele expertise.' },
  { title: 'Ondernemerschap', desc: 'Plannen voor een eigen zaak zijn al in de maak.' },
  { title: 'Innovatie', desc: 'Modeldistillatie en prompt engineering zijn mijn tools.' },
  { title: 'Samenwerken', desc: 'Sterker geworden door internationale beurzen en teamchallenges.' },
  { title: 'Multidisciplinariteit', desc: 'De perfecte mix van software (AI) en hardware (Robotica).' }
]
</script>
