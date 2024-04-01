import Layout from "@/components/Layout";
import "react-datepicker/dist/react-datepicker.css";
import SensorAnalyticsComponent from "@/components/sensorAnalyticsComponent";

export default function LPG() {
  return (
    <Layout>
      <SensorAnalyticsComponent parameter={"LPG"} endPoint={"lpgData"}/>
    </Layout>
  );
}
