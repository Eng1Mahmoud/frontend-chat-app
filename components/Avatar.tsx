import { Iuser } from "@/types/apiFetch";
import { isUserOnline } from "@/utils/isUserOnline";
import { generateAvatarColor } from "@/utils/generateAvatarColor";

const getInitials = (username: string) => {
    return username?.slice(0, 2).toUpperCase();
};

export const Avatar = ({ user, onlineUsers }: { user: Iuser, onlineUsers: Set<string> }) => {
    const bgColor = generateAvatarColor(user?.username);

    return (
        <div className="relative">
            <div
                style={{ backgroundColor: bgColor }}
                className={`w-12 h-12 rounded-full 
                                      flex items-center justify-center text-white font-semibold text-sm
                                      shadow-lg ring-2 ring-white/20`}
            >
                {getInitials(user?.username)}
            </div>

            {/* Online Status Indicator */}
            {isUserOnline(user?._id, onlineUsers) && (
                <div
                    className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full 
                                          border-2 border-white shadow-sm "
                ></div>
            )}
        </div>
    )
}