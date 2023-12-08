import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@internals/components/ui/navigation-menu.component';
import { routeList } from '@internals/features/navigation/constants/route.list';

export default function RegularMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {routeList.map((route, index) => (
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
