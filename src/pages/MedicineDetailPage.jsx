// import React from "react";
// import { Link, useParams } from "react-router-dom";
// import medicinesData from "../data/mediswipe_medicines.json";

// const fallbackImage =
//   "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80";

// const items = Array.isArray(medicinesData?.items) ? medicinesData.items : [];

// function normalizeList(value) {
//   if (Array.isArray(value)) return value.filter(Boolean);
//   if (typeof value === "string") {
//     return value
//       .split(",")
//       .map((item) => item.trim())
//       .filter(Boolean);
//   }
//   return [];
// }

// function getSavedLanguage() {
//   try {
//     if (typeof window === "undefined") return "en";
//     const saved = localStorage.getItem("mediswipe-language");
//     return saved === "hi" ? "hi" : "en";
//   } catch (error) {
//     return "en";
//   }
// }

// export default function MedicineDetailPage() {
//   const { slug } = useParams();
//   const language = getSavedLanguage();

//   const medicine = items.find((item) => item.slug === slug);

//   if (!medicine) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-[#f4fff6] via-[#ecfff4] to-[#fff3e8] px-4 py-10 text-slate-800">
//         <div className="mx-auto max-w-4xl rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(16,24,40,0.10)] backdrop-blur sm:p-8 text-center">
//           <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
//             {language === "hi" ? "दवा नहीं मिली" : "Medicine not found"}
//           </h1>
//           <p className="mt-3 text-slate-600">
//             {language === "hi"
//               ? "जिस दवा को आप खोलना चाहते थे, वह इस सूची में नहीं मिली।"
//               : "The medicine page you tried to open is not available in this list."}
//           </p>
//           <Link
//             to="/"
//             className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-green-500 to-orange-400 px-5 py-3 font-semibold text-white shadow-lg"
//           >
//             {language === "hi" ? "होम पर जाएँ" : "Go Home"}
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const name =
//     language === "hi"
//       ? medicine.name_hi || medicine.name
//       : medicine.name || medicine.name_hi;

//   const type =
//     language === "hi"
//       ? medicine.type_hi || medicine.type
//       : medicine.type || medicine.type_hi;

//   const summary =
//     language === "hi"
//       ? medicine.summary_hi || medicine.summary
//       : medicine.summary || medicine.summary_hi;

//   const intro =
//     language === "hi"
//       ? medicine.intro_hi || medicine.summary_hi || medicine.summary
//       : medicine.intro_en || medicine.summary || medicine.summary_hi;

//   const caution =
//     language === "hi"
//       ? medicine.caution_hi || medicine.caution
//       : medicine.caution || medicine.caution_hi;

//   const uses =
//     language === "hi"
//       ? normalizeList(medicine.diseases_hi).length > 0
//         ? normalizeList(medicine.diseases_hi)
//         : normalizeList(medicine.diseases)
//       : normalizeList(medicine.diseases).length > 0
//       ? normalizeList(medicine.diseases)
//       : normalizeList(medicine.diseases_hi);

//   const howUsed =
//     language === "hi"
//       ? normalizeList(medicine.how_it_is_used_hi)
//       : normalizeList(medicine.how_it_is_used_en);

//   const importantPoints =
//     language === "hi"
//       ? normalizeList(medicine.important_points_hi)
//       : normalizeList(medicine.important_points_en);

//   const whenToGetHelp =
//     language === "hi"
//       ? normalizeList(medicine.when_to_get_help_hi)
//       : normalizeList(medicine.when_to_get_help_en);

//   const sourceNote =
//     language === "hi"
//       ? medicine.source_note_hi
//       : medicine.source_note_en;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f4fff6] via-[#ecfff4] to-[#fff3e8] px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-5xl">
//         <Link
//           to="/"
//           className="mb-5 inline-flex rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow ring-1 ring-slate-200"
//         >
//           {language === "hi" ? "← वापस" : "← Back"}
//         </Link>

//         <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white/90 shadow-[0_20px_60px_rgba(16,24,40,0.10)] backdrop-blur">
//           <div className="relative h-[280px] w-full sm:h-[340px]">
//             <img
//               src={medicine.image || fallbackImage}
//               alt={name}
//               className="h-full w-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
//             <div className="absolute bottom-4 left-4 right-4 rounded-3xl bg-white/92 p-4 shadow-lg backdrop-blur">
//               <div className="flex flex-wrap items-center justify-between gap-3">
//                 <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
//                   {name}
//                 </h1>
//                 <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
//                   {type}
//                 </span>
//               </div>
//               <p className="mt-3 text-sm leading-6 text-slate-700 sm:text-base">
//                 {summary}
//               </p>
//             </div>
//           </div>

//           <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-3">
//             <div className="lg:col-span-2 space-y-6">
//               <section className="rounded-3xl bg-slate-50 p-5">
//                 <h2 className="text-xl font-bold text-slate-900">
//                   {language === "hi" ? "संक्षिप्त जानकारी" : "Quick overview"}
//                 </h2>
//                 <p className="mt-3 leading-7 text-slate-700">{intro}</p>
//               </section>

