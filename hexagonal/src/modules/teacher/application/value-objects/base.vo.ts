export abstract class BaseVo<T> {
    protected _value: T

    get value(): T {
        return this._value
    }
}