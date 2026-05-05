<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <section class="glass-card p-10 flex flex-col md:flex-row gap-10 items-center">
      <div class="flex-1 space-y-6">
        <h1 class="text-5xl font-extrabold tracking-tighter text-slate-900">
          LUIS ALBERTO <span class="text-electric-blue">CADETE ROSARIO</span>
        </h1>
        <p class="text-xl text-slate-600 leading-relaxed">
          Derdejaarsstudent Toegepaste Informatica met een specialisatie in <span class="font-bold text-slate-800">AI & Robotics</span>. 
          Gedreven door de synergie tussen code en hardware.
        </p>
        <div class="flex gap-4">
          <div class="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-600">
            <MapPinIcon class="w-4 h-4" /> Spanje → DR → België
          </div>
          <div class="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-600">
            <CpuIcon class="w-4 h-4" /> AI Specialisatie
          </div>
        </div>
      </div>
      <div class="w-64 h-64 rounded-3xl bg-gradient-to-br from-electric-blue to-mint-green p-1">
        <div class="w-full h-full bg-white rounded-[1.4rem] flex items-center justify-center overflow-hidden">
          <!-- Placeholder for Avatar or Photo -->
          <UserIcon class="w-32 h-32 text-slate-200" />
        </div>
      </div>
    </section>

    <!-- The Journey -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <section class="glass-card p-8 space-y-4 border-l-4 border-electric-blue">
        <h2 class="text-2xl font-bold flex items-center gap-2">
          <GlobeIcon class="text-electric-blue" /> Mijn Reis
        </h2>
        <p class="text-slate-600 leading-relaxed">
          Technologie zit in mijn bloed. Als vierjarig jongetje in Spanje hielp ik mijn vader al in zijn computeratelier. 
          Na een periode in de Dominicaanse Republiek is de passie in België volledig teruggekeerd.
        </p>
      </section>

      <section class="glass-card p-8 space-y-4 border-l-4 border-mint-green">
        <h2 class="text-2xl font-bold flex items-center gap-2">
          <TargetIcon class="text-mint-green" /> Discipline & Focus
        </h2>
        <p class="text-slate-600 leading-relaxed">
          Op de mat voor <span class="font-bold">BJJ</span> of op het <span class="font-bold">honkbalveld</span>: 
          hier heb ik de waarde van precisie, teamwerk en discipline geleerd. Deze sporten vormen de fundamenten van mijn professionele houding.
        </p>
      </section>
    </div>

    <!-- Core Strength -->
    <section class="glass-card p-10 bg-gradient-to-r from-electric-blue/5 to-mint-green/5">
      <div class="max-w-2xl mx-auto text-center space-y-6">
        <h2 class="text-3xl font-bold">Mijn Kracht: <span class="text-electric-blue italic">Kalmte onder druk</span></h2>
        <p class="text-lg text-slate-600">
          Mijn grootste troef is mijn kalmte. Wanneer plannen wijzigen of systemen crashen, blijf ik gefocust. 
          Mijn uitdaging is om deze innerlijke gedrevenheid via actieve communicatie nog duidelijker te tonen aan mijn team.
        </p>
        <div class="flex justify-center gap-8 pt-4">
          <div class="text-center">
            <div class="text-3xl font-bold text-electric-blue">3+</div>
            <div class="text-xs uppercase tracking-widest text-slate-400">Jaar AI Focus</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-mint-green">8+</div>
            <div class="text-xs uppercase tracking-widest text-slate-400">Seminaries</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-slate-800">100%</div>
            <div class="text-xs uppercase tracking-widest text-slate-400">Commitment</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { 
  MapPinIcon, 
  CpuIcon, 
  UserIcon, 
  GlobeIcon, 
  TargetIcon
} from 'lucide-vue-next'
</script>
