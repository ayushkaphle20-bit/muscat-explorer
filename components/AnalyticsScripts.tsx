"use client";

import Script from "next/script";
import type { SiteConfig } from "@/lib/types";

export default function AnalyticsScripts({
  config,
}: {
  config: SiteConfig["integrations"];
}) {
  return (
    <>
      {/* Google Tag Manager — set NEXT_PUBLIC or data/siteConfig.json integrations.googleTagManagerId to enable */}
      {config.googleTagManagerId && (
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${config.googleTagManagerId}');
          `}
        </Script>
      )}

      {/* Google Analytics 4 — set integrations.googleAnalyticsId in data/siteConfig.json to enable */}
      {config.googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${config.googleAnalyticsId}');
            `}
          </Script>
        </>
      )}

      {/* Google AdSense — set integrations.adSenseClientId in data/siteConfig.json to enable */}
      {config.adSenseClientId && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.adSenseClientId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
