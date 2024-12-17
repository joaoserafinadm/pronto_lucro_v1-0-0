



export default function notifications() {


    const data =
        [
            {
                _id: ObjectId(),
                dateAdded: new Date(),
                subject: 'star',
                text: "Bem vindo à Pronto Lucro! Clique aqui para conhecer a plataforma!",
                link: `https://app.prontolucro.com.br/tutorials`,
                button: 'Tutoriais',
                imageUrl: 'https://res.cloudinary.com/joaoserafinadm/image/upload/v1693963692/PUBLIC/TEMPLATE_IMG_shcaor.png',
                user_id: '',
                checked: false
            },
            {
                _id: ObjectId(),
                dateAdded: new Date(),
                subject: 'star',
                text: "Configure o seu perfil.",
                link: `https://app.prontolucro.com.br/profileEdit`,
                imageUrl: 'https://res.cloudinary.com/joaoserafinadm/image/upload/v1692760589/PUBLIC/user_template_ocrbrg.png',
                user_id: '',
                checked: false
            }
        ]

    return data
}