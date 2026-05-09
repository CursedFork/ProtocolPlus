import type { Sweetener } from '@/types/sweetener'
import type { Citation } from '@/types/supplement'

export const sweeteners: Sweetener[] = [
  {
    id: 'stevia',
    name: 'Stevia (Steviol Glycosides)',
    brand_names: ['Truvia', 'PureVia', 'SweetLeaf', 'Stevia in the Raw'],
    type: 'Natural plant extract',
    sweetness_vs_sugar: '200–400× sweeter than sugar',
    calories_per_gram: 0,
    fda_status: 'GRAS — highly purified steviol glycosides. Crude leaf extracts are NOT FDA-approved.',
    fda_adi: 'No formal FDA ADI; JECFA: 4 mg/kg/day (steviol equivalents)',
    overall_safety_rating: 'Best overall safety profile. Most evidence-backed natural option.',
    evidence_strength: 'strong',
    safety_rank: 1,
    safety_rank_rationale:
      'Best overall evidence. Clean safety profile, possible additional benefits for blood pressure and blood glucose. No gut microbiome concern. Long regulatory history.',
    warning_level: 'none',
    summary:
      'Stevia is derived from Stevia rebaudiana leaves. Steviol glycosides (rebaudioside A, stevioside) are 200–400× sweeter than sugar, calorie-free, and noncariogenic. Evidence supports a clean safety profile with potential additional benefits for blood glucose and blood pressure. The strongest current evidence favors stevia as the safest non-nutritive sweetener for most people.',
    key_findings: [
      {
        finding:
          'Steviol glycosides have no harmful effects on human health based on current scientific evidence. FDA has not objected to more than 50 GRAS notices for high-purity steviol glycosides.',
        study_type: 'Review + Regulatory',
        source: 'PMC / Molecules, 2023',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9920402/',
        publication_year: 2023,
      },
      {
        finding:
          'Meta-analysis of 9 RCTs (n=462): steviol glycosides significantly reduced systolic blood pressure (MD: −6.32 mmHg) vs. placebo — potential antihypertensive benefit.',
        study_type: 'Systematic Review & Meta-Analysis',
        source: 'PubMed, 2019',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31438580/',
        publication_year: 2019,
      },
      {
        finding:
          'EFSA (European Food Safety Authority) approved glucosylated steviol glycosides as a safe food additive after full safety evaluation.',
        study_type: 'Regulatory Assessment',
        source: 'EFSA / PMC, 2022',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8826121/',
        publication_year: 2022,
      },
    ],
    risks: [
      'Bitter/metallic aftertaste at higher concentrations',
      'Most commercial "stevia" products contain erythritol as the primary ingredient — check labels',
      'Crude/whole leaf stevia is NOT FDA-approved (only highly purified extracts)',
      'May interact with antihypertensive and antidiabetic medications (additive effect)',
      'Allergy risk for people sensitive to Asteraceae family plants (ragweed, daisies)',
      'Safety in pregnancy is under-studied',
    ],
    benefits: [
      'Zero calories, zero glycemic impact',
      'May modestly reduce blood pressure in hypertensive individuals',
      'May modestly lower fasting blood glucose',
      'Anti-inflammatory and antioxidant properties from steviol glycosides',
      'Plant-derived — preferred by those seeking natural options',
      'Noncariogenic (does not cause tooth decay)',
    ],
    gut_microbiome: 'Minimal concern. Current evidence does not show the same microbiome disruption as saccharin, sucralose, or Ace-K.',
    cardiovascular_concern: 'No adverse signal. Meta-analysis shows modest blood pressure reduction benefit.',
    cancer_concern: 'Not classified by IARC. In vitro evidence suggests possible inhibitory effects on some cancer cell lines — far too early for clinical claims.',
    who_to_avoid: [
      'People with Asteraceae/Compositae plant family allergy',
      'Those on antihypertensive medication (monitor blood pressure)',
      'Check labels — most commercial "stevia" is blended with erythritol',
    ],
    common_in: ['Truvia (primarily erythritol)', 'PureVia', 'SweetLeaf drops', "Natural 'diet' beverages", 'Quest and other protein bars', 'Zevia beverages'],
  },

  {
    id: 'monk_fruit',
    name: 'Monk Fruit Extract (Luo Han Guo)',
    brand_names: ['Monk Fruit in the Raw', 'Lakanto (blended with erythritol)', 'Pure monk fruit extract'],
    type: 'Natural plant extract',
    sweetness_vs_sugar: '100–250× sweeter than sugar',
    calories_per_gram: 0,
    fda_status: 'GRAS — no formal ADI set (reflects very wide safety margin)',
    fda_adi: 'No formal ADI established',
    overall_safety_rating: 'Excellent safety profile. No adverse signals identified. Least studied of major sweeteners.',
    evidence_strength: 'emerging',
    safety_rank: 2,
    safety_rank_rationale:
      'Excellent safety profile, no adverse signals, antioxidant properties from mogrosides. Main caveat: most commercial products blend with erythritol — buy pure extract if choosing this option.',
    warning_level: 'none',
    summary:
      'Monk fruit extract (mogroside V is the primary sweet compound) is derived from a small gourd native to Southeast Asia. It has GRAS status with no formal ADI — reflecting its wide safety margin. It is the least studied of major sweeteners in long-term human clinical trials, but no adverse health signals have been identified.',
    key_findings: [
      {
        finding:
          'PRISMA systematic review of RCTs (2025): monk fruit extract showed no harmful effects and potential benefits for glucose homeostasis and cardiometabolic markers. Most studies were 7–15 days — long-term data is lacking.',
        study_type: 'PRISMA Systematic Review of RCTs',
        source: 'MDPI / Nutrients, April 2025',
        url: 'https://www.mdpi.com/2072-6643/17/9/1433',
        publication_year: 2025,
      },
      {
        finding:
          'Monk fruit has antioxidant properties from mogrosides that may help reduce oxidative stress — potential protective effect, though clinical evidence is early-stage.',
        study_type: 'Review',
        source: 'Medical News Today / WebMD, 2023',
        url: 'https://www.medicalnewstoday.com/articles/322769',
        publication_year: 2023,
      },
    ],
    risks: [
      'Most commercial products (Lakanto, etc.) contain erythritol as a bulking agent — see erythritol for its cardiovascular concerns',
      'Very limited long-term human clinical data',
      'Expensive compared to other sweeteners',
      'May cause GI upset in rare cases',
    ],
    benefits: [
      'Zero calories, zero glycemic impact',
      'Antioxidant properties from mogrosides',
      'No established adverse health signals',
      'No bitter aftertaste compared to stevia',
      'No formal ADI limit — reflects very wide safety margin',
      'Noncariogenic',
    ],
    gut_microbiome: 'Unknown — insufficient human data. No concerning signals identified.',
    cardiovascular_concern: 'None identified. Potential antioxidant benefit.',
    cancer_concern: 'No established concern. Mogroside compounds show anti-proliferative effects in vitro — far too early for clinical claims.',
    who_to_avoid: [
      'Those purchasing commercial products should check for erythritol (most blends contain it) — if cardiovascular risk is a concern, seek pure monk fruit extract',
    ],
    common_in: ['Lakanto (monk fruit + erythritol blend)', 'Monk Fruit in the Raw', 'Some protein bars and keto products'],
  },

  {
    id: 'aspartame',
    name: 'Aspartame',
    brand_names: ['NutraSweet', 'Equal', 'Sugar Twin'],
    type: 'Synthetic',
    sweetness_vs_sugar: '200× sweeter than sugar',
    calories_per_gram: 4,
    fda_status: 'FDA-approved food additive. ADI: 50 mg/kg/day (≈18–19 cans diet soda/day for a 154 lb person).',
    fda_adi: '50 mg/kg/day (FDA); 40 mg/kg/day (WHO/JECFA)',
    overall_safety_rating:
      'Generally considered safe at typical intake by FDA, JECFA, NCI. IARC 2023 Group 2B classification ("possibly carcinogenic") is based on limited evidence — same category as coffee was in until 2016.',
    evidence_strength: 'moderate',
    safety_rank: 3,
    safety_rank_rationale:
      'Most studied sweetener globally. FDA, JECFA, and NCI all maintain it is safe at typical intake. IARC Group 2B is the weakest evidence category. Avoid only if PKU or confirmed sensitivity.',
    warning_level: 'none',
    summary:
      'Aspartame is the most studied artificial sweetener in the world. FDA, JECFA, and Health Canada maintain it is safe at typical intake. IARC\'s 2023 "possibly carcinogenic" (Group 2B) classification drew attention but is based on limited, inconclusive evidence. The same Group 2B category applies to aloe vera extract, pickled vegetables, and coffee (prior to 2016). JECFA simultaneously reaffirmed its ADI and said the cancer evidence "is not convincing."',
    key_findings: [
      {
        finding:
          'IARC classified aspartame as Group 2B ("possibly carcinogenic to humans") based on limited evidence of hepatocellular carcinoma association from three studies — chance, bias, and confounding could not be ruled out.',
        study_type: 'IARC Monograph',
        source: 'IARC / WHO, July 2023',
        url: 'https://www.iarc.who.int/news-events/aspartame-hazard-and-risk-assessment-results-released/',
        publication_year: 2023,
      },
      {
        finding:
          'JECFA simultaneously reaffirmed the ADI of 40 mg/kg/day and concluded dietary aspartame "does not pose a health concern" and that cancer association evidence "is not convincing."',
        study_type: 'WHO/FAO Expert Committee Risk Assessment',
        source: 'WHO/JECFA Joint Statement, July 2023',
        url: 'https://www.who.int/news/item/14-07-2023-aspartame-hazard-and-risk-assessment-results-released',
        publication_year: 2023,
      },
      {
        finding:
          'Daily consumption of aspartame at doses reflecting high consumption had minimal effect on gut microbiota composition or short-chain fatty acid production in a double-blind crossover RCT.',
        study_type: 'Randomized Double-Blind Crossover RCT',
        source: 'PubMed / Nutrients, 2020',
        url: 'https://pubmed.ncbi.nlm.nih.gov/33171964/',
        publication_year: 2020,
      },
    ],
    risks: [
      'Phenylketonuria (PKU) — absolute contraindication. All products must carry a PKU warning.',
      'IARC Group 2B ("possibly carcinogenic") — limited liver cancer evidence; JECFA and FDA disagree this is a meaningful risk at typical intake',
      'Some individuals report headaches and migraines — not consistently confirmed in blinded RCTs',
      'Neurological symptom reports have not been confirmed in large-scale controlled trials',
    ],
    benefits: [
      'Effectively zero net calories at typical use',
      'Does not raise blood glucose or insulin — suitable for most people with diabetes',
      'Decades of regulatory review across multiple jurisdictions',
      'Taste profile closest to sugar — most widely used in diet beverages',
    ],
    gut_microbiome: 'Minimal effect at doses below ADI in human RCTs. Animal studies suggest some disruption at high doses.',
    cardiovascular_concern: 'No established independent cardiovascular signal. Observational associations likely confounded by reverse causality.',
    cancer_concern:
      'IARC Group 2B — "possibly carcinogenic" based on limited evidence. JECFA, FDA, NCI maintain evidence is not convincing at typical dietary exposure.',
    who_to_avoid: ['People with phenylketonuria (PKU) — absolute contraindication', 'Individuals with confirmed aspartame sensitivity'],
    common_in: ['Diet sodas (Diet Coke, Diet Pepsi)', 'Sugar-free gum', 'Tabletop sweetener packets (Equal)', 'Chewable vitamins and yogurt'],
  },

  {
    id: 'sucralose',
    name: 'Sucralose',
    brand_names: ['Splenda'],
    type: 'Synthetic (chlorinated sucrose derivative)',
    sweetness_vs_sugar: '600× sweeter than sugar',
    calories_per_gram: 0,
    fda_status: 'FDA-approved food additive. ADI: 5 mg/kg/day.',
    fda_adi: '5 mg/kg/day',
    overall_safety_rating:
      'Generally considered safe at normal intake. Emerging concerns about gut microbiome effects at higher doses, especially in people with type 2 diabetes.',
    evidence_strength: 'moderate',
    safety_rank: 4,
    safety_rank_rationale:
      'Generally safe at typical doses. Gut microbiome concern is real but dose-dependent and more relevant at higher doses. Important for baking (heat-stable). Worth moderating rather than eliminating.',
    warning_level: 'caution',
    summary:
      'Sucralose is the most widely used artificial sweetener globally by market share. It is heat-stable (unlike aspartame) and suitable for baking. It passes through the body largely unchanged, reaching the gut microbiome — evidence of gut disruption is building, particularly at higher doses and in people with metabolic conditions. No credible cancer signal exists.',
    key_findings: [
      {
        finding:
          '10-week sucralose consumption (48 mg/day) induced gut dysbiosis and altered glucose and insulin levels in healthy young adults vs. water controls.',
        study_type: 'Open-Label Clinical Trial',
        source: 'PMC / Microorganisms, 2022',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8880058/',
        publication_year: 2022,
      },
      {
        finding:
          'Replacing sucrose with sucralose in adults with type 2 diabetes decreased gut microbiome alpha diversity. No significant changes were seen in metabolically healthy adults.',
        study_type: 'Two 12-week Randomized Controlled Trials',
        source: 'ScienceDirect, 2025',
        url: 'https://www.sciencedirect.com/science/article/pii/S2475299125030628',
        publication_year: 2025,
      },
      {
        finding:
          'Daily sucralose at doses below ADI had minimal effect on gut microbiota or SCFA production in a crossover RCT at typical intake levels.',
        study_type: 'Randomized Double-Blind Crossover RCT',
        source: 'PubMed / Nutrients, 2020',
        url: 'https://pubmed.ncbi.nlm.nih.gov/33171964/',
        publication_year: 2020,
      },
    ],
    risks: [
      'Gut microbiome disruption is the primary emerging concern — particularly at higher doses',
      'May alter gut diversity more in people with type 2 diabetes than metabolically healthy individuals',
      'Degrades at very high temperatures (above ~119°C/246°F) — potential trace chlorinated compounds in baking',
      'Some animal studies show glucose intolerance induction — human evidence is inconsistent',
    ],
    benefits: [
      'Zero calories',
      'Heat-stable — suitable for cooking and baking',
      'Does not raise blood glucose at typical doses',
      'Longest regulatory track record of heat-stable sweeteners',
    ],
    gut_microbiome:
      'Clinically significant concern at higher doses. Passes largely unabsorbed to the colon where it interacts with microbiota. Dose-dependent effects. Minimal effect at low doses below ADI in most human RCTs.',
    cardiovascular_concern: 'No established independent cardiovascular signal.',
    cancer_concern: 'No credible cancer signal. Not classified by IARC.',
    who_to_avoid: [
      'People with known gut dysbiosis or inflammatory bowel conditions may wish to limit use',
      'Those with type 2 diabetes should be aware of potential microbiome effects',
    ],
    common_in: ['Splenda packets', 'Diet sodas', 'Baked goods', 'Protein bars and powders', 'Sugar-free syrups'],
  },

  {
    id: 'acesulfame_potassium',
    name: 'Acesulfame Potassium (Ace-K)',
    brand_names: ['Sweet One', 'Sunett'],
    type: 'Synthetic',
    sweetness_vs_sugar: '200× sweeter than sugar',
    calories_per_gram: 0,
    fda_status: 'FDA-approved food additive. ADI: 15 mg/kg/day.',
    fda_adi: '15 mg/kg/day',
    overall_safety_rating:
      'Generally recognized as safe by FDA; some animal data raises metabolic and gut concerns. Under-studied relative to other sweeteners.',
    evidence_strength: 'mixed',
    safety_rank: 5,
    safety_rank_rationale:
      'Under-studied. Animal data raises some flags. Almost always combined with other sweeteners making isolation difficult. Likely safe at typical intake but insufficient long-term human data.',
    warning_level: 'caution',
    summary:
      'Ace-K is almost always used in combination with other sweeteners (particularly aspartame or sucralose) to improve taste. It is one of the least independently studied sweeteners at equivalent doses. Animal data shows potential for weight gain and gut microbiome shifts at high doses. No confirmed cancer signal.',
    key_findings: [
      {
        finding: 'FDA has reviewed over 90 studies to support Ace-K approval. No confirmed cancer risk in humans.',
        study_type: 'Regulatory Review',
        source: 'FDA, 2023',
        url: 'https://www.webmd.com/diet/what-is-acesulfame-potassium',
        publication_year: 2023,
      },
      {
        finding:
          'Animal study found Ace-K caused weight gain and gut microbiome shifts potentially linked to obesity and chronic inflammation — no equivalent human RCT data exists.',
        study_type: 'Animal Study',
        source: 'Medical News Today, 2025',
        url: 'https://www.medicalnewstoday.com/articles/318604',
        publication_year: 2025,
      },
      {
        finding:
          'A 2022 French cohort study (n=102,856) found association between Ace-K + aspartame combined intake and increased overall cancer risk. Researchers emphasized need for replication.',
        study_type: 'Prospective Cohort Study',
        source: 'NutriNet-Santé, 2022',
        url: 'https://www.medicalnewstoday.com/articles/318604',
        publication_year: 2022,
        note: 'Observational — subject to reverse causality and confounding. Not yet replicated.',
      },
    ],
    risks: [
      'Under-studied compared to other sweeteners at equivalent independent doses',
      'Animal data shows potential for weight gain and gut microbiome disruption',
      'Almost always consumed in combination — difficult to isolate independent effects',
      'Preliminary cancer association in one large French cohort — observational only, not confirmed',
      'Contains potassium — theoretically relevant for severe kidney disease patients (amounts in food are very small)',
    ],
    benefits: [
      'Zero calories, zero glycemic impact',
      'Improves taste of other sweeteners when blended',
      'Heat-stable — suitable for cooking and baking',
      'Long history of use in beverages',
    ],
    gut_microbiome:
      'Animal data suggests disruption; human data is very limited. Used almost exclusively in blends, making isolation of specific effects difficult.',
    cardiovascular_concern: 'Observational association in combined sweetener studies. No confirmed independent signal.',
    cancer_concern: 'One large cohort study found association — major methodological limitations noted. No confirmed causal link.',
    who_to_avoid: ['Those with severe kidney disease on potassium restrictions should be aware (amounts in food are very small in practice)'],
    common_in: ['Diet sodas (usually blended with aspartame or sucralose)', 'Protein bars', 'Sugar-free energy drinks', 'Candy and gum'],
  },

  {
    id: 'saccharin',
    name: 'Saccharin',
    brand_names: ["Sweet'N Low", 'Sugar Twin'],
    type: 'Synthetic',
    sweetness_vs_sugar: '200–700× sweeter than sugar',
    calories_per_gram: 0,
    fda_status: 'FDA-approved food additive. Delisted from possible carcinogen list in 2000. ADI: 15 mg/kg/day.',
    fda_adi: '15 mg/kg/day',
    overall_safety_rating:
      'Generally considered safe for humans. Old bladder cancer concerns in rats are not applicable to humans. Gut microbiome effects are a current concern.',
    evidence_strength: 'moderate',
    safety_rank: 6,
    safety_rank_rationale:
      'Resolved cancer concern from rat studies. Gut microbiome disruption evidence is stronger than most other sweeteners in animal literature. Human long-term data is limited.',
    warning_level: 'caution',
    summary:
      "Saccharin is the oldest artificial sweetener (synthesized 1879). It was placed on a warning list in the 1970s after causing bladder cancer in male rats, but this mechanism (urinary precipitates unique to male rats) does not apply to humans. The FDA removed saccharin from its possible carcinogen list in 2000. Current concerns focus on gut microbiome disruption, which has some of the strongest animal evidence of any sweetener.",
    key_findings: [
      {
        finding:
          'The 1970s rat bladder cancer mechanism (sodium salt crystal formation in male rat urine) is physiologically unique to male rats and does not occur in humans. FDA delisted saccharin from potential carcinogens in 2000.',
        study_type: 'Regulatory Reassessment',
        source: 'FDA / NCI Historical Review, 2000',
        url: 'https://www.cancer.gov/about-cancer/causes-prevention/risk/diet/artificial-sweeteners-fact-sheet',
        publication_year: 2000,
      },
      {
        finding:
          'Saccharin and sucralose administration to mice induced gut microbiome perturbations at ADI-equivalent concentrations after 6 months, including altered inflammation-related bacterial pathways.',
        study_type: 'Animal Study (6-month)',
        source: 'PMC / Nutrients, 2022',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9029443/',
        publication_year: 2022,
      },
      {
        finding:
          'Saccharin increased the ability of E. coli and E. faecalis to adhere to and invade intestinal epithelial cells in vitro — however, in vitro results do not directly translate to human outcomes.',
        study_type: 'In Vitro Study',
        source: 'PMC / Nutrients, 2022',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9029443/',
        publication_year: 2022,
      },
    ],
    risks: [
      'Gut microbiome disruption — strongest animal evidence of any common sweetener; human long-term data is limited',
      'Historically associated with bladder cancer in rats — mechanism is rat-specific and not applicable to humans; resolved by regulatory bodies',
      'Bitter metallic aftertaste at higher concentrations — often blended with other sweeteners',
      'Possible sulfonamide cross-reactivity (saccharin has a sulfonamide structure) in sensitive individuals',
    ],
    benefits: [
      'Zero calories, zero glycemic impact',
      'Most extensively studied sweetener historically',
      'Heat-stable',
      'Cheapest artificial sweetener',
    ],
    gut_microbiome:
      'Moderate-to-significant concern based on animal models and some in vitro studies. Human long-term data is limited. Most concerning sweetener for gut health in animal literature.',
    cardiovascular_concern: 'Observational associations exist but are likely confounded. No confirmed independent signal.',
    cancer_concern: 'Rat bladder cancer concern is resolved and not applicable to humans. No confirmed human cancer association.',
    who_to_avoid: [
      'Those with gut health concerns may wish to minimize use given animal evidence',
      'Individuals with sulfonamide antibiotic allergy',
    ],
    common_in: ["Sweet'N Low packets", 'Some diet beverages', 'Tabletop sweetener blends', 'Canned fruit and salad dressings'],
  },

  {
    id: 'xylitol',
    name: 'Xylitol',
    brand_names: ['Found in most sugar-free gums and dental products'],
    type: 'Sugar alcohol (polyol)',
    sweetness_vs_sugar: 'Approximately equal sweetness to sugar',
    calories_per_gram: 2.4,
    fda_status: 'GRAS — not classified as a food additive.',
    fda_adi: 'No formal ADI set',
    overall_safety_rating:
      'Generally safe at typical doses. Emerging cardiovascular concern similar to erythritol. EXTREMELY DANGEROUS FOR DOGS — serious veterinary toxin.',
    evidence_strength: 'moderate',
    safety_rank: 7,
    safety_rank_rationale:
      'Proven dental benefit. Emerging cardiovascular concern (platelet aggregation) from same Cleveland Clinic research group as erythritol — less evidence currently. GI side effects at higher doses. Lethal to dogs.',
    warning_level: 'caution',
    summary:
      'Xylitol is a naturally occurring sugar alcohol found in some fruits and hardwoods. It is most famous for its dental benefits — actively inhibiting Streptococcus mutans (the primary cavity-causing bacterium). Recent research has linked elevated xylitol levels to cardiovascular risk through similar platelet-aggregation mechanisms as erythritol. GI side effects are the most common complaint at higher doses.',
    key_findings: [
      {
        finding:
          'Same Cleveland Clinic research group found xylitol also associated with increased cardiovascular risk and platelet aggregation in a follow-up study — builds on the erythritol findings.',
        study_type: 'Prospective Study (emerging)',
        source: 'Cleveland Clinic Research Group / PMC Review, 2025',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12352310/',
        publication_year: 2025,
        note: 'Evidence is less developed than for erythritol — treat as an emerging concern requiring more research',
      },
      {
        finding:
          'High doses (35–50g) associated with significant GI symptoms and watery faeces vs. sucrose control. Typical chewing gum intake (~2–4g) rarely causes GI issues.',
        study_type: 'Clinical Study',
        source: 'NLM Research Summary, 2007',
        url: 'https://www.ncbi.nlm.nih.gov/search/research-news/18310/',
        publication_year: 2007,
      },
      {
        finding:
          'Xylitol is a proven cariostatic agent — significantly reduces Streptococcus mutans colonization and cavity formation. This is the strongest and most consistent evidence for xylitol.',
        study_type: 'Multiple RCTs and Meta-Analyses',
        source: 'Dental literature consensus / Mayo Clinic, 2022',
        url: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/artificial-sweeteners/art-20046936',
        publication_year: 2022,
      },
    ],
    risks: [
      'Emerging cardiovascular concern — platelet aggregation mechanism suggested by Cleveland Clinic research. Less evidence than erythritol currently.',
      'GI distress (gas, bloating, diarrhea) at doses above 20–30g — dose-dependent osmotic laxative effect',
      'EXTREMELY DANGEROUS FOR DOGS — causes fatal hypoglycemia and liver failure. Even one piece of gum can be lethal.',
      'Relatively high caloric content compared to other sugar alcohols (2.4 kcal/g)',
    ],
    benefits: [
      'Proven dental benefit — reduces cavities by inhibiting Streptococcus mutans. Recommended by dentists.',
      'Lower glycemic index than sugar (GI of 7 vs. 65 for sucrose)',
      'Closest to sugar sweetness profile of all sugar alcohols',
      'Used therapeutically for ear infection prevention in children',
      'Occurs naturally in birch trees, some fruits and vegetables',
    ],
    gut_microbiome: 'Dose-dependent GI effects. Osmotic laxative at high doses. Some evidence of prebiotic-like effects on specific bacterial populations.',
    cardiovascular_concern:
      'Emerging — same Cleveland Clinic research group studying erythritol found similar preliminary findings for xylitol. Less established than erythritol. Warrants monitoring.',
    cancer_concern: 'No established signal.',
    who_to_avoid: [
      'People with cardiovascular risk should monitor emerging research',
      'Those with IBS or sensitive digestive systems at higher doses',
      'MUST be kept away from dogs — absolute rule regardless of amount',
    ],
    common_in: ['Sugar-free gum (most major brands)', 'Mints and breath strips', 'Toothpaste and mouthwash', 'Some keto baking products', 'Nasal sprays'],
  },

  {
    id: 'erythritol',
    name: 'Erythritol',
    brand_names: ['Truvia (primary ingredient)', 'Lakanto (primary ingredient)', 'Swerve', 'Most keto baking products'],
    type: 'Sugar alcohol (polyol)',
    sweetness_vs_sugar: '60–80% as sweet as sugar',
    calories_per_gram: 0.2,
    fda_status: 'GRAS — not classified as a food additive. Not required on nutrition labels in all formats.',
    fda_adi: 'No formal ADI set (GRAS)',
    overall_safety_rating:
      'SIGNIFICANT CAUTION — most concerning sweetener on this list based on current evidence. Emerging cardiovascular safety signal.',
    evidence_strength: 'strong',
    safety_rank: 8,
    safety_rank_rationale:
      'Most concerning. NIH-funded Nature Medicine study + Cleveland Clinic follow-up provide both associative AND mechanistic cardiovascular risk evidence. Hidden in most "natural" sweetener products. People with cardiovascular risk should minimize or avoid.',
    warning_level: 'significant-caution',
    label_transparency_note:
      'Products labeled "stevia sweetened" (Truvia) or "monk fruit sweetened" (Lakanto) often contain erythritol as the primary bulk ingredient with only trace amounts of stevia or monk fruit. Check ingredient lists — not just the front label.',
    summary:
      'Erythritol is a sugar alcohol widely used as a bulking agent in "natural" sweetener blends (Truvia, Lakanto, Swerve). A landmark 2023 study published in Nature Medicine (NIH-funded, Cleveland Clinic) found that high plasma erythritol was associated with 1.8–2.2× increased risk of major cardiovascular events across 4,000+ patients. Follow-up mechanistic studies confirmed erythritol increases platelet aggregation and clot formation. This is the most significant new safety concern in the sweetener field.',
    key_findings: [
      {
        finding:
          'Elevated plasma erythritol was associated with 1.80× (US cohort) and 2.21× (European cohort) increased risk of major adverse cardiovascular events over 3 years. Mechanistic studies confirmed erythritol enhances platelet reactivity and thrombosis formation in vitro and in vivo.',
        study_type: 'Metabolomics Study + Mechanistic Research (n=4,139 across 3 cohorts)',
        source: 'Nature Medicine / NIH-funded, Cleveland Clinic, February 2023',
        url: 'https://www.nature.com/articles/s41591-023-02223-9',
        publication_year: 2023,
      },
      {
        finding:
          'NIH highlighted the erythritol-cardiovascular event association and noted mechanistic confirmation — erythritol at physiological concentrations increased platelet aggregation and adhesion.',
        study_type: 'NIH Research Summary',
        source: 'NIH.gov, 2023',
        url: 'https://www.nih.gov/news-events/nih-research-matters/erythritol-cardiovascular-events',
        publication_year: 2023,
      },
      {
        finding:
          'Follow-up study in healthy volunteers: drinking an erythritol-sweetened beverage rapidly and significantly increased platelet aggregation (P<0.0001 for each subject and agonist examined).',
        study_type: 'Prospective Intervention Study in Healthy Volunteers',
        source: 'Cleveland Clinic / ConsultQD, October 2025',
        url: 'https://consultqd.clevelandclinic.org/evidence-mounts-that-sugar-substitute-erythritol-raises-cardiovascular-risk',
        publication_year: 2025,
      },
      {
        finding:
          'Counterbalancing review notes erythritol is produced endogenously, Mendelian randomization trials do not link sugar alcohols to significant cardiovascular risk, and pilot trials show only temporary platelet changes.',
        study_type: 'Review',
        source: 'PMC, 2025',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12352310/',
        publication_year: 2025,
        note: 'Counterpoint — the cardiovascular mechanistic evidence from Cleveland Clinic remains the more direct and replicated finding',
      },
    ],
    risks: [
      'MOST IMPORTANT: Emerging evidence links erythritol to increased cardiovascular risk (heart attack, stroke) — mechanistic confirmation exists (platelet aggregation). Most significant sweetener safety signal since saccharin in the 1970s.',
      'Platelet aggregation and clot formation risk — confirmed in human whole blood and animal models',
      'Hidden in many "natural" products labeled as stevia or monk fruit — always check ingredient list',
      'Not required to be listed prominently on all US nutrition labels (GRAS status)',
      'GI upset (gas, bloating) at higher doses — better tolerated than sorbitol or xylitol but can cause discomfort',
    ],
    benefits: [
      'Near-zero glycemic impact',
      'Better GI tolerance than other sugar alcohols (xylitol, sorbitol, maltitol)',
      'Near-zero net calories in practical terms',
      'Noncariogenic — may reduce cavity-causing bacteria',
      'Occurs naturally in some fruits and fermented foods',
    ],
    gut_microbiome:
      'Minimal direct gut microbiome concern compared to sucralose/saccharin — most erythritol is absorbed in the small intestine before reaching the colon.',
    cardiovascular_concern:
      'SIGNIFICANT — most concerning sweetener on this list. NIH-funded Nature Medicine study and Cleveland Clinic follow-up provide both associative and mechanistic evidence. People with cardiovascular disease or risk factors should minimize or avoid erythritol pending further research.',
    cancer_concern: 'No established cancer signal.',
    who_to_avoid: [
      'People with cardiovascular disease or risk factors (heart disease, stroke history, hypertension, diabetes)',
      'Anyone using keto products heavily should audit erythritol content',
      'Those with IBS or sensitive digestion at higher doses',
    ],
    common_in: [
      'Truvia (primary ingredient is erythritol, not stevia)',
      'Lakanto (primary ingredient is erythritol)',
      'Swerve',
      'Most keto baking products',
      'Sugar-free chocolate',
      'Many protein bars and keto snacks',
    ],
  },
]

