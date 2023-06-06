import { useEffect, useRef, useState } from 'react'
import samplesize from 'lodash.samplesize'
import { v4 as uuidv4 } from 'uuid'
import Guess from './components/Guess'
import PinPad from './components/PinPad'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import GuessScore from './components/GuessScore'
import { Guess as NumberGuess } from './lib/types'
import EndCardModal from './components/modal/EndCardModal'
import InstructionModal from './components/modal/InstructionModal'
import SettingsDropdown from './components/dropdown/SettingsDropdown'
import PinPadModal from './components/modal/PinPadModal'

const GUESS_LENGTH = 3
const MAX_GUESS_COUNT = 7
const NUMBER_RANGE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function App() {
  const correctNumber = useRef<number[]>(samplesize(NUMBER_RANGE, GUESS_LENGTH))
  const [guesses, setGuesses] = useState<NumberGuess[]>(Array(MAX_GUESS_COUNT).fill("").map(() => { return { id: uuidv4(), number: [], correctNumberCount: undefined, correctPositionCount: undefined}}))
  const [guess, setGuess] = useState<number[]>([])
  const [guessCount, setGuessCount] = useState<number>(0)
  const [won, toggleWon] = useState<boolean | undefined>(undefined)

  const [openInstructionModal, toggleInstructionModal] = useState<boolean>(true)
  const [openPinPadModal, togglePinPadModal] = useState<boolean>(false)

  const onBackspaceClicked = () => {
    const newGuess = [...guess]
    newGuess.pop()
    setGuess(newGuess)
  }

  const onNumberClicked = (number: number) => {
    setGuess([...guess, number])
  }

  const onEnterClicked = () => {
    const newGuesses = [...guesses]
    const newGuess = newGuesses[guessCount]
    
    newGuess.number = guess
    const correctPositionCount = newGuess.number.filter((number, index) => correctNumber.current[index] === number).length


    if (correctPositionCount === GUESS_LENGTH) {
      newGuess.correctNumberCount = GUESS_LENGTH
      newGuess.correctPositionCount = correctPositionCount

      setGuesses(newGuesses)
      toggleWon(true)

    } else {
      newGuess.correctNumberCount = newGuess.number.filter((number) => correctNumber.current.includes(number)).length
      newGuess.correctPositionCount = newGuess.number.filter((number, index) => correctNumber.current[index] === number).length
      
      setGuesses(newGuesses)
      setGuessCount(guessCount + 1)
    }
  }

  const onStartOverClicked = () => {
    setGuesses(Array(MAX_GUESS_COUNT).fill("").map(() => { return { id: uuidv4(), number: [], correctNumberCount: undefined, correctPositionCount: undefined}}))
    correctNumber.current = samplesize(NUMBER_RANGE, GUESS_LENGTH)
    setGuessCount(0)
    toggleWon(undefined)
  }


  useEffect(() => {
    setGuess([])
    if (guessCount === MAX_GUESS_COUNT) {
      toggleWon(false)
    }
  }, [guesses])

  useEffect(() => {console.log("CORRECT", correctNumber.current)}, [])
  console.log(won)

  return (
    <div className='flex-1 flex items-center min-h-full flex-col'>
      <header className='fixed top-0 inset-0 h-12 w-full sm:h-16 border-b border-b-gray-300 bg-white p-5'>
        <div className='hidden sm:flex h-full justify-between items-center'>
          <button onClick={() => toggleInstructionModal(true)}><QuestionMarkCircleIcon className='w-8 h-8 stroke-2 text-gray-700'/></button>
          <h1 className='text-gray-700 text-3xl font-bold'>Crackle</h1>
          <SettingsDropdown onStartOverClicked={() => onStartOverClicked()}/>
        </div>
        <div className='flex sm:hidden h-full justify-between items-center'>
          <div className='flex gap-2'>
            <h1 className='text-gray-700 text-2xl font-bold'>Crackle</h1>
          </div>
          <div className='flex gap-2'>
            <button onClick={() => toggleInstructionModal(true)}><QuestionMarkCircleIcon className='w-6 h-6 stroke-2 text-gray-700'/></button>
            <SettingsDropdown onStartOverClicked={ () => onStartOverClicked()}/>
          </div>
        </div>
      </header>
      <main className='flex max-h-max overflow-y-hidden flex-col items-center sm:items-start justify-center sm:flex-row gap-8 sm:gap-10 mt-16 sm:mt-20'>
        <div className="flex">
          <div className='flex flex-col'>
            <div className="flex items-center justify-center w-full h-12 sm:h-14 bg-gray-700 text-lg text-white font-semibold"> Your Guess</div>
            <div className='grid grid-rows-5 border-l-2 border-gray-300 max-h-max items-center justify-center w-full'>
              {
                guesses.map((guess) => {
                  return (
                    <div key={guess.id}>
                      <Guess isCorrect={won && guesses[guessCount].id === guess.id} number={guess.number}/>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="flex">
            <div className='flex flex-col'>
              <div className="flex w-full items-center text-center justify-center h-12 sm:h-14 bg-gray-700 text-xs text-white pl-1 font-bold">
                # of Correct<br/> Numbers
              </div>
              
              <div className='grid grid-rows-5 border-l-2 border-b-gray-300 max-h-max items-center justify-center w-full'>
                {
                  guesses.map((guess) => {
                    return (
                      <div key={guess.id}>
                          <GuessScore isCorrect={won && guesses[guessCount].id === guess.id} score={guess.correctNumberCount}/>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className='flex flex-col'>
              <div className="flex items-center text-center justify-center w-full h-12 sm:h-14 bg-gray-700 text-xs text-white pl-1 font-bold">
                # in Correct <br/> Positions
              </div>
              <div className='grid grid-rows-5 max-h-max items-center justify-center w-full'>
                {
                  guesses.map((guess) => {
                    return (
                      <div key={guess.id}>
                        <GuessScore isCorrect={ won && guesses[guessCount].id === guess.id } score={guess.correctPositionCount}/>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <PinPad 
            number={guess}
            onNumberClicked={(number: number)  => onNumberClicked(number)}
            onBackspaceClicked={() => onBackspaceClicked()}
            onEnterClicked={() => onEnterClicked()}
          />
        </div>
        <div className="block sm:hidden">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
            onClick={() => { 
              togglePinPadModal(true)}
            }
          >
            Open Pin Pad
          </button>  
        </div>
      </main>
      { won !== undefined && 
          <EndCardModal won={won} number={correctNumber.current} onStartOverClicked={() => onStartOverClicked()}/>
      }
      <InstructionModal open={openInstructionModal} setOpen={(open: boolean) => toggleInstructionModal(open)}/>
      {
        openPinPadModal &&
        <PinPadModal
          open={openPinPadModal}
          setOpen={(open: boolean) => togglePinPadModal(open)}
          number={guess}
          onNumberClicked={(number: number)  => onNumberClicked(number)}
          onBackspaceClicked={() => onBackspaceClicked()}
          onEnterClicked={() => onEnterClicked()}
        />
      }
    </div>
  )
}