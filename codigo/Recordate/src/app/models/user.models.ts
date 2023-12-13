export interface User {
    uid: string,
    name: string,
    lastName: string
    email: string,
    password?: string,// el ? significa que puede ser nulo
}

