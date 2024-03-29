import Layout from "@/components/Layout";
import "react-datepicker/dist/react-datepicker.css";
import SensorAnalyticsComponent from "@/components/sensorAnalyticsComponent";

export default function Butane() {
  return (
    <Layout>
      <SensorAnalyticsComponent parameter={"Butane"} endPoint={"butaneData"}/>
    </Layout>
  );
}
