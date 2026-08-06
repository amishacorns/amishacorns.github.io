type Rotation = { x: number; y: number; z: number }

export type FocusedCometMesh = {
  focus: (key: string, host: HTMLElement) => void
  clear: () => void
  rotateBy: (deltaX: number, deltaY: number) => void
  setDragging: (dragging: boolean) => void
}

const imageCache = new Map<string, Promise<HTMLImageElement>>()
const loadImage = (source: string) => {
  const cached = imageCache.get(source)
  if (cached) return cached
  const pending = new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.decoding = "async"
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = source
  })
  imageCache.set(source, pending)
  return pending
}

const drawFivePointStar = (context: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
  context.beginPath()
  for (let point = 0; point < 10; point += 1) {
    const angle = -Math.PI / 2 + point * Math.PI / 5
    const pointRadius = point % 2 === 0 ? radius : radius * 0.39
    const px = x + Math.cos(angle) * pointRadius
    const py = y + Math.sin(angle) * pointRadius
    if (point === 0) context.moveTo(px, py)
    else context.lineTo(px, py)
  }
  context.closePath()
  context.fill()
}

const drawBadge = async (context: CanvasRenderingContext2D, key: string, centerX: number, centerY: number) => {
  const designRadius = 53
  const hemisphereRadius = 128
  context.save()
  context.translate(centerX, centerY)
  context.scale(hemisphereRadius / designRadius, hemisphereRadius / designRadius)

  if (key === "USA") {
    context.fillStyle = "#fff"
    context.fillRect(-designRadius, -designRadius, designRadius * 2, designRadius * 2)
    context.fillStyle = "#b22234"
    for (let stripe = 0; stripe < 13; stripe += 2) {
      context.fillRect(-designRadius, -designRadius + stripe * (designRadius * 2 / 13), designRadius * 2, designRadius * 2 / 13)
    }
    context.fillStyle = "#3c3b6e"
    context.fillRect(-designRadius, -designRadius, designRadius * 1.16, designRadius * 1.08)
    context.fillStyle = "#fff"
    for (let row = 0; row < 5; row += 1) {
      for (let column = 0; column < 6; column += 1) {
        context.beginPath()
        context.arc(-designRadius + 9 + column * 9.2, -designRadius + 9 + row * 10, 1.45, 0, Math.PI * 2)
        context.fill()
      }
    }
  } else if (key === "PRC") {
    context.fillStyle = "#de2910"
    context.fillRect(-designRadius, -designRadius, designRadius * 2, designRadius * 2)
    context.fillStyle = "#ffde00"
    drawFivePointStar(context, -22, -18, 15)
    drawFivePointStar(context, 1, -31, 5.5)
    drawFivePointStar(context, 14, -17, 5.5)
    drawFivePointStar(context, 13, 1, 5.5)
    drawFivePointStar(context, 0, 14, 5.5)
  } else if (key === "GOOG") {
    context.fillStyle = "#f8f9fa"
    context.fillRect(-designRadius, -designRadius, designRadius * 2, designRadius * 2)
    const image = await loadImage("/images/google-g.svg")
    const side = 94
    context.scale(-1, 1)
    context.drawImage(image, -side / 2, -side / 2, side, side)
  } else if (key === "GEM") {
    const background = context.createLinearGradient(-designRadius, designRadius, designRadius, -designRadius)
    background.addColorStop(0, "#dff7ff")
    background.addColorStop(0.5, "#e8ecff")
    background.addColorStop(1, "#f2e4ff")
    context.fillStyle = background
    context.fillRect(-designRadius, -designRadius, designRadius * 2, designRadius * 2)
    const gradient = context.createLinearGradient(-38, 38, 38, -38)
    gradient.addColorStop(0, "#55c8f3")
    gradient.addColorStop(0.5, "#7c8df5")
    gradient.addColorStop(1, "#c58af9")
    context.fillStyle = gradient
    context.beginPath()
    context.moveTo(0, -43)
    context.bezierCurveTo(5, -17, 17, -5, 43, 0)
    context.bezierCurveTo(17, 5, 5, 17, 0, 43)
    context.bezierCurveTo(-5, 17, -17, 5, -43, 0)
    context.bezierCurveTo(-17, -5, -5, -17, 0, -43)
    context.fill()
  } else if (key === "TSLA") {
    context.fillStyle = "#f5f5f5"
    context.fillRect(-designRadius, -designRadius, designRadius * 2, designRadius * 2)
    context.fillStyle = "#e82127"
    context.beginPath()
    context.moveTo(-42, -25)
    context.quadraticCurveTo(0, -43, 42, -25)
    context.lineTo(38, -16)
    context.quadraticCurveTo(0, -31, -38, -16)
    context.closePath()
    context.fill()
    context.beginPath()
    context.moveTo(-31, -12)
    context.quadraticCurveTo(0, -27, 31, -12)
    context.lineTo(18, 7)
    context.quadraticCurveTo(9, 1, 5, 0)
    context.lineTo(1, 44)
    context.lineTo(-1, 44)
    context.lineTo(-5, 0)
    context.quadraticCurveTo(-9, 1, -18, 7)
    context.closePath()
    context.fill()
  } else {
    const sources: Record<string, string> = {
      CU: "/images/cornell-block-c.svg",
      CT: "/images/cornell-tech-mark.webp",
      MJOLNIR: "/images/master-chief-helmet-v2.webp",
    }
    const source = sources[key]
    if (source) {
      context.fillStyle = key === "MJOLNIR" ? "#26331e" : "#f7f7f7"
      context.fillRect(-designRadius, -designRadius, designRadius * 2, designRadius * 2)
      const image = await loadImage(source)
      const imageScale = key === "MJOLNIR" ? 1.12 : 0.98
      const side = designRadius * 2 * imageScale
      const width = key === "CU" ? side * 0.76 : side
      if (key === "CU") context.scale(-1, 1)
      context.drawImage(image, -width / 2, -side / 2, width, side)
    }
  }
  context.restore()
}

