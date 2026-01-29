'use client'
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import {events} from "@/lib/constants";
import posthog from "posthog-js";

const Welcome = () => {
    const handleEnterExperience = () => {
        posthog.capture('enter_experience_clicked')
    }

    return (
        /* We removed 'bg-background' here because it's already in the Layout.
           This allows the global Aurora to be visible behind the text.
        */
        <div className="flex min-h-screen flex-col items-center justify-center p-6">

            {/* The Content Layer */}
            <div className="flex flex-col items-center gap-6 text-center">

                {/* 'gradient-text' uses your CSS variable engine */}
                <h1 className="gradient-text text-7xl md:text-9xl font-black tracking-tighter italic animate-in fade-in zoom-in duration-1000">
                    DUBADADADA
                </h1>

                {/* A subtle secondary element to ground the design */}
                <div className="flex flex-col items-center gap-2">
                    <div className="h-px w-12 bg-border-strong/50" />
                    <p className="text-text-secondary font-medium tracking-[0.3em] uppercase text-[10px] opacity-70">
                        Developer Network • 2026
                    </p>
                </div>

                {/* Classy Button that uses your --accent-primary */}
                <button onClick={handleEnterExperience} className="group relative mt-4 px-8 py-3 bg-white dark:bg-white text-black text-sm font-semibold rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-accent-primary/20">
                    Enter Experience
                    <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-accent-primary/50 transition-colors" />
                </button>

            </div>
            <ExploreBtn/>
            <div>
                <h3 className="text-2xl font-bold mb-4 text-center w-full ">Events Featured</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <li key={event.title}>
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Welcome