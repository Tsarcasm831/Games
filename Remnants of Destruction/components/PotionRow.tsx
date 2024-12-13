import Image from 'next/image'

const potions = [
  { color: 'red', src: '/placeholder.svg' },
  { color: 'orange', src: '/placeholder.svg' },
  { color: 'yellow', src: '/placeholder.svg' },
  { color: 'blue', src: '/placeholder.svg' },
  { color: 'purple', src: '/placeholder.svg' },
]

export default function PotionRow() {
  return (
    <div className="flex justify-center space-x-2">
      {potions.map((potion, index) => (
        <div key={index} className="w-10 h-16 bg-gray-900 border border-gray-700 p-1">
          <Image
            src={potion.src}
            alt={`${potion.color} potion`}
            width={32}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  )
}

