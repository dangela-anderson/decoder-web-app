import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface InstructionProps {
    open: boolean 
    setOpen: (open: boolean) => void
}


const MAX_GUESS_COUNT = 7

export default function InstructionModal({open, setOpen}: InstructionProps) {

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm transition-all duration-300" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-whiteshadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                <div className="flex flex-col gap-6 bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900">
                    How To Play
                  </Dialog.Title>
                  <div className="flex flex-col">
                    <p className='font-bold text-black text-xl mb-4'>Objective</p>
                    <p className='font-semibold text-black text-md'>Guess the unique 3 digit pin in {MAX_GUESS_COUNT} tries</p>
                  </div>
                  <div className="flex flex-col">
                    <p className='font-bold text-black text-xl mb-4'>Rules</p>
                    <div className="flex flex-col items-start-center justify">     
                      <p className="font-semibold mb-2 text-md">For each guess, you will be provided:</p>
                      <p className="text-sm"> 1{")"} the number of digits you guessed correctly</p>
                      <p className="text-sm">2{")"} the number of correctly guessed digits that <br/> are in the correct position</p>      
                    </div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                    onClick={() => { 
                      setOpen(false)}
                    }
                  >
                    Continue
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div> 
        </div>
      </Dialog>
    </Transition.Root>
  )
}