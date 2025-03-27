import Image from 'next/image';

interface MentorCardProps {
  name: string;
  role: string;
  company: string;
  expertise: string[];
  isAvailable: boolean;
  rating: number;
  imageUrl: string;
  calendarLink: string;
  delay: number;
}

export default function MentorCard(props: MentorCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-all duration-300">
      <div className="w-full h-48 relative mb-4 rounded-lg overflow-hidden">
        <Image
          src={props.imageUrl || '/mentors/sarah.jpg'}
          alt={props.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h3 className="text-lg font-semibold text-center">{props.name}</h3>
      <p className="text-center text-sm">{props.role} @ {props.company}</p>
      <p className="text-center text-xs text-gray-500 mb-2">Expertise: {props.expertise.join(", ")}</p>
      <p className={`text-center ${props.isAvailable ? 'text-green-600' : 'text-red-500'}`}>
        {props.isAvailable ? 'Available' : 'Not Available'}
      </p>
      <p className="text-center text-yellow-500 mb-2">⭐ {props.rating}</p>
      <a href={props.calendarLink} target="_blank" className="block text-center bg-primary text-white py-1 rounded hover:bg-primary/90">
        Schedule
      </a>
    </div>
  );
}
