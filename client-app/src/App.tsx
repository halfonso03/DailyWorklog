import { ReactNode } from 'react';
import { useLogContext } from './context/useLogContext';

interface Props {
  children: ReactNode;
}

export default function App({ children }: Props) {
  const { loadingTasks } = useLogContext();

  //   if (loadingTasks) return <div>from app loading tasks</div>

  return (
    <>
      {loadingTasks && (
        <div className="absolute size-full z-40 bg-gray-900 opacity-70"></div>
      )}
      <div>{children}</div>
    </>
  );
}
