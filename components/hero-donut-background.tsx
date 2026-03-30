'use client'

import { useEffect, useRef } from 'react'

type BackgroundCell = {
  angle: number
  char: string
  dist: number
  fontIndex: number
  upper: boolean
  width: number
  x: number
}

type TorusCell = {
  char: string
  italic: boolean
  width: number
  x: number
}

type DrawCommand = {
  char: string
  color: string
  font: string
  x: number
  y: number
}

const BG_WEIGHTS = [450, 500, 550, 600, 650, 700, 750, 800, 850]
const TORUS_WEIGHTS = [200, 375, 550, 725, 900]
const FONT_FAMILY = 'Inter, ui-sans-serif, system-ui, sans-serif'
const BG_WORD = 'abir '
const TORUS_WORD = 'pahlwan'
const SAMPLE_STEP = 3
const U_STEPS = 72
const V_STEPS = 36
const MAJOR_R = 0.42
const MINOR_R = 0.14
const TWO_PI = Math.PI * 2

function getResponsiveMetrics() {
  return window.innerWidth < 768
    ? { fontSize: 8, lineHeight: 10 }
    : { fontSize: 11, lineHeight: 13 }
}

function pointInTriangle(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number
) {
  const d1 = (px - bx) * (ay - by) - (ax - bx) * (py - by)
  const d2 = (px - cx) * (by - cy) - (bx - cx) * (py - cy)
  const d3 = (px - ax) * (cy - ay) - (cx - ax) * (py - ay)

  return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0))
}

function pointInQuad(
  px: number,
  py: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
) {
  return (
    pointInTriangle(px, py, x0, y0, x1, y1, x2, y2) ||
    pointInTriangle(px, py, x0, y0, x2, y2, x3, y3)
  )
}

