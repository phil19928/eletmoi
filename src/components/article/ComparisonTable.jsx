/**
 * Tableau comparatif, en HTML natif.
 *
 * Jamais une image : un tableau est ce que les moteurs et les assistants IA
 * savent extraire et citer. Une capture d'écran ne dit rien à personne.
 *
 * `table-fixed` + largeurs déclarées en <colgroup> : la mise en page ne bouge
 * plus une fois les cellules remplies, ce qui évite tout décalage au
 * chargement (CLS). Sur mobile, le tableau défile dans son propre conteneur —
 * la page, elle, ne défile jamais horizontalement.
 */
export default function ComparisonTable({
  table,
  caption = "Comparaison des approches",
}) {
  if (!table?.rows?.length) return null;

  const { competitors = [], rows } = table;
  const columns = ["El&Moi", ...competitors];
  // Première colonne plus large : elle porte l'intitulé du critère.
  const firstWidth = 26;
  const otherWidth = (100 - firstWidth) / columns.length;

  return (
    <div className="my-10">
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full table-fixed border-collapse text-sm min-w-[640px]">
          <caption className="sr-only">{caption}</caption>
          <colgroup>
            <col style={{ width: `${firstWidth}%` }} />
            {columns.map((name) => (
              <col key={name} style={{ width: `${otherWidth}%` }} />
            ))}
          </colgroup>

          <thead className="bg-primary-very-light/60">
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-900">
                Critère
              </th>
              {columns.map((name, index) => (
                <th
                  key={name}
                  scope="col"
                  className={`px-4 py-3 text-left font-semibold ${
                    index === 0 ? "text-primary-dark" : "text-slate-700"
                  }`}
                >
                  {name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.pillar} className="border-t border-slate-100">
                <th
                  scope="row"
                  className="px-4 py-3 text-left font-medium text-slate-900 align-top"
                >
                  {row.pillar}
                </th>
                <td className="px-4 py-3 text-slate-700 align-top bg-primary-very-light/20">
                  {row.eletmoi}
                </td>
                {competitors.map((name) => (
                  <td key={name} className="px-4 py-3 text-slate-600 align-top">
                    {row.others?.[name] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-xs text-slate-400 sm:hidden">
        Faites défiler le tableau horizontalement pour voir toutes les colonnes.
      </p>
    </div>
  );
}