export const createCometDecal = async (key: string) => {
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 256
  const context = canvas.getContext("2d")
  if (!context) return canvas
  await drawBadge(context, key, 128, 128)
  await drawBadge(context, key, 384, 128)
  return canvas
}

export type OrbitCometAtlas = {
  canvas: HTMLCanvasElement | HTMLImageElement
  columns: number
  frameCount: number
  frameSize: number
}

const staticAtlasCache = new Map<string, Promise<OrbitCometAtlas>>()
export const loadOrbitCometAtlas = (key: string): Promise<OrbitCometAtlas> => {
  const cached = staticAtlasCache.get(key)
  if (cached) return cached
  const pending = loadImage(`/images/comet-atlases/${key.toLowerCase()}.webp?v=atlas-48-2`).then((image) => ({
    canvas: image,
    columns: 8,
    frameCount: 48,
    frameSize: 72,
  }))
  staticAtlasCache.set(key, pending)
  return pending
}

const atlasCache = new Map<string, Promise<OrbitCometAtlas>>()
const yieldAtlasWork = () => new Promise<void>((resolve) => {
  const idleCallback = (window as Window & { requestIdleCallback?: typeof window.requestIdleCallback }).requestIdleCallback
  if (idleCallback) {
    idleCallback(() => resolve(), { timeout: 80 })
  } else {
    setTimeout(resolve, 0)
  }
})

