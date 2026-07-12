export default function WhatsAppButton() {
  const phoneNumber = '19545103073'
  const message = 'Hi Frothy Car Wash! I would like information about your car wash and detailing services.'
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Frothy Car Wash on WhatsApp"
      className="
        fixed bottom-6 right-6 z-50
        flex h-14 w-14 items-center justify-center
        rounded-full bg-green-500 text-white
        shadow-lg transition hover:scale-105 hover:bg-green-600
        sm:h-auto sm:w-auto sm:gap-2 sm:px-5 sm:py-3
      "
    >
      <span aria-hidden="true">💬</span>
      <span className="hidden sm:inline font-semibold">
        Chat with us
      </span>
    </a>
  )
}
