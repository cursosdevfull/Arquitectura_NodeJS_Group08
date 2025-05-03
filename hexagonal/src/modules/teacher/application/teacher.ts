import { Email } from "./value-objects/email.vo"
import { NumberSize } from "./value-objects/number-size.vo"
import { StringLength } from "./value-objects/string-length.vo"

type TeacherPropsRequired = { teacherId: number, names: string, lastname: string, email: string }
type TeacherPropsOptional = {
    phone: string, address: string, age: number, createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}

export type TeacherProps = TeacherPropsRequired & Partial<TeacherPropsOptional>

export type TeacherPropsUpdate = Partial<Omit<TeacherPropsRequired, "teacherId"> & Pick<TeacherPropsOptional, "phone" | "address">>

export class Teacher {
    private readonly teacherId: number
    private names: string
    private lastname: string
    private email: string
    private phone: string | undefined
    private address: string | undefined
    private readonly age: number | undefined
    private createdAt: Date
    private updatedAt: Date | undefined
    private deletedAt: Date | undefined

    constructor(props: TeacherProps) {
        const namesVo = new StringLength('Names', props.names, 3)
        this.names = namesVo.value

        const lastnameVo = new StringLength('Last name', props.lastname, 3)
        this.lastname = lastnameVo.value

        const emailVo = new Email('Email', props.email, 3)
        this.email = emailVo.value

        if (props.phone) {
            const phoneVo = new StringLength('Phone', props.phone, 3)
            this.phone = phoneVo.value
        }

        if (props.address) {
            const addressVo = new StringLength('Address', props.address, 3)
            this.address = addressVo.value
        }

        if (props.age) {
            const ageVo = new NumberSize('Age', props.age, 18, 70)
            this.age = ageVo.value
        }

        const teacherIdVo = new NumberSize('Teacher ID', props.teacherId, 1)
        this.teacherId = teacherIdVo.value

        if (!props.createdAt) this.createdAt = new Date()
        else this.createdAt = props.createdAt

        if (props.updatedAt) this.updatedAt = props.updatedAt
        if (props.deletedAt) this.deletedAt = props.deletedAt
    }

    properties() {
        return {
            teacherId: this.teacherId,
            names: this.names,
            lastname: this.lastname,
            email: this.email,
            phone: this.phone,
            address: this.address,
            age: this.age
        }
    }

    update(props: TeacherPropsUpdate) {
        if (props.names) {
            const namesVo = new StringLength('Names', props.names, 3)
            this.names = namesVo.value
        }

        if (props.lastname) {
            const lastnameVo = new StringLength('Last name', props.lastname, 3)
            this.lastname = lastnameVo.value
        }

        if (props.phone) {
            const phoneVo = new StringLength('Phone', props.phone, 3)
            this.phone = phoneVo.value
        }

        if (props.address) {
            const addressVo = new StringLength('Address', props.address, 3)
            this.address = addressVo.value
        }

        this.updatedAt = new Date()
    }

    delete() {
        this.deletedAt = new Date()
    }
}