export default function ContactForm() {
  return (
    <form className="w-full rounded-lg shadow-md">
      <div className="mb-4">
        {/* <label className="block text-gray-700 mb-2" htmlFor="name">
          Nombre
        </label> */}
        <input
          type="text"
          id="name"
          className="w-full px-3 font-bold py-2 bg-[#dbd9d3] rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="NOMBRE"
        />
      </div>
      <div className="mb-4">
        {/* <label className="block text-gray-700 mb-2" htmlFor="email">
          Email
        </label> */}
        <input
          type="email"
          id="email"
          className="w-full px-3 font-bold py-2 bg-[#dbd9d3] rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="EMAIL"
        />
      </div>
      <div className="mb-4">
        {/* <label className="block text-gray-700 mb-2" htmlFor="email">
          Email
        </label> */}
        <input
          type="phone"
          id="phone"
          className="w-full px-3 font-bold py-2 bg-[#dbd9d3] rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="MOVIL"
        />
      </div>
      <div className="mb-4">
        {/* <label className="block text-gray-700 mb-2" htmlFor="email">
          Email
        </label> */}
        <input
          type="string"
          id="location"
          className="w-full px-3 font-bold py-2 bg-[#dbd9d3] rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="LOCALIDAD / PROVINCIA"
        />
      </div>
      <div className="mb-4">
        {/* <label className="block text-gray-700 mb-2" htmlFor="message">
          MENSAJE
        </label> */}
        <textarea
          id="message"
          className="w-full px-3 font-bold py-2 bg-[#dbd9d3] rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          rows={4}
          placeholder="MENSAJE"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-[#49614e] font-bold uppercase text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
      >
        Enviar
      </button>
    </form>
  );
}
