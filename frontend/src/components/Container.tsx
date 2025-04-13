import React, { ReactNode } from 'react'
import {twMerge} from 'tailwind-merge';

interface ContainerProps {
  children?: ReactNode;
  className? : string;
}

const Container = ({ children , className }: ContainerProps) => {
  return (
    <div className={twMerge('w-full pt-32 min-h-screen lg:px-64 md:px-32 px-3 bg-background-secondary text-foreground', className)}>
      {children}
    </div>
  );
}

export default Container
