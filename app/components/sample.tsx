"use client"

import { useRef, useEffect } from "react"

type Props = {
  sample: {
    session: string
    student: string
    label: string
    paths: number[][][]
  }
}

const Samples = ({ sample }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    console.log(canvasRef.current)

    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
      ctx.strokeStyle = "white"
      ctx.fillStyle = "transparent "
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.beginPath()

      for (const path of sample.paths) {
        for (let i = 1; i < path.length; i++) {
          const [x, y] = path[i - 1]
          ctx.moveTo(x, y)
          ctx.lineTo(path[i][0], path[i][1])
        }
      }
      ctx.stroke()
    }
  }, [sample, canvasRef])

  return (
    <div className="flex flex-col items-center justify-center p-3">
      <h2 className="text-2xl font-bold">{sample.label}</h2>
      <canvas ref={canvasRef} width={500} height={500} />
    </div>
  )
}

export default Samples
