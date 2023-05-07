import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

type useCanParms = {
  permissions?: string[];
  roles?: string[];
};

export function useCan({ permissions, roles }: useCanParms) {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return false;
  }

  if (permissions?.length > 0) {
    const hasAllPermissions = permissions?.every((permission) => {
      return user.permissions.includes(permission);
    });

    if (!hasAllPermissions) {
      return false;
    }

    if (roles?.length > 0) {
      const hasAllRoles = roles?.every((role) => {
        return user.roles.includes(roles);
      });

      if (!hasAllRoles) {
        return false;
      }
    }

    return true;
  }
}
