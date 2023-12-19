import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@internals/common/components/ui/navigation-menu.component';
import { ROUTE_LIST } from '@internals/common/constants/route.list';

export function RegularMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {ROUTE_LIST.map((route, index) => (
          <NavigationMenuItem key={index}>
            <Link href={route.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {route.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
