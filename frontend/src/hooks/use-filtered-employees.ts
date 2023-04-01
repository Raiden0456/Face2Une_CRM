import { useMemo } from 'react';
import { IEmployee } from 'service/UserService';

export function useFilteredEmployees(employees: Array<IEmployee> = [], search: string) {
  return useMemo(() => {
    const filteredEmployees: Array<IEmployee> = employees.filter(
      (employee: IEmployee) =>
        employee.first_name.toLowerCase().includes(search.toLowerCase()) ||
        employee.last_name.toLowerCase().includes(search.toLowerCase()),
    );

    return { filteredEmployees } as const;
  }, [search, employees]);
}
