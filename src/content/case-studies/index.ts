import type { ComponentType } from "react"
import AlBhedTranslator from "./al-bhed-translator.mdx"
import Montressor from "./montressor.mdx"
import PortfolioV3 from "./portfolio-v3.mdx"

export const caseStudyComponents: Record<string, ComponentType> = {
  "portfolio-v3": PortfolioV3,
  "al-bhed-translator": AlBhedTranslator,
  montressor: Montressor,
}
