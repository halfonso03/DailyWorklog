import { HelperOption } from '../app/utils/helperOptions';

interface Props {
  onHelperClick: (helper: string) => void;
  helperTags: HelperOption[];
}

export default function HelperTags(props: Props) {
  return (
    <div className="flex gap-1 py-2">
        {props.helperTags.map((h) => (
          <button
            type="button"
            key={h.key}
            className=" rounded-full bg-slate-700 text-white text-sm font-semibold px-3 py-1"
            onClick={() => props.onHelperClick(h.key)}
          >
            {h.key}
          </button>
        ))}
      </div>
  );
}
