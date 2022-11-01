import React, { FC } from 'react';

// TODO: Implement role checking
export default function withUserRole(Component: FC, props: any, allowedRoles: string[]) {
  const userRole = 'role'; // TODO: set user role from state;
  if (!allowedRoles.indexOf(userRole)) {
    return <Component {...props} />;
  }

  return <div>You don&apos;t have an access to this page</div>;
}
