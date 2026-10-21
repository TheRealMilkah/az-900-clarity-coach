import type { ExamTrapGroup } from '@/types';

export const EXAM_TRAPS: ExamTrapGroup[] = [
  {
    id: 'pricing-cost-tco',
    title: 'Azure Pricing Calculator vs Azure Cost Management vs TCO Calculator',
    summary:
      'All three deal with money, but they answer different questions: before you build, while you spend, and when comparing a move to the cloud.',
    items: [
      {
        name: 'Azure Pricing Calculator',
        whatItDoes:
          'Estimates the monthly cost of a planned set of Azure resources before you build them.',
        whenToUse:
          'Use it when designing a solution and you need a ballpark monthly price for chosen services.',
        examClue:
          'Look for "estimate the cost of a planned solution" or "before deploying".',
      },
      {
        name: 'Azure Cost Management',
        whatItDoes:
          'Shows what you have already spent, breaks it down, and lets you set budgets and spending alerts.',
        whenToUse:
          'Use it once resources are running and you need to monitor, report on, or control actual spend.',
        examClue:
          'Look for "review last month’s spending", "set budget alerts", or "track actual cost".',
      },
      {
        name: 'TCO Calculator',
        whatItDoes:
          'Compares the total cost of running a workload on-premises versus in Azure, factoring in hardware, power, and staffing.',
        whenToUse:
          'Use it to build a business case for moving from your own data centre to the cloud.',
        examClue:
          'Look for "compare on-premises vs cloud" or "justify a migration".',
      },
    ],
  },
  {
    id: 'network-access',
    title: 'Point-to-Site VPN vs Site-to-Site VPN vs ExpressRoute vs Azure Bastion',
    summary:
      'These all connect networks or people to Azure, but they differ in what they connect and over what kind of link.',
    items: [
      {
        name: 'Point-to-Site VPN',
        whatItDoes:
          'Connects a single device to an Azure virtual network over an encrypted tunnel through the public internet.',
        whenToUse:
          'Use it for a remote worker who needs to reach Azure resources from their laptop.',
        examClue: 'Look for "a single client" or "individual device".',
      },
      {
        name: 'Site-to-Site VPN',
        whatItDoes:
          'Connects an entire on-premises network to an Azure virtual network over an encrypted tunnel through the public internet.',
        whenToUse:
          'Use it when a whole office or data centre needs to reach Azure resources.',
        examClue: 'Look for "connect an on-premises network" or "branch office".',
      },
      {
        name: 'ExpressRoute',
        whatItDoes:
          'Provides a private, dedicated connection to Azure that does not travel over the public internet.',
        whenToUse:
          'Use it when you need reliable, low-latency, private connectivity with predictable performance.',
        examClue: 'Look for "private connection", "dedicated", or "does not go over the internet".',
      },
      {
        name: 'Azure Bastion',
        whatItDoes:
          'Lets you securely reach Azure virtual machines over RDP or SSH directly from the Azure portal, without exposing them to the public internet.',
        whenToUse:
          'Use it to log in to a VM securely without giving the VM a public IP address.',
        examClue: 'Look for "secure RDP/SSH" or "no public IP on the VM".',
      },
    ],
  },
  {
    id: 'aci-aks',
    title: 'Azure Container Instances (ACI) vs Azure Kubernetes Service (AKS)',
    summary:
      'Both run containers, but ACI is the simplest option for a quick task and AKS is for managing many containers at scale.',
    items: [
      {
        name: 'Azure Container Instances (ACI)',
        whatItDoes:
          'Runs a container directly in Azure without managing any servers or orchestrators.',
        whenToUse:
          'Use it for a single task, a quick job, or a simple app where you do not need scaling or orchestration.',
        examClue: 'Look for "simplest way to run a container" or "no orchestration needed".',
      },
      {
        name: 'Azure Kubernetes Service (AKS)',
        whatItDoes:
          'A managed Kubernetes service that runs and coordinates many containers, with scaling, updates, and self-healing.',
        whenToUse:
          'Use it when you have many containers that need to be scheduled, scaled, and managed together.',
        examClue: 'Look for "orchestration", "scale many containers", or "Kubernetes".',
      },
    ],
  },
  {
    id: 'nsg-ddos',
    title: 'Network Security Groups (NSGs) vs Azure DDoS Protection',
    summary:
      'Both protect networks, but at different layers and against different threats.',
    items: [
      {
        name: 'Network Security Groups (NSGs)',
        whatItDoes:
          'Filters traffic in and out of a subnet or network interface using allow/deny rules based on port, protocol, and source.',
        whenToUse:
          'Use it to control which traffic can reach specific resources, like only allowing HTTPS in.',
        examClue: 'Look for "filter traffic", "allow/deny rules", or "control ports".',
      },
      {
        name: 'Azure DDoS Protection',
        whatItDoes:
          'Detects and absorbs large-scale distributed denial-of-service attacks aimed at overwhelming your public endpoints.',
        whenToUse:
          'Use it to protect public-facing applications from being flooded with traffic from many sources.',
        examClue: 'Look for "protect against a flood of traffic" or "denial-of-service".',
      },
    ],
  },
  {
    id: 'rg-mg',
    title: 'Azure Resource Groups vs Management Groups',
    summary:
      'Both group things in Azure, but they group at very different levels.',
    items: [
      {
        name: 'Azure Resource Groups',
        whatItDoes:
          'Groups individual resources (like a VM, database, and storage account) that share a single lifecycle.',
        whenToUse:
          'Use it to deploy, manage, and delete the pieces of one application together.',
        examClue: 'Look for "resources that share a lifecycle" or "deploy and delete together".',
      },
      {
        name: 'Azure Management Groups',
        whatItDoes:
          'Groups subscriptions so you can apply policy and access rules across many of them at once.',
        whenToUse:
          'Use it to manage compliance and policy across a large estate of subscriptions.',
        examClue: 'Look for "manage multiple subscriptions" or "apply policy across subscriptions".',
      },
    ],
  },
  {
    id: 'locks-policy',
    title: 'Azure Resource Locks vs Azure Policy',
    summary:
      'Both prevent unwanted changes, but locks guard a specific resource while policy enforces rules across resources.',
    items: [
      {
        name: 'Azure Resource Locks',
        whatItDoes:
          'Applies a CanNotDelete or ReadOnly lock to a specific resource, regardless of the user’s permissions.',
        whenToUse:
          'Use it to stop accidental deletion or changes to a particular important resource.',
        examClue: 'Look for "accidental deletion" or "protect a single resource".',
      },
      {
        name: 'Azure Policy',
        whatItDoes:
          'Enforces rules across resources, like requiring a tag, restricting regions, or blocking certain resource types.',
        whenToUse:
          'Use it to keep resources compliant with organisational standards at scale.',
        examClue: 'Look for "enforce rules", "compliance", "allowed regions", or "required tags".',
      },
    ],
  },
  {
    id: 'avail-set-zone',
    title: 'Availability Sets vs Availability Zones',
    summary:
      'Both improve reliability, but they protect against different sizes of failure.',
    items: [
      {
        name: 'Availability Set',
        whatItDoes:
          'Places VMs across multiple fault domains (separate power/network racks) and update domains within a single data centre.',
        whenToUse:
          'Use it to protect against a rack or network failure within one data centre.',
        examClue: 'Look for "protect within a data centre" or "rack failure".',
      },
      {
        name: 'Availability Zone',
        whatItDoes:
          'Spreads resources across separate physical data centres within an Azure region, each with independent power and networking.',
        whenToUse:
          'Use it to protect against an entire data centre going down.',
        examClue: 'Look for "entire data centre" or "protect across data centres in a region".',
      },
    ],
  },
];
