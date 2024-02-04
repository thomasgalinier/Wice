import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(3).maxLength(64),
    lastName: vine.string().trim().minLength(3).maxLength(64),
    email: vine
      .string()
      .email()
      .unique(async (query, field) => {
        const user = await query.from('users').where('email', field).first()
        return !user
      }),
    password: vine.string().minLength(8).maxLength(32),
    iconUrl: vine.string().minLength(3).maxLength(255),
    accessType: vine.string().minLength(2).maxLength(64),
  })
  
)
export const loginValidator = vine.compile(
    vine.object({
      email: vine.string().email(),
      password: vine.string().minLength(8).maxLength(32),
    })
  )