export default function WhatsAppButton() {
    const phoneNumber = '19545103073';
    const message = "Hi Frothy Carwash, I'd like to book a wash";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
        <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-3xl shadow-lg hover:shadow-xl transition-all duration-200 z-50"
                aria-label="Contact us on WhatsApp"
                title="Chat with us on WhatsApp"
              >
              💬
        </a>a>
      );
}</a>
