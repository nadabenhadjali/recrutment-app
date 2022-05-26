import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Room,
  
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  background: linear-gradient(
    90deg,
    rgb(52, 183, 248) 0%,
    rgb(0, 54, 105) 100%
  );

  ${mobile({ flexDirection: "column" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: white;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
  color: white;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;



const Title = styled.h3`
  margin-bottom: 30px;
  color:white;
`;





const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  color: white;
`;



const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Genext-IT</Logo>
        <Desc>
          Genext-It est une société multi-facettes qui conçoit et fournit des
          solutions totales d'entreprise dans les domaines diversifiés liés à :
          Les systèmes ERP . Les solutions logicielles de gestion industrielle
          et manufacturière L’assistance technique dans les différents processus
          industriels L’étude et le consulting dans la mise en place des
          systèmes d’information. L’expertise en termes de préparation des
          certifications L’infogérance Les développements spécifiques adaptés
          aux besoins des clients Le développement des applications web et
          mobile
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
        </SocialContainer>
      </Left>

      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> Rue Yasser Arafet Immeuble
          Bou Hajeb, 4eme Etage 4054 Sousse Jaouhara, TN
        </ContactItem>
       
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +216 73 821 168
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> contact@genext-it.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
