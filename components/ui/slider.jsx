'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from 'lib/utils';

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className='relative h-1.5 border-t border-t-black/30 w-full grow overflow-hidden rounded-full bg-gray-700/40'>
      <SliderPrimitive.Range className='absolute h-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-200' />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className='block h-4 w-4 rounded-full border border-gray-200 bg-gradient-to-t shadow-inner   from-gray-700 to-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-2 dark:border-gray-400 dark:bg-gray-50 dark:focus-visible:ring-gray-300' />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
