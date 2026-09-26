// IELTS Advanced Topic vocabulary: topic-specific collocations for Task 2 essay
// topics, curated to sit above general AWL vocabulary (see vocabulary.js).
// Source: distilled from the candidate's own Advanced-Vocabulary-Bank study notes.
//
// Shape matches vocabulary.js: { w, s, p, d, f? }, except `s` here is a topic
// index (1-8, see TOPICS below) rather than an AWL sublist, and `p` may be
// "phr" for multi-word phrases that don't reduce to a single part of speech.

export const TOPICS = {
  1: 'Education',
  2: 'Environment',
  3: 'Technology',
  4: 'Health & Lifestyle',
  5: 'Crime & Punishment',
  6: 'Government & Globalization',
  7: 'Urbanization & Society',
  8: 'Economy & Employment',
}

const vocabularyAdvanced = [
  { w: 'rote learning', s: 1, p: 'n', d: 'learning by repetition and memorisation rather than understanding (collocation: resort to ~)' },
  { w: 'formative years', s: 1, p: 'n', d: "the early years that shape a person's character (collocation: shape a child's ~)" },
  { w: 'credential inflation', s: 1, p: 'n', d: 'a rising need for ever-higher qualifications for the same jobs (collocation: drive ~)' },
  { w: 'vocational training', s: 1, p: 'n', d: 'practical, job-focused training rather than academic study (collocation: pursue ~)' },
  { w: 'pedagogical approach', s: 1, p: 'n', d: 'a method or style of teaching (collocation: adopt a ~)' },
  { w: 'cultivate', s: 1, p: 'v', d: 'to deliberately develop or encourage something (collocation: ~ critical thinking)' },
  { w: 'level the playing field', s: 1, p: 'phr', d: 'to make a competition or system fairer (collocation: ~ for disadvantaged students)' },
  { w: 'brain drain', s: 1, p: 'n', d: "the emigration of a country's skilled or educated people (collocation: exacerbate the ~)" },

  { w: 'carbon footprint', s: 2, p: 'n', d: 'the amount of CO2 an activity or person produces (collocation: reduce/offset a ~)' },
  { w: 'unsustainable practices', s: 2, p: 'n', d: 'ways of doing things that cannot continue without long-term harm (collocation: perpetuate ~)' },
  { w: 'irreversible damage', s: 2, p: 'n', d: 'harm that cannot be undone (collocation: inflict ~ on ecosystems)' },
  { w: 'stringent regulations', s: 2, p: 'n', d: 'very strict rules or controls (collocation: enforce ~)' },
  { w: 'renewable alternatives', s: 2, p: 'n', d: 'energy sources that replace finite ones, e.g. solar/wind (collocation: transition to ~)' },
  { w: 'depletion', s: 2, p: 'n', d: 'the reduction of a resource by using it up (collocation: accelerate the ~ of resources)', f: ['deplete', 'depleted'] },
  { w: 'ecological footprint', s: 2, p: 'n', d: "the impact of human activity on the environment (collocation: minimize one's ~)" },
  { w: 'greenwashing', s: 2, p: 'n', d: 'making something appear more environmentally friendly than it really is (collocation: accuse a company of ~)' },

  { w: 'double-edged sword', s: 3, p: 'phr', d: 'something with both a beneficial and a harmful side (collocation: prove a ~)' },
  { w: 'digital divide', s: 3, p: 'n', d: 'the gap between those with and without good technology access (collocation: widen the ~)' },
  { w: 'automation', s: 3, p: 'n', d: 'the use of machines to do work previously done by people (collocation: render jobs obsolete through ~)', f: ['automate', 'automated'] },
  { w: 'data privacy', s: 3, p: 'n', d: "the right to control how one's personal information is used (collocation: compromise ~)" },
  { w: 'algorithmic bias', s: 3, p: 'n', d: 'unfair outcomes produced by a flawed automated system (collocation: perpetuate ~)' },
  { w: 'technological dependency', s: 3, p: 'n', d: 'over-reliance on devices or digital systems (collocation: foster ~)' },
  { w: 'disruptive innovation', s: 3, p: 'n', d: 'a new idea that fundamentally changes an existing market (collocation: usher in ~)' },
  { w: 'desensitize', s: 3, p: 'v', d: 'to make someone react less strongly to something over time (collocation: ~ users to violence)', alt: ['desensitise'] },

  { w: 'sedentary lifestyle', s: 4, p: 'n', d: 'a way of living with little physical activity (collocation: lead to a ~)' },
  { w: 'preventive healthcare', s: 4, p: 'n', d: 'medical care aimed at stopping illness before it starts (collocation: invest in ~)', alt: ['preventative healthcare'] },
  { w: 'epidemic proportions', s: 4, p: 'phr', d: 'a scale large enough to resemble a widespread disease outbreak (collocation: reach ~)' },
  { w: 'strain', s: 4, p: 'n', d: 'pressure or stress placed on a system (collocation: place a ~ on public health systems)' },
  { w: 'holistic wellbeing', s: 4, p: 'n', d: 'overall health covering physical, mental and social aspects (collocation: prioritize ~)' },
  { w: 'stigma', s: 4, p: 'n', d: 'a mark of social disgrace attached to a condition or group (collocation: perpetuate ~ around mental illness)' },
  { w: 'at the expense of', s: 4, p: 'phr', d: 'causing harm or loss to something else in the process (collocation: convenience ~ nutrition)' },

  { w: 'deterrent effect', s: 5, p: 'n', d: 'the power to discourage an action through fear of consequence (collocation: have a limited ~)' },
  { w: 'rehabilitation', s: 5, p: 'n', d: 'the process of restoring someone to a productive, law-abiding life (collocation: prioritize ~ over punishment)', f: ['rehabilitate'] },
  { w: 'recidivism', s: 5, p: 'n', d: 'the tendency of a convicted criminal to reoffend (collocation: reduce rates of ~)' },
  { w: 'root causes', s: 5, p: 'n', d: 'the fundamental, underlying reasons for a problem (collocation: address the ~ of crime)' },
  { w: 'miscarriage of justice', s: 5, p: 'phr', d: 'a failure of a legal system to deliver a fair outcome (collocation: risk a ~)' },
  { w: 'socioeconomic disparity', s: 5, p: 'n', d: 'inequality in income, wealth or social status (collocation: stem from ~)' },

  { w: 'erode', s: 6, p: 'v', d: 'to gradually wear away or weaken something (collocation: ~ national identity)', f: ['erosion'] },
  { w: 'homogenization of culture', s: 6, p: 'n', d: 'the process by which distinct cultures become similar (collocation: drive the ~)', alt: ['homogenisation of culture'] },
  { w: 'protectionist policies', s: 6, p: 'n', d: 'government measures that restrict imports to shield domestic industry (collocation: resort to ~)' },
  { w: 'regulatory oversight', s: 6, p: 'n', d: 'supervision by an official body to ensure rules are followed (collocation: tighten ~)' },
  { w: 'redistribute wealth', s: 6, p: 'v', d: 'to share income or assets more evenly across society (collocation: fail to ~ equitably)' },
  { w: 'grassroots movement', s: 6, p: 'n', d: 'a movement driven by ordinary people rather than leaders (collocation: galvanize a ~)' },
  { w: 'interdependence', s: 6, p: 'n', d: 'mutual reliance between two or more parties (collocation: foster global ~)' },

  { w: 'urban sprawl', s: 7, p: 'n', d: 'the uncontrolled expansion of a city into surrounding areas (collocation: contribute to ~)' },
  { w: 'gentrification', s: 7, p: 'n', d: 'the renovation of a poorer area that attracts wealthier residents and displaces the original ones (collocation: displace residents through ~)' },
  { w: 'infrastructure strain', s: 7, p: 'n', d: 'excess pressure placed on roads, housing, utilities etc. (collocation: place a ~ on infrastructure)' },
  { w: 'social cohesion', s: 7, p: 'n', d: 'the bonds that bring people in a society together (collocation: undermine ~)' },
  { w: 'nuclear family', s: 7, p: 'n', d: 'a family unit of parents and children only, without extended relatives (collocation: the decline of the ~)' },
  { w: 'intergenerational gap', s: 7, p: 'n', d: 'differences in values or understanding between age groups (collocation: widen the ~)' },
  { w: 'community cohesion', s: 7, p: 'n', d: 'the sense of belonging and mutual support within a local community (collocation: foster ~)' },

  { w: 'job security', s: 8, p: 'n', d: "confidence that one's employment will continue (collocation: sacrifice ~ for flexibility)" },
  { w: 'income disparity', s: 8, p: 'n', d: 'the gap in earnings between individuals or groups (collocation: exacerbate ~)' },
  { w: 'economic downturn', s: 8, p: 'n', d: 'a period of reduced economic activity or growth (collocation: weather an ~)' },
  { w: 'work-life balance', s: 8, p: 'n', d: 'the balance between time spent on a job and on personal life (collocation: erode ~)' },
  { w: 'skill mismatch', s: 8, p: 'n', d: 'a gap between the skills workers have and what employers need (collocation: result in a ~)' },
  { w: 'precarious employment', s: 8, p: 'n', d: 'insecure, unstable work with few protections (collocation: trap workers in ~)' },
]

export default vocabularyAdvanced
