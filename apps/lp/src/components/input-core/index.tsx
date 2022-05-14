import tw from "tailwind-styled-components"

const colorClass =
  "text-gray-900 dark:text-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 dark:focus:border-green-500"

export const InputCore = tw.input`appearance-none border rounded-xl w-full outline-none pl-4 pr-6 focus:outline-none focus:ring-0 h-10
${() => colorClass}`
