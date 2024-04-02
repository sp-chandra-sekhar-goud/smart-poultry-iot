import Layout from "@/components/Layout";
import SensorCard from "@/components/sensorCard";

import MQ135 from "../public/sensors/MQ135.png";
import MQ137 from "../public/sensors/MQ137.png";
import DHT22 from "../public/sensors/DHT22.png";
import ESP32 from "../public/sensors/ESP32.png";
import Image from "next/image";

export default function About() {
  const data = [
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

  const features_style =
    "mb-4 font-medium bg-yellow-800 text-center rounded-md px-2 py-4 text-white";

  return (
    <Layout>
      <div className="p-8 w-[100vw] md:w-[75vw]">
        <h1 className="font-bold text-[6vw] md:text-[2vw] underline">
          Advanced Sensor Network For Monitoring & Controlling Poultry Farms in
          Southern India
        </h1>
        <p className="mt-2 text-justify">
          <span className="">Our</span> project offers real-time monitoring and
          control of poultry farms in Southern India, featuring dynamic
          dashboards, in-depth analytics, and offline functionality for
          uninterrupted operation.
        </p>
        <br />
        <div className="my-4 ">
          <h1 className="font-bold mb-4 text-[6vw] md:text-[2vw] underline">
            Key Features:
          </h1>

          <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <li className={features_style}>Dynamic Dashboard Display</li>
            <li className={features_style}>In-Depth Analytics</li>
            <li className={features_style}>Dual Monitoring Modes</li>
            <li className={features_style}>Multisensory Data Collection</li>
            <li className={features_style}>Offline Data Storage</li>
            <li className={features_style}>High-Frequency Data Sampling</li>
            <li className={features_style}>Tailored for Southern India</li>
            <li className={features_style}>Scalability and Customization</li>
            <li className={features_style}>Remote Monitoring and Control</li>
          </ul>
        </div>

        <div className="my-6">
          <h1 className="font-bold mb-4 text-[6vw] md:text-[2vw] underline">
            Components
          </h1>
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
