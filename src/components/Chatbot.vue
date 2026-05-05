<template>
  <div class="fixed bottom-10 right-10 z-50">
    <!-- Main UI Container -->
    <div class="relative">
      
      <!-- LUIS Avatar Bubble (Always visible, overlaps chatbox when open) -->
      <div 
        ref="avatarContainer" 
        class="glass-card rounded-full overflow-hidden border-4 shadow-2xl cursor-pointer hover:scale-110 transition-all duration-700 bg-black/60 z-30 border-white/10"
        :class="isOpen ? 'w-32 h-32 absolute -top-12 -left-12' : 'w-56 h-56'"
        @click="isOpen = !isOpen"
      ></div>

      <!-- Chat Window -->
      <transition name="slide-up">
        <div v-if="isOpen" class="glass-card w-[22rem] h-[55vh] p-8 pt-20 shadow-2xl border-white/10 bg-black/95 backdrop-blur-[50px] flex flex-col rounded-[3rem] overflow-hidden">
          <div class="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div class="flex flex-col">
              <span class="text-xs font-black uppercase tracking-[0.4em] text-mint-green">LUIS.AI</span>
              <span class="text-[9px] text-slate-500 uppercase font-bold">Digital Twin v3.1</span>
            </div>
            <button @click="isOpen = false" class="text-slate-600 hover:text-white transition-colors"><XIcon class="w-5 h-5" /></button>
          </div>

          <div class="flex-grow overflow-y-auto space-y-4 pr-4 scrollbar-thin scroll-smooth" ref="chatBox">
            <div v-for="(msg, i) in messages" :key="i" :class="msg.role === 'user' ? 'text-right' : 'text-left'">
              <div :class="msg.role === 'user' ? 'bg-mint-green/20 text-white border-mint-green/30 ml-auto' : 'bg-white/5 text-slate-200 border-white/10'"
                   class="inline-block px-5 py-3 rounded-2xl text-[12px] max-w-[90%] border backdrop-blur-md shadow-lg leading-relaxed font-medium">
                {{ msg.text }}
              </div>
            </div>
          </div>

          <div class="mt-4 flex gap-3 bg-white/5 p-2 rounded-2xl border border-white/10">
            <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Hey! Vraag me wat je wilt..." 
                   class="flex-grow bg-transparent px-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none transition-all" />
            <button @click="sendMessage" class="bg-mint-green text-black p-2 rounded-xl hover:scale-105 transition-all">
              <ArrowUpIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { XIcon, MicIcon, ArrowUpIcon } from 'lucide-vue-next'

const isOpen = ref(true)
const isSpeaking = ref(false)
const userInput = ref('')
const chatBox = ref<HTMLElement | null>(null)
const messages = ref([
  { role: 'assistant', text: 'Hey! 🎉 Ik ben de digitale versie van Luis. Enthousiast, een beetje eigenwijs en helemaal gek op AI en robots. Vraag me alles, ik bijt niet!' }
])

const emit = defineEmits(['sentiment-change'])

// --- 3D Avatar ---
const avatarContainer = ref<HTMLElement | null>(null)
let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, avatar: THREE.Group
let mixer: THREE.AnimationMixer, animId: number

const initAvatar = () => {
  if (!avatarContainer.value) return
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000)
  camera.position.set(0, 0, 2.8) 

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(isOpen.value ? 128 : 224, isOpen.value ? 128 : 224)
  avatarContainer.value.appendChild(renderer.domElement)

  const loader = new GLTFLoader()
  loader.load('/my_avatar.glb', (gltf) => {
    avatar = gltf.scene
    avatar.scale.setScalar(4.8)
    avatar.position.y = -2.8 
    scene.add(avatar)
    
    if (gltf.animations.length) {
      mixer = new THREE.AnimationMixer(avatar)
      mixer.clipAction(gltf.animations[0]).play()
    }
  })

  scene.add(new THREE.AmbientLight(0xffffff, 2))
  const dl = new THREE.DirectionalLight(0xffffff, 2.5)
  dl.position.set(1, 1, 2)
  scene.add(dl)

  const clock = new THREE.Clock()
  const animate = () => {
    animId = requestAnimationFrame(animate)
    const delta = clock.getDelta()
    if (mixer) mixer.update(delta)
    if (avatar) avatar.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1
    renderer.render(scene, camera)
  }
  animate()
}

// Watch isOpen to update renderer size
watch(isOpen, (val) => {
  if (renderer) {
    const size = val ? 128 : 224
    renderer.setSize(size, size)
  }
})

