interface GuessScoreProps {
    isCorrect: boolean | undefined
    score: number | undefined 
}

export default function GuessScore({ isCorrect, score }: GuessScoreProps) {
    return (
        <div className={`flex justify-center items-center w-20 sm:w-24 h-12 sm:h-16 border-r-2 border-b-2 border-gray-300 font-bold text-2xl text-gray-500 sm:text-3xl ${isCorrect ? 'bg-green-100' : 'bg-white'}`}>{score}</div>
    )
}
