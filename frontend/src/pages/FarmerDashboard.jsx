export const FarmerDashboard = ({ data }) => {
  if (!data) return null

  return (
    <section className="card">
      <h2>Farmer Command Center</h2>
      <ul>
        <li>Soil moisture: {data.soilMoisture}</li>
        <li>Irrigation schedule: {data.irrigationSchedule}</li>
        <li>Pest risk index: {data.pestRisk}</li>
        <li>Expected net margin this cycle: {data.projectedMargin}</li>
      </ul>
    </section>
  )
}
