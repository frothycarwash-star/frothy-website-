export default function WhatsAppButton() {
  const phoneNumber = '19545103073'
  const message = 'Hi Frothy Car Wash! I would like information about your car wash and detailing services.'
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  return (
    <>
      {/* Desktop: Button with text */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Frothy Car Wash on WhatsApp"
        className="hidden sm:flex fixed bottom-6 right-6 items-center justify-center px-6 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 z-40 font-semibold text-sm"
        title="Chat with us on WhatsApp"
      >
        Chat with us
      </a>

      {/* Mobile: Icon only */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Frothy Car Wash on WhatsApp"
        className="sm:hidden fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 z-40 text-lg font-bold"
        title="Chat with us on WhatsApp"
      >
        💬
      </a>
    </>
  )
}
