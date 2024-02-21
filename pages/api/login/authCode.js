import bcrypt from 'bcrypt'

export default async (req, res) => {


    if (req.method === "POST") {

        const { authCode, code } = req.body

        console.log(authCode, code)

        bcrypt.compare(code, authCode, async function (err, result) {
            if (!err && result) {

                res.status(200).json({ message: 'auth ok' })

            } else {
                res.status(400).json({ message: 'Wrong auth code' })
            }
        })


    } else {
        res.status(400).json({ error: 'Wrong request method' })
    }


}