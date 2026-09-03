import { Link } from "react-router-dom";
import { withTrailingSlash } from "../lib/links";

/**
 * Lien interne du site — à utiliser partout à la place du `Link` de
 * react-router.
 *
 * Sa seule raison d'être : émettre le chemin dans la forme réellement servie
 * en 200, avec son slash final. Netlify redirige `<route>` vers `<route>/` en
 * 301 ; un lien interne sans slash envoie donc chaque robot sur une
 * redirection, ce que Search Console remonte en « Page avec redirection ».
 *
 * Le routage n'est pas affecté : `compilePath` termine ses expressions par
 * `\/*$`, donc `<Route path="/blog">` continue de reconnaître `/blog/`.
 *
 * Les composants gardent leurs chemins sans slash (NAV_ITEMS, `article.route`
 * du manifeste) : c'est la forme canonique côté routeur, et les comparaisons
 * de `pathname` continuent de fonctionner. La normalisation n'a lieu qu'ici,
 * au moment d'écrire le `href`.
 */
export default function SiteLink({ to, ...props }) {
  return <Link to={withTrailingSlash(to)} {...props} />;
}
