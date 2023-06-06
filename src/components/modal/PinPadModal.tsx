import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import PinPad from '../PinPad'

interface PinPadModalProps {
    open: boolean 
    setOpen: (open: boolean) => void
    number: number[]
    onNumberClicked: (number: number) => void
    onBackspaceClicked: () => void
    onEnterClicked: () => void
}

export default function PinPadModal({open, setOpen, number, onNumberClicked, onBackspaceClicked, onEnterClicked }: PinPadModalProps) {

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
          <div className="flex min-h-full items-end justify-center p-10 text-center items-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-whiteshadow-xl transition-all">
                <div className="flex flex-col gap-6 bg-white px-4 pb-4 pt-5">
                    <PinPad 
                        number={number}
                        onNumberClicked={(number: number)  => onNumberClicked(number)}
                        onBackspaceClicked={() => onBackspaceClicked()}
                        onEnterClicked={() => { 
                            onEnterClicked()
                            setOpen(false)
                        }}
                    />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div> 
        </div>
      </Dialog>
    </Transition.Root>
  )
}