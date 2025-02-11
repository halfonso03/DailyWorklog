import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

type Props = {
  label: string;
  value: string;
  currentSortValue: string;
  setSortbyValue: (value: string) => void;
};

export default function SortBySelector({
  label,
  value,
  currentSortValue,
  setSortbyValue,
}: Props) {
  console.log(value, currentSortValue, currentSortValue?.indexOf(value));
  return (
    <div className="flex  align-baseline">
      <button
        className="hover:underline"
        onClick={() => {
          const sortDir = currentSortValue.indexOf('DESC') === -1 ? 'DESC' : '';
          setSortbyValue(value + sortDir);
        }}
      >
        {label}
      </button>
      <span className="ml-2 text-xl">
        {currentSortValue.indexOf(value) !== -1 ? (
          currentSortValue.includes('DESC') ? (
            <BsArrowDown></BsArrowDown>
          ) : (
            <BsArrowUp></BsArrowUp>
          )
        ) : (
          <></>
        )}
      </span>
    </div>
  );
}
