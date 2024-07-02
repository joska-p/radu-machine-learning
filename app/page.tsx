import Sessions from "./components/sessions/sessions"
import Charts from "./components/charts/charts"

function Home() {
  return (
    <main id="sessions" className="w-full p-12">
      <div className="sessions">
        <Sessions />
      </div>
      <div className="charts">
        <Charts />
      </div>
    </main>
  )
}

export default Home
