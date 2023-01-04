

export function BugPreview({bug}) {
    const demoImages = 
        {
          'critical': '❗️',
          'need-CR': '❗️',
          'dev-branch': '❗️',
          'high': '⚠️',
          'low': '✅',
          'database': '🗄️',
          'shopping-cart': '🛒',
          'image': '🖼️',
          'font': '📝',
          'ux': '🎨',
          'checkout': '💳',
          'login': '🔑',
          'form': '📃',
          'spelling': '📝',
          'spacing': '⏭️',
          'button': '🔘',
          'registration': '📝',
          'navigation': '🗺️',
          'link': '🔗',
          'resource': '📂',
        }
    return <section>
        <h4>{bug.title}</h4>
        <h1>{bug.labels.map(label=> demoImages[label])}</h1>
        <p>Severity: <span>{bug.severity}</span></p>
    </section>
}