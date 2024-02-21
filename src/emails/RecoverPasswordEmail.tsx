
import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
    link: string;
}


export const RecoverPasswordEmail: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    link
}) => (
    <Html>
        <Head />
        <Preview>{firstName}</Preview>
        <Tailwind>
            <Body className="bg-white my-auto mx-auto font-sans">
                <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                    <Section className="mt-[25px]">
                        <Img
                            height="40"
                            alt="Avalia Imboi"
                            src='https://res.cloudinary.com/co2blue/image/upload/v1682369446/AKVO_IMAGES/Akvo_h_moqhuy.png'
                            className="my-0 mx-auto"
                        />
                    </Section>
                    <Heading className="text-black text-[24px] font-normal p-0 my-[30px] mx-0">
                        Olá {firstName},
                    </Heading>
                    <Text className="text-black text-[16px] leading-[24px]">
                        Recebemos uma solicitação para redefinir sua senha da Plataforma AKVO-ESG. <br />
                        Para prosseguir, clique no link abaixo:
                    </Text>
                    <Section className="text-center mt-[32px] mb-[32px]">
                        <Button href={link}
                            // pX={20}
                            // pY={12}
                            className="bg-[#0a4747] rounded text-white text-[20px] py-[12px] px-[20px]  font-semibold no-underline text-center"
                        >
                            Alterar senha
                        </Button>
                    </Section>
                    <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                    <Text className="text-[#666666] text-[14px] leading-[24px]">
                        Esse link é válido por 60 minutos a partir do recebimento. Após esse período, solicite uma nova redefinição de senha.

                    </Text>
                    <Text className="text-[#666666] text-[12px] leading-[24px]">
                    ©2021 AKVO-ESG <br />
                        Av. Tiradentes, 1655, Erechim, 99701-502, Rio Grande do Sul, Brasil<br />
                    </Text>
                </Container>
            </Body>
        </Tailwind>
    </Html>

);

















