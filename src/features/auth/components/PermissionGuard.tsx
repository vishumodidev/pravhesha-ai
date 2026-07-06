import React from 'react';
import { useClientStore } from '../../../app/useClientStore';
import { ShieldAlert } from 'lucide-react';

interface PermissionGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('Admin' | 'Team Lead' | 'Support Manager' | 'Support Agent' | 'Sales Executive' | 'Marketing Executive')[];
  fallback?: React.ReactNode;
}

export default function PermissionGuard({
  children,
  allowedRoles,
  fallback,
}: PermissionGuardProps) {
  const user = useClientStore((state) => state.user);

  // If no specific role requirements, allow access
  if (!allowedRoles || allowedRoles.length === 0) {
    return <>{children}</>;
  }

  // If user role matches any allowed role, grant access
  if (user && allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  // Render fallback or premium Access Denied card
  if (fallback !== undefined) {
    return <>{fallback}</>;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm max-w-xl mx-auto my-12 space-y-6">
      <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-md">
        <ShieldAlert size={28} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Access Denied</h2>
        <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
          Your current security role ({user?.role || 'Guest'}) does not have permissions to access this module. Contact your administrator to upgrade your access.
        </p>
      </div>
    </div>
  );
}