export function HeroDonutBackground() {
  const frameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const frameEl = frameRef.current
    const canvas = canvasRef.current
    if (!frameEl || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const measureCanvas = document.createElement('canvas')
    measureCanvas.width = 200
    measureCanvas.height = 40
    const measureCtx = measureCanvas.getContext('2d')
    if (!measureCtx) return

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let fontSize = getResponsiveMetrics().fontSize
    let lineHeight = getResponsiveMetrics().lineHeight
    let rows = 0
    let bufW = 0
    let brightBuf = new Float32Array(0)
    let zBuf = new Float32Array(0)
    let bgGrid: BackgroundCell[][] = []
    let torusGrid: TorusCell[][] = []
    let bgFonts: string[] = []
    let bgWidthTable: Record<string, number[]> = {}

    let dragActive = false
    let dragLastX = 0
    let dragLastY = 0
    let angleX = 0
    let angleY = 0
    let velX = 0.4
    let velY = 0.3
    const autoVelX = 0.4
    const autoVelY = 0.3
    const blendRate = 0.02
    let lastFrameTime = performance.now() / 1000
    let smoothEnergy = 1
    let flowTime = 0
    let animationFrame = 0
    let resizeTimer = 0
    let gridSeed = 42

    const baseVerts: Array<Array<{ x: number; y: number; z: number }>> = []
    const baseNormals: Array<Array<{ x: number; y: number; z: number }>> = []

    for (let i = 0; i < U_STEPS; i += 1) {
      const vRow: Array<{ x: number; y: number; z: number }> = []
      const nRow: Array<{ x: number; y: number; z: number }> = []
      const u = (i / U_STEPS) * TWO_PI
      const cu = Math.cos(u)
      const su = Math.sin(u)

      for (let j = 0; j < V_STEPS; j += 1) {
        const v = (j / V_STEPS) * TWO_PI
        const cv = Math.cos(v)
        const sv = Math.sin(v)

        vRow.push({
          x: (MAJOR_R + MINOR_R * cv) * cu,
          y: (MAJOR_R + MINOR_R * cv) * su,
          z: MINOR_R * sv,
        })
        nRow.push({ x: cv * cu, y: cv * su, z: sv })
      }

      baseVerts.push(vRow)
      baseNormals.push(nRow)
    }

    const vertCount = U_STEPS * V_STEPS
    const projX = new Float32Array(vertCount)
    const projY = new Float32Array(vertCount)
    const projZ = new Float32Array(vertCount)

    const measureCharWidth = (char: string, font: string) => {
      measureCtx.font = font
      return measureCtx.measureText(char).width
    }

    const buildBackgroundFonts = () => {
      const styles = ['normal', 'italic'] as const
      return styles.flatMap((style) =>
        BG_WEIGHTS.map(
          (weight) => `${style === 'italic' ? 'italic ' : ''}${weight} ${fontSize}px ${FONT_FAMILY}`
        )
      )
    }

    const refreshTables = () => {
      bgFonts = buildBackgroundFonts()
      bgWidthTable = {}

      for (const char of 'dearDEAR ') {
        bgWidthTable[char] = bgFonts.map((font) => measureCharWidth(char, font))
      }
    }

    const gridRand = () => {
      gridSeed = (gridSeed * 1664525 + 1013904223) & 0x7fffffff
      return gridSeed / 0x7fffffff
    }

    const initGrid = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      ;({ fontSize, lineHeight } = getResponsiveMetrics())
      refreshTables()

      const bounds = frameEl.getBoundingClientRect()
      const width = Math.max(1, Math.floor(bounds.width))
      const height = Math.max(1, Math.floor(bounds.height))

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      rows = Math.max(1, Math.floor(height / lineHeight))
      bufW = Math.max(1, Math.ceil(width / SAMPLE_STEP))
      brightBuf = new Float32Array(rows * bufW)
      zBuf = new Float32Array(rows * bufW)

      gridSeed = 42
      bgGrid = new Array(rows)
      for (let rowIndex = 0; rowIndex < rows; rowIndex += 1) {
        const row: BackgroundCell[] = []
        const startOffset = Math.floor(gridRand() * (BG_WORD.length - 1))
        let x = 0
        let wordPos = startOffset
        let fontIndex = 0
        let useUpper = false

        while (x < width) {
          const charIndex = wordPos % BG_WORD.length
          if (charIndex === 0 || wordPos === startOffset) {
            fontIndex = Math.floor(gridRand() * bgFonts.length)
            useUpper = gridRand() > 0.5
          }

          const baseChar = BG_WORD[charIndex]
          const char = baseChar === ' ' ? ' ' : useUpper ? baseChar.toUpperCase() : baseChar
          const charWidth = bgWidthTable[char]?.[fontIndex] ?? measureCharWidth(char, bgFonts[fontIndex])

          row.push({
            angle: 0,
            char,
            dist: 0,
            fontIndex,
            upper: useUpper,
            width: charWidth,
            x,
          })

          x += charWidth
          wordPos += 1
        }

        while (row.length > 0 && row[row.length - 1]?.char !== ' ') {
          row.pop()
        }
        if (row[row.length - 1]?.char === ' ') {
          row.pop()
        }

        if (row.length > 1) {
          const usedWidth = row.reduce((total, cell) => total + cell.width, 0)
          const spaceCount = row.filter((cell) => cell.char === ' ').length
          const extraSpace = spaceCount > 0 ? (width - usedWidth) / spaceCount : 0
          let justifiedX = 0

          for (const cell of row) {
            cell.x = justifiedX
            justifiedX += cell.width
            if (cell.char === ' ') justifiedX += extraSpace
          }
        }

        const cy = rowIndex * lineHeight + lineHeight * 0.5
        for (const cell of row) {
          const dx = cell.x + cell.width * 0.5 - width * 0.72
          const dy = cy - height * 0.56
          cell.angle = Math.atan2(dy, dx)
          cell.dist = Math.sqrt(dx * dx + dy * dy)
        }

        bgGrid[rowIndex] = row
      }

      gridSeed = 137
      torusGrid = new Array(rows)
      for (let rowIndex = 0; rowIndex < rows; rowIndex += 1) {
        const row: TorusCell[] = []
        let x = -gridRand() * 40
        let wordPos = 0
        let useUpper = false
        let useItalic = false

        while (x < width) {
          const charIndex = wordPos % TORUS_WORD.length
          if (charIndex === 0) {
            useUpper = gridRand() > 0.5
            useItalic = gridRand() > 0.7
          }

          const baseChar = TORUS_WORD[charIndex]
          const char = useUpper ? baseChar.toUpperCase() : baseChar
          const font = `${useItalic ? 'italic ' : ''}700 ${fontSize}px ${FONT_FAMILY}`
          const charWidth = measureCharWidth(char, font)

          row.push({ char, italic: useItalic, width: charWidth, x })
          x += charWidth
          wordPos += 1
        }

        torusGrid[rowIndex] = row
      }
    }

    const computeTorus = (width: number, height: number) => {
      const fov = Math.min(width, height) * 1.38
      const camDist = 2
      const cay = Math.cos(angleX)
      const say = Math.sin(angleX)
      const cax = Math.cos(angleY)
      const sax = Math.sin(angleY)

      const lx = 0.4
      const ly = -0.6
      const lz = 1
      const ll = Math.hypot(lx, ly, lz)
      const lnx = lx / ll
      const lny = ly / ll
      const lnz = lz / ll

      const flx = -0.3
      const fly = 0.3
      const flz = 0.5
      const fll = Math.hypot(flx, fly, flz)
      const fnx = flx / fll
      const fny = fly / fll
      const fnz = flz / fll

      const cx = width < 768 ? width * 0.5 + 4 * lineHeight : width * 0.72 + 4 * lineHeight
      const cy = width < 768 ? height * 0.5 + 4 * lineHeight : height * 0.48 + 4 * lineHeight

      brightBuf.fill(0)
      zBuf.fill(Number.NEGATIVE_INFINITY)

      for (let i = 0; i < U_STEPS; i += 1) {
        for (let j = 0; j < V_STEPS; j += 1) {
          const point = baseVerts[i][j]
          const x1 = point.x * cay + point.z * say
          const y1 = point.y
          const z1 = -point.x * say + point.z * cay
          const ry = y1 * cax - z1 * sax
          const rz = y1 * sax + z1 * cax

          const index = i * V_STEPS + j
          const d = camDist - rz
          projX[index] = cx + (x1 * fov) / d
          projY[index] = cy + (ry * fov) / d
          projZ[index] = rz
        }
      }

      for (let i = 0; i < U_STEPS; i += 1) {
        const nextI = (i + 1) % U_STEPS

        for (let j = 0; j < V_STEPS; j += 1) {
          const nextJ = (j + 1) % V_STEPS
          const n0 = baseNormals[i][j]
          const n1 = baseNormals[nextI][j]
          const n2 = baseNormals[i][nextJ]
          const n3 = baseNormals[nextI][nextJ]

          const anx = (n0.x + n1.x + n2.x + n3.x) * 0.25
          const any = (n0.y + n1.y + n2.y + n3.y) * 0.25
          const anz = (n0.z + n1.z + n2.z + n3.z) * 0.25

          const nx1 = anx * cay + anz * say
          const ny1 = any
          const nz1 = -anx * say + anz * cay
          const rnx = nx1
          const rny = ny1 * cax - nz1 * sax
          const rnz = ny1 * sax + nz1 * cax

          const diffuse = Math.max(0, rnx * lnx + rny * lny + rnz * lnz)
          const fill = Math.max(0, rnx * fnx + rny * fny + rnz * fnz) * 0.4
          const facing = Math.max(0, rnz)
          const hx = lnx
          const hy = lny
          const hz = lnz + 1
          const specDot = (rnx * hx + rny * hy + rnz * hz) / Math.hypot(hx, hy, hz)
          const spec = Math.pow(Math.max(0, specDot), 16) * 0.3
          const rawBrightness = diffuse * 0.5 + fill + facing * 0.2 + spec + 0.05
          const brightness = Math.pow(Math.min(1, rawBrightness), 0.7)

          const i0 = i * V_STEPS + j
          const i1 = nextI * V_STEPS + j
          const i2 = i * V_STEPS + nextJ
          const i3 = nextI * V_STEPS + nextJ
          const avgZ = (projZ[i0] + projZ[i1] + projZ[i2] + projZ[i3]) * 0.25

          const sx0 = projX[i0] / SAMPLE_STEP
          const sy0 = projY[i0] / lineHeight
          const sx1 = projX[i1] / SAMPLE_STEP
          const sy1 = projY[i1] / lineHeight
          const sx2 = projX[i2] / SAMPLE_STEP
          const sy2 = projY[i2] / lineHeight
          const sx3 = projX[i3] / SAMPLE_STEP
          const sy3 = projY[i3] / lineHeight

          const minCol = Math.max(0, Math.floor(Math.min(sx0, sx1, sx2, sx3)))
          const maxCol = Math.min(bufW - 1, Math.ceil(Math.max(sx0, sx1, sx2, sx3)))
          const minRow = Math.max(0, Math.floor(Math.min(sy0, sy1, sy2, sy3)))
          const maxRow = Math.min(rows - 1, Math.ceil(Math.max(sy0, sy1, sy2, sy3)))

          for (let row = minRow; row <= maxRow; row += 1) {
            for (let col = minCol; col <= maxCol; col += 1) {
              const cellIndex = row * bufW + col
              if (avgZ <= zBuf[cellIndex]) continue

              const px = col + 0.5
              const py = row + 0.5
              if (pointInQuad(px, py, sx0, sy0, sx1, sy1, sx3, sy3, sx2, sy2)) {
                zBuf[cellIndex] = avgZ
                brightBuf[cellIndex] = brightness
              }
            }
          }
        }
      }
    }

    const render = (now: number) => {
      const t = now / 1000
      const width = canvas.width / dpr
      const height = canvas.height / dpr
      let dt = t - lastFrameTime
      lastFrameTime = t
      if (dt > 0.1) dt = 0.016

      if (!dragActive) {
        const speed = Math.hypot(velX, velY)
        const autoSpeed = Math.hypot(autoVelX, autoVelY)

        if (speed > 0.001) {
          const dirX = velX / speed
          const dirY = velY / speed
          const nextSpeed = speed + (autoSpeed - speed) * blendRate
          velX = dirX * nextSpeed
          velY = dirY * nextSpeed
        } else {
          velX += (autoVelX - velX) * blendRate
          velY += (autoVelY - velY) * blendRate
        }

        angleX += velX * dt
        angleY += velY * dt
      }

      const currentSpeed = Math.hypot(velX, velY)
      const autoSpeedRef = Math.hypot(autoVelX, autoVelY)
      const rawEnergy = Math.max(1, currentSpeed / autoSpeedRef)
      const targetEnergy = 1 + (rawEnergy - 1) * 0.03
      smoothEnergy += (targetEnergy - smoothEnergy) * 0.03
      flowTime += dt * smoothEnergy

      computeTorus(width, height)

      ctx.clearRect(0, 0, width, height)
      ctx.textBaseline = 'middle'

      const drawCommands: DrawCommand[] = []
      const gapSamples = Math.ceil((fontSize * 2) / SAMPLE_STEP)

      for (let rowIndex = 0; rowIndex < rows; rowIndex += 1) {
        const cy = rowIndex * lineHeight + lineHeight * 0.5
        const row = bgGrid[rowIndex] ?? []

        for (const cell of row) {
          const sampleX = Math.floor((cell.x + cell.width * 0.5) / SAMPLE_STEP)
          const clampedSample = Math.max(0, Math.min(bufW - 1, sampleX))

          if (brightBuf[rowIndex * bufW + clampedSample] > 0.02) continue

          let nearTorus = false
          for (let gx = -gapSamples; gx <= gapSamples; gx += 1) {
            const sx = clampedSample + gx
            if (sx >= 0 && sx < bufW && brightBuf[rowIndex * bufW + sx] > 0.02) {
              nearTorus = true
              break
            }
          }

          if (nearTorus) continue

          const rays = Math.sin(cell.angle * 8 + flowTime * 0.4) * 0.4 * smoothEnergy
          const pulse = Math.sin(cell.dist * 0.008 - flowTime * 0.6) * 0.3 * smoothEnergy
          const flowVal = rays + pulse
          const fontShift = Math.round((flowVal * 0.5 + 0.5) * (bgFonts.length - 1))
          const fontIndex = Math.max(0, Math.min(bgFonts.length - 1, cell.fontIndex + fontShift - Math.floor(bgFonts.length / 2)))
          const opacity = cell.upper ? 0.042 : 0.028

          drawCommands.push({
            char: cell.char,
            color: `rgba(0, 0, 0, ${opacity.toFixed(2)})`,
            font: bgFonts[fontIndex],
            x: cell.x,
            y: cy,
          })
        }
      }

      for (let rowIndex = 0; rowIndex < rows; rowIndex += 1) {
        const cy = rowIndex * lineHeight + lineHeight * 0.5
        const row = torusGrid[rowIndex] ?? []

        for (const cell of row) {
          const sampleX = Math.floor((cell.x + cell.width * 0.5) / SAMPLE_STEP)
          if (sampleX < 0 || sampleX >= bufW) continue

          const brightness = brightBuf[rowIndex * bufW + sampleX]
          if (brightness < 0.02) continue

          const mappedValue = 1 - brightness
          const weightIndex = Math.max(
            0,
            Math.min(TORUS_WEIGHTS.length - 1, Math.round(mappedValue * (TORUS_WEIGHTS.length - 1)))
          )

          drawCommands.push({
            char: cell.char,
            color: '#111111',
            font: `${cell.italic ? 'italic ' : ''}${TORUS_WEIGHTS[weightIndex]} ${fontSize}px ${FONT_FAMILY}`,
            x: cell.x,
            y: cy,
          })
        }
      }

      drawCommands.sort((a, b) => a.font.localeCompare(b.font))
      let currentFont = ''
      for (const command of drawCommands) {
        if (command.font !== currentFont) {
          ctx.font = command.font
          currentFont = command.font
        }
        ctx.fillStyle = command.color
        ctx.fillText(command.char, command.x, command.y)
      }

      animationFrame = window.requestAnimationFrame(render)
    }

    const handleResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        initGrid()
      }, 150)
    }

    const handleMouseDown = (event: MouseEvent) => {
      dragActive = true
      dragLastX = event.clientX
      dragLastY = event.clientY
      velX = 0
      velY = 0
      canvas.style.cursor = 'grabbing'
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!dragActive) return
      const dx = event.clientX - dragLastX
      const dy = event.clientY - dragLastY
      angleX += dx * 0.005
      angleY += dy * 0.005
      velX = dx * 0.3
      velY = dy * 0.3
      dragLastX = event.clientX
      dragLastY = event.clientY
    }

    const handleMouseUp = () => {
      if (!dragActive) return
      dragActive = false
      canvas.style.cursor = 'grab'
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return
      dragActive = true
      dragLastX = event.touches[0].clientX
      dragLastY = event.touches[0].clientY
      velX = 0
      velY = 0
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (!dragActive || event.touches.length !== 1) return
      const dx = event.touches[0].clientX - dragLastX
      const dy = event.touches[0].clientY - dragLastY
      angleX += dx * 0.005
      angleY += dy * 0.005
      velX = dx * 0.3
      velY = dy * 0.3
      dragLastX = event.touches[0].clientX
      dragLastY = event.touches[0].clientY
    }

    const handleTouchEnd = () => {
      dragActive = false
    }

    initGrid()
    canvas.style.cursor = 'grab'
    animationFrame = window.requestAnimationFrame(render)

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true })
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    canvas.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <div ref={frameRef} aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(0,0,0,0.08),transparent_34%)]" />
    </div>
  )
}
