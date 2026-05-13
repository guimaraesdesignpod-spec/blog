export interface FAQItem {
  question: string
  answer: string
}

export interface HowToStep {
  name: string
  text: string
  image?: string
}

export interface HowToSchema {
  name: string
  description?: string
  totalTime?: string
  steps: HowToStep[]
}
