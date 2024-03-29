import Layout from "@/components/Layout";
import "react-datepicker/dist/react-datepicker.css";
import SensorAnalyticsComponent from "@/components/sensorAnalyticsComponent";

export default function Propane() {
  return (
    <Layout>
      <SensorAnalyticsComponent parameter={"Propane"} endPoint={"propaneData"}/>
    </Layout>
  );
}
