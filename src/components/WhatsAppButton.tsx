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
        padding: '12px 20px',
        backgroundColor: '#25D366',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: '500',
        fontSize: '14px',
        zIndex: 40,
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#20BA5A'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#25D366'
      }}
    >
      Chat with us
    </a>
  )
}
