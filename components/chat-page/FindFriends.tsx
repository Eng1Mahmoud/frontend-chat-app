"use client"
import { useSidebar } from "@/components/ui/sidebar"
import { UserRoundSearch } from "lucide-react"

const FindFriends = () => {
    const { toggleSidebar } = useSidebar()
    return (
        <div>

            <div className="absolute bottom-24 left-6 z-20 group md:hidden">
                <button
                    onClick={toggleSidebar}
                    className="relative flex items-center justify-center w-12 h-12 bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 rounded-full shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/50 hover:scale-110 hover:border-indigo-400 active:scale-95 transition-all duration-300 group-hover:bg-indigo-600"
                    aria-label="Find Friends"
                >
                    <UserRoundSearch className="w-5 h-5 text-indigo-400 group-hover:text-white transition-colors duration-300" />
                    {/* Ping effect on hover */}
                    <span className="absolute inset-0 rounded-full bg-indigo-400 opacity-0 group-hover:animate-ping group-hover:opacity-20" />
                </button>

                {/* Tooltip */}
                <div className="absolute left-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
                    <div className="bg-slate-900/90 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-lg border border-white/10 shadow-xl whitespace-nowrap">
                        Find Friends
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindFriends