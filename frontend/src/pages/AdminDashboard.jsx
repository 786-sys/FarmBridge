export const AdminDashboard = ({ data }) => {
  if (!data) return null

  return (
    <section className="card">
      <h2>Admin Governance Panel</h2>
      <ul>
        <li>Onboarded farmers: {data.operations.activeFarmers}</li>
        <li>Onboarded retailers: {data.operations.activeRetailers}</li>
        <li>Order fulfillment SLA: {data.operations.orderFulfillment}</li>
        <li>Platform uptime: {data.operations.uptime}</li>
      </ul>
    </section>
  )
}
