export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password?: string; // el ? significa que puede ser nulo
}

