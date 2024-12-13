import EquipmentSlots from './EquipmentSlots'
import PotionRow from './PotionRow'
import ItemGrid from './ItemGrid'

export default function Inventory() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-800 border-4 border-yellow-900 rounded-lg shadow-2xl overflow-hidden">
      <header className="bg-gradient-to-b from-yellow-900 to-yellow-800 p-2 text-center">
        <h1 className="text-2xl font-bold text-yellow-500 font-medieval">INVENTORY</h1>
      </header>
      <div className="p-4 space-y-4">
        <EquipmentSlots />
        <PotionRow />
        <ItemGrid />
      </div>
    </div>
  )
}

