import { BaseVo } from "./base.vo";

export class StringLength extends BaseVo<string> {
    // biome-ignore lint/style/noInferrableTypes: <explanation>
    constructor(fieldName: string, value: string, minLength: number = -1, maxLength: number = -1) {
        super()
        if (minLength > 0 && value.length < minLength) {
            throw new Error(`${fieldName} must be at least ${minLength} characters long`);
        }
        if (maxLength > 0 && value.length > maxLength) {
            throw new Error(`${fieldName} must be at most ${maxLength} characters long`);
        }

        this._value = value
    }

}



