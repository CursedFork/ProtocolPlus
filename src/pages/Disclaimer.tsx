import { motion } from 'framer-motion'
import { AlertTriangle, Shield, BookOpen, FlaskConical, TrendingUp, UserCheck } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/shared/Card'

const sections = [
  {
    icon: Shield,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 border-red-500/30',
    title: 'Not Medical Advice',
    content:
      'This application — Protocol+ — is provided for informational and educational purposes only. Nothing in this application constitutes medical advice, diagnosis, or treatment. The content is not intended to replace professional medical consultation. Always consult a qualified healthcare provider before making any changes to your diet, exercise program, or supplement regimen.',
  },
  {
    icon: UserCheck,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/30',
    title: 'Consult a Physician',
    content:
      'Before beginning any new fitness or nutrition program, consult your doctor or a qualified healthcare professional — especially if you have pre-existing conditions, take medications, are pregnant or nursing, or have a history of eating disorders, cardiovascular disease, or musculoskeletal injuries. What is appropriate for one person may be contraindicated for another.',
  },
  {
    icon: TrendingUp,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10 border-yellow-500/30',
    title: 'Individual Results Vary',
    content:
      'Results from diet, exercise, and supplement use vary significantly between individuals due to genetics, age, starting point, consistency, sleep, stress, and many other factors. No outcome is guaranteed. Comparisons to others or to idealized results can be misleading and counterproductive. Progress is individual and non-linear.',
  },
  {
    icon: FlaskConical,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10 border-purple-500/30',
    title: 'Supplements Carry Real Risks',
    content:
      'Dietary supplements are not regulated with the same rigor as pharmaceutical drugs in most countries. Products can be mislabeled, contaminated, or interact with medications. The fact that a supplement is "natural" does not mean it is safe. Some supplements have documented risks of liver damage, cardiovascular events, or hormonal disruption at high doses. The Supplement Hub in this application is for research purposes only — it does not constitute endorsement of any product.',
  },
  {
    icon: BookOpen,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10 border-green-500/30',
    title: 'Research Evolves Over Time',
    content:
      'Nutritional science and sports medicine are rapidly evolving fields. What is considered best practice today may be revised or contradicted by future research. The information in this application reflects publicly available research at the time of writing. New evidence may emerge that changes these recommendations. We encourage users to stay informed and maintain a healthy skepticism toward any single source of information — including this one.',
  },
  {
    icon: AlertTriangle,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10 border-orange-500/30',
    title: 'Exercise Safety',
    content:
      'Improper exercise technique can cause serious injury. The workout plans in this application are general templates and may not account for your specific physical limitations. Learn proper form before adding load. Stop any exercise that causes sharp or unusual pain — this is different from normal muscle fatigue. Working with a certified personal trainer, at least initially, is strongly recommended.',
  },
]

export default function Disclaimer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5 max-w-3xl"
    >
      {/* Hero */}
      <Card className="border-red-500/40 bg-red-500/5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <Shield className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Important Disclaimer</h2>
            <p className="text-sm text-red-300/90 leading-relaxed font-medium">
              Please read this disclaimer carefully before using Protocol+. By using this application, you acknowledge
              and agree to all the terms stated below.
            </p>
          </div>
        </div>
      </Card>

      {/* Core statement */}
      <Card className="border-border">
        <div className="text-center py-4">
          <p className="text-lg font-bold text-foreground mb-2">
            "This application is not medical advice and is for informational purposes only."
          </p>
          <p className="text-sm text-muted-foreground">
            Always consult a qualified healthcare professional before making significant changes to your health routine.
          </p>
        </div>
      </Card>

      {/* Sections */}
      <div className="space-y-3">
        {sections.map(({ icon: Icon, color, bgColor, title, content }) => (
          <Card key={title} className={`border ${bgColor}`}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${color} flex-shrink-0`} />
                <CardTitle className={`text-sm ${color}`}>{title}</CardTitle>
              </div>
            </CardHeader>
            <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
          </Card>
        ))}
      </div>

      {/* Version note */}
      <Card className="border-border">
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          Protocol+ is a personal productivity application. It does not store medical records, transmit health data, or
          provide personalized medical recommendations. All data is stored locally on your device. The application
          author is not a medical professional, registered dietitian, or certified personal trainer.
        </p>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Questions or concerns? Consult a professional who knows your individual situation.
        </p>
      </Card>
    </motion.div>
  )
}
