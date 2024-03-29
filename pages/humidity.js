import Layout from "@/components/Layout";
import "react-datepicker/dist/react-datepicker.css";
import SensorAnalyticsComponent from "@/components/sensorAnalyticsComponent";

export default function Humidity() {
  return (
    <Layout>
      <SensorAnalyticsComponent parameter={"Humidity"} endPoint={"humidityData"}/>
    </Layout>
  );
}
