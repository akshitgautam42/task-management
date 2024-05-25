const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required',
    'any.required': 'Title is required',
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required',
    'any.required': 'Description is required',
  }),
  status: Joi.string().valid('to_do', 'in_progress', 'done').required().messages({
    'any.only': 'Status must be either "to_do", "in_progress", or "done"',
    'any.required': 'Status is required',
  }),
});

const validateTask = (req, res, next) => {
  const { error } = taskSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ errors: error.details.map(detail => detail.message) });
  }
  next();
};

module.exports = { validateTask };
