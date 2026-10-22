import Link from "next/link";
import { CODE, CODE_ASIDE, CODE_HEADLINE, STATUS_LINE } from "@/data/brand";

type Props = {
  /** Anchor id, e.g. "code" so /page#code lands here. */
  id?: string;
  /** Optional call to action under the list. */
  link?: { href: string; label: string };
};

// The Cash Culture Code, presented the same way everywhere: eleven values in
// two ruled columns (01–06, 07–11). Styles live in globals.css under .cc-code.
export default function CodeSection({ id, link }: Props) {
  const columns = [CODE.slice(0, 6), CODE.slice(6)];
  return (
    <section className="cc-code" id={id}>
      <div className="cc-code-head">
        <div>
          <p className="rule-kicker rule-kicker-after">The Cash Culture Code</p>
          <h2 className="serif-title">{CODE_HEADLINE}</h2>
        </div>
        <p className="aside-caps cc-code-aside">{CODE_ASIDE}</p>
      </div>
      <div className="cc-code-cols">
        {columns.map((col, c) => (
          <ol className="cc-code-col" key={c} start={c * 6 + 1}>
            {col.map((v, i) => (
              <li className="cc-code-row" key={v.title}>
                <span className="cc-code-num" aria-hidden="true">{String(c * 6 + i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="cc-code-title">{v.title}</h3>
                  <p className="cc-code-line">{v.line}</p>
                </div>
                <p className="cc-code-body">{v.body}</p>
              </li>
            ))}
          </ol>
        ))}
      </div>
      <div className="cc-code-foot">
        <p className="cc-code-status">{STATUS_LINE}</p>
        {link && <Link className="arrow-link" href={link.href}>{link.label} <span aria-hidden="true">&rarr;</span></Link>}
      </div>
    </section>
  );
}
