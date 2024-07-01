"use client"
import { useRef, useEffect } from "react"

const remap = (x: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
  return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

const getMinMax = (paths: number[][][]) => {
  let xMin = +Infinity
  let xMax = -Infinity
  let yMin = +Infinity
  let yMax = -Infinity
  for (const path of paths) {
    for (const [X, Y] of path) {
      xMin = Math.min(xMin, X)
      xMax = Math.max(xMax, X)
      yMin = Math.min(yMin, Y)
      yMax = Math.max(yMax, Y)
    }
  }
  return { xMin, xMax, yMin, yMax }
}

const drawSample = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  paths: number[][][]
) => {
  const { width, height } = canvas
  // make the canvas a square
  if (width > height) {
    canvas.width = height
  } else {
    canvas.height = width
  }

  const { xMin, xMax, yMin, yMax } = getMinMax(paths)
  const sampleWidth = xMax - xMin
  const sampleHeight = yMax - yMin

  const ratio = Math.floor(sampleWidth / sampleHeight)

  ctx.save()
  ctx.strokeStyle = "white"
  ctx.fillStyle = "transparent "
  ctx.lineWidth = 2
  ctx.lineCap = "round"
  ctx.beginPath()

  for (const path of paths) {
    for (let i = 1; i < path.length; i++) {
      let Xprev = path[i - 1][0]
      let Yprev = path[i - 1][1]
      let X = path[i][0]
      let Y = path[i][1]

      if (ratio >= 1) {
        Xprev = remap(Xprev, xMin, xMax, 0, width)
        Yprev = remap(Yprev, yMin, xMax, 0, width)
        X = remap(X, xMin, xMax, 0, width)
        Y = remap(Y, yMin, xMax, 0, width)
      } else {
        Yprev = remap(Yprev, yMin, yMax, 0, height)
        Xprev = remap(Xprev, xMin, yMax, 0, height)
        Y = remap(Y, yMin, yMax, 0, height)
        X = remap(X, xMin, yMax, 0, height)
      }
      ctx.moveTo(Xprev, Yprev)
      ctx.lineTo(X, Y)
    }
  }
  ctx.stroke()
  ctx.restore()
}

type DrawingProps = {
  label: string
  paths: number[][][]
}

const Drawing = ({ label, paths }: DrawingProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
      drawSample(canvas, ctx, paths)

      return () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [paths, canvasRef])

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <p className="text-slate-600">{label}</p>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Drawing
