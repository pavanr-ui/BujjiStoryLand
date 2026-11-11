<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

/**
 * Interactive Three.js jungle: drifting leaves, flowers and glowing
 * fireflies in depth, with soft sun glow. The camera follows the mouse.
 * Only mounted on desktop (see MagicalJungle.vue). Pauses when offscreen.
 */
const host = ref(null)
let renderer, scene, camera, raf, observer, ro
let visible = true
let onPointer = null
const pointer = { x: 0, y: 0 }
const disposables = []

function leafShape() {
  const s = new THREE.Shape()
  s.moveTo(0, -1)
  s.bezierCurveTo(0.75, -0.55, 0.75, 0.55, 0, 1)
  s.bezierCurveTo(-0.75, 0.55, -0.75, -0.55, 0, -1)
  return s
}

function flowerShape(petals = 5) {
  const s = new THREE.Shape()
  for (let i = 0; i <= 64; i++) {
    const a = (i / 64) * Math.PI * 2
    const r = 0.55 + 0.45 * Math.abs(Math.cos((petals / 2) * a))
    const x = Math.cos(a) * r
    const y = Math.sin(a) * r
    i === 0 ? s.moveTo(x, y) : s.lineTo(x, y)
  }
  return s
}

function glowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0, 'rgba(255,255,230,1)')
  grad.addColorStop(0.35, 'rgba(255,226,122,0.7)')
  grad.addColorStop(1, 'rgba(255,201,60,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 128, 128)
  const tex = new THREE.CanvasTexture(c)
  disposables.push(tex)
  return tex
}

function makeInstanced(geometry, material, count, spread, onInit) {
  const mesh = new THREE.InstancedMesh(geometry, material, count)
  const items = []
  const dummy = new THREE.Object3D()
  for (let i = 0; i < count; i++) {
    const item = {
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * spread.x,
        (Math.random() - 0.5) * spread.y,
        -Math.random() * spread.z,
      ),
      rot: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
      spin: new THREE.Vector3((Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.012),
      fall: 0.004 + Math.random() * 0.01,
      sway: Math.random() * Math.PI * 2,
      scale: 0.25 + Math.random() * 0.45,
    }
    onInit?.(mesh, i, item)
    items.push(item)
    dummy.position.copy(item.pos)
    dummy.rotation.copy(item.rot)
    dummy.scale.setScalar(item.scale)
    dummy.updateMatrix()
    mesh.setMatrixAt(i, dummy.matrix)
  }
  disposables.push(geometry, material)
  return { mesh, items, dummy, spread }
}

