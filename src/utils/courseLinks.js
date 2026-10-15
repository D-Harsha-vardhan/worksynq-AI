/**
 * Verified interactive course links for technology upskilling & certifications
 */
export function getCourseUrl(skill = '', courseName = '') {
  const s = (skill || '').toLowerCase();
  const c = (courseName || '').toLowerCase();

  // React & Frontend
  if (s.includes('react') || c.includes('react')) {
    return 'https://react.dev/learn';
  }
  
  // SQL & Databases
  if (s.includes('sql') || c.includes('sql') || s.includes('query')) {
    return 'https://sqlbolt.com/';
  }

  // Kubernetes & Cloud Native
  if (s.includes('kubernetes') || c.includes('kubernetes') || s.includes('k8s')) {
    return 'https://kubernetes.io/docs/tutorials/kubernetes-basics/';
  }

  // Python
  if (s.includes('python') || c.includes('python')) {
    return 'https://www.learnpython.org/';
  }

  // PostgreSQL
  if (s.includes('postgres') || c.includes('postgres')) {
    return 'https://www.postgresqltutorial.com/';
  }

  // Docker & Containers
  if (s.includes('docker') || c.includes('docker')) {
    return 'https://docs.docker.com/get-started/';
  }

  // Linux & System Administration
  if (s.includes('linux') || c.includes('linux')) {
    return 'https://linuxjourney.com/';
  }

  // REST API Design & Microservices
  if (s.includes('api') || c.includes('api')) {
    return 'https://restfulapi.net/';
  }

  // CI/CD & DevOps
  if (s.includes('ci/cd') || c.includes('ci/cd') || s.includes('devops')) {
    return 'https://www.redhat.com/en/topics/devops/what-is-ci-cd';
  }

  // Tableau & Business Intelligence
  if (s.includes('tableau') || c.includes('tableau')) {
    return 'https://www.tableau.com/learn/training';
  }

  // AWS & Cloud Architecture
  if (s.includes('aws') || c.includes('aws')) {
    return 'https://aws.amazon.com/training/';
  }

  // Node.js & Backend
  if (s.includes('node') || c.includes('node')) {
    return 'https://nodejs.org/en/learn';
  }

  // GraphQL
  if (s.includes('graphql') || c.includes('graphql')) {
    return 'https://graphql.org/learn/';
  }

  // Data Analytics
  if (s.includes('analytics') || c.includes('analytics')) {
    return 'https://www.coursera.org/learn/google-data-analytics';
  }

  // Data Engineering
  if (s.includes('data engineering') || c.includes('data engineering')) {
    return 'https://dataengineering.wiki/';
  }

  // MLOps
  if (s.includes('mlops') || c.includes('mlops')) {
    return 'https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops';
  }

  // NLP / Transformers
  if (s.includes('nlp') || c.includes('nlp') || c.includes('transformer')) {
    return 'https://huggingface.co/learn/nlp-course/';
  }

  // Pandas / Data Wrangling
  if (s.includes('pandas') || c.includes('pandas')) {
    return 'https://www.kaggle.com/learn/pandas';
  }

  // Kafka / Event Streaming
  if (s.includes('kafka') || c.includes('kafka')) {
    return 'https://developer.confluent.io/courses/apache-kafka-for-beginners/';
  }

  // HTML / CSS / Web Design
  if (s.includes('html') || s.includes('css') || c.includes('html')) {
    return 'https://www.freecodecamp.org/learn/2022/responsive-web-design/';
  }

  // Agile / Scrum
  if (s.includes('agile') || s.includes('scrum') || c.includes('scrum')) {
    return 'https://www.scrum.org/resources/what-is-scrum';
  }

  // Flutter & Mobile
  if (s.includes('flutter') || c.includes('flutter')) {
    return 'https://docs.flutter.dev/get-started/codelabs';
  }

  // Java & Spring Boot
  if (s.includes('spring') || s.includes('java') || c.includes('spring')) {
    return 'https://spring.io/guides/gs/spring-boot/';
  }

  // QA, Cypress & Testing
  if (s.includes('qa') || s.includes('cypress') || s.includes('testing')) {
    return 'https://docs.cypress.io/guides/overview/why-cypress';
  }

  // UI/UX Design & Figma
  if (s.includes('ui/ux') || s.includes('design') || s.includes('figma')) {
    return 'https://www.figma.com/resource-library/';
  }

  // Cybersecurity
  if (s.includes('security') || s.includes('cyber')) {
    return 'https://www.coursera.org/learn/intro-cyber-security';
  }

  // Fallback to targeted search on Coursera / FreeCodeCamp
  return `https://www.coursera.org/search?query=${encodeURIComponent(courseName || skill)}`;
}
