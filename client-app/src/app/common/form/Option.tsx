interface Props {
  text: string;
  value: string;
  selected?: boolean;
}

export default function Option({ text, value, selected }: Props) {
  return (
    <option value={value} selected={selected} className="bg-slate-900 text-white">
      {text}
    </option>
  );
}
