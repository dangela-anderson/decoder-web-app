const GUESS_LENGTH = 3

interface GuessProps {
    isCorrect: boolean | undefined
    number: number[]
}

export default function Guess({isCorrect, number }: GuessProps) {
    return (
        <div className='grid grid-cols-3 max-w-max'>
            {
                (Array(GUESS_LENGTH).fill(0)).map((_, index) => {
                    return (
                        <div key={index} className={`flex-1 flex justify-center items-center w-20 sm:w-20 h-12 sm:h-16 border-b-2 border-gray-300  ${isCorrect ? 'bg-green-100' : 'bg-white'} font-bold text-gray-500 text-2xl sm:text-3xl`}>{number[index]}</div>
                    )
                })
            }
        </div>
    )
}