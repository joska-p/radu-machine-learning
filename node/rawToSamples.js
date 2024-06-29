import * as fs from "node:fs/promises"
import { PATHS } from "../common/constants/paths.js"

const rawToSamples = async () => {
  const rawDataDir = PATHS.RAW_DATA_DIR
  const samplesDir = PATHS.SAMPLES_OBJECTS_DIR
  const rawFiles = await fs.readdir(rawDataDir)

  const samples = []

  for (const rawFile of rawFiles) {
    const rawFilePath = rawDataDir + "/" + rawFile
    const rawFileContent = await fs.readFile(rawFilePath, "utf8")
    const rawFileData = JSON.parse(rawFileContent)

    // for each drawing in the raw file, create a new json file with the session, the name of the student, a label, and the path corresponding to the label
    const session = rawFileData.session
    const student = rawFileData.student
    const drawings = rawFileData.drawings

    for (const [label, paths] of Object.entries(drawings)) {
      const sample = {
        session,
        student,
        label,
        paths,
      }
      samples.push(sample)

      // create a new ts file in the samples objects directory that export the data as an object
      const fileName = samples.length.toString() + ".json"
      const sampleFilePath = `${samplesDir}/${fileName}`
      const sampleFileContent = JSON.stringify(sample)

      await fs.writeFile(sampleFilePath, sampleFileContent)
    }
  }
}

export { rawToSamples }
