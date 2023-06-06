import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface EndCardProps {
  won: boolean 
  number: number []
  onStartOverClicked: () => void
}

export default function EndCardModal({ won, number, onStartOverClicked }: EndCardProps) {
  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  useEffect(() => {
    if (!open) {
      onStartOverClicked() 
    }
  }, [open])

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-whiteshadow-xl transition-all sm:my-8 w-full max-w-xs sm:max-w-sm">
                <div className="flex flex-col gap-6 bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900">
                    {won ? "Success!" : "Failure!"}
                  </Dialog.Title>
                  <div className="flex flex-col">
                    <p className='font-semibold text-black text-md'>The pin was:</p>
                    <p className='font-bold text-gray-700 text-4xl'>{ number }</p>
                  </div>
                  <button
                    type="button"
                    className={`inline-flex w-full justify-center rounded-md ${ won ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500" } px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
                    onClick={() => { 
                      setOpen(false)}
                    }
                  >
                    Start Over
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