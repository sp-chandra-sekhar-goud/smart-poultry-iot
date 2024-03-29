import Layout from "@/components/Layout";
import "react-datepicker/dist/react-datepicker.css";
import SensorAnalyticsComponent from "@/components/sensorAnalyticsComponent";

export default function CarbonMonoxide() {
  return (
    <Layout>
      <SensorAnalyticsComponent parameter={"CarbonMonoxide"} endPoint={"carbonMonoxideData"}/>
    </Layout>
  );
}
