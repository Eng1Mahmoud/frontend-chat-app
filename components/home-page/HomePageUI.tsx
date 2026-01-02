import { Footer } from "./Footer";
import Image from "next/image";
import LeftColumn from "./LeftColumn";
import dynamic from 'next/dynamic';
import AuthButtons from "./AuthButtons";
import { getUserAction } from "@/actions/getUserAction";

const FeaturesGrid = dynamic(() => import('./FeaturesGrid'));
const MockupChat = dynamic(() => import('./MockupChat'));

export default async function HomePageUI() {
  const user = await getUserAction();

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden w-full flex flex-col">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-blue-500/10 rounded-full blur-[80px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Image src="/icon.png" alt="logo" width={50} height={50} className="cursor-pointer" />
        </div>
        <AuthButtons user={user} />
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-6 pb-24 lg:pt-10 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          {/* Left Column: Content */}
          <LeftColumn user={user} />

          {/* Right Column: Visual Mockup */}
          <div className="relative lg:h-[600px] flex items-center justify-center perspective-1000">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
            {/* Chat Interface Mockup */}
            <MockupChat />
          </div>
        </div>

        {/* Features Grid */}
        <FeaturesGrid />
      </main>

      <Footer />
    </div>
  );
}
