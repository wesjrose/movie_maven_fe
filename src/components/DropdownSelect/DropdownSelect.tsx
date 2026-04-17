import { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

const labelLength: number = 10;

const items = [
  {
    id: 1,
    name: "Comedy",
  },
  {
    id: 2,
    name: "Action",
  },
  {
    id: 3,
    name: "Adventure",
  },
  {
    id: 4,
    name: "Animation",
  },
  {
    id: 5,
    name: "Fantasy",
  },
];

export default function Example() {
  const [selected, setSelected] = useState<{ id: number; name: string }[]>([]);
  const displayText: string =
    selected.length > 0 ? selected.map((s) => s.name).join(", ") : "All Genres";
  const truncDisplayText: string =
    displayText.length > labelLength
      ? displayText.slice(0, labelLength) + "..."
      : displayText;

  return (
    <Listbox value={selected} onChange={setSelected} multiple>
      <div className="relative w-fit pl-5 pr-5 mt-0">
        <ListboxButton className="grid w-auto cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-black outline-1 -outline-offset-1 outline-white/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-500 sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="relative group">
              {displayText.length > labelLength && (
                <div className="absolute bottom-full mb-2  hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  {displayText}
                </div>
              )}
              {truncDisplayText}
            </span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="border border-[#F0F3F5] absolute z-10 mt-1 max-h-56 w-auto overflow-auto rounded-md bg-white py-1 text-base data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm outline-none"
        >
          {items.map((person) => (
            <ListboxOption
              key={person.id}
              value={person}
              className="group relative cursor-default py-2 pr-12 pl-3 text-black select-none data-focus:bg-indigo-500 data-focus:outline-hidden"
            >
              <div className="flex items-center">
                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                  {person.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-400 group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
