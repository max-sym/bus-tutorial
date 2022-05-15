import React, { useState } from "react"
import { InputCore, Card, Text } from "@bus/ui"
import { Listbox, Portal } from "@headlessui/react"
import { usePopper } from "react-popper"
import tw from "tailwind-styled-components"
import { GoChevronDown } from "@react-icons/all-files/go/GoChevronDown"

export const OptionBase = tw.div`transition ease-in-out relative py-2 px-4`

export type OptionType = {
  name: string
  value: any
  disabled?: boolean
}

export type SelectType = {
  options: OptionType[]
  onChange: (value: OptionType) => void
  value: string
  optionsClassName?: string
}

export const Select = ({
  options,
  value,
  onChange,
  optionsClassName,
}: SelectType) => {
  const selectedOption = options.find(option => option.value === value)

  const [button, setButton] = useState<HTMLButtonElement | null>(null)
  const [popper, setPopper] = useState<HTMLUListElement | null>(null)

  const { styles, attributes } = usePopper(button, popper, {
    placement: "bottom",
    strategy: "fixed",
  })

  return (
    <div className="relative">
      <Listbox value={selectedOption} onChange={onChange}>
        <Listbox.Button as={React.Fragment} ref={setButton}>
          <InputCore
            className="relative flex items-center justify-between w-full truncate cursor-pointer gap-x-2"
            $as="button"
          >
            <span>{selectedOption?.name}</span>
            <span className="-mr-4">
              <GoChevronDown className="w-5 h-5" />
            </span>
          </InputCore>
        </Listbox.Button>
        <Portal>
          <Listbox.Options
            ref={setPopper}
            style={styles.popper}
            className={optionsClassName}
            {...attributes.popper}
          >
            <Card className="my-2">
              {options.map(option => (
                <Listbox.Option
                  key={option.value}
                  value={option}
                  disabled={option.disabled}
                  as={React.Fragment}
                >
                  {({ active, selected }) => (
                    <OptionBase
                      className={`cursor-pointer ${
                        active ? "bg-green-100 dark:bg-gray-700" : ""
                      }`}
                    >
                      <Text color={selected ? "green" : undefined}>
                        {option.name}
                      </Text>
                    </OptionBase>
                  )}
                </Listbox.Option>
              ))}
            </Card>
          </Listbox.Options>
        </Portal>
      </Listbox>
    </div>
  )
}
