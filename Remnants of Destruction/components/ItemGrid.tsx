import Image from 'next/image'

export default function ItemGrid() {
  const gridSize = 10
  const items = [
    { name: 'Arrow', quantity: 20, src: '/placeholder.svg' },
    { name: 'Arrow', quantity: 15, src: '/placeholder.svg' },
  ]

  return (
    <div className="grid grid-cols-10 gap-1 bg-gray-900 p-2 border border-gray-700">
      {Array.from({ length: gridSize * gridSize }).map((_, index) => {
        const item = items[index]
        return (
          <div key={index} className="aspect-square bg-gray-800 border border-gray-700 p-1 relative">
            {item && (
              <>
                <Image
                  src={item.src}
                  alt={item.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
                <span className="absolute bottom-0 right-0 text-xs text-white bg-gray-900 px-1 rounded-tl">
                  {item.quantity}
                </span>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

