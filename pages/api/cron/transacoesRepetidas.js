import { connect } from "../../../utils/db";

export default async function handler(req, res) {
    // Verificar se a requisição é do próprio Vercel (opcional, mas recomendado)
    // if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    try {


        const { db } = await connect();

        const usersArray = await db.collection('users').find({}).toArray();

        for (const user of usersArray) {

            const dfcArray = user.dfc.map(elem => {
                return elem.data
            })
           
            
            
            
        }
        return res.status(200).json({ message: 'Cron job executado com sucesso' });



    } catch (error) {
        console.error('Erro no cron job:', error);
        res.status(500).json({
            message: 'Erro ao executar cron job',
            error: error.message
        });
    }
}