export const createOrbitCometAtlas = (key: string, frameSize = 72, frameCount = 48) => {
  const cacheKey = `${key}:${frameSize}:${frameCount}`
  const cached = atlasCache.get(cacheKey)
  if (cached) return cached
  const pending = (async () => {
    const columns = 8
    const rows = Math.ceil(frameCount / columns)
    const atlas = document.createElement("canvas")
    atlas.width = columns * frameSize
    atlas.height = rows * frameSize
    const atlasContext = atlas.getContext("2d")
    const frame = document.createElement("canvas")
    frame.width = frameSize
    frame.height = frameSize
    const frameContext = frame.getContext("2d")
    if (!atlasContext || !frameContext) return { canvas: atlas, columns, frameCount, frameSize }

    const surface = document.createElement("canvas")
    surface.width = 512
    surface.height = 256
    const surfaceContext = surface.getContext("2d", { willReadFrequently: true })
    if (!surfaceContext) return { canvas: atlas, columns, frameCount, frameSize }
    const [rock, decal] = await Promise.all([
      loadImage("/images/agi-asteroid-surface-v2.webp"),
      createCometDecal(key),
    ])
    surfaceContext.drawImage(rock, 0, 0, surface.width, surface.height)
    const rockPixels = surfaceContext.getImageData(0, 0, surface.width, surface.height).data
    surfaceContext.drawImage(decal, 0, 0)
    const texture = surfaceContext.getImageData(0, 0, surface.width, surface.height)
    const texturePixels = texture.data
    const output = frameContext.createImageData(frameSize, frameSize)
    const outputPixels = output.data
    const center = (frameSize - 1) / 2
    const baseRadius = frameSize * 0.45
    const tau = Math.PI * 2
    const framesPerChunk = window.matchMedia("(max-width: 700px)").matches ? 3 : 8

    for (let frameIndex = 0; frameIndex < frameCount; frameIndex += 1) {
      outputPixels.fill(0)
      const rotation = frameIndex / frameCount * tau
      const cosineRotation = Math.cos(rotation)
      const sineRotation = Math.sin(rotation)
      for (let y = 0; y < frameSize; y += 1) {
        for (let x = 0; x < frameSize; x += 1) {
          const screenX = (x - center) / baseRadius
          const screenY = (y - center) / baseRadius
          const polarAngle = Math.atan2(screenY, screenX)
          const edgeNoise =
            1 +
            0.068 * Math.sin(polarAngle * 5 + rotation * 1.3) +
            0.036 * Math.sin(polarAngle * 9 - rotation * 0.7) +
            0.021 * Math.sin(polarAngle * 17 + rotation * 1.9) +
            0.012 * Math.sin(polarAngle * 29 - rotation * 2.3)
          const radiusSquared = (screenX * screenX + screenY * screenY) / (edgeNoise * edgeNoise)
          if (radiusSquared >= 1) continue
          const normalX = screenX / edgeNoise
          const normalY = -screenY / edgeNoise
          const normalZ = Math.sqrt(Math.max(0, 1 - normalX * normalX - normalY * normalY))
          const bodyX = normalX * cosineRotation + normalZ * sineRotation
          const bodyZ = -normalX * sineRotation + normalZ * cosineRotation
          const longitude = (Math.atan2(bodyZ, bodyX) / tau + 1) % 1
          const latitude = Math.acos(Math.max(-1, Math.min(1, normalY))) / Math.PI
          const textureX = Math.min(surface.width - 1, Math.floor(longitude * surface.width))
          const textureY = Math.min(surface.height - 1, Math.floor(latitude * surface.height))
          const textureOffset = (textureY * surface.width + textureX) * 4
          const light = Math.max(0, normalX * -0.48 + normalY * 0.45 + normalZ * 0.75)
          const grain = rockPixels[textureOffset] / 255
          const relief = 0.9 + 0.1 * Math.sin(bodyX * 19 + normalY * 13 + bodyZ * 23)
          const shade = (0.27 + light * 0.58) * (0.76 + grain * 0.3) * relief
          const red = texturePixels[textureOffset]
          const green = texturePixels[textureOffset + 1]
          const blue = texturePixels[textureOffset + 2]
          const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722
          const saturation = 0.7
          const outputOffset = (y * frameSize + x) * 4
          outputPixels[outputOffset] = Math.min(255, (luminance + (red - luminance) * saturation) * shade)
          outputPixels[outputOffset + 1] = Math.min(255, (luminance + (green - luminance) * saturation) * shade)
          outputPixels[outputOffset + 2] = Math.min(255, (luminance + (blue - luminance) * saturation) * shade)
          outputPixels[outputOffset + 3] = 255
        }
      }
      frameContext.putImageData(output, 0, 0)
      atlasContext.drawImage(
        frame,
        (frameIndex % columns) * frameSize,
        Math.floor(frameIndex / columns) * frameSize,
      )
      if ((frameIndex + 1) % framesPerChunk === 0 && frameIndex + 1 < frameCount) {
        await yieldAtlasWork()
      }
    }
    return { canvas: atlas, columns, frameCount, frameSize }
  })()
  atlasCache.set(cacheKey, pending)
  return pending
}

