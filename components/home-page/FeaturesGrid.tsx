import { Globe, Shield, Zap } from "lucide-react";
const FeaturesGrid = () => {
  return (
    <div className="mt-24 grid md:grid-cols-3 gap-8">
      <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
        <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Zap className="w-6 h-6 text-indigo-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2 text-white">Lightning Fast</h2>
        <p className="text-gray-400">
          Real-time message delivery with zero latency. Experience instant communication.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
        <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Shield className="w-6 h-6 text-purple-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2 text-white">Secure & Private</h2>
        <p className="text-gray-400">
          End-to-end encryption ensures your conversations stay private and secure.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
        <div className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Globe className="w-6 h-6 text-pink-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2 text-white">Global Reach</h2>
        <p className="text-gray-400">
          Connect with friends and family anywhere in the world without barriers.
        </p>
      </div>
    </div>
  );
};

export default FeaturesGrid;
