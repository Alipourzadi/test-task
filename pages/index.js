import Table from "@/components/Table";
import {useEffect, useState} from "react";

export default function Home({data}) {
  const [tempData, setTempData] = useState();
  const [humidityData, setHumidityData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data && data?.successful == true) {
      const result = data.result;
      const tempretureData = Object.keys(result["0"]).map((key) => {
        console.log(result["0"][key]);
        return {
          name: result["0"][key].name,
          value: result["0"][key].value,
        };
      });
      const humidityData = Object.keys(result["2"]).map((key) => ({
        name: result["2"][key].name,
        value: result["2"][key].value,
      }));

      setTempData(tempretureData);
      setHumidityData(humidityData);
      setIsLoading(false);
    }
  }, [data]);

  return (
    <main className="flex mx-auto min-h-screen flex-col items-center justify-center gap-8 w-5/6 sm:w-3/4 md:p-24 my-8">
      <Table results={tempData} tableType="tempreture" loading={isLoading} />
      <Table results={humidityData} tableType="humidity" loading={isLoading} />
    </main>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://api.agroture.ir/user/greenhouse/sensor_data/get_gid_climate_detail",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "3f3c09c5ce605f07ecc399793202e69b6362e70ffdbc04f65633be5464995643",
      },
      body: JSON.stringify({gid: "0"}),
    }
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}
