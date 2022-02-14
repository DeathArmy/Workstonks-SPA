export class User {
    id?: number;
    userName?: string;
    normalizedUserName?: string;
    email?: string;
    emailConfirmed?: boolean;
    phoneNumber?: string;
    phoneNumberConfirmed?: boolean;
    lockoutEndabled?: boolean;
    name?: string;
    surname?: string;
    jobTitle?: string;
    hourlyWage?: number;
    dateOfEmployment?: Date;
    dateOfTerminationOfEmployment?: Date;
    isActive?: boolean;
}