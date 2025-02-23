import Joi from 'joi';

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().trim(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
    phone: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .required(),
    // employeeId: Joi.string().required(),
});

export function validateRegister(body) {
    const { error } = registerSchema.validate(body, { abortEarly: false });
    if (!error) {
        return { valid: true };
    }

    // Return an object describing the errors.
    return {
        valid: false,
        errors: error.details.map((e) => e.message),
    };
}

export const validateLogin = (body) => {
    const schema = Joi.object({
        email: Joi.string().email().required(), // Ensure it's a valid email
        password: Joi.string().min(6).required(), // Password must be a string of min 6 chars
    });

    const { error } = schema.validate(body);
    if (!error) {
        return { valid: true };
    }

    // Return an object describing the errors.
    return {
        valid: false,
        errors: error.details.map((e) => e.message),
    };
};