// Maps study_type strings from sweetener data to Citation['type'] values
function mapStudyType(study_type: string): Citation['type'] {
  const s = study_type.toLowerCase()
  if (s.includes('meta-analysis') || s.includes('meta analysis')) return 'meta-analysis'
  if (s.includes('systematic review')) return 'systematic-review'
  if (s.includes('rct') || s.includes('randomized controlled')) return 'rct'
  if (s.includes('clinical trial') || s.includes('intervention study') || s.includes('crossover')) return 'clinical-trial'
  if (s.includes('government') || s.includes('regulatory') || s.includes('nih research') || s.includes('regulatory')) return 'government'
  if (s.includes('cohort') || s.includes('epidemiol') || s.includes('prospective study')) return 'epidemiological'
  return 'review'
}

export interface FlatSweetenerCitation extends Citation {
  sweetenerName: string
  sweetenerId: string
}

export function getSweetenerCitations(): FlatSweetenerCitation[] {
  return sweeteners.flatMap((sw) =>
    sw.key_findings.map((f) => ({
      title: f.source,
      journal: f.source,
      year: f.publication_year,
      url: f.url,
      type: mapStudyType(f.study_type),
      studyDescription: f.finding,
      sweetenerName: sw.name,
      sweetenerId: sw.id,
    })),
  )
}

export const sweetenerSafetyColors: Record<string, string> = {
  'significant-caution': 'text-red-400 bg-red-400/10 border-red-400/30',
  caution: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  none: 'text-green-400 bg-green-400/10 border-green-400/30',
}

export const evidenceStrengthColors: Record<string, string> = {
  strong: 'text-green-400',
  moderate: 'text-blue-400',
  mixed: 'text-yellow-400',
  emerging: 'text-purple-400',
}
