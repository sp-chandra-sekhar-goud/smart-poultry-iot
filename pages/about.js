import Layout from "@/components/Layout";
import SensorCard from "@/components/sensorCard";

import MQ6 from "../public/sensors/MQ6.png";
import MQ7 from "../public/sensors/MQ7.png";
import MQ135 from "../public/sensors/MQ135.png";
import MQ137 from "../public/sensors/MQ137.png";
import DHT22 from "../public/sensors/DHT22.png";
import ESP32 from "../public/sensors/ESP32.png";
import Image from "next/image";

export default function About() {
  const data = [
    {
      imgName: MQ6,
      sensorName: "MQ6",
      gases: "LPG, butane, propane, methane, alcohol, hydrogen",
      range: "300-10,000 ppm (parts per million)",
      accuracy: "±10% (for LPG)",
      volts: "5V",
      power: "~0.15A",
    },
    {
      imgName: MQ7,
      sensorName: "MQ7",
      gases: "Carbon monoxide (CO)",
      range: "20-2,000 ppm (parts per million)",
      accuracy: "±10% (for CO)",
      volts: "5V",
      power: "~0.15A",
    },
    {
      imgName: MQ135,
      sensorName: "MQ135",
      gases: "Ammonia, sulfide, benzene vapors, smoke, CO2",
      range: "10-1,000 ppm (parts per million)",
      accuracy: "±20% (for CO2)",
      volts: "5V",
      power: "~0.15A",
    },
    {
      imgName: MQ137,
      sensorName: "MQ137",
      gases: "Ammonia (NH3)",
      range: "5-500 ppm (parts per million)",
      accuracy: "±10% (for NH3)",
      volts: "5V",
      power: "~0.15A",
    },
    {
      imgName: DHT22,
      sensorName: "DHT22",
      gases: "Temperature and humidity",
      range: " -40°C to 80°C (temperature) | 0-100% RH (humidity)",
      accuracy: "±0.5°C (for temperature) | ±2% RH (for humidity)",
      volts: "3.3V - 6V",
      power: "~2.5mA",
    },
  ];

  const sensorCards = data.map((sensorData, index) => (
    <SensorCard
      key={index}
      imgName={sensorData.imgName}
      sensorName={sensorData.sensorName}
      gases={sensorData.gases}
      range={sensorData.range}
      accuracy={sensorData.accuracy}
      volts={sensorData.volts}
      power={sensorData.power}
    />
  ));

  return (
    <Layout>
      <div className="p-8 w-[100vw] md:w-[75vw]">
        <h1 className="font-bold text-[6vw] md:text-[2vw] underline">
          Advanced Sensor Network For Monitoring & Controlling Poultry Farms in
          Southern India
        </h1>
        <p className="mt-2 text-justify">
          <span className="">Our</span> project offers real-time monitoring and control of poultry farms
          in Southern India, featuring dynamic dashboards, in-depth analytics,
          and offline functionality for uninterrupted operation.
        </p>
        <br />
        <div className="my-4 ">
        <h1 className="font-bold mb-4 text-[6vw] md:text-[2vw] underline">
          Key Features:
        </h1>  
          <ul>
            <li className="mb-4">
              <strong>Dynamic Dashboard Display:</strong> A user-friendly
              interface provides real-time updates on poultry health, offering a
              comprehensive overview of critical parameters.
            </li>
            <li className="mb-4">
              <strong>In-Depth Analytics:</strong> Detailed analytics are
              available for each monitored component, enabling farmers to delve
              into specific aspects of their poultry farm's environment and make
              informed decisions.
            </li>
            <li className="mb-4">
              <strong>Dual Monitoring Modes:</strong> The system offers both
              Interval Monitoring and Real-Time Monitoring, catering to
              different needs and allowing users to choose the level of
              granularity in data collection.
            </li>
            <li className="mb-4">
              <strong>Multisensory Data Collection:</strong> Utilizing DHT22,
              MQ135, and MQ137 sensors, the system gathers crucial data on
              temperature, humidity, CO2 levels, and ammonia concentrations,
              providing a holistic view of the farm's conditions.
            </li>
            <li className="mb-4">
              <strong>Offline Data Storage:</strong> With the capability to
              store data locally in the ESP32's built-in flash memory, the
              prototype ensures continuous operation even in the absence of
              internet connectivity, safeguarding against potential disruptions.
            </li>
            <li className="mb-4">
              <strong>High-Frequency Data Sampling:</strong> The system reads
              data at an impressive rate of every 5 seconds, ensuring timely and
              accurate monitoring of environmental conditions within the poultry
              farm.
            </li>
            <li className="mb-4">
              <strong>Tailored for Southern India:</strong> Specifically
              designed to meet the needs of poultry farms in Southern India, the
              system addresses region-specific challenges and environmental
              factors.
            </li>
            <li className="mb-4">
              <strong>Scalability and Customization:</strong> Built with
              scalability in mind, the system can be adapted to farms of varying
              sizes and configurations, offering flexibility to meet diverse
              requirements.
            </li>
            <li className="mb-4">
              <strong>Remote Monitoring and Control:</strong> Farmers can
              remotely monitor and control their poultry farm operations through
              the integrated system, providing convenience and efficiency in
              managing farm activities from anywhere.
            </li>
          </ul>
        </div>

        <div className="my-6">
          <h1 className="font-bold mb-4 text-[6vw] md:text-[2vw] underline">Components</h1>
          <h1 className="font-bold  underline">Node MCU ESP32</h1>
          <div className="flex flex-col md:flex-row gap-8">
            <Image
              src={ESP32}
              alt="Sensor"
              className="w-[140vw] md:w-[20vw] object-contain"
            />
            <div className="w-[90vw] md:w-[40vw]">
              <p className="font-bold">
                Name:<span className="font-normal pl-1">ESP32</span>
              </p>

              <p className="font-bold">
                Microcontroller:
                <span className="font-normal pl-1">
                  Tensilica Xtensa LX6 dual-core processor
                </span>
              </p>

              <p className="font-bold">
                Operating Frequency:
                <span className="font-normal pl-1">Up to 240 MHz</span>
              </p>
              <p className="font-bold">
                Wi-Fi:
                <span className="font-normal pl-1">
                  {" "}
                  802.11 b/g/n (2.4 GHz) and Bluetooth v4.2 BR/EDR and BLE
                  (Bluetooth Low Energy)
                </span>
              </p>

              <p className="font-bold">
                Flash Memory:<span className="font-normal pl-1">4 MB</span>
              </p>
              <p className="font-bold">
                RAM:<span className="font-normal pl-1">520 KB SRAM</span>
              </p>
              <p className="font-bold">
                GPIO:
                <span className="font-normal pl-1">
                  Up to 36 GPIO pins (depending on the variant)
                </span>
              </p>
              <p className="font-bold">
                Analog Inputs:
                <span className="font-normal pl-1">Up to 18 ADC channels</span>
              </p>
              <p className="font-bold">
                Digital Interfaces:
                <span className="font-normal pl-1">SPI, I2C, UART, I2S</span>
              </p>
              <p className="font-bold">
                Operating Voltage:<span className="font-normal pl-1">3.3V</span>
              </p>
              <p className="font-bold">
                Power Consumption:
                <span className="font-normal pl-1">
                  Varies depending on usage, typically:
                </span>
              </p>
              <ul className="list-disc pl-6">
                <li>
                  Active mode: 80 mA (Wi-Fi), 7 mA (Bluetooth), 150 µA (RTC)
                </li>
                <li>Deep sleep mode: As low as 10 µA</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="my-6">
          <h1 className="font-bold text-2xl md:text-[2vw] underline">
            Sensors
          </h1>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {sensorCards}
          </div>
        </div>
      </div>
    </Layout>
  );
}
