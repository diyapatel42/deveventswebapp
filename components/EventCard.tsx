'use client'
import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

interface Props{
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

const EventCard = ({image,title,slug,location,date,time}:Props) => {
  const handleClick = () => {
    posthog.capture('event_card_clicked', {
      event_title: title,
      event_slug: slug,
      event_location: location,
      event_date: date,
    })
  }

  return (

    <Link href={`/events/${slug}`} id = 'event-card' onClick={handleClick}>
        <Image src={image} alt = {title} width = {410} height = {300} className = 'poster rounded-2xl'/>
        <div className="flex flex-row gap-2">
            <Image src='/icons/pin.svg' alt='location' width={16} height={16} />
            <p className='text-black'>{location}</p>

        </div>
        <p className = 'font-bold text-black'>{title}</p>
        <div className="flex flex-row gap-4 items-center">
            <div className="flex items-center gap-1.5">
                <Image src='/icons/calendar.svg' alt='date' width={16} height={16} />
                <p className='text-sm text-black'>{date}</p>
            </div>
            <div className="flex items-center gap-1.5">
                <Image src='/icons/clock.svg' alt='time' width={16} height={16} />
                <p className='text-sm text-black'>{time}</p>
            </div>

        </div>
    </Link>
  )
}
export default EventCard
