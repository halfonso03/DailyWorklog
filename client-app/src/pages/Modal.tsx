/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

interface IStyledModal {
  ref: any;
  $size: string;
}

function getSize(size: string) {
  switch (size) {
    case 'small':
      return '30%';
    case 'medium':
      return '50%';
    case 'large':
      return '70%';
    default:
      return null;
  }
}
const StyledModal = styled.div.attrs({
  className: `bg-slate-950`,
})<IStyledModal>`
  position: fixed;
  top: 50%;
  left: 50%;
  width: ${(props) => getSize(props.$size)};
  transform: translate(-50%, -50%);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 1rem 1.5rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  /* backdrop-filter: blur(4px); */
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;

  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

export interface ModalContextType {
  opens?: string;
  openName: string;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<string>>;
}

interface ModalProps {
  children: ReactNode;
  opens?: string;
  closes?: string;
}

interface OpenProps {
  children: ReactNode;
  opens?: string;
  closes?: string;
}

interface CloseProps {
  children: ReactNode;
  name: string;
}

interface WindowProps {
  children: ReactElement;
  name: string;
  $size: string;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>('');

  const close = () => {
    setOpenName('');
  };
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useContext<ModalContextType>(ModalContext as any);

  return cloneElement(children as any, {
    onClick: () => {
      open(opensWindowName as string);
    },
  });
}

function Close({ children }: CloseProps) {
  const context = useContext<ModalContextType>(ModalContext as any);

  return cloneElement(children as any, {
    onClick: () => {
      context.close();
    },
  });
}

function Window({ children, name, $size }: WindowProps) {
  const context = useContext<ModalContextType | undefined>(ModalContext as any);
  const ref = useOutsideClick(context?.close);

  if (name !== context!.openName) {
    return null;
  }

  return createPortal(
    <Overlay>
      <StyledModal ref={ref} $size={$size}>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button onClick={context!.close}>
            <HiXMark />
          </Button>
        </div>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
Modal.Close = Close;

export default Modal;

export function useModalContext() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useContext<ModalContextType>(ModalContext as any);
}
