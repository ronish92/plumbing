
import { Heading } from '@/components/ui/heading'
import { Paragraph } from '@/components/ui/paragraph'
import { Icon } from '@/components/ui/icon'

import graduationcap from '@iconify/icons-lucide/graduation-cap'
import money from '@iconify/icons-lucide/banknote'
import smile from '@iconify/icons-lucide/smile'


const hours = [
  { day: 'Monday', time: '9:00 AM - 6:00 PM', timeRange: '9am-6pm' },
  { day: 'Tuesday', time: '9:00 AM - 6:00 PM', timeRange: '9am-6pm' },
  { day: 'Wednesday', time: '9:00 AM - 6:00 PM', timeRange: '9am-6pm' },
  { day: 'Thursday', time: '9:00 AM - 6:00 PM', timeRange: '9am-6pm' },
  { day: 'Friday', time: '9:00 AM - 5:00 PM', timeRange: '9am-5pm' },
  { day: 'Saturday', time: '10:00 AM - 2:00 PM', timeRange: '10am-2pm' },
  { day: 'Sunday', time: 'Closed', timeRange: '' },
]


  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  

  const now = new Date()
  const todayName = daysOfWeek[now.getDay()]
  const currentMinutes = now.getHours() * 60 + now.getMinutes()


  const checkIsOpen = (timeRange) => {
    if (!timeRange) return false
    
    // Parses string like "9am-6pm" or "10am-2pm"
    const matches = timeRange.toLowerCase().match(/(\d+)(am|pm)-(\d+)(am|pm)/)
    if (!matches) return false

    let [_, startHour, startMed, endHour, endMed] = matches
    startHour = parseInt(startHour, 10)
    endHour = parseInt(endHour, 10)

    // Convert to 24h format system
    if (startMed === 'pm' && startHour < 12) startHour += 12
    if (startMed === 'am' && startHour === 12) startHour = 0
    if (endMed === 'pm' && endHour < 12) endHour += 12
    if (endMed === 'am' && endHour === 12) endHour = 0

    const startMinutes = startHour * 60
    const endMinutes = endHour * 60

    return currentMinutes >= startMinutes && currentMinutes < endMinutes
  }

const contactItems = [
  {
    icon: graduationcap,
    title: 'Certified Team',
    description: 'Licensed Plumbers with proven field experiences',
  
  },
  {
    icon: money,
    title: 'Transparent Pricing',
    description: 'Clear Estimates before and work begins',
   
  },
  {
    icon: smile,
    title: '100% Satisfaction',
    description: 'We make sure every work is completed properly',
   
  },
]

export default function WhyUs() {
  return (
    <div className="relative bg-contrast z-1 px-6 mt-10 mb-30">
      <div className="mx-auto max-w-[1600px] relative flex flex-col xl:flex-row gap-6 xl:gap-0">
        {/* Hours Section */}
        <div className="pt-14 pb-10 px-8 w-full xl:w-4/12 -mt-20 xl:-mb-20 relative rounded-md xl:rounded-b-md xl:rounded-t-md overflow-hidden shadow-lg bg-[#2f0e0a]/10">
          <Heading
            as="h3"
            color="text-accent3-contrast"
            margin="mb-7"
            textAlign="text-center"
          >
            Business Hours
          </Heading>
           <div className="divide-y">
            {hours.map((item, index) => {
              const isToday = item.day === todayName
              const isOpenNow = isToday && checkIsOpen(item.timeRange)

              return (
                <div
                  key={index}
                  className={`w-full flex flex-wrap justify-between py-4 text-base transition-colors ${
                    isToday ? 'text-white font-medium bg-white/5 px-2 rounded' : 'text-accent3-contrast'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.day}
                    {isToday && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isOpenNow ? 'bg-green-300 text-white' : 'bg-red-300 text-white'
                      }`}>
                        {isOpenNow ? 'Open Now' : 'Closed'}
                      </span>
                    )}
                  </span>
                  <span>{item.time}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Contact Cards */}
        <div className="w-full xl:w-8/12  flex flex-col xl:flex-row gap-6 xl:gap-0 mb-6 xl:mb-0">
          {contactItems.map((item, index) => (
            <div
              key={index}
             
              className={`py-6 px-10 w-full xl:w-1/3 flex flex-col gap-6 justify-center items-center xl:items-start rounded-md xl:rounded-none hover:bg-body/12 transition-colors duration-300 ${
                index === 0
                  ? 'bg-primary-foreground'
                  : index === 1
                    ? 'bg-coconut'
                    : 'bg-primary-foreground'
              }`}
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-body">
                <Icon
                  icon={item.icon}
                  className="w-10 h-10 text-black"
                />
              </div>
              <Heading
                as="h3"
                color="text-body"
                fontSize="text-2xl"
                className="flex items-center gap-1"
              >
                {item.title}
               
              </Heading>
              <Paragraph
                color="text-body/60"
                fontSize="text-lg"
                margin="m-0"
              >
                {item.description}
              </Paragraph>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

