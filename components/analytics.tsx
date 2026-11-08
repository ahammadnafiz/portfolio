import Script from "next/script"

/**
 * Google Analytics 4. Set NEXT_PUBLIC_GA_ID (e.g. G-XXXXXXXXXX) at build time;
 * without it nothing is loaded, so local builds don't report visits.
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID
  if (!id) return null
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="lazyOnload" />
      <Script id="ga" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  )
}