export const createFocusedCometMesh = (canvas: HTMLCanvasElement): FocusedCometMesh | null => {
  const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true })
  if (!gl) return null
  gl.viewport(0, 0, canvas.width, canvas.height)

  const vertexSource = `
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec2 aUv;
    uniform vec3 uAngles;
    varying vec3 vNormal;
    varying vec2 vUv;
    vec3 rotateObject(vec3 p) {
      float cx = cos(uAngles.x), sx = sin(uAngles.x);
      float cy = cos(uAngles.y), sy = sin(uAngles.y);
      float cz = cos(uAngles.z), sz = sin(uAngles.z);
      p = vec3(p.x, cx * p.y - sx * p.z, sx * p.y + cx * p.z);
      p = vec3(cy * p.x + sy * p.z, p.y, -sy * p.x + cy * p.z);
      return vec3(cz * p.x - sz * p.y, sz * p.x + cz * p.y, p.z);
    }
    void main() {
      vec3 position = rotateObject(aPosition);
      vNormal = normalize(rotateObject(aNormal));
      vUv = aUv;
      float perspective = 1.82 / (3.7 - position.z);
      gl_Position = vec4(position.xy * perspective, -position.z * 0.12, 1.0);
    }
  `
  const fragmentSource = `
    precision mediump float;
    uniform sampler2D uRock;
    uniform sampler2D uDecal;
    varying vec3 vNormal;
    varying vec2 vUv;
    void main() {
      float grain = texture2D(uRock, vUv * vec2(1.7, 1.25)).r;
      vec4 decal = texture2D(uDecal, vUv);
      vec3 normal = normalize(vNormal);
      vec3 lightDirection = normalize(vec3(-0.72, 0.58, 0.84));
      float diffuse = max(dot(normal, lightDirection), 0.0);
      float rim = pow(1.0 - max(normal.z, 0.0), 3.0);
      vec3 rock = mix(vec3(0.05, 0.047, 0.043), vec3(0.31, 0.28, 0.24), grain);
      vec3 base = rock * (0.28 + diffuse * 0.64) + vec3(0.05, 0.03, 0.018) * rim;
      float decalLuminance = dot(decal.rgb, vec3(0.2126, 0.7152, 0.0722));
      vec3 mutedDecal = mix(vec3(decalLuminance), decal.rgb, 0.7);
      vec3 litDecal = mutedDecal * (0.34 + diffuse * 0.54) * mix(0.76, 0.98, grain);
      vec3 color = mix(base, litDecal, decal.a * 0.96);
      gl_FragColor = vec4(color, 1.0);
    }
  `
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)
    if (!shader) return null
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null
    return shader
  }
  const vertexShader = compile(gl.VERTEX_SHADER, vertexSource)
  const fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentSource)
  if (!vertexShader || !fragmentShader) return null
  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  gl.useProgram(program)

  const compact = window.matchMedia("(max-width: 700px)").matches
  const latitudeSegments = compact ? 22 : 36
  const longitudeSegments = compact ? 32 : 54
  const positions: number[] = []
  const normals: number[] = []
  const uvs: number[] = []
  const indices: number[] = []
  for (let latitude = 0; latitude <= latitudeSegments; latitude += 1) {
    const v = latitude / latitudeSegments
    const theta = v * Math.PI
    for (let longitude = 0; longitude <= longitudeSegments; longitude += 1) {
      const u = longitude / longitudeSegments
      const phi = u * Math.PI * 2
      const nx = Math.sin(theta) * Math.cos(phi)
      const ny = Math.cos(theta)
      const nz = Math.sin(theta) * Math.sin(phi)
      const roughness =
        Math.sin(nx * 5.3 + ny * 2.7 - nz * 3.9) * 0.06 +
        Math.sin(nx * 9.1 - ny * 6.4 + nz * 4.2) * 0.034 +
        Math.sin((nx - ny + nz) * 15.7) * 0.022 +
        Math.sin((nx + ny * 0.7 - nz * 1.3) * 28.6) * 0.012
      let radius = 1 + roughness
      const crater = Math.hypot(nx - 0.28, ny - 0.36, nz - 0.83)
      if (crater < 0.34) radius -= (1 - crater / 0.34) * 0.12
      const craterTwo = Math.hypot(nx + 0.62, ny + 0.18, nz - 0.54)
      if (craterTwo < 0.25) radius -= (1 - craterTwo / 0.25) * 0.08
      const craterThree = Math.hypot(nx - 0.47, ny + 0.71, nz + 0.28)
      if (craterThree < 0.2) radius -= (1 - craterThree / 0.2) * 0.06
      positions.push(nx * radius * 1.07, ny * radius * 0.93, nz * radius * 0.98)
      const normalWarp = Math.sin((nx - ny * 1.3 + nz * 0.8) * 18.4) * 0.065
      normals.push(nx + normalWarp, ny - normalWarp * 0.72, nz + normalWarp * 0.45)
      uvs.push(u, 1 - v)
    }
  }
  for (let latitude = 0; latitude < latitudeSegments; latitude += 1) {
    for (let longitude = 0; longitude < longitudeSegments; longitude += 1) {
      const first = latitude * (longitudeSegments + 1) + longitude
      const second = first + longitudeSegments + 1
      indices.push(first, first + 1, second, second, first + 1, second + 1)
    }
  }
  const bindAttribute = (name: string, values: Float32Array, size: number) => {
    const buffer = gl.createBuffer()
    const location = gl.getAttribLocation(program, name)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, values, gl.STATIC_DRAW)
    gl.enableVertexAttribArray(location)
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0)
  }
  bindAttribute("aPosition", new Float32Array(positions), 3)
  bindAttribute("aNormal", new Float32Array(normals), 3)
  bindAttribute("aUv", new Float32Array(uvs), 2)
  const indexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)

  const createTexture = (unit: number) => {
    const texture = gl.createTexture()
    gl.activeTexture(gl.TEXTURE0 + unit)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    return texture
  }
  const rockTexture = createTexture(0)
  const decalTexture = createTexture(1)
  gl.activeTexture(gl.TEXTURE1)
  gl.bindTexture(gl.TEXTURE_2D, decalTexture)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]))
  gl.uniform1i(gl.getUniformLocation(program, "uRock"), 0)
  gl.uniform1i(gl.getUniformLocation(program, "uDecal"), 1)
  loadImage("/images/agi-asteroid-surface-v2.webp").then((image) => {
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, rockTexture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
  })

  const anglesLocation = gl.getUniformLocation(program, "uAngles")
  const rotations = new Map<string, Rotation>()
  let rotation: Rotation = { x: 0.18, y: 0, z: -0.08 }
  let activeKey = ""
  let active = false
  let dragging = false
  let textureRequest = 0
  let animationFrame = 0
  let previousTime = performance.now()
  gl.enable(gl.DEPTH_TEST)
  gl.enable(gl.CULL_FACE)
  gl.clearColor(0, 0, 0, 0)

  const draw = (time: number) => {
    animationFrame = 0
    if (!active) return
    const elapsed = Math.min(80, time - previousTime)
    previousTime = time
    if (!dragging) rotation.y += elapsed * 0.00012
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.uniform3f(anglesLocation, rotation.x, rotation.y, rotation.z)
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
    animationFrame = requestAnimationFrame(draw)
  }
  const resume = () => {
    if (!animationFrame) {
      previousTime = performance.now()
      animationFrame = requestAnimationFrame(draw)
    }
  }
  const focus = (key: string, host: HTMLElement) => {
    if (activeKey) rotations.set(activeKey, rotation)
    activeKey = key
    rotation = rotations.get(key) ?? { x: 0.18, y: 0, z: -0.08 }
    host.appendChild(canvas)
    canvas.hidden = false
    active = true
    const request = ++textureRequest
    createCometDecal(key).then((decal) => {
      if (request !== textureRequest) return
      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, decalTexture)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, decal)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0)
    })
    resume()
  }
  const clear = () => {
    if (activeKey) rotations.set(activeKey, rotation)
    active = false
    dragging = false
    activeKey = ""
    canvas.hidden = true
    if (animationFrame) cancelAnimationFrame(animationFrame)
    animationFrame = 0
  }
  return {
    focus,
    clear,
    rotateBy: (deltaX, deltaY) => {
      rotation.y += deltaX * 0.012
      rotation.x -= deltaY * 0.012
      resume()
    },
    setDragging: (value) => { dragging = value },
  }
}
