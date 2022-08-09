import { HeroIcon } from "#types/heroicon";
import clsx from "clsx";

export interface IconButtonProps {
  Icon: HeroIcon;
  children?: React.ReactNode;
  color: string;
  hoverBg?: string;
  isActive?: boolean;
  onClick: () => void;
}

export const IconButton = (props: IconButtonProps) => {
  const { Icon, isActive, color, children, hoverBg } = props;

  return (
    <button className={clsx('bg-none p-1 flex items-center rounded hover:bg-purple-50 focus:outline-purple-400', color, hoverBg, isActive && 'bg-slate-200')} {...props}><Icon className={clsx('h-4 w-4', !isActive && color, isActive && 'text-black', children?.toString() && 'mr-1')} /><span className="text-sm">{children}</span></button>
  );
};
