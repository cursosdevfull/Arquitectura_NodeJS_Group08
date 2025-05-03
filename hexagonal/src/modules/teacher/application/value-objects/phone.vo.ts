export const validatePhone = (phone: string | undefined) => {
    if (phone && phone.length < 3) throw new Error('Phone must be at least 3 characters long')
}