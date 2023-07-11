export default function index({label, value}) {
  return (
    <div className="flex items-center justify-between w-full font-yekanMedium text-sm py-2 px-3">
      <span className="px-2">{value}</span>
      <span className="px-2">{label}</span>
    </div>
  );
}
