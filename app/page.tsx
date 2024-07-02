import Sessions from "./components/sessions/sessions"
import Charts from "./components/charts/charts"

function Home() {
  return (
    <main id="sessions" className="w-full flex flex-row gap-2">
      <div className="sessions basis-2/3">
        <Sessions />
      </div>
      <div className="charts basis-1/3">
        <Charts />
      </div>
    </main>
  )
}

export default Home
