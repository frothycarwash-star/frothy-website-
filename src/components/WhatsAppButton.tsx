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
      className="fixed bottom-6 right-6 flex items-center justify-center px-4 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full z-40 font-medium"
      title="Chat with us on WhatsApp"
      style={{
        minWidth: 'fit-content',
        whiteSpace: 'nowrap',
        fontSize: '14px'
      }}
    >
      Chat with us
    </a>
  )
}
