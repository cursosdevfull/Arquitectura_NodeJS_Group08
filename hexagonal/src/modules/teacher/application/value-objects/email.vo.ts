import { StringLength } from "./string-length.vo";

export class Email extends StringLength {
    // biome-ignore lint/style/noInferrableTypes: <explanation>
    constructor(fieldName: string, value: string, minLength: number = -1, maxLength: number = -1) {
        super(fieldName, value, minLength, maxLength);
        console.log('Email', fieldName, value, minLength, maxLength);
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            throw new Error(`${fieldName} is not valid`);
        }
    }
}