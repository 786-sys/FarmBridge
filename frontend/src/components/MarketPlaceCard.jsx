export const MarketPlaceCard = ({ listing }) => {
  return (
    <article className="card listing-card">
      <h3>{listing.crop}</h3>
      <p>
        <strong>{listing.quantityKg} kg</strong> • ₹{listing.pricePerKg}/kg
      </p>
      <p>{listing.location}</p>
      <span className="chip">Quality {listing.quality}</span>
    </article>
  )
}
