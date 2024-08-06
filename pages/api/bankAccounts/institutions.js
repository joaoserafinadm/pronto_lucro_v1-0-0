import { verify } from 'jsonwebtoken';
import Client from 'belvo';
import institutions from 'belvo/lib/institutions';
import banksList from './bankList.json'

const client = new Client(
    process.env.BELVO_SECRET_ID,
    process.env.BELVO_SECRET_PASSWORD,
    process.env.BELVO_ENV,
  );

const authenticated = fn => async (req, res) => {
    verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res);
        }
        res.status(500).json({ message: 'You are not authenticated.' });
    });
};


export default authenticated(async (req, res) => {

    if (req.method === 'GET') {
        try{
            res.status(200).json({institutions: banksList})

        } catch (error) {
            console.error('Error fetching institutions:', error);
            res.status(500).json({ error: 'Failed to fetch institutions' });
        }
    }

 
})




   // if (req.method === 'GET') {
    //     try {
    //         await client.connect();
    //         const institutions = await client.institutions.list();
    //         res.status(200).json(institutions);
    //     } catch (error) {
    //         console.error('Error fetching institutions:', error);
    //         res.status(500).json({ error: 'Failed to fetch institutions' });
    //     }
    // } else {
    //     res.setHeader('Allow', ['GET']);
    //     res.status(405).end(`Method ${req.method} Not Allowed`);
    // }