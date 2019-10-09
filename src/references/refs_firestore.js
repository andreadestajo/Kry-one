export const   
DB_EMPLOYEES          = `employees`,
DB_USERS              = `users`,
DB_EMPLOYEES_LOANS    = (employee_id) => `${DB_EMPLOYEES}/${employee_id}/loans`;