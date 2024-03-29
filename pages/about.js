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
      <div className="p-8 w-[75vw]">
        <h1 className="font-bold text-[2vw] underline">
          Air Quality Monitoring
        </h1>
        <p className="mt-2 text-justify">
          Transforming Air Quality: Our project employs cutting-edge technology
          with a suite of sensors including MQ6, MQ7, MQ135, and MQ137, along
          with DHT22, to monitor vital air parameters like CO, CO2, Ammonia,
          Propane, Butane, Temperature, and Humidity. Powered by ESP32
          microcontrollers, we ensure real-time monitoring and instant alerts to
          users when gas levels breach safety thresholds. Our dynamic dashboard
          provides comprehensive data visualization accessible from any device,
          anywhere, empowering users to safeguard their environment with ease.
        </p>

        <div class="my-6">
          <h1 class="font-bold text-2xl underline">ESP32</h1>
          <div class="flex gap-8">
            <Image src={ESP32} alt="Sensor" class="w-[20vw] object-contain" />
            <div>
              <div className="flex gap-2">
              <p class="font-bold">Name:</p>
              <p>ESP32</p>
              </div>
              <p class="font-bold">Microcontroller:</p>
              <p>Tensilica Xtensa LX6 dual-core processor</p>
              <p class="font-bold">Operating Frequency:</p>
              <p>Up to 240 MHz</p>
              <p class="font-bold">Wi-Fi:</p>
              <p>
                802.11 b/g/n (2.4 GHz) and Bluetooth v4.2 BR/EDR and BLE
                (Bluetooth Low Energy)
              </p>
              <p class="font-bold">Flash Memory:</p>
              <p>4 MB</p>
              <p class="font-bold">RAM:</p>
              <p>520 KB SRAM</p>
              <p class="font-bold">GPIO:</p>
              <p>Up to 36 GPIO pins (depending on the variant)</p>
              <p class="font-bold">Analog Inputs:</p>
              <p>Up to 18 ADC channels</p>
              <p class="font-bold">Digital Interfaces:</p>
              <p>SPI, I2C, UART, I2S</p>
              <p class="font-bold">Operating Voltage:</p>
              <p>3.3V</p>
              <p class="font-bold">Power Consumption:</p>
              <p>Varies depending on usage, typically:</p>
              <ul class="list-disc pl-6">
                <li>
                  Active mode: 80 mA (Wi-Fi), 7 mA (Bluetooth), 150 µA (RTC)
                </li>
                <li>Deep sleep mode: As low as 10 µA</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="my-6">
          <h1 className="font-bold text-[2vw] underline">Sensors</h1>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {sensorCards}
          </div>
        </div>
      </div>
    </Layout>
  );
}