// --- RAG Logic (Warm, Human, Energetic) ---
const sendMessage = async () => {
  if (!userInput.value.trim()) return
  const text = userInput.value
  messages.value.push({ role: 'user', text })
  userInput.value = ''
  await scrollDown()

  setTimeout(() => {
    isSpeaking.value = true
    let response = "Oei, daar heb ik even geen data over! Maar vraag me gerust iets over mijn reizen, mijn passie voor robots of hoe ik als kind al computers uit elkaar haalde. 🚀"
    const q = text.toLowerCase()
    
    if (q.includes('wie') || q.includes('naam')) {
      response = "Ik ben Luis Alberto Cadete Rosario! 🎉 In Masanet de Catrenys (Spanje) kenden ze me al als de jongen die computers repareerde in zijn vaders atelier toen ik pas 4 was! 🛠️"
    } else if (q.includes('leeftijd') || q.includes('oud')) {
      response = "Ik ben 22 jaar jong! 🎉 Volop aan het knallen in mijn laatste jaar AI op de PXL."
    } else if (q.includes('studie') || q.includes('pxl') || q.includes('school')) {
      response = "Ik studeer Toegepaste Informatica met specialisatie AI aan de Hogeschool PXL! 🎓 Ik ben echt gegroeid van een nonchalante student naar een gedreven professional die de regie pakt. Discipline is nu mijn middle name! 💪"
    } else if (q.includes('afkomst') || q.includes('geboren') || q.includes('waar') || q.includes('vandaan')) {
      response = "Dat is een hele reis! Geboren in de Dominicaanse Republiek 🇩🇴, opgegroeid in Spanje 🇪🇸, en nu al 9 jaar in het mooie België 🇧🇪. Een echte wereldburger met een hart voor techniek!"
    } else if (q.includes('robot') || q.includes('robotica') || q.includes('ai')) {
      response = "AI en robotica zijn mijn leven! 🤖 Mijn ultieme doel is de combinatie van slimme code en fysieke hardware. Op de Hannover Messe zag ik die robots en dacht ik: 'Yes, dit is wat ik wil doen!' "
    } else if (q.includes('sport') || q.includes('hobby') || q.includes('bjj') || q.includes('honkbal')) {
      response = "BJJ (Braziliaans Jiu-Jitsu) 🥋 geeft me die 'calm under pressure' mentaliteit. En honkbal ⚾ is mijn passie uit de Dominicaanse Republiek! Oh, en bachata en merengue? Dat zit in mijn bloed en helpt me focussen tijdens het coderen! 💃"
    } else if (q.includes('project') || q.includes('gemini') || q.includes('portfolio')) {
      response = "Project Gemini is mijn meesterwerk! 💎 Een volledige lokale AI-pipeline op mijn eigen RTX 3060. Geen cloud, geen API-kosten, gewoon pure power en passie!"
    } else if (q.includes('contact') || q.includes('mail') || q.includes('linkedin')) {
      response = "Stuur me een mailtje op lluisalberto24@gmail.com of zoek me op LinkedIn! ✉️ Ik sta altijd open voor een goed gesprek of een vette uitdaging."
    } else if (q.includes('kalm') || q.includes('kracht') || q.includes('druk')) {
      response = "Mijn grootste kracht? Kalmte onder druk! 🧘‍♂️ Of de database nu crasht of plannen wijzigen, ik blijf rustig en zoek methodisch naar de oplossing. BJJ heeft me dat goed geleerd!"
    }

    messages.value.push({ role: 'assistant', text: response })
    speak(response); scrollDown()
  }, 800)
}

const speak = (text: string) => {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'nl-NL'
  u.rate = 1.0 // Faster, more energetic rate
  u.pitch = 0.9 // Slightly lower pitch for a male voice

  // Try to find a male voice
  const voices = window.speechSynthesis.getVoices()
  const maleVoice = voices.find(v => 
    (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('man') || v.name.includes('Xander')) && 
    v.lang.startsWith('nl')
  ) || voices.find(v => v.lang.startsWith('nl'))
  
  if (maleVoice) u.voice = maleVoice
  
  u.onend = () => isSpeaking.value = false
  window.speechSynthesis.speak(u)
}
const scrollDown = async () => { await nextTick(); if (chatBox.value) chatBox.value.scrollTop = chatBox.value.scrollHeight }

onMounted(() => initAvatar())
onUnmounted(() => cancelAnimationFrame(animId))
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(20px); }

.scrollbar-thin::-webkit-scrollbar { width: 4px; }
.scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(0, 255, 204, 0.2); border-radius: 10px; }
</style>
