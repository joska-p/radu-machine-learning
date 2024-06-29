import * as fs from "node:fs/promises"
import { PATHS } from "../common/constants/paths.js"
import Samples from "./components/sample"

const getSamples = async () => {
  const sampleDir = PATHS.SAMPLES_OBJECTS_DIR
  const sampleFiles = await fs.readdir(sampleDir)
  const samples = []

  for (const sampleFile of sampleFiles) {
    const sampleFilePath = sampleDir + "/" + sampleFile
    const sampleFileContent = await fs.readFile(sampleFilePath, "utf8")
    const sample = JSON.parse(sampleFileContent)
    samples.push(sample)
  }
  return samples
}

export default async function Home() {
  const samples = await getSamples()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-3xl font-bold">
          welcome to my experimental Radu Machine Learning project
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {samples.map(sample => {
            return <Samples key={sample.label} sample={sample} />
          })}
        </div>
      </div>
    </main>
  )
}
