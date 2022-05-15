import { Text, Button } from "@bus/ui"

export const CheckerSection = () => {
  const onStartClick = () => {
    // Launch QR Scanner
  }

  return (
    <div>
      <Text>
        {"In this section you can check the tickets that have QR code."}
      </Text>
      <Button className="mt-4" onClick={onStartClick}>
        {"Start Checking"}
      </Button>
    </div>
  )
}
