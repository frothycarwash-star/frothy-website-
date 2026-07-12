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
      title="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold rounded-full transition-colors duration-200"
      style={{
        minWidth: '56px',
        minHeight: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 16px',
        gap: '8px',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
      }}
    >
      <span style={{ fontSize: '20px', lineHeight: '1' }}>💬</span>
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  )
}
