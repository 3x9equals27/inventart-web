export default function useSessionTenant() {
  const getSessionTenant = (defaultTenant: string | undefined): string | undefined => {
    const storedTenant = localStorage.getItem('sessionTenant');
    let tenant: string | undefined = storedTenant ?? defaultTenant;
    if (tenant) {
      setSessionTenant(tenant);
    }
    return tenant;
  };

  const setSessionTenant = (tenant: string) => {
    localStorage.setItem('sessionTenant', tenant);
  };

  const unsetSessionTenant = () => {
    localStorage.removeItem('sessionTenant');
  };

  return {
    getSessionTenant,
    setSessionTenant,
    unsetSessionTenant
  }
}