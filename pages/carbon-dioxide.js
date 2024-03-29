import Layout from "@/components/Layout";
import "react-datepicker/dist/react-datepicker.css";
import SensorAnalyticsComponent from "@/components/sensorAnalyticsComponent";

export default function CarbonDioxide() {
  return (
    <Layout>
      <SensorAnalyticsComponent parameter={"CarbonDioxide"} endPoint={"carbonDioxideData"}/>
    </Layout>
  );
}
