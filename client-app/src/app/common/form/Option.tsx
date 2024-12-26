interface Props {
  text: string;
  value: string;
}

export default function Option({ text, value }: Props) {
  return (
    <option value={value} className="bg-slate-900 text-white">
      {text}
    </option>
  );
}
