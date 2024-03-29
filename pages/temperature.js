import Layout from "@/components/Layout";
import "react-datepicker/dist/react-datepicker.css";
import SensorAnalyticsComponent from "@/components/sensorAnalyticsComponent";

export default function Temperature() {
  return (
    <Layout>
      <SensorAnalyticsComponent parameter={"Temperature"} endPoint={"tempData"}/>
    </Layout>
  );
}
