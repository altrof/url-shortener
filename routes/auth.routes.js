const { Router } = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth + /register, 
router.post(
    '/register',
    [
        check('email', 'Wrong email type..').isEmail(),
        check('password', 'Minimal length of password is 6 symbols.').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            console.log('---------------------------')
            console.log('Body:', req.body)
            const errors = validationResult(req)
            console.log(errors)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong inputs in registration..'
                })
            }

            const { email, password } = req.body

            const candidate = await User.findOne({ email })
            if (candidate) {
                return res.status(400).json({ message: 'User with this email had allready taken..' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword })

            await user.save()

            res.status(201).json({ message: 'User created.' })

        } catch (e) {
            debugger
            res.status(500).json({ message: 'Something went wrong.. Try one more time.' })
        }
    })

// /api/auth + /login, 
router.post(
    '/login',
    [
        check('email', 'Write your email correctly..').normalizeEmail().isEmail(),
        check('password', 'Write your password').exists()
    ],
    async (req, res) => {
        
        try {
            
            const errors = validationResult(req)

            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Email or password are wrongs..'
                })
            }

           const {email, password} = req.body

           const user = await User.findOne({email})

           if (!user) {
               return res.status(400).json({message: 'User is not founded..'})
           } 
           const isMatch = await bcrypt.compare(password, user.password)
           if(!isMatch) {
               return res.status(400).json({message: 'Password is wrong..'})
           }

           const token = jwt.sign(
               { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
           )

           res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({ message: 'Something went wrong.. Try one more time.' })
            console.log(e)
        }
    })

module.exports = router