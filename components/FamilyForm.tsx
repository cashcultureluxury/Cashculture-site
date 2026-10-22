"use client";

import { useState } from "react";
import { CODE } from "@/data/brand";

// What applicants do. Posted as `niche` so existing storage keeps working.
const ROLES = [
  "Entrepreneur / Business Owner",
  "Artist / Musician",
  "Athlete / Coach",
  "Creator",
  "Designer / Stylist",
  "Student",
  "Professional",
  "Community Leader",
  "Other",
];

const empty = {
  firstName: "", lastName: "", email: "", phone: "", location: "",
  instagram: "", tiktok: "", niche: "",
  building: "", meaning: "", codeValue: "", why: "",
  company: "",
};

export default function FamilyForm() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");
    try {
      const res = await fetch("/api/ambassador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("done");
      } else {
        setStatus("error");
        setMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMsg("Network error. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="fam-success" role="status">
        <div className="fam-success-mark">✦</div>
        <h3>Application Received</h3>
        <p>Thank you for telling us what you&apos;re building. We read every application personally and will reach out by email if it&apos;s a fit. Keep building.</p>
      </div>
    );
  }

  return (
    <form className="fam-form" onSubmit={submit}>
      <fieldset>
        <legend>01 &mdash; Who You Are</legend>
        <div className="fam-row">
          <label>First Name<input required value={form.firstName} onChange={set("firstName")} autoComplete="given-name" /></label>
          <label>Last Name<input required value={form.lastName} onChange={set("lastName")} autoComplete="family-name" /></label>
        </div>
        <div className="fam-row">
          <label>Email<input type="email" required value={form.email} onChange={set("email")} autoComplete="email" /></label>
          <label>Phone<input type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" /></label>
        </div>
        <div className="fam-row">
          <label>City<input value={form.location} onChange={set("location")} placeholder="Baltimore, MD" /></label>
          <label>What do you do?
            <select required value={form.niche} onChange={set("niche")}>
              <option value="">Select</option>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>
        </div>
        <div className="fam-row">
          <label>Instagram<input required value={form.instagram} onChange={set("instagram")} placeholder="@handle" /></label>
          <label>TikTok<input value={form.tiktok} onChange={set("tiktok")} placeholder="@handle" /></label>
        </div>
      </fieldset>

      <fieldset>
        <legend>02 &mdash; What You&apos;re Building</legend>
        <label className="fam-lead">What are you building?
          <textarea required rows={4} value={form.building} onChange={set("building")} placeholder="The business, the craft, the career, the family, the future. Tell us about it." />
        </label>
        <label>What does Cash Culture mean to you?
          <textarea rows={3} value={form.meaning} onChange={set("meaning")} />
        </label>
        <label>Which Cash Culture Code value represents you most?
          <select value={form.codeValue} onChange={set("codeValue")}>
            <option value="">Select</option>
            {CODE.map((v, i) => <option key={v.title} value={v.title}>{String(i + 1).padStart(2, "0")} &mdash; {v.title}</option>)}
          </select>
        </label>
        <label>Why do you want to be part of the Family?
          <textarea rows={3} value={form.why} onChange={set("why")} />
        </label>
      </fieldset>

      {/* Honeypot: hidden from humans, catches bots */}
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={set("company")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      {status === "error" && <p className="fam-error" role="alert">{msg}</p>}
      <button className="btn-gold" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Join The Family"}
      </button>
    </form>
  );
}