//               <section className="rounded-3xl bg-slate-50 p-5">
//                 <h2 className="text-xl font-bold text-slate-900">
//                   {language === "hi" ? "यह दवा किसमें उपयोग होती है" : "Common uses"}
//                 </h2>
//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {uses.map((use) => (
//                     <span
//                       key={use}
//                       className="rounded-full bg-gradient-to-r from-green-100 to-orange-100 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm"
//                     >
//                       {use}
//                     </span>
//                   ))}
//                 </div>
//               </section>

//               <section className="rounded-3xl bg-slate-50 p-5">
//                 <h2 className="text-xl font-bold text-slate-900">
//                   {language === "hi" ? "कैसे समझें / कब उपयोग देखें" : "How to understand its use"}
//                 </h2>
//                 <ul className="mt-4 space-y-3 text-slate-700">
//                   {howUsed.map((point, index) => (
//                     <li key={index} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
//                       {point}
//                     </li>
//                   ))}
//                 </ul>
//               </section>

//               <section className="rounded-3xl bg-slate-50 p-5">
//                 <h2 className="text-xl font-bold text-slate-900">
//                   {language === "hi" ? "कब डॉक्टर से बात करें" : "When to get medical help"}
//                 </h2>
//                 <ul className="mt-4 space-y-3 text-slate-700">
//                   {whenToGetHelp.map((point, index) => (
//                     <li key={index} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
//                       {point}
//                     </li>
//                   ))}
//                 </ul>
//               </section>
//             </div>

//             <div className="space-y-6">
//               <section className="rounded-3xl border border-orange-100 bg-orange-50 p-5">
//                 <h3 className="text-lg font-bold text-slate-900">
//                   {language === "hi" ? "महत्वपूर्ण सावधानी" : "Important caution"}
//                 </h3>
//                 <p className="mt-3 text-sm leading-6 text-slate-700">{caution}</p>
//               </section>

//               <section className="rounded-3xl border border-green-100 bg-green-50 p-5">
//                 <h3 className="text-lg font-bold text-slate-900">
//                   {language === "hi" ? "ध्यान रखने योग्य बातें" : "Helpful notes"}
//                 </h3>
//                 <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
//                   {importantPoints.map((point, index) => (
//                     <li key={index} className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-green-100">
//                       {point}
//                     </li>
//                   ))}
//                 </ul>
//               </section>

//               <section className="rounded-3xl border border-slate-200 bg-white p-5">
//                 <h3 className="text-lg font-bold text-slate-900">
//                   {language === "hi" ? "Source note" : "Source note"}
//                 </h3>
//                 <p className="mt-3 text-sm leading-6 text-slate-600">{sourceNote}</p>
//               </section>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import medicinesData from "../data/mediswipe_medicines.json";

const SITE_URL = "https://medicine-swipe-app.vercel.app/";

const fallbackImage =
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80";

const items = Array.isArray(medicinesData?.items) ? medicinesData.items : [];

function normalizeList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function getSavedLanguage() {
  try {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("mediswipe-language");
    return saved === "hi" ? "hi" : "en";
  } catch (error) {
    return "en";
  }
}

