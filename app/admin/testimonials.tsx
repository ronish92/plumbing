import Link from 'next/link';
import { ChevronRight } from 'lucide-react'; 


export function AllTestimonials() {

    return(
<Link 
  href="/admin/testimonials" 
  className="block rounded-xl sm:rounded-2xl bg-white p-2.5 sm:p-3 shadow-sm hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer"
> 
  <div className="flex items-center justify-between text-[10px] sm:text-xs"> 
    <span className="font-medium text-black">Edit Testimonials</span> 
    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" /> 
  </div> 
</Link>
    )
}
