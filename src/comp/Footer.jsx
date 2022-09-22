import { Link } from "react-router-dom";
import Icon_Facebook from "../assets/icons/Icon_Facebook.svg";
import Icon_Instagram from "../assets/icons/Icon_Instagram.svg";
import Icon_LinkIn from "../assets/icons/Icon_LinkIn.svg";

export const Footer = () => {
  return (
    <footer id="Footer">
      <article>
        <ul>
          <h3>adresse</h3>
          <li>Det utrolige teater</li>
          <li>Havnegade 901</li>
          <li>9000 Aalborg</li>
          <li>EAN 5798003279845</li>
          <li>CVR 1001 0012</li>
          <br />
          <li>
            <a href="#">Find vej på kort</a>
          </li>
        </ul>

        <ul>
          <h3>billetservice</h3>
          <li>
            <Link to="#">Se åbningstider</Link>
          </li>
          <li>Billettelefon: +45 96 31 80 80</li>
          <li>
            <a href="mailto:billet@dut.dk">billet@dut.dk</a>
          </li>
          <br />
          <h3>administration</h3>
          <li>Telefon: +45 96 31 80 90</li>
          <li>
            <a href="mailto:adm@dut.dk">adm@dut.dk</a>
          </li>
        </ul>

        <ul>
          <h3>praktisk info</h3>
          <li>
            <a href="#">Kontakt</a>
          </li>
          <li>
            <a href="#">Kom trygt i teatret</a>
          </li>
          <li>
            <a href="#">Presseside</a>
          </li>
          <li>
            <a href="#">Skoleforestillinger</a>
          </li>
          <li>
            <a href="#">Teatercaféen</a>
          </li>
          <li>
            <a href="#">Handelsbetingelser</a>
          </li>
        </ul>
      </article>
      <nav>
        <img src={Icon_Facebook} alt="Link to Facebook" loading="lazy" />
        <img src={Icon_Instagram} alt="Link to Instagram" loading="lazy" />
        <img src={Icon_LinkIn} alt="Link to LinkIn" loading="lazy" />
      </nav>
    </footer>
  );
};
