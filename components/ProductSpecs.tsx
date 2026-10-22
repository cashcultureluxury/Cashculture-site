import type { SpecBlock } from "@/data/specs";

// Collapsible product specification sheet (native <details>, no JS).
export default function ProductSpecs({ spec }: { spec: SpecBlock }) {
  const rows: [string, string | undefined][] = [
    ["Gender", spec.gender],
    ["Model", spec.model],
    ["Fabric", spec.fabric],
    ["Fabric Weight", spec.weight],
    ["Fabric Thickness", spec.thickness],
    ["Fabric Stretch", spec.stretch],
    ["Print Size", spec.printSize],
  ];
  const care = spec.care.split(";").map((s) => s.trim()).filter(Boolean);
  const features = spec.features.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <section className="section prod-specs">
      <details open>
        <summary>Product Details &amp; Specifications</summary>
        <div className="prod-specs-body">
          <dl className="prod-specs-grid">
            {rows.filter(([, v]) => v).map(([k, v]) => (
              <div className="prod-spec-row" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="prod-spec-block">
            <p className="prod-spec-label">Features</p>
            <div className="prod-spec-tags">
              {features.map((f) => (
                <span className="prod-spec-tag" key={f}>{f}</span>
              ))}
            </div>
          </div>

          <div className="prod-spec-block">
            <p className="prod-spec-label">Care Instructions</p>
            <ul className="prod-spec-care">
              {care.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          {spec.notes && (
            <div className="prod-spec-block">
              <p className="prod-spec-label">Notes</p>
              <p className="prod-spec-notes">{spec.notes}</p>
            </div>
          )}
        </div>
      </details>
    </section>
  );
}
