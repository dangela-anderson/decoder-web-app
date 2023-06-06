import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Cog6ToothIcon } from '@heroicons/react/20/solid'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
interface SettingsDropdownProps {
    onStartOverClicked: () => void
} 
export default function SettingsDropdown({ onStartOverClicked }: SettingsDropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center bg-white px-3 py-2">
          <Cog6ToothIcon className='w-6 h-6 sm:w-8 sm:h-8 sm:stroke-2 fill-gray-700' aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 sm:mt-3 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex justify-center items-center py-5 px-3">
            <Menu.Item>
              {({ active }) => ( 
                <button
                  onClick={() => onStartOverClicked()}
                  className={classNames(`${ active ? "bg-red-500" : "bg-red-600"} font-semibold flex-1 text-white block px-4 py-2 text-sm rounded-md`)}
                >
                  Start Over
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
