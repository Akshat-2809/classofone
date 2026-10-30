import { Footer } from "@/components/Footer";
import { ForYou } from "@/components/ForYou";
import { Nav } from "@/components/Nav";
import { Opening } from "@/components/Opening";
import { RaiseHand } from "@/components/RaiseHand";
import { ReportCard } from "@/components/ReportCard";
import { Timetable } from "@/components/Timetable";
import { CONTACT_EMAIL, FOUNDER_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  email: CONTACT_EMAIL,
  description: SITE_DESCRIPTION,
  slogan: "Every child deserves a class of one.",
  founder: { "@type": "Person", name: FOUNDER_NAME, jobTitle: "Founder & Product Builder" },
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Nav home />
      <main>
        <Opening />
        <Timetable />
        <ForYou />
        <ReportCard />
        <RaiseHand />
      </main>
      <Footer />
    </>
  );
}
