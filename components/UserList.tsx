import { Iuser } from "@/types/apiFetch";
import { fetchApi } from "@/utils/apiFetch";

const UserList = async() => {
    type UsersResponse = { data: { users: Iuser[] } }
    const res = await fetchApi({endpoint: '/users/', method: 'GET'}) as UsersResponse
    const users = res.data.users || [];

    const getInitials = (username: string) => {
        return username.slice(0, 2).toUpperCase();
    };

    const getAvatarColor = (index: number) => {
        const colors = [
            'bg-blue-500',
            'bg-green-500', 
            'bg-purple-500',
            'bg-yellow-500',
            'bg-red-500',
            'bg-indigo-500',
            'bg-pink-500',
            'bg-orange-500'
        ];
        return colors[index % colors.length];
    };

    return (
        <div className="w-full max-w-md mx-auto bg-background">
            {/* Header */}
            <div className="p-4 border-b border-border">
                <h2 className="text-xl font-semibold">Contacts</h2>
                <p className="text-sm text-muted-foreground">{users.length} contacts</p>
            </div>

            {/* Users List */}
            <div className="divide-y divide-border">
                {users.map((user, index) => (
                    <div
                        key={user._id}
                        className="flex items-center p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                        {/* Avatar */}
                        <div className="relative mr-3">
                            <div className={`w-12 h-12 rounded-full ${getAvatarColor(index)} 
                                           flex items-center justify-center text-white font-medium`}>
                                {getInitials(user.username)}
                            </div>
                            {/* Online Status */}
                            {user.online && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                            )}
                        </div>

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                                <h3 className="font-medium text-foreground truncate">{user.username}</h3>
                                {user.isVerified && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                        </div>

                        {/* Status */}
                        <div className="ml-3 text-right">
                            <span className={`text-xs px-2 py-1 rounded ${
                                user.online 
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                                {user.online ? 'Online' : 'Offline'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {users.length === 0 && (
                <div className="p-8 text-center">
                    <div className="text-muted-foreground">
                        <p>No contacts found</p>
                        <p className="text-sm mt-1">Add some friends to start chatting</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserList