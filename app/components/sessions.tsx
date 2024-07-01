import type { RawData } from "../page"
import Drawing from "./drawings"

type SessionsProps = {
  samples: RawData
}

const Sessions = ({ samples }: SessionsProps) => {
  const { drawings } = samples

  return (
    <div className="grid grid-cols-8 gap-4 w-full">
      {Object.entries(drawings).map(([label, paths]) => (
        <Drawing key={label} paths={paths} label={label} />
      ))}
    </div>
  )
}

export default Sessions
