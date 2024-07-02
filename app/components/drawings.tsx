"use client"
import { useRef, useEffect } from "react"

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
    <div>
      <canvas ref={canvasRef} className="w-full" />
    </div>
  )
}

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
  // make the canvas square according to the longer side
  const { width, height } = canvas
  const { canvasWidth, canvasHeight } =
    width > height
      ? { canvasWidth: width, canvasHeight: width }
      : { canvasWidth: height, canvasHeight: height }
  canvas.width = canvasWidth
  canvas.height = canvasHeight

  // compute the size of the sample and the longer side
  const { xMin, xMax, yMin, yMax } = getMinMax(paths)
  const sampleWidth = (Math.abs(xMax) + Math.abs(xMin)) / 2
  const sampleHeight = (Math.abs(yMax) + Math.abs(yMin)) / 2
  const maxLength = Math.max(sampleWidth, sampleHeight)

  // compute the scale factor based on the longer side
  // using the scale method means we don't need to remap
  const scaleX = canvasWidth / maxLength / 2
  const scaleY = canvasHeight / maxLength / 2

  ctx.save()
  ctx.scale(scaleX, scaleY)
  ctx.strokeStyle = "white"
  ctx.fillStyle = "transparent "
  ctx.lineWidth = 2
  ctx.lineCap = "round"
  ctx.beginPath()

  for (const path of paths) {
    for (let i = 1; i < path.length; i++) {
      const Xprev = path[i - 1][0]
      const Yprev = path[i - 1][1]
      const X = path[i][0]
      const Y = path[i][1]
      ctx.moveTo(Xprev, Yprev)
      ctx.lineTo(X, Y)
    }
  }
  ctx.stroke()
  ctx.restore()
}

export default Drawing
