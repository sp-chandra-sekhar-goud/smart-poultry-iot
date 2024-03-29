import Layout from "@/components/Layout";
import "react-datepicker/dist/react-datepicker.css";
import SensorAnalyticsComponent from "@/components/sensorAnalyticsComponent";

export default function Ammonia() {
  return (
    <Layout>
      <SensorAnalyticsComponent parameter={"Ammonia"} endPoint={"ammoniaData"}/>
    </Layout>
  );
}
