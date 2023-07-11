import Header from "../Header";
import Loader from "../Loader/Loader";
import PuffLoader from "../Loader/Loader";
import TableData from "./TableData";

export default function Table({results, tableType, loading}) {
  return (
    <div className="bg-white  rounded-lg shadow-md py-3 w-full text-right space-y-3">
      <Header
        innerText={
          tableType == "humidity"
            ? "رطوبت نسبی داخلی"
            : tableType == "tempreture"
            ? "دمای داخلی گلخانه"
            : ""
        }
      />

      <div className="divide-y-2 space-y-2 first-of-type:border-t-2 flex flex-col items-center">
        {loading ? (
          <Loader />
        ) : (
          results?.map((result, idx) => (
            <TableData
              key={idx}
              label={result.name}
              value={result.value ? result.value : "نامشخص"}
            />
          ))
        )}
      </div>
    </div>
  );
}
