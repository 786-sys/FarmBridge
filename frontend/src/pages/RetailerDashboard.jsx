export const RetailerDashboard = ({ data }) => {
  if (!data) return null

  return (
    <section className="card">
      <h2>Retailer Procurement Dashboard</h2>
      <ul>
        <li>Active suppliers: {data.activeSuppliers}</li>
        <li>Fill-rate: {data.fillRate}</li>
        <li>Cold-chain SLA breaches: {data.slaBreaches} this week</li>
        <li>Projected demand spike: {data.demandSpikeForecast}</li>
      </ul>
    </section>
  )
}
