import Image from 'next/image';

const slots = [
  { name: 'Weapon', src: '/placeholder.svg' },
  { name: 'Helmet', src: '/placeholder.svg' },
  { name: 'Armor', src: '/placeholder.svg' },
  { name: 'Gloves', src: '/placeholder.svg' },
  { name: 'Shield', src: '/placeholder.svg' },
];

export default function EquipmentSlots() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((slot) => (
        <div key={slot.name} className="bg-gray-900 border border-gray-700 p-1 aspect-square">
          <Image
            src={slot.src}
            alt={slot.name}
            width={64}
            height={64}
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}
