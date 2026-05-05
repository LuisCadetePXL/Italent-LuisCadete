<template>
  <div class="fixed top-0 left-0 w-full h-full -z-10 bg-[#000000]">
    <canvas ref="canvas" class="w-full h-full"></canvas>
    
    <!-- Floating Labels -->
    <div v-for="node in activeNodes" :key="node.id" 
         class="absolute pointer-events-none text-[11px] font-black uppercase tracking-widest text-white transition-opacity duration-500 bg-black/50 px-2 py-1 rounded border border-white/20"
         :style="getLabelStyle(node)">
      {{ node.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'

const canvas = ref<HTMLCanvasElement | null>(null)
const props = defineProps<{ sentiment?: string }>()
const emit = defineEmits(['node-selected', 'overview-requested'])

let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer
let nodesGroup: THREE.Group, lines: THREE.LineSegments
let controls: OrbitControls
let animationFrameId: number
let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()

const nodeData = [
  // ZONE 1: INPUT (Left)
  { id: 'introduction', label: 'Voorstelling', color: 0x00ffcc, zone: 1 },
  { id: 'personal_basis', label: 'Persoonlijke Basis', color: 0x00ffcc, zone: 1 },
  { id: 'hard_skills', label: 'Hard Skills', color: 0x00ffcc, zone: 1 },
  { id: 'soft_skills', label: 'Soft Skills', color: 0x00ffcc, zone: 1 },
  
  // ZONE 2: HIDDEN A (Mid-Left)
  { id: 'overview', label: '8 Seminaries', color: 0x00ffcc, zone: 2 },
  { id: 'development', label: 'Ontwikkeling', color: 0x00ffcc, zone: 2 },
  { id: 'school_projects', label: 'School Projects', color: 0x00ffcc, zone: 2 },
  
  // ZONE 3: HIDDEN B (Mid-Right)
  { id: 'studiereis', label: 'Studiereis Duitsland', color: 0x00ffcc, zone: 3 },
  { id: 'hackathon', label: 'Hackathon #109', color: 0x00ffcc, zone: 3 },
  { id: 'sap_ai', label: 'SAP AI Innovatieroute', color: 0x00ffcc, zone: 3 },
  
  // ZONE 4: OUTPUT (Right)
  { id: 'reflection', label: 'Eindreflectie', color: 0x00ffcc, zone: 4 },
  { id: 'contact', label: 'Contact & Ondernemerschap', color: 0x00ffcc, zone: 4 }
]

const activeNodes = ref<any[]>([])

const initThree = () => {
  if (!canvas.value) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 5, 25)

  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // OrbitControls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.1
  controls.minDistance = 5
  controls.maxDistance = 60

  // 1. Create Active Neurons in Zones
  nodesGroup = new THREE.Group()
  scene.add(nodesGroup)

  const nodeGeometry = new THREE.IcosahedronGeometry(0.8, 2)
  const zoneWidth = 12
  const zoneX = [-18, -6, 6, 18]

  nodeData.forEach((data) => {
    const x = zoneX[data.zone - 1]
    
    // Distribute Y based on count in zone
    const nodesInZone = nodeData.filter(n => n.zone === data.zone)
    const indexInZone = nodesInZone.indexOf(data)
    const y = (indexInZone - (nodesInZone.length - 1) / 2) * 8
    const z = (Math.random() - 0.5) * 4

    const material = new THREE.MeshPhongMaterial({
      color: 0x00ffcc,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
      emissive: 0x00ffcc,
      emissiveIntensity: 0.5
    })
    
    const mesh = new THREE.Mesh(nodeGeometry, material)
    mesh.scale.setScalar(0.7)
    mesh.position.set(x, y, z)
    mesh.userData = { 
      id: data.id, 
      label: data.label, 
      zone: data.zone,
      pos2D: { x: 0, y: 0 },
      isHovered: false,
      originalScale: 0.7
    }
    nodesGroup.add(mesh)
    activeNodes.value.push(mesh)
  })

  // Brain Model (Centered in Zone 3 Neurons)
  const zone3Nodes = nodesGroup.children.filter((n: any) => n.userData.zone === 3)
  const zone3Center = new THREE.Vector3()
  zone3Nodes.forEach((n: any) => zone3Center.add(n.position))
  zone3Center.divideScalar(zone3Nodes.length)

  const loader = new GLTFLoader()
  loader.load('/brain.glb', (gltf) => {
    const brain = gltf.scene
    brain.scale.setScalar(0.007)
    brain.position.copy(zone3Center)
    
    brain.traverse((child: any) => {
      if (child.isMesh) {
        child.material.emissive = new THREE.Color(0x00ffcc)
        child.material.emissiveIntensity = 0.3
        child.material.transparent = true
        child.material.opacity = 0.6
      }
    })
    
    scene.add(brain)
    const brainLight = new THREE.PointLight(0x00ffcc, 20, 10)
    brainLight.position.copy(zone3Center)
    scene.add(brainLight)
  })

  // 2. Create Decorative Noise (150-200 nodes)
  const staticCount = 180
  const staticGeometry = new THREE.SphereGeometry(0.06, 8, 8)
  const staticMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffcc,
    transparent: true,
    opacity: 0.15
  })
  const instancedStaticNodes = new THREE.InstancedMesh(staticGeometry, staticMaterial, staticCount)
  
  const staticPositions: THREE.Vector3[] = []
  const dummy = new THREE.Object3D()
  for (let i = 0; i < staticCount; i++) {
    const pos = new THREE.Vector3(
      (Math.random() - 0.5) * 60,
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 30
    )
    dummy.position.copy(pos)
    dummy.updateMatrix()
    instancedStaticNodes.setMatrixAt(i, dummy.matrix)
    staticPositions.push(pos)
  }
  scene.add(instancedStaticNodes)

  // 3. Connections
  const activeLineMaterial = new THREE.LineBasicMaterial({ 
    color: 0x00ffcc, 
    transparent: true, 
    opacity: 0.3 
  })
  const staticLineMaterial = new THREE.LineBasicMaterial({ 
    color: 0x00ffcc, 
    transparent: true, 
    opacity: 0.05 
  })
  
  const activeLinePositions: number[] = []
  const staticLinePositions: number[] = []

  // Active Flow: Zone to Adjacent Zone
  nodesGroup.children.forEach((node1: any) => {
    const nextZoneNodes = nodesGroup.children.filter((n: any) => n.userData.zone === node1.userData.zone + 1)
    nextZoneNodes.forEach((node2: any) => {
      activeLinePositions.push(node1.position.x, node1.position.y, node1.position.z)
      activeLinePositions.push(node2.position.x, node2.position.y, node2.position.z)
    })
  })

  // Decorative Ruis: connect random static nodes
  for (let i = 0; i < staticCount; i++) {
    const p1 = staticPositions[i]
    // Connect to 1 random other static node to keep it light
    const j = Math.floor(Math.random() * staticCount)
    if (i !== j) {
      const p2 = staticPositions[j]
      if (p1.distanceTo(p2) < 15) {
        staticLinePositions.push(p1.x, p1.y, p1.z)
        staticLinePositions.push(p2.x, p2.y, p2.z)
      }
    }
  }

  const activeLineGeom = new THREE.BufferGeometry()
  activeLineGeom.setAttribute('position', new THREE.Float32BufferAttribute(activeLinePositions, 3))
  const activeLines = new THREE.LineSegments(activeLineGeom, activeLineMaterial)
  scene.add(activeLines)
  lines = activeLines // For sentiment changes

  const staticLineGeom = new THREE.BufferGeometry()
  staticLineGeom.setAttribute('position', new THREE.Float32BufferAttribute(staticLinePositions, 3))
  const staticLines = new THREE.LineSegments(staticLineGeom, staticLineMaterial)
  scene.add(staticLines)

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.2))
  const mainLight = new THREE.DirectionalLight(0xffffff, 1.0)
  mainLight.position.set(5, 10, 7)
  scene.add(mainLight)

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate)
    if (controls) controls.update()
    
    const time = Date.now() * 0.001
    
    // Raycasting for Hover
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(nodesGroup.children)
    
    nodesGroup.children.forEach((node: any) => {
      node.userData.isHovered = false
    })
    
    if (intersects.length > 0) {
      const hovered = intersects[0].object as any
      hovered.userData.isHovered = true
    }

    nodesGroup.children.forEach((node: any, i) => {
      node.rotation.y += 0.01
      
      // Dynamic pulsating + Hover response
      const targetScale = node.userData.isHovered ? node.userData.originalScale * 1.5 : node.userData.originalScale
      const currentScale = node.scale.x
      const lerpScale = THREE.MathUtils.lerp(currentScale, targetScale * (1 + Math.sin(time * 2 + i) * 0.1), 0.1)
      node.scale.setScalar(lerpScale)
      
      // Update label opacity based on hover or zoom
      const vector = node.position.clone().project(camera)
      node.userData.pos2D.x = (vector.x + 1) / 2 * window.innerWidth
      node.userData.pos2D.y = -(vector.y - 1) / 2 * window.innerHeight
    })

    if (renderer && scene && camera) renderer.render(scene, camera)
  }

  animate()
  window.addEventListener('click', onCanvasClick)
  window.addEventListener('mousemove', onMouseMove)
}