onMounted(() => {
  const el = host.value
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
  renderer.setSize(el.clientWidth, el.clientHeight)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  el.appendChild(renderer.domElement)

  scene = new THREE.Scene()
  scene.fog = new THREE.Fog('#0e3b2c', 6, 22)
  camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 60)
  camera.position.set(0, 0, 8)

  scene.add(new THREE.HemisphereLight('#fff6d8', '#1d6a4b', 1.6))
  const sun = new THREE.DirectionalLight('#ffe9a8', 1.4)
  sun.position.set(3, 6, 5)
  scene.add(sun)

  // Sun glow sprite
  const glowMat = new THREE.SpriteMaterial({ map: glowTexture(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })
  disposables.push(glowMat)
  const glow = new THREE.Sprite(glowMat)
  glow.scale.set(9, 9, 1)
  glow.position.set(3.5, 3.2, -10)
  scene.add(glow)

  const spread = { x: 18, y: 12, z: 14 }

  // Leaves
  const leafGeo = new THREE.ShapeGeometry(leafShape(), 12)
  const leafMat = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, roughness: 0.6, vertexColors: false })
  const leafPalette = ['#2d9448', '#3fae49', '#5cc45a', '#8bd65e', '#b8e35a'].map((c) => new THREE.Color(c))
  const leaves = makeInstanced(leafGeo, leafMat, 70, spread, (mesh, i) =>
    mesh.setColorAt(i, leafPalette[i % leafPalette.length]),
  )
  scene.add(leaves.mesh)

  // Flowers
  const flowerGeo = new THREE.ShapeGeometry(flowerShape(5), 1)
  const flowerMat = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, roughness: 0.4, emissive: '#331a00', emissiveIntensity: 0.25 })
  const flowerPalette = ['#ff6b9a', '#ffc93c', '#ff8a3d', '#c49bff', '#ffffff'].map((c) => new THREE.Color(c))
  const flowers = makeInstanced(flowerGeo, flowerMat, 26, spread, (mesh, i, item) => {
    mesh.setColorAt(i, flowerPalette[i % flowerPalette.length])
    item.scale *= 0.7
  })
  scene.add(flowers.mesh)

  // Fireflies
  const fireCount = 160
  const firePos = new Float32Array(fireCount * 3)
  const fireSeed = new Float32Array(fireCount)
  for (let i = 0; i < fireCount; i++) {
    firePos[i * 3] = (Math.random() - 0.5) * spread.x
    firePos[i * 3 + 1] = (Math.random() - 0.5) * spread.y
    firePos[i * 3 + 2] = -Math.random() * spread.z
    fireSeed[i] = Math.random() * Math.PI * 2
  }
  const fireGeo = new THREE.BufferGeometry()
  fireGeo.setAttribute('position', new THREE.BufferAttribute(firePos, 3))
  const fireMat = new THREE.PointsMaterial({
    size: 0.22,
    map: glowMat.map,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: '#fff3b0',
  })
  disposables.push(fireGeo, fireMat)
  const fireflies = new THREE.Points(fireGeo, fireMat)
  scene.add(fireflies)

  const groups = [leaves, flowers]

  onPointer = (e) => {
    const r = el.getBoundingClientRect()
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1
    pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1
  }
  el.addEventListener('pointermove', onPointer)

  observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
  observer.observe(el)
  ro = new ResizeObserver(() => {
    camera.aspect = el.clientWidth / el.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(el.clientWidth, el.clientHeight)
  })
  ro.observe(el)

  const clock = new THREE.Clock()
  const animate = () => {
    raf = requestAnimationFrame(animate)
    if (!visible || document.hidden) return
    const t = clock.getElapsedTime()

    for (const grp of groups) {
      grp.items.forEach((it, i) => {
        it.pos.y -= it.fall
        it.pos.x += Math.sin(t * 0.6 + it.sway) * 0.006
        it.rot.x += it.spin.x
        it.rot.y += it.spin.y
        it.rot.z += it.spin.z
        if (it.pos.y < -grp.spread.y / 2) it.pos.y = grp.spread.y / 2
        grp.dummy.position.copy(it.pos)
        grp.dummy.rotation.copy(it.rot)
        grp.dummy.scale.setScalar(it.scale)
        grp.dummy.updateMatrix()
        grp.mesh.setMatrixAt(i, grp.dummy.matrix)
      })
      grp.mesh.instanceMatrix.needsUpdate = true
    }

    const p = fireGeo.attributes.position.array
    for (let i = 0; i < fireCount; i++) {
      p[i * 3 + 1] += Math.sin(t + fireSeed[i]) * 0.004
      p[i * 3] += Math.cos(t * 0.7 + fireSeed[i]) * 0.003
    }
    fireGeo.attributes.position.needsUpdate = true
    fireMat.opacity = 0.75 + Math.sin(t * 2) * 0.2
    glow.material.opacity = 0.85 + Math.sin(t * 0.8) * 0.15

    camera.position.x += (pointer.x * 1.4 - camera.position.x) * 0.04
    camera.position.y += (-pointer.y * 0.9 - camera.position.y) * 0.04
    camera.lookAt(0, 0, -4)

    renderer.render(scene, camera)
  }
  animate()
})

onBeforeUnmount(() => {
  if (onPointer) host.value?.removeEventListener('pointermove', onPointer)
  cancelAnimationFrame(raf)
  observer?.disconnect()
  ro?.disconnect()
  disposables.forEach((d) => d.dispose?.())
  renderer?.dispose()
  renderer?.domElement?.remove()
})
</script>

<template>
  <div ref="host" class="absolute inset-0" aria-hidden="true" />
</template>
