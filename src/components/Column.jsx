import Card from "./Card";

export default function Column({title, cardsTab}) {
  return (
    <div className="w-1/3 bg-white rounded-lg min-h-96">
        <h1 className="text-xl font-bold p-4 border-b border-gray-200 text-center">{title}</h1>
        {cardsTab.map((card, index) => (
            <Card key={index} task={card.task} description={card.description} />
        ))}
    </div>
  )
}

