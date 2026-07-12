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
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        padding: '14px 24px',
        backgroundColor: '#25D366',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '24px',
        fontWeight: '600',
        fontSize: '15px',
        zIndex: 40,
        border: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        transition: 'background-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#20BA5A'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#25D366'
      }}
    >
      💬 Chat with us
    </a>
  )
}
