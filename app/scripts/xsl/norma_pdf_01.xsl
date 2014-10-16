<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:functx="http://www.functx.com" xmlns:local="local" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.1" exclude-result-prefixes="fo"><xsl:variable name="anio" select="substring(/proyecto/numexp, string-length(/proyecto/numexp)-3, 4)"/><xsl:variable name="rutaImagenes" select="concat('http://localhost:8181/exist/rest/db/proyectos/',$anio,'/imagenes/')"/><xsl:variable name="rutaImagenes2">http://www1.hcdn.gov.ar/proyxml/</xsl:variable><xsl:function name="local:capital-case"><xsl:param name="string"/><xsl:value-of select="concat(upper-case(substring(normalize-space($string), 1, 1)), lower-case(substring(normalize-space($string), 2)))"/></xsl:function><xsl:template match="act"><fo:root><fo:layout-master-set><fo:simple-page-master master-name="A4" page-height="297mm" page-width="210mm" margin-top="15mm" margin-bottom="10mm" margin-left="21mm" margin-right="18mm"><fo:region-body margin-top="32mm" margin-bottom="18mm"/><fo:region-before extent="10mm"/><fo:region-after extent="5mm"/></fo:simple-page-master></fo:layout-master-set><fo:page-sequence master-reference="A4" initial-page-number="1" language="es" country="ar" font-family="Lora, Georgia, serif"><fo:static-content flow-name="xsl-region-before"><fo:block-container border-bottom-style="solid" border-bottom-width="1px" border-bottom-color="#f0f0f0" overflow="hidden"><fo:block><fo:external-graphic src="http://dsdp.hcdn.gob.ar/wp-content/themes/digesto/assets/images/digesto-juridico-argentino.png" scaling="scale-uniform" content-width="90px"/></fo:block></fo:block-container></fo:static-content><fo:static-content flow-name="xsl-region-after"><fo:block text-align="center" font-size="8px">
                        - <fo:page-number/> -
                    </fo:block></fo:static-content><fo:flow flow-name="xsl-region-body"><fo:block><xsl:apply-templates select="meta"/></fo:block><fo:block><xsl:apply-templates select="preface"/></fo:block><fo:block margin-left="11mm" margin-right="12mm"><xsl:apply-templates select="body"/></fo:block></fo:flow></fo:page-sequence></fo:root></xsl:template><xsl:template match="preface"><fo:block><fo:block font-size="24pt" font-style="italic" text-align="center" padding-bottom="4mm"><xsl:value-of select="local:capital-case(//docTitle)"/></fo:block><fo:block-container border-bottom-style="solid" border-bottom-width="1pt" border-bottom-color="#777777" text-align="center" margin-right="12mm" margin-bottom="12mm" margin-left="12mm" padding-bottom="8mm"><fo:block font-size="10pt" text-transform="uppercase" margin-top="2mm" margin-bottom="2mm">
                Digesto Jurídico Argentino
            </fo:block><fo:block font-size="10pt" font-style="italic">
                Código: <xsl:apply-templates select="p/docNumber"/></fo:block></fo:block-container></fo:block></xsl:template><xsl:template match="body"><fo:block><xsl:apply-templates select="title|chapter|section|article|book"/></fo:block></xsl:template><xsl:template match="title"><fo:block space-after="15mm"><xsl:apply-templates select="num|heading|chapter|section|article|book"/></fo:block></xsl:template><xsl:template match="book"><fo:block><xsl:apply-templates select="num|heading|section|article|chapter"/></fo:block></xsl:template><xsl:template match="article"><fo:block line-height="1.5" margin-bottom="8mm"><xsl:apply-templates select="num"/><xsl:apply-templates select="heading"/><xsl:apply-templates select="content"/></fo:block></xsl:template><xsl:template match="content/blockList"><xsl:for-each select="item"><fo:block font-size="10pt" font-style="italic" margin-left="18mm" margin-right="8mm"><xsl:apply-templates select="."/></fo:block></xsl:for-each></xsl:template><xsl:template match="title/num"><fo:block font-size="15pt" font-weight="bold" text-align="center" margin-bottom="4mm"><xsl:value-of select="."/></fo:block></xsl:template><xsl:template match="title/heading"><fo:block border-bottom-style="solid" border-bottom-width="1pt" border-bottom-color="#777777" text-align="center" font-size="15pt" font-style="italic" padding-bottom="8mm" margin-right="40mm" margin-bottom="8mm" margin-left="40mm"><xsl:value-of select="local:capital-case(.)"/></fo:block></xsl:template><xsl:template match="chapter"><fo:block space-after="12mm"><xsl:choose><xsl:when test="ancestor::section"><fo:block font-size="12pt" text-align="center" margin-top="4mm" margin-bottom="4mm"><xsl:value-of select="num"/></fo:block><fo:block text-align="center" font-size="12pt" font-style="italic" margin-bottom="8mm"><xsl:value-of select="local:capital-case(heading)"/></fo:block></xsl:when><xsl:otherwise><fo:block font-size="15pt" text-align="center" margin-top="4mm" margin-bottom="4mm"><xsl:value-of select="num"/></fo:block><fo:block text-align="center" font-size="15pt" font-style="italic" margin-bottom="8mm"><xsl:value-of select="local:capital-case(heading)"/></fo:block></xsl:otherwise></xsl:choose><xsl:apply-templates select="article|section|clause"/></fo:block></xsl:template><xsl:template match="section"><fo:block space-after="12mm"><xsl:choose><xsl:when test="ancestor::chapter"><fo:block font-size="12pt" text-align="center" margin-top="4mm" margin-bottom="4mm"><xsl:value-of select="num"/></fo:block><fo:block text-align="center" font-size="12pt" font-style="italic" margin-bottom="8mm"><xsl:value-of select="local:capital-case(heading)"/></fo:block></xsl:when><xsl:otherwise><fo:block font-size="15pt" text-align="center" margin-top="4mm" margin-bottom="4mm"><xsl:value-of select="num"/></fo:block><fo:block text-align="center" font-size="15pt" font-style="italic" margin-bottom="8mm"><xsl:value-of select="local:capital-case(heading)"/></fo:block></xsl:otherwise></xsl:choose><xsl:apply-templates select="article|chapter|clause"/></fo:block></xsl:template><xsl:template match="clause"><fo:block><fo:block font-size="11pt" font-style="italic" font-weight="bold" margin-bottom="2mm"><xsl:value-of select="local:capital-case(heading)"/></fo:block><xsl:apply-templates select="chapter|section|article|book|title"/></fo:block></xsl:template><xsl:template match="article/num"><fo:inline text-align="left" text-transform="uppercase" font-size="10pt" font-weight="bold"><xsl:value-of select="concat(., ' ')"/></fo:inline></xsl:template><xsl:template match="article/heading"><fo:inline font-size="11pt" font-style="italic" font-weight="bold"><xsl:value-of select="concat(local:capital-case(.), ' ')"/></fo:inline></xsl:template><xsl:template match="content/p[position() = 1]"><fo:inline font-size="11pt" text-align="left"><xsl:value-of select="."/></fo:inline></xsl:template><xsl:template match="content/p[position() &gt; 1]"><fo:block font-size="11pt" text-align="left" margin-top="4mm"><xsl:value-of select="."/></fo:block></xsl:template><xsl:template match="item"><fo:block margin-top="2mm"><fo:inline font-weight="bold"><xsl:value-of select="concat(num, ' ')"/></fo:inline><fo:inline><xsl:value-of select="p"/></fo:inline></fo:block></xsl:template></xsl:stylesheet>