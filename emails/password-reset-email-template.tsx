import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind
} from "@react-email/components";
import * as React from "react";

interface PasswordResetEmailTemplateProps {
  userFirstname?: string;
  passwordResetLink?: string;
}

export const PasswordResetEmailTemplate = ({
  userFirstname,
  passwordResetLink,
}: PasswordResetEmailTemplateProps) => {
  return (
    <Tailwind>
    <Html>
      <Head />
      <Preview>Dropbox reset your password</Preview>
      <Body style={main}>
        <Container className="bg-white border border-slate-300 p-11">
          {/* TODO: Img not working with local images, host the image somewhere and add the url */}
          {/* <Img
            src='/logo.png'
            width="40"
            height="33"
            alt="My logo"
          /> */}
          <Section>
            <Text className="text-lg text-slate-700 leading-6">Hi {userFirstname},</Text>
            <Text className="text-base text-slate-700 leading-6 font-sans">
              Someone recently requested a password change for your Dropbox
              account. If this was you, you can set a new password here:
            </Text>
            <Button className="px-4 py-2 bg-blue-500 rounded-md text-white text-base no-underline text-center font-sans" href={passwordResetLink}>
              Reset password
            </Button>
            <Text className="font-sans">or copy and paste this URL into your browser: {passwordResetLink}</Text>
            <Text className="text-base text-slate-700 leading-6 font-sans">
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text className="text-base text-slate-700 leading-6 font-sans">
              To keep your account secure, please don&apos;t forward this email
              to anyone. See our Help Center for{" "}
              <Link style={anchor} href="/">
                more security tips.
              </Link>
            </Text>
            <Text className="text-base text-slate-700 leading-6 font-sans">Happy Dropboxing!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
    </Tailwind>
  );
};

export default PasswordResetEmailTemplate;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};
const anchor = {
  textDecoration: "underline",
};
