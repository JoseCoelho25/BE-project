const {body} = require('express-validator')

const userCreateValidation = () => {
    return [
        body('name')
            .isString()
            .withMessage('O nome é obrigatório!')
            .isLength({min:3})
            .withMessage('O nome precisa ter no minimo 3 caractéres!'),
        body('email')
            .isString()
            .withMessage('O email é obrigatório!')
            .isEmail()
            .withMessage('Insira um e-mail válido.'),
        body('password')
            .isString()
            .withMessage('A password é obrigatoria!')
            .isLength({min:5})
            .withMessage('A password precisa ter no mínimo 5 caractéres'),
        body('confirmPassword')
            .isString()
            .withMessage('A confirmação é obrigatoria!')
            .custom((value, {req}) => {
                if(value != req.body.password) {
                    throw new Error('As password não são iguais!')
                }
                return true;
            })
    ]
}

const loginValidation = () => {
    return [
        body('email')
            .isString()
            .withMessage('O email é obrigatório!')
            .isEmail()
            .withMessage('Insira um e-mail válido.'),
        body('password')
            .isString()
            .withMessage('A password é obrigatória')
    ]
}



module.exports = {
    userCreateValidation,
    loginValidation,
}