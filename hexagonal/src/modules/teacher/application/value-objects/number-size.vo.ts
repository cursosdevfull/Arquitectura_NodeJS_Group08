import { BaseVo } from "./base.vo";

export class NumberSize extends BaseVo<number> {
    // biome-ignore lint/style/noInferrableTypes: <explanation>
    constructor(fieldName: string, value: number, min: number = -1, max: number = -1) {
        super()
        if (min >= 1 && value < min) {
            throw new Error(`${fieldName} must be greater than ${min}`);
        }
        if (max >= 1 && value > max) {
            throw new Error(`${fieldName} must be less than ${max}`);
        }

        this._value = value
    }
}



