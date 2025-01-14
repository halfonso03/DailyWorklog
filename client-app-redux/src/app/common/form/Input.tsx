interface Props {
  name: string;
  placeholder?: string;
  tabindex?: number;
}

export default function Input({ name, placeholder, tabindex }: Props) {
  return (
    <input
      name={name}
      tabIndex={tabindex}
      id={name}
      placeholder={placeholder}
      className="w-3/4 border focus:border-0 outline-none border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-transparent dark:border-slate-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    ></input>
  );
}
