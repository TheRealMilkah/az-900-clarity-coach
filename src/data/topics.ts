import type { Topic } from '@/types';

export const TOPICS: Topic[] = [
  // ── Original three AZ-900 domains ──────────────────────────────
  {
    id: 'cloud-concepts',
    name: 'Describe cloud concepts',
    shortName: 'Cloud Concepts',
    description:
      'The core ideas behind cloud computing: what the cloud is, the different service and deployment models, and how consumption-based pricing works.',
    icon: 'cloud',
  },
  {
    id: 'azure-architecture',
    name: 'Describe Azure architecture and services',
    shortName: 'Azure Architecture',
    description:
      'The building blocks of Azure: regions, availability zones, resource groups, core compute, storage, networking, and identity services.',
    icon: 'layers',
  },
  {
    id: 'azure-management',
    name: 'Describe Azure management and governance',
    shortName: 'Management & Governance',
    description:
      'How you keep Azure under control: cost management, policy, monitoring, resource locks, the Well-Architected Framework, and tools like the CLI and portal.',
    icon: 'shield',
  },
  // ── Expanded topics from the audited question bank ─────────────
  {
    id: 'compute',
    name: 'Azure compute services',
    shortName: 'Compute',
    description:
      'VMs, App Service, Container Instances, AKS, and Azure Functions — choosing the right compute option for each workload.',
    icon: 'compute',
  },
  {
    id: 'networking',
    name: 'Azure networking',
    shortName: 'Networking',
    description:
      'NSGs, Azure Firewall, DDoS Protection, Bastion, VPN types, ExpressRoute, and VNet Peering — connecting and protecting your Azure networks.',
    icon: 'network',
  },
  {
    id: 'governance',
    name: 'Azure governance',
    shortName: 'Governance',
    description:
      'Azure Policy, RBAC, resource locks, management groups, and resource groups — keeping your Azure environment compliant and organised.',
    icon: 'governance',
  },
  {
    id: 'pricing',
    name: 'Azure pricing and cost management',
    shortName: 'Pricing',
    description:
      'Pricing Calculator, TCO Calculator, Cost Management, and Azure Advisor — planning, comparing, and controlling your cloud spend.',
    icon: 'pricing',
  },
  {
    id: 'availability',
    name: 'Azure availability and resilience',
    shortName: 'Availability',
    description:
      'Availability Sets, Availability Zones, region pairs, and scale sets — protecting your workloads from failures at every level.',
    icon: 'availability',
  },
  {
    id: 'storage',
    name: 'Azure storage',
    shortName: 'Storage',
    description:
      'Storage tiers (Hot, Cool, Archive), redundancy options (LRS, ZRS, GRS, GZRS), and choosing the right storage for your data.',
    icon: 'storage',
  },
  {
    id: 'security',
    name: 'Azure security',
    shortName: 'Security',
    description:
      'Key Vault, Entra ID Conditional Access, Defender for Cloud, Sentinel, and secure data access — protecting your Azure resources and identities.',
    icon: 'security',
  },
  {
    id: 'databases',
    name: 'Azure databases',
    shortName: 'Databases',
    description:
      'Azure SQL Database, Cosmos DB, and choosing between PaaS managed databases and IaaS VM-based databases.',
    icon: 'database',
  },
  {
    id: 'analytics',
    name: 'Azure analytics',
    shortName: 'Analytics',
    description:
      'HDInsight and big data analytics services for processing large datasets on demand.',
    icon: 'analytics',
  },
  {
    id: 'monitoring',
    name: 'Azure monitoring',
    shortName: 'Monitoring',
    description:
      'Azure Monitor, Log Analytics, Service Health, and Workbooks — tracking the health of your applications and the Azure platform.',
    icon: 'monitor',
  },
  {
    id: 'iac',
    name: 'Infrastructure as Code',
    shortName: 'IaC',
    description:
      'ARM templates and Bicep — deploying repeatable infrastructure using code instead of manual portal clicks.',
    icon: 'iac',
  },
  {
    id: 'support',
    name: 'Azure support plans',
    shortName: 'Support',
    description:
      'Basic, Developer, Standard, and Professional Direct support plans — choosing the right level of support for your needs.',
    icon: 'support',
  },
  {
    id: 'compliance',
    name: 'Azure compliance and trust',
    shortName: 'Compliance',
    description:
      'Microsoft Service Trust Portal, compliance reports, and how Azure meets industry standards like ISO 27001.',
    icon: 'compliance',
  },
];

export const TOPIC_MAP: Record<string, Topic> = Object.fromEntries(
  TOPICS.map((t) => [t.id, t]),
);
