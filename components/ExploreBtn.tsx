'use client'
import { ChevronRight } from "lucide-react"
import posthog from "posthog-js"

const Explorebtn = () => {
  const handleClick = () => {
    posthog.capture('explore_events_clicked')
  }

  return (
    <button onClick={handleClick}>
      <a href={'#events'} className="group relative mt-4 px-8 py-3 bg-white dark:bg-white text-black text-sm font-semibold rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-accent-primary/20 inline-flex items-center gap-2">
          <ChevronRight size={20} className="group-hover:translate-y-1 transition-transform" />

          Explore Events
      </a>
    </button>
  )
}
export default Explorebtn
