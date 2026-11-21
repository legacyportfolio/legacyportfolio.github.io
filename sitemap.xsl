<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="robots" content="noindex"/>
<title>XML Sitemap – Legacy Portfolio Planner</title>
<style>
body{margin:0;font-family:Figtree,system-ui,-apple-system,"Segoe UI",sans-serif;background:#f6f7fb;color:#1b2333}
header{background:#0A2342;color:#fff;padding:28px 16px;border-bottom:4px solid #D4AF37}
.w{max-width:960px;margin:0 auto}
h1{margin:0 0 6px;font-size:26px}
header p{margin:0;color:#cfd8e6}
header a{color:#E8C97A}
table{width:100%;border-collapse:collapse;background:#fff;margin:24px 0;border-radius:10px;overflow:hidden;box-shadow:0 1px 3px rgba(10,35,66,.12)}
th,td{text-align:left;padding:12px 14px;border-bottom:1px solid #e6e9f0;font-size:15px}
th{background:#eef1f7;color:#0A2342;font-size:13px;text-transform:uppercase;letter-spacing:.06em}
td a{color:#0A2342;word-break:break-all}
.n{white-space:nowrap;color:#5b6577}
main{padding:0 16px}
</style></head><body>
<header><div class="w"><h1>Legacy Portfolio Planner – XML sitemap</h1>
<p>This file tells search engines which pages to index. <a href="sitemap.html">Open the sitemap for people</a> or <a href="index.html">go to the home page</a>.</p></div></header>
<main><div class="w"><table><thead><tr><th>Page (<xsl:value-of select="count(s:urlset/s:url)"/>)</th><th>Last updated</th></tr></thead><tbody>
<xsl:for-each select="s:urlset/s:url"><tr><td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td><td class="n"><xsl:value-of select="s:lastmod"/></td></tr></xsl:for-each>
</tbody></table></div></main></body></html>
</xsl:template>
</xsl:stylesheet>
