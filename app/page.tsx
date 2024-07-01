import * as fs from "node:fs/promises"
import { PATHS } from "../common/constants/paths.js"
import Sessions from "./components/sessions"

type Labels = "car" | "fish" | "house" | "tree" | "bycicle" | "guitar" | "pencil" | "clock"
type Drawings = {
  [key in Labels]: number[][][]
}
export type RawData = {
  session: string
  student: string
  drawings: Drawings
}

const getSessions = async () => {
  const rawDataDir = PATHS.RAW_DATA_DIR
  const rawFiles = await fs.readdir(rawDataDir)
  const rawData = [] as RawData[]

  for (const rawFile of rawFiles) {
    const rawFilePath = rawDataDir + "/" + rawFile
    const rawFileContent = await fs.readFile(rawFilePath, "utf8")
    const raw = JSON.parse(rawFileContent)
    rawData.push(raw)
  }
  return rawData
}

export default async function Home() {
  const sessions = await getSessions()

  return (
    <main className="flex flex-col items-center p-12">
      <h1 className="text-3xl font-bold mb-6">
        welcome to my experimental Radu Machine Learning project
      </h1>
      <div>
        {sessions.map(session => (
          <Sessions key={session.session} samples={session} />
        ))}
      </div>
    </main>
  )
}
