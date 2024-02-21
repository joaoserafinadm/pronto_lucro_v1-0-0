
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
    email: string;
    password: string;
    companyName: string;
    userName: string;
    userEmail: string;
}


export const newUserEmail: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    email,
    password,
    companyName,
    userName,
    userEmail,
}) => (
    <Html>
        <Head />
        <Preview>Cadastro de usuário</Preview>
        <Tailwind>
            <Body className="bg-white my-auto mx-auto font-sans">
                <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                    <Section className="mt-[25px]">
                        <Img 
                            height="40"
                            alt="AKVO-ESG"
                            src='https://res.cloudinary.com/co2blue/image/upload/v1682369446/AKVO_IMAGES/Akvo_h_moqhuy.png'
                            className="my-0 mx-auto "
                        />
                    </Section>
                    {/* <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                        Bem vindo à plataforma <strong>AKVO-ESG</strong>!
                    </Heading> */}
                    <Text className="text-black text-[16px] leading-[24px] mt-[25px]">
                        Olá <strong>{firstName}</strong>,
                    </Text>
                    <Text className="text-black text-[16px] leading-[24px]">
                        Seja bem-vindo à plataforma <strong>AKVO-ESG</strong>!
                    </Text>
                    <Text className="text-black text-[16px] leading-[24px]">
                        <strong>{userName}</strong> (<Link href={`mailto:${userEmail}`} className="text-blue-600 no-underline" >{userEmail}</Link>) cadastrou você como participante da instituição <strong>{companyName}</strong>.
                    </Text>
                    <Text className="text-black text-[16px] leading-[24px]">
                        Para começar, enviamos uma senha provisória para garantir que você tenha acesso rápido e seguro à sua conta.
                    </Text>
                    <Text className="text-black text-[16px] leading-[24px]">
                        Aqui estão os detalhes da sua conta:
                    </Text>
                    <Text className="text-black text-[16px] leading-[24px]">
                        E-mail:
                        <Button
                            // pX={12}
                            // pY={10}
                            className="bg-[#0a4646] mx-[10px] rounded text-white text-[16px]  py-[10px] px-[12px] font-semibold no-underline text-center"
                        >
                            {email}
                        </Button>
                    </Text>
                    <Text className="text-black text-[16px] leading-[24px]">
                        Senha:
                        <Button
                            // pX={12}
                            // pY={10}
                            className="bg-[#0a4646] mx-[10px] rounded text-white text-[16px]  py-[10px] px-[12px] font-semibold no-underline text-center"
                        >
                            {password}
                        </Button>
                    </Text>
                    <Text className="text-black text-[16px] leading-[24px]">
                        Por favor, faça login usando essas credenciais. Assim que entrar, recomendamos que altere sua senha para uma de sua escolha para garantir a segurança da sua conta.
                    </Text>
                    <Text className="text-black text-[16px] leading-[24px]">
                        Clique no botão abaixo para acessar a plataforma.
                    </Text>
                    <Section className="text-center mt-[32px] mb-[32px]">
                        <Button href='http://localhost:3000'
                            // pX={20}
                            // pY={12}
                            className="bg-[#b7e619] rounded text-[24px] py-[12px] px-[20px] font-semibold no-underline text-center"
                        >
                            Acessar a Plataforma
                        </Button>
                    </Section>
                    <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                    <Text className="text-[#666666] text-[12px] leading-[24px]">
                        ©2021 AKVO-ESG <br />
                        Av. Tiradentes, 1655, Erechim, 99701-502, Rio Grande do Sul, Brasil<br />
                    </Text>
                </Container>
            </Body>
        </Tailwind>
    </Html>

);

















