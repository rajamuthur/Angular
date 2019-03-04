import { IExperiance } from './experiance-interface'
export interface IEmployee {
    id: number,
    name: string,
    gender: string,
    preference: string,
    age: number,
    email?: string,
    password?: string,
    phoneNumber: number,
    isActive: boolean
    dob: Date,
    experiances: IExperiance[]
}