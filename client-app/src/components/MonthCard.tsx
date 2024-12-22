interface Props {
  month: string;
  items: number;
}

export default function MonthCard({ month, items }: Props) {
  const monthName = new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(new Date());

  return (
    <div className="w-1/5 cursor-pointer relative  ">
      {monthName === month && (
        <div className="absolute min-h-2 bg-slate-400 top-0 left-0 w-full rounded-t-md"></div>
      )}

      <div className={`flex justify-between border border-slate-700 rounded-md w-full p-4 hover:transition-all duration-300 hover:bg-slate-800 ${monthName == month ? 'border-slate-400' : '' }`}>
        <div className={monthName === month ? 'font-semibold' : ''}>
          {month}
        </div>
        <div className={monthName === month ? 'font-semibold' : ''}>
          {items}
        </div>
      </div>
    </div>
  );
}
