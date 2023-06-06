import { BackspaceIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

const NUMBER_RANGE = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const GUESS_LENGTH = 3

interface PinPadProps {
    number: number[]
    onNumberClicked: (number: number) => void
    onBackspaceClicked: () => void
    onEnterClicked: () => void
}

export default function PinPad({ number, onNumberClicked, onBackspaceClicked, onEnterClicked }: PinPadProps) {
    return (
        <div className='flex flex-col max-h-max gap-2 bg-gray-700 rounded-sm'>
            <div className='flex w-full items-start justify-center text-gray-600 px-4 pt-4'>
                <div className='flex-1 grid grid-cols-3 flex items-center justify-center h-12 bg-green-100 rounded-sm p-3'>
                {
                    number.map((number, index) => {
                        return (
                            <div key={index} className='flex-1 flex justify-center text-md text-xl font-bold'>{number}</div>
                        )
                    })
                }
                </div>
            </div>
            <div className='grid grid-cols-3 gap-2 gap-2 items-center justify-center py-4 text-gray-600 p-4'>
                {
                    NUMBER_RANGE.map((num) => {
                        return (
                            <button 
                                key={num}
                                className='flex items-center justify-center w-12 h-14 bg-gray-200 text-md text-xl font-bold bg-gray-200 transition-colors duration-500 disabled:bg-gray-400 rounded-sm'
                                onClick={() => onNumberClicked(num)}
                                disabled={number.includes(num) || number.length === GUESS_LENGTH}
                            >
                                {num}
                            </button>
                        )
                    })
                }   
                <button 
                    className='flex items-center justify-center w-12 h-14 bg-gray-200 text-md text-xl font-bold bg-gray-200'
                    onClick={() => onBackspaceClicked()}
                >
                    <BackspaceIcon className='w-5 h-5 w-7 h-7'/>
                </button>
                <button 
                    className='flex items-center justify-center w-12 h-14 bg-gray-200 text-md text-xl font-bold bg-gray-200 transition-colors duration-500 disabled:bg-gray-400'
                    onClick={() => onNumberClicked(0)}
                    disabled={number.includes(0)  || number.length === GUESS_LENGTH}
                >
                    0
                </button>
                <button 
                    className='flex transition-colors duration-500 items-center justify-center w-12 h-14 bg-gray-200 text-xs font-bold bg-green-400 transition-colors duration-500 disabled:bg-red-400'
                    onClick={() => onEnterClicked()}
                    disabled={number.length < GUESS_LENGTH}
                >
                   {
                    number.length < GUESS_LENGTH ?
                    <XCircleIcon className='w-7 h-7 fill-red-600'/>
                    : <CheckCircleIcon className='w-7 h-7 fill-green-600'/>
                   }
                </button>        
            </div>
        </div>
    )
}