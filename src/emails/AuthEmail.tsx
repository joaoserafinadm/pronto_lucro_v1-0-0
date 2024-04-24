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
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface AuthEmailProps {
  code?: string;
  firstName?: string;
  userImage?: string;
  invitedByfirstName?: string;
  invitedByEmail?: string;
  teamName?: string;
  teamImage?: string;
  inviteLink?: string;
  inviteFromIp?: string;
  inviteFromLocation?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const AuthEmail = ({
  code,
  firstName,
}: AuthEmailProps) => {

  return (
    <Html>
      <Head />
      <Preview>Bem vindo à Pronto Lucro! 🎉</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src="https://res.cloudinary.com/joaoserafinadm/image/upload/v1713921508/PRONTO%20LUCRO/PUBLIC/way4jsfjpe1hxsovkniq.png"

                height="70"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Bem vindo à <strong>Pronto Lucro</strong>!
            </Heading>
            <Text className="text-black text-[16px] leading-[24px]">
              Olá <strong>{firstName}</strong>,
            </Text>
            <Text className="text-black text-[16px] leading-[24px]">
              Para validarmos seu acesso à ferramenta com segurança, use o código abaixo:
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#388697] rounded text-white text-[24px] font-semibold no-underline text-center px-5 py-3"
              >
                {code}
              </Button>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            {/*<Section className="mt-[32px]">
               <Row>
                <Column align="right">
                  <Img
                    src="https://res.cloudinary.com/joaoserafinadm/image/upload/v1713921754/PRONTO%20LUCRO/PUBLIC/gntbsh0enttoa3nsbu3i.png"

                    height="40"
                    alt="Vercel"
                    className="my-0 mx-auto"
                  />
                </Column>
                <Column align="left" className="ps-[30px]"> */}

                  <Text className="text-[#666666] text-[12px] leading-[24px]">
                    ©2024 Pronto Lucro <br />
                    Av. Tiradentes, 1655, Erechim, 99701-502, Rio Grande do Sul, Brasil<br />
                  </Text>
                {/* </Column>
              </Row> 

            </Section>*/}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

AuthEmail.PreviewProps = {
  code: "123456",
  firstName: "Juliane"
} as AuthEmailProps;

export default AuthEmail;
