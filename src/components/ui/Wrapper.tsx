import { cn } from '@/lib/utils';

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

const Wrapper = ({ children, className }: WrapperProps) => {
  return <div className={cn('max-w-7xl mx-auto', className)}>{children}</div>;
};

export default Wrapper;
