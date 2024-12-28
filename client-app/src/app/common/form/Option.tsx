interface Props {
  text: string;
  value: string;
  className? :string
}

export default function Option({ text, value, className }: Props) {

  
  return (
    <option value={value} className={className}>
      {text}
    </option>
  );
}