export default function MedicineDetailPage() {
  const { slug } = useParams();
  const language = getSavedLanguage();

  const medicine = items.find((item) => item.slug === slug);

  if (!medicine) {
    return (
      <>
        <Helmet>
          <title>Medicine Not Found | MediSwipe</title>
          <meta
            name="description"
            content="The medicine page you tried to open is not available."
          />
          <meta name="robots" content="noindex, follow" />
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-[#f4fff6] via-[#ecfff4] to-[#fff3e8] px-4 py-10 text-slate-800">
          <div className="mx-auto max-w-4xl rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(16,24,40,0.10)] backdrop-blur sm:p-8 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {language === "hi" ? "दवा नहीं मिली" : "Medicine not found"}
            </h1>
            <p className="mt-3 text-slate-600">
              {language === "hi"
                ? "जिस दवा को आप खोलना चाहते थे, वह इस सूची में नहीं मिली।"
                : "The medicine page you tried to open is not available in this list."}
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-green-500 to-orange-400 px-5 py-3 font-semibold text-white shadow-lg"
            >
              {language === "hi" ? "होम पर जाएँ" : "Go Home"}
            </Link>
          </div>
        </div>
      </>
    );
  }

  const name =
    language === "hi"
      ? medicine.name_hi || medicine.name
      : medicine.name || medicine.name_hi;

  const type =
    language === "hi"
      ? medicine.type_hi || medicine.type
      : medicine.type || medicine.type_hi;

  const summary =
    language === "hi"
      ? medicine.summary_hi || medicine.summary
      : medicine.summary || medicine.summary_hi;

  const intro =
    language === "hi"
      ? medicine.intro_hi || medicine.summary_hi || medicine.summary
      : medicine.intro_en || medicine.summary || medicine.summary_hi;

  const caution =
    language === "hi"
      ? medicine.caution_hi || medicine.caution
      : medicine.caution || medicine.caution_hi;

  const uses =
    language === "hi"
      ? normalizeList(medicine.diseases_hi).length > 0
        ? normalizeList(medicine.diseases_hi)
        : normalizeList(medicine.diseases)
      : normalizeList(medicine.diseases).length > 0
      ? normalizeList(medicine.diseases)
      : normalizeList(medicine.diseases_hi);

  const howUsed =
    language === "hi"
      ? normalizeList(medicine.how_it_is_used_hi)
      : normalizeList(medicine.how_it_is_used_en);

  const importantPoints =
    language === "hi"
      ? normalizeList(medicine.important_points_hi)
      : normalizeList(medicine.important_points_en);

  const whenToGetHelp =
    language === "hi"
      ? normalizeList(medicine.when_to_get_help_hi)
      : normalizeList(medicine.when_to_get_help_en);

  const sourceNote =
    language === "hi"
      ? medicine.source_note_hi
      : medicine.source_note_en;

  const image = medicine.image || fallbackImage;
  const canonicalUrl = `${SITE_URL}/${slug}`;

  const metaTitle = `${name} Uses, Dosage, Side Effects | MediSwipe`;

  const metaDescription = (
    summary ||
    intro ||
    `${name} medicine information including uses, dosage, side effects, precautions, and safety advice.`
  )
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 155);

  const medicineSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: metaTitle,
    url: canonicalUrl,
    description: metaDescription,
    about: {
      "@type": "Drug",
      name: name,
    },
    image: image,
  };

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={image} />

        <script type="application/ld+json">
          {JSON.stringify(medicineSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#f4fff6] via-[#ecfff4] to-[#fff3e8] px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/"
            className="mb-5 inline-flex rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow ring-1 ring-slate-200"
          >
            {language === "hi" ? "← वापस" : "← Back"}
          </Link>

          <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white/90 shadow-[0_20px_60px_rgba(16,24,40,0.10)] backdrop-blur">
            <div className="relative h-[280px] w-full sm:h-[340px]">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-3xl bg-white/92 p-4 shadow-lg backdrop-blur">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    {name}
                  </h1>
                  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                    {type}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700 sm:text-base">
                  {summary}
                </p>
              </div>
            </div>

            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <section className="rounded-3xl bg-slate-50 p-5">
                  <h2 className="text-xl font-bold text-slate-900">
                    {language === "hi" ? "संक्षिप्त जानकारी" : "Quick overview"}
                  </h2>
                  <p className="mt-3 leading-7 text-slate-700">{intro}</p>
                </section>

                <section className="rounded-3xl bg-slate-50 p-5">
                  <h2 className="text-xl font-bold text-slate-900">
                    {language === "hi"
                      ? "यह दवा किसमें उपयोग होती है"
                      : "Common uses"}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {uses.map((use) => (
                      <span
                        key={use}
                        className="rounded-full bg-gradient-to-r from-green-100 to-orange-100 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="rounded-3xl bg-slate-50 p-5">
                  <h2 className="text-xl font-bold text-slate-900">
                    {language === "hi"
                      ? "कैसे समझें / कब उपयोग देखें"
                      : "How to understand its use"}
                  </h2>
                  <ul className="mt-4 space-y-3 text-slate-700">
                    {howUsed.map((point, index) => (
                      <li
                        key={index}
                        className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-3xl bg-slate-50 p-5">
                  <h2 className="text-xl font-bold text-slate-900">
                    {language === "hi"
                      ? "कब डॉक्टर से बात करें"
                      : "When to get medical help"}
                  </h2>
                  <ul className="mt-4 space-y-3 text-slate-700">
                    {whenToGetHelp.map((point, index) => (
                      <li
                        key={index}
                        className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="space-y-6">
                <section className="rounded-3xl border border-orange-100 bg-orange-50 p-5">
                  <h3 className="text-lg font-bold text-slate-900">
                    {language === "hi"
                      ? "महत्वपूर्ण सावधानी"
                      : "Important caution"}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    {caution}
                  </p>
                </section>

                <section className="rounded-3xl border border-green-100 bg-green-50 p-5">
                  <h3 className="text-lg font-bold text-slate-900">
                    {language === "hi"
                      ? "ध्यान रखने योग्य बातें"
                      : "Helpful notes"}
                  </h3>
                  <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
                    {importantPoints.map((point, index) => (
                      <li
                        key={index}
                        className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-green-100"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-5">
                  <h3 className="text-lg font-bold text-slate-900">
                    {language === "hi" ? "Source note" : "Source note"}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {sourceNote}
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


















