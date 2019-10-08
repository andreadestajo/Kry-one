const DB_EMPLOYEES          = `employees`;
const DB_USERS              = `users`;
const DB_EMPLOYEES_LOANS    = (employee_id) => `${DB_EMPLOYEES}/${employee_id}/loans`;
