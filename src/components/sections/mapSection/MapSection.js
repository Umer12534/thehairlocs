import './MapSection.css'

const MapSection = () => {
  return (
    <>
    <section className="map-section">
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13447.999378136888!2d74.06526129660493!3d32.5795282098902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f05328383dd61%3A0x37f6f2207ec41695!2sSmile%20Ladies%20Salon%20Gujrat!5e0!3m2!1sen!2s!4v1764044360993!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

      </div>
    </section>
    </>
  )
}

export default MapSection
