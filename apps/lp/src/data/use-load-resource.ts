import { useMemo, useEffect, useState } from "react"

export const useLoadResource = (load: () => any, dependencies: any[] = []) => {
  const [resource, setResource] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getResources = async () => {
    setIsLoading(true)
    const result = await load()
    setIsLoading(false)

    setResource(result)
  }

  useEffect(() => {
    getResources()
  }, dependencies)

  return useMemo(
    () => ({
      resource,
      isLoading,
    }),
    [resource, isLoading]
  )
}
