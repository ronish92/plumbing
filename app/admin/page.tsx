

import { AlertCircle, Copy, FileText, Plus, User, Eye, TrendingUp } from 'lucide-react'
import './service-popularity';
import { ServicePopularityDonut } from './service-popularity';
import { AllBookings } from './all-bookings';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from '@/components/ui/button';
import { AllTestimonials } from './testimonials';




const getUser = async () => {
    const cookieStore = await cookies();
    const rolesCookie = cookieStore.get("roles")?.value;
    const loggedUser = cookieStore.get("name");
    const userName = loggedUser ? loggedUser.value : "";
    let roles: string[] = [];
    try {
        roles = rolesCookie ? JSON.parse(rolesCookie) : [];
        const isAuthorized = roles.includes("Admin");
        if (!isAuthorized) {
            redirect("/");
        }


    } catch {
        roles = [];
    }
    return { name: userName };
}

export default async function Dashboard() {
    const user = await getUser();


    return (

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
            {/* Left Column - Overview */}
            <div className="lg:col-span-4 space-y-3 sm:space-y-4">
          
                {/* Service Popularity Card */}
                <div className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 shadow-sm">

                    <ServicePopularityDonut
                        data={[
                            {
                                name: 'Plumbing',
                                bookings: 320,
                                color: '#10b981',
                            },
                            {
                                name: 'Electricity',
                                bookings: 280,
                                color: '#3b82f6',
                            },
                            {
                                name: 'Painting',
                                bookings: 180,
                                color: '#f59e0b',
                            },
                            {
                                name: 'Construction',
                                bookings: 120,
                                color: '#f97316',
                            },
                            {
                                name: 'Carpentry',
                                bookings: 100,
                                color: '#8b5cf6',
                            },
                        ]}
                    />


                </div>


                {/* Upgrade Card */}
              





            </div>

            {/* Middle Column - Recent Project */}
            <div className="lg:col-span-5 space-y-3 sm:space-y-4">
                <AllBookings />
                <div className="w-full justify center border-b rounded-xl border-gray-200 bg-white p-4">

                    <div className="flex items-center  gap-2 text-sm font-medium text-gray-700">
                        <User className="h-4 w-4 text-orange-500" />
                        <span>
                            Logged in as <span className="font-semibold text-gray-900">{user?.name || "Guest"}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Column - Stats */}
            <div className="lg:col-span-3 space-y-3 sm:space-y-4">
                {/* Transfer Flow Card */}
   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  {/* Today Card */}
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-center justify-between mb-2">
      <div className="space-y-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Visitors Today
        </span>
        <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          10
        </h3>
      </div>
      <div className="rounded-xl bg-orange-50 p-2.5 text-orange-600">
        <Eye className="h-5 w-5" />
      </div>
    </div>
    <div className="flex items-center text-xs text-emerald-600 font-medium">
      <span>+12% from yesterday</span>
    </div>
  </div>

  {/* Weekly Card */}
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-center justify-between mb-2">
      <div className="space-y-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Visitors This Week
        </span>
        <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          142
        </h3>
      </div>
      <div className="rounded-xl bg-lime-50 p-2.5 text-lime-500">
        <TrendingUp className="h-5 w-5" />
      </div>
    </div>
    <div className="flex items-center text-xs text-emerald-600 font-medium">
      <span>+8% from last week</span>
    </div>
  </div>
</div>

                {/* Request Flow Card */}
                <div className="rounded-xl sm:rounded-2xl border border-orange-200 bg-white p-3.5 sm:p-4 shadow-sm">
  {/* Header */}
  <div className="mb-3 flex items-center justify-between">
    <div>
      <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500">
        Current Promo Code
      </p>
     
    </div>

    <Button
      variant="outline"
      size="sm"
      className="h-7 sm:h-8 rounded-lg border-orange-200 px-2.5 text-[10px] sm:text-xs text-orange-600 hover:bg-orange-50 hover:text-orange-700"
    >
      <Plus className="mr-1 h-3.5 w-3.5" />
      Change
    </Button>
  </div>

  {/* Promo Code */}
  <div className="flex items-center justify-between rounded-lg sm:rounded-xl bg-orange-50 px-3 py-2.5 sm:px-3.5 sm:py-3">
    <div>
      <p className="text-[9px] sm:text-[10px] font-medium text-orange-500">
        Promo Code
      </p>

      <span className="mt-0.5 block text-sm sm:text-base font-bold tracking-wide text-orange-600">
        ARIANA@20
      </span>
    </div>

    <div className="rounded-full bg-orange-500 px-2 py-1 text-[8px] sm:text-[9px] font-semibold text-white">
      ACTIVE
    </div>
  </div>

  {/* Expiry */}
  <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-white px-2.5 py-2">
    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-gray-500" />

    <p className="text-[9px] sm:text-[10px] leading-relaxed text-gray-600">
      Valid until <span className="font-semibold text-gray-800">November 15th</span>
    </p>
  </div>
</div>

       {/* Banners */}
{/* Clickable Banner Component with Background Image */}
<a 
  href="/admin/banners" 
  className="group relative block overflow-hidden rounded-xl sm:rounded-2xl  transition-all duration-300"
>
  
  {/* The Background Image Container */}
  <div className="absolute inset-0 z-0">
    <img 
      src="images/home.jpeg" /* Replace with your banner asset or texture path */
      alt="Banner background texture"
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />

    <div className="absolute inset-0 bg-neutral-950/50 mix-blend-multiply transition-colors duration-300" />
   

  </div>

  {/* Content Layer (Forced to z-10 to stay safely on top of the image) */}
  <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center sm:p-8">
    
  

    {/* Informational Text Stack */}
     <Button
            type="button"
            variant="outline"
          
            className="bg-transparent text-white hover:bg-red-50 hover:text-red-700"
          >
          
            Edit Your Banners
          </Button>
  

  </div>
</a>




                <AllTestimonials/>

                {/* Passing Rate Card */}
                <div className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 shadow-sm">
                    <div className="mb-3 sm:mb-4 flex items-center justify-between">
                        <h2 className="text-sm sm:text-base font-semibold text-black">Passing rate</h2>
                        <button className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg hover:bg-gray-100">
                            <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                            <div className="mb-0.5 sm:mb-1 text-[9px] sm:text-[10px] text-gray-600">Complete</div>
                            <div className="text-xl sm:text-2xl font-bold text-black">61%</div>
                        </div>
                        <div>
                            <div className="mb-0.5 sm:mb-1 text-[9px] sm:text-[10px] text-gray-600">Failed</div>
                            <div className="text-xl sm:text-2xl font-bold text-black">17%</div>
                        </div>
                        <div>
                            <div className="mb-0.5 sm:mb-1 text-[9px] sm:text-[10px] text-gray-600">Partial</div>
                            <div className="text-xl sm:text-2xl font-bold text-black">22%</div>
                        </div>
                    </div>

                    <div className="mt-3 sm:mt-4 flex h-2 sm:h-2.5 overflow-hidden rounded-full">
                        <div className="w-[61%] bg-emerald-500" />
                        <div className="w-[17%] bg-orange-500" />
                        <div className="w-[22%] bg-gray-300" />
                    </div>
                </div>
            </div>


        </div>



    )
}





