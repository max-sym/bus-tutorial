import { useStore } from "@/store"
import { Select, OptionType } from "@bus/ui"

export const Actions = () => {
  const qrCodeReader = useStore(store => store.qrCodeReader)

  if (!qrCodeReader) return null

  const cameraOptions: OptionType[] = qrCodeReader.cameras.map(camera => ({
    value: camera.id,
    name: camera.label,
  }))

  const onChange = (option: OptionType) => {
    qrCodeReader.changeCamera(option.value)
  }

  return (
    <div className="absolute inset-0 m-2">
      <Select
        onChange={onChange}
        value={qrCodeReader.selectedCamera}
        options={cameraOptions}
        optionsClassName="z-50"
      />
    </div>
  )
}