const getLabelStyle = (node: any) => ({
  left: `${node.userData.pos2D.x}px`,
  top: `${node.userData.pos2D.y - 45}px`,
  transform: 'translateX(-50%)'
})

const onMouseMove = (event: MouseEvent) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}

const onCanvasClick = () => {
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(nodesGroup.children)
  if (intersects.length > 0) {
    const target = intersects[0].object
    zoomToNode(target.position, target.userData.id)
  }
}

const zoomToNode = (position: THREE.Vector3, id: string) => {
  controls.enabled = false
  gsap.to(camera.position, {
    x: position.x * 1.2,
    y: position.y * 1.2,
    z: position.z * 1.2,
    duration: 1.5,
    ease: "power2.inOut",
    onUpdate: () => camera.lookAt(position),
    onComplete: () => {
      emit('node-selected', id)
    }
  })
}

const resetCamera = () => {
  controls.enabled = true
  gsap.to(camera.position, {
    x: 0, y: 5, z: 20,
    duration: 1.5,
    ease: "power2.inOut",
    onUpdate: () => camera.lookAt(0, 0, 0)
  })
  emit('overview-requested')
}

defineExpose({ resetCamera })

watch(() => props.sentiment, (s) => {
  if (!lines) return
  const color = s === 'positive' ? 0x00ffcc : s === 'alert' ? 0xff0055 : 0x007bff
  gsap.to((lines.material as THREE.LineBasicMaterial).color, {
    r: new THREE.Color(color).r, g: new THREE.Color(color).g, b: new THREE.Color(color).b,
    duration: 0.8
  })
})

onMounted(() => {
  initThree()
  window.addEventListener('resize', () => {
    if (!camera || !renderer) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('click', onCanvasClick)
  window.removeEventListener('mousemove', onMouseMove)
})
</script>
