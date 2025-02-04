import { cn } from '@/lib/utils';
import { Label } from '@/Components/shadcn/ui/label';
import { memo } from 'react';

export default memo(function InputError({ message, className }) {
  if (!message) return null;

  return (
    <Label className={cn('text-destructive', className)}>
      {message}
    </Label>
  );
});
