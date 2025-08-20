export default function Card({task, description}) {
  return (
    <div>
        <div className="p-4">
            <div className="bg-white rounded-lg p-4 shadow-md mb-4">
                <h2 className="text-lg font-bold mb-2">{task}</h2>
                <p className="text-gray-600 truncate">{description}</p>
            </div>
        </div>
    </div>
  )
}