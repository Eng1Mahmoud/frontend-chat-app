import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Iuser } from "@/types/apiFetch";

interface AuthButtonsProps {
    user: Iuser | null;
}

const AuthButtons = ({ user }: AuthButtonsProps) => {
    return (
        <div className="flex items-center gap-4">
            {!user && (
                <Link
                    href="/login"
                    className="hidden sm:block text-gray-300 hover:text-white transition-colors font-medium"
                >
                    Sign In
                </Link>
            )}
            <Link
                href={user ? "/chat" : "/signup"}
                className="bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md px-5 py-2.5 rounded-full font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
                {user ? "Open Chat" : "Get Started"}
                <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
};

export default AuthButtons;
