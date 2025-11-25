export const formatLastSeen = (lastSeen: string) => {
     const now = new Date();
     const lastSeenDate = new Date(lastSeen);
     const diff = now.getTime() - lastSeenDate.getTime();
     const diffInMinutes = Math.floor(diff / (1000 * 60));
     if (diffInMinutes < 60) {
          return `last seen ${diffInMinutes} minutes ago`;
     } else if (diffInMinutes < 1440) {
          const diffInHours = Math.floor(diffInMinutes / 60);
          return `last seen ${diffInHours} hours ago`;
     } else {
          const diffInDays = Math.floor(diffInMinutes / 1440);
          return `last seen ${diffInDays} days ago`;
     }
}