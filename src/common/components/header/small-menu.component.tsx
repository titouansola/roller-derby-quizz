import { useCallback, useState } from 'react';
import Link from 'next/link';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@internals/common/components/ui/sheet.component';
import { Button } from '@internals/common/components/ui/button.component';
import { ROUTE_LIST } from '@internals/common/constants/route.list';

export function SmallMenu() {
  const [open, setOpen] = useState(false);

  const onClick = useCallback(() => setOpen(false), []);
  const onOpenChange = useCallback((value: boolean) => setOpen(value), []);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <HamburgerMenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <nav className="flex flex-col gap-6 mt-4">
          {ROUTE_LIST.map((route, index) => (
            <Link key={index} href={route.href} onClick={onClick}>
              {route.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
