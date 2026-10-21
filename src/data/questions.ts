import type { PracticeQuestion } from '@/types';
import { CONVERTED_QUESTIONS } from '@/data/convertedQuestions';

const EXISTING_QUESTIONS: PracticeQuestion[] = [
  // ── Cloud Concepts ──────────────────────────────────────────────
  {
    id: 'q-cloud-capex-opex',
    topicId: 'cloud-concepts',
    prompt:
      'A company wants to move from buying physical servers upfront to paying only for the computing power they actually use each month. Which cloud benefit does this describe?',
    options: [
      {
        id: 'a',
        text: 'High availability',
        whyIncorrect: 'High availability is about keeping services running with little downtime, not about how you pay for the hardware.',
        distractor: {
          whatItMeans: 'High availability means a system is designed to stay up and running with minimal downtime, often by using redundant components.',
          whyItMaySeemRight: 'High availability is a well-known cloud benefit, so it is a plausible choice when the question asks about a cloud benefit.',
          whyNotHere: 'The question is specifically about the payment model — moving from an upfront purchase to paying for what is used — not about uptime or redundancy.',
          whenItWouldFit: 'A question mentioning uptime percentages, service-level agreements, or keeping a service running during failures.',
        },
      },
      {
        id: 'b',
        text: 'Scalability',
        whyIncorrect: 'Scalability is about adding or removing resources to match demand, not about the payment model.',
        distractor: {
          whatItMeans: 'Scalability is the ability to increase or decrease resources (such as adding more servers) to handle changing load.',
          whyItMaySeemRight: 'Scalability is another core cloud benefit, and the question mentions adjusting compute levels, which sounds related to scaling.',
          whyNotHere: 'The question focuses on how the company pays — moving away from an upfront purchase — not on adjusting capacity to match demand.',
          whenItWouldFit: 'A question about adding more VMs to handle more users, or growing storage as data increases.',
        },
      },
      {
        id: 'c',
        text: 'Consumption-based pricing',
        whyIncorrect: '',
      },
      {
        id: 'd',
        text: 'Elasticity',
        whyIncorrect: 'Elasticity is about automatically growing or shrinking resources as demand changes, not about the billing model.',
        distractor: {
          whatItMeans: 'Elasticity is the ability to automatically add or remove resources in real time as demand rises and falls.',
          whyItMaySeemRight: 'Elasticity is related to paying for what you use because elastic systems add and remove resources, which affects cost.',
          whyNotHere: 'The question is about the billing approach (paying for what you use vs buying upfront), not about the automatic scaling of resources. Elasticity is about capacity adjustment; consumption-based pricing is about how that capacity is billed.',
          whenItWouldFit: 'A question describing traffic spikes where servers are added automatically and removed when traffic drops.',
        },
      },
    ],
    correctOptionId: 'c',
    explanation: {
      simpleTerms:
        'Consumption-based pricing means you pay for the resources you actually use, when you use them — no large upfront investment. This is the opposite of buying physical hardware as a capital expense. The key distinction: consumption-based pricing is about HOW you are billed (per use), while scalability and elasticity are about HOW resources adjust to demand.',
      realLifeExample:
        'A Nairobi fintech startup uses Azure to host its mobile money API. Instead of buying ten servers for KES 5 million upfront, it pays only for the compute hours its users consume each month — more during payday peaks, less at night.',
    },
    signal: {
      phrase: 'paying only for the computing power they actually use each month',
      suggests:
        'The phrase "paying only for what they actually use" describes a consumption-based model. The key contrast in the question is "move from buying upfront" to "paying for what is used", which is the shift from CapEx to OpEx that consumption-based pricing enables.',
      steps: [
        {
          phrase: 'move from buying physical servers upfront',
          reasoning: 'Ask: "What is the company moving away from?" Buying servers upfront is a capital expense (CapEx) — a one-time investment in owned hardware.',
        },
        {
          phrase: 'paying only for the computing power they actually use each month',
          reasoning: 'Ask: "What is the company moving to?" Paying for what you use, when you use it, is a consumption-based model. This eliminates the upfront cost and turns it into an operational expense (OpEx).',
        },
      ],
      conclusion:
        'The shift from buying upfront to paying for what is used is the definition of consumption-based pricing. Scalability and elasticity are about capacity, not billing.',
    },
  },
  {
    id: 'q-cloud-shared-responsibility',
    topicId: 'cloud-concepts',
    prompt:
      'In the shared responsibility model, which of the following is always the responsibility of the cloud provider in a Platform as a Service (PaaS) deployment?',
    options: [
      {
        id: 'a',
        text: 'Configuring access to the application data',
        whyIncorrect: 'The customer controls its application and data, so configuring access to application data remains the customer\u2019s responsibility.',
        distractor: {
          whatItMeans: 'Configuring data access means deciding which users or roles can read or modify application data.',
          whyItMaySeemRight: 'Data access is an important cloud security responsibility, so it is a plausible choice for a responsibility question.',
          whyNotHere: 'The question asks what is ALWAYS the cloud provider\u2019s responsibility in PaaS. In this question, configuring access to application data remains the customer\u2019s responsibility because the customer controls its application and data.',
          whenItWouldFit: 'A question asking what the customer controls in a PaaS application, or about customer-side security responsibilities.',
        },
      },
      {
        id: 'b',
        text: 'Managing user identities and sign-in',
        whyIncorrect: 'Customer identities and application-level sign-in are managed by the customer, not the provider.',
        distractor: {
          whatItMeans: 'Managing identities means controlling user accounts, passwords, and who can sign in to the application.',
          whyItMaySeemRight: 'Identity management sounds like it could be a platform-level concern, especially in PaaS where the provider manages the platform.',
          whyNotHere: 'The provider manages the platform infrastructure, but the customer\u2019s user directory and app-level sign-in remain the customer\u2019s responsibility. The question asks what is always the provider\u2019s job.',
          whenItWouldFit: 'A question about customer-managed identities, authentication, or application access in PaaS or SaaS.',
        },
      },
      {
        id: 'c',
        text: 'Operating system updates and patching',
        whyIncorrect: '',
      },
      {
        id: 'd',
        text: 'Choosing which data the application stores',
        whyIncorrect: 'The data the application stores is a customer decision, not a provider one.',
        distractor: {
          whatItMeans: 'Deciding what data to store means choosing the data types, structure, and content the application persists.',
          whyItMaySeemRight: 'Data storage sounds like it could be part of the platform, especially in PaaS where the provider manages the database engine.',
          whyNotHere: 'The provider runs the platform but does not decide what data the customer\u2019s application stores. The customer controls its own data decisions. The question asks what is always the provider\u2019s responsibility.',
          whenItWouldFit: 'A question about customer control over application data, data classification, or data ownership.',
        },
      },
    ],
    correctOptionId: 'c',
    explanation: {
      simpleTerms:
        'In PaaS, the provider runs the underlying platform — including the operating system — so they handle OS updates and patching. The customer brings the application and the data. The responsibility boundary shifts depending on the model: in IaaS the customer patches the OS; in PaaS the provider patches the OS; in SaaS the provider manages even more of the stack. In all three models, the customer retains responsibility for its own data and access decisions, but the exact scope depends on the specific service.',
      realLifeExample:
        'An Accra software company deploys a web app to Azure App Service (PaaS). Microsoft handles Windows Server updates and security patches behind the scenes. The company only manages its code, its data, and who can access the app. If they had run the same app on a VM (IaaS), they would also have to patch the OS themselves.',
    },
    signal: {
      phrase: 'Platform as a Service (PaaS)',
      suggests:
        'PaaS tells you the provider manages the platform layer, including the operating system.',
      steps: [
        {
          phrase: 'PaaS',
          reasoning: 'Ask: "What layer does the provider manage for me in PaaS?" In PaaS, the provider manages the underlying platform, including the operating system. This is the key shift from IaaS, where the customer patches the OS.',
        },
        {
          phrase: 'always the responsibility of the cloud provider',
          reasoning: 'Now eliminate responsibilities that remain with the customer. The customer controls its application, its data, and access decisions. Eliminate options A, B, and D because they involve the customer\u2019s application, identities, or data.',
        },
      ],
      conclusion:
        'The responsibility that moves from the customer to the provider when moving from IaaS to PaaS is operating system updates and patching.',
    },
  },
  {
    id: 'q-cloud-public-private',
    topicId: 'cloud-concepts',
    prompt:
      'An organisation runs its own data centres and makes its cloud available only to its own departments, not to the general public. Which cloud model is this?',
    options: [
      {
        id: 'a',
        text: 'Public cloud',
        whyIncorrect: 'A public cloud is shared by many organisations and served over the public internet — not restricted to one organisation.',
        distractor: {
          whatItMeans: 'A public cloud is owned by a provider and shared over the internet by many organisations simultaneously.',
          whyItMaySeemRight: 'Public cloud is the most common cloud model, so it is the first one many learners think of.',
          whyNotHere: 'The question says the cloud is available "only to its own departments" — that is the opposite of a shared public cloud.',
          whenItWouldFit: 'A question describing resources hosted by a provider like Azure or AWS and accessed by many customers over the internet.',
        },
      },
      {
        id: 'b',
        text: 'Private cloud',
        whyIncorrect: '',
      },
      {
        id: 'c',
        text: 'Hybrid cloud',
        whyIncorrect: 'A hybrid cloud combines a public and a private cloud working together. This scenario describes only a single private deployment.',
        distractor: {
          whatItMeans: 'A hybrid cloud links a public cloud and a private cloud so data and workloads can move between them.',
          whyItMaySeemRight: 'The question mentions "own data centres", which sounds like it could be part of a hybrid setup.',
          whyNotHere: 'The question describes only one environment used by one organisation — there is no public cloud component mentioned, so it is not hybrid.',
          whenItWouldFit: 'A question where a company keeps some workloads on-premises and others in a public cloud, with them working together.',
        },
      },
      {
        id: 'd',
        text: 'Multi-cloud',
        whyIncorrect: 'Multi-cloud means using several public cloud providers together. This is a single private setup.',
        distractor: {
          whatItMeans: 'Multi-cloud means using two or more public cloud providers (such as Azure and AWS) for different workloads.',
          whyItMaySeemRight: 'Multi-cloud involves multiple environments, and the question describes data centres that could be in multiple locations.',
          whyNotHere: 'The question describes a single organisation using its own data centres — not multiple public cloud providers.',
          whenItWouldFit: 'A question about an organisation using Azure for some apps and AWS for others.',
        },
      },
    ],
    correctOptionId: 'b',
    explanation: {
      simpleTerms:
        'A private cloud is cloud infrastructure used by only one organisation. It can sit in the organisation\u2019s own data centre or be hosted by a third party, but it is not shared with other organisations or the public. The key distinction: a public cloud is shared by many organisations; a private cloud serves one; a hybrid cloud combines the two.',
      realLifeExample:
        'A Cape Town media company runs its own data centres for its streaming platform. Only the company\u2019s internal production and editing teams can use those compute resources — no outside organisation shares them. That is a private cloud.',
    },
    signal: {
      phrase: 'only to its own departments, not to the general public',
      suggests:
        'The phrase "not to the general public" distinguishes a private cloud from a public cloud.',
      steps: [
        {
          phrase: 'runs its own data centres',
          reasoning: 'Ask: "Who owns the infrastructure?" The organisation runs its own data centres, meaning it owns and controls the underlying hardware.',
        },
        {
          phrase: 'only to its own departments, not to the general public',
          reasoning: 'Ask: "Who can use it?" Access is limited to the organisation\u2019s own departments — not shared with other organisations. This eliminates a public cloud. There is no public cloud component mentioned, so it is not hybrid either.',
        },
      ],
      conclusion:
        'A cloud that serves only one organisation, hosted in its own data centres, is a private cloud.',
    },
  },
  {
    id: 'q-cloud-iaas-responsibility',
    topicId: 'cloud-concepts',
    prompt:
      'A company uses Infrastructure as a Service (IaaS) to run virtual machines in Azure. Which task remains the customer\u2019s responsibility under the shared responsibility model?',
    options: [
      {
        id: 'a',
        text: 'Maintaining the physical server hardware',
        whyIncorrect: 'In IaaS the provider owns and maintains the physical hardware and networking infrastructure.',
        distractor: {
          whatItMeans: 'Maintaining physical hardware means fixing servers, replacing disks, and keeping the data centre equipment running.',
          whyItMaySeemRight: 'Since the customer runs VMs on physical servers, it might seem like the customer should maintain them.',
          whyNotHere: 'In IaaS the provider owns the physical machines — the customer never touches them. The question asks what remains the customer\u2019s responsibility.',
          whenItWouldFit: 'A question about the provider\u2019s responsibilities in any cloud model.',
        },
      },
      {
        id: 'b',
        text: 'Patching the guest operating system',
        whyIncorrect: '',
      },
      {
        id: 'c',
        text: 'Powering and cooling the data centre',
        whyIncorrect: 'The data centre facility — power, cooling, and networking — is the provider\u2019s responsibility.',
        distractor: {
          whatItMeans: 'Powering and cooling means keeping the data centre running with electricity, air conditioning, and physical security.',
          whyItMaySeemRight: 'Since the customer runs workloads in the data centre, it might seem like the customer shares facility costs.',
          whyNotHere: 'The data centre facility is the provider\u2019s responsibility in all cloud models, including IaaS. The question asks what the customer manages.',
          whenItWouldFit: 'A question about which facility-level tasks the provider handles.',
        },
      },
      {
        id: 'd',
        text: 'Providing the underlying virtualisation platform',
        whyIncorrect: 'The hypervisor and virtualisation layer are managed by the provider, not the customer.',
        distractor: {
          whatItMeans: 'The virtualisation platform (the hypervisor) creates and runs the virtual machines that the customer uses.',
          whyItMaySeemRight: 'Since the customer uses VMs, it might seem like the customer manages the virtualisation layer that creates them.',
          whyNotHere: 'The provider manages the hypervisor in IaaS — the customer only manages what runs inside their VMs. The question asks what the customer is responsible for.',
          whenItWouldFit: 'A question about provider responsibilities in IaaS or PaaS.',
        },
      },
    ],
    correctOptionId: 'b',
    explanation: {
      simpleTerms:
        'In IaaS, the provider runs the physical hardware, networking, and virtualisation. The customer is responsible for everything inside the virtual machine: the operating system, middleware, applications, and data. The responsibility boundary shifts by model: in IaaS the customer patches the OS; in PaaS the provider patches the OS; in SaaS the provider manages even more. In all models, the provider handles the physical data centre, hardware, and virtualisation.',
      realLifeExample:
        'A Kigali logistics startup rents Azure VMs to run its delivery tracking software. Microsoft keeps the physical servers, power, and network running, but the startup\u2019s IT team installs Ubuntu, applies security patches, and configures the firewall rules on each VM themselves. If they moved to a PaaS web app service, Microsoft would also handle the OS patching.',
    },
    signal: {
      phrase: 'Infrastructure as a Service (IaaS)',
      suggests:
        'IaaS tells you the provider manages the infrastructure layer (hardware and virtualisation), and the customer manages everything above it.',
      steps: [
        {
          phrase: 'IaaS',
          reasoning: 'Ask: "What does the provider manage, and what do I manage?" In IaaS, the provider manages physical hardware, networking, and virtualisation. The customer manages the operating system and everything above it.',
        },
        {
          phrase: 'remains the customer\u2019s responsibility',
          reasoning: 'Now eliminate tasks the provider handles: physical hardware (A), data centre facilities (C), and virtualisation (D) are all the provider\u2019s job. That leaves the guest operating system, which the customer must patch and maintain.',
        },
      ],
      conclusion:
        'In IaaS, the customer manages the operating system and above. Patching the guest OS is the customer\u2019s responsibility — this is the key difference from PaaS, where the provider patches the OS.',
    },
  },
  {
    id: 'q-cloud-elasticity',
    topicId: 'cloud-concepts',
    prompt:
      'An e-commerce site sees a sharp traffic spike during a sale and needs extra servers added automatically, then removed when traffic settles. Which cloud characteristic best describes this?',
    options: [
      {
        id: 'a',
        text: 'Scalability',
        whyIncorrect: 'Scalability is the ability to add resources to handle growth, but it does not emphasise automatic removal when demand drops.',
        distractor: {
          whatItMeans: 'Scalability is the ability to increase (or decrease) resources to handle a changing workload. It can be manual or automatic.',
          whyItMaySeemRight: 'The question mentions adding extra servers, which is exactly what scalability does. Both scalability and elasticity involve adding resources.',
          whyNotHere: 'The question emphasises both adding AND removing automatically in response to demand. Scalability focuses on the ability to grow; the automatic two-way adjustment (grow and shrink) is what distinguishes elasticity. A system can be scalable without being elastic if a person decides when to add or remove resources.',
          whenItWouldFit: 'A question about growing capacity to handle more users, especially when it mentions scaling up or out without the automatic add-and-remove cycle.',
        },
      },
      {
        id: 'b',
        text: 'Agility',
        whyIncorrect: 'Agility is about provisioning resources quickly, not about automatically matching supply to changing demand.',
        distractor: {
          whatItMeans: 'Agility is the ability to provision and deploy resources quickly, often in minutes rather than weeks.',
          whyItMaySeemRight: 'The question describes servers being added quickly during a spike, which sounds like fast provisioning.',
          whyNotHere: 'The question is about resources being added and removed automatically in response to demand, not about the speed of provisioning. Agility is about how fast you can deploy, not about automatic capacity matching.',
          whenItWouldFit: 'A question about how quickly you can spin up a new VM or deploy a new service.',
        },
      },
      {
        id: 'c',
        text: 'Elasticity',
        whyIncorrect: '',
      },
      {
        id: 'd',
        text: 'Reliability',
        whyIncorrect: 'Reliability is about the system recovering from failures and staying up, not about adjusting capacity with demand.',
        distractor: {
          whatItMeans: 'Reliability is the ability of a system to recover from failures and continue functioning.',
          whyItMaySeemRight: 'The question describes keeping the site running during a traffic spike, which sounds like reliability.',
          whyNotHere: 'The question describes capacity adjustment (adding and removing servers), not failure recovery. Reliability is about resilience against failures, not about matching resources to demand.',
          whenItWouldFit: 'A question about a system recovering from a crash or maintaining uptime during disruptions.',
        },
      },
    ],
    correctOptionId: 'c',
    explanation: {
      simpleTerms:
        'Elasticity is the ability to automatically add resources when demand rises and remove them when it falls. The key difference from scalability: scalability is about the ability to grow (or shrink) resources; elasticity is about the automatic, two-way adjustment in response to real-time demand. A system can be scalable without being elastic — if a human decides when to add or remove resources, it is scalable but not elastic.',
      realLifeExample:
        'A Lagos e-commerce platform runs a Black Friday sale. Azure detects a surge in traffic and automatically scales out from 2 to 8 web servers. After the sale ends and traffic drops, it scales back down to 2 — the company only pays for the extra servers during the sale hours.',
    },
    signal: {
      phrase: 'added automatically, then removed when traffic settles',
      suggests:
        'The phrase "added automatically, then removed" captures the two-way, automatic nature of elasticity.',
      steps: [
        {
          phrase: 'extra servers added automatically',
          reasoning: 'Ask: "Is this about growing capacity, or about automatic adjustment?" Adding servers is part of scalability too — but the word "automatically" suggests the system adjusts on its own.',
        },
        {
          phrase: 'then removed when traffic settles',
          reasoning: 'Ask: "Does the system also shrink?" The removal of servers when traffic drops is the second half of the cycle. Scalability can include growing or shrinking, but the automatic add-and-remove in response to real-time demand is what makes this elasticity.',
        },
      ],
      conclusion:
        'The automatic add-and-remove cycle in response to demand is the defining feature of elasticity. If the question only described growing capacity (without the automatic removal), scalability would be the better answer.',
    },
  },
  {
    id: 'q-cloud-capex',
    topicId: 'cloud-concepts',
    prompt:
      'A business buys 20 physical servers for its on-premises data centre as a one-time purchase. How is this spending best categorised?',
    options: [
      {
        id: 'a',
        text: 'Operational expenditure (OpEx)',
        whyIncorrect: 'OpEx is ongoing spending for services as you use them, like a monthly cloud bill. A one-time hardware purchase is not OpEx.',
        distractor: {
          whatItMeans: 'OpEx is spending money on services as you consume them — typically recurring, usage-based costs with no upfront investment.',
          whyItMaySeemRight: 'Servers are used for operations, so "operational expenditure" sounds like it could describe buying servers.',
          whyNotHere: 'The question describes a one-time purchase of physical equipment, which is an upfront investment in an owned asset, not an ongoing service fee. OpEx is about ongoing consumption, not asset purchases.',
          whenItWouldFit: 'A question about paying a monthly cloud bill or paying per hour for a virtual machine.',
        },
      },
      {
        id: 'b',
        text: 'Capital expenditure (CapEx)',
        whyIncorrect: '',
      },
      {
        id: 'c',
        text: 'Consumption-based cost',
        whyIncorrect: 'Consumption-based cost is pay-as-you-go billing tied to usage, the opposite of buying assets upfront.',
        distractor: {
          whatItMeans: 'Consumption-based cost means you are billed for exactly the resources you use, when you use them.',
          whyItMaySeemRight: 'The servers will be used to run workloads, so the cost could seem usage-related.',
          whyNotHere: 'The question describes buying hardware outright as a one-time purchase, not paying per use. Consumption-based cost varies with usage; this is a fixed upfront purchase.',
          whenItWouldFit: 'A question about a cloud bill that varies month to month based on usage.',
        },
      },
      {
        id: 'd',
        text: 'Sunk maintenance fee',
        whyIncorrect: 'Maintenance fees are ongoing service costs, not the initial purchase of assets. The question describes buying equipment.',
        distractor: {
          whatItMeans: 'A maintenance fee is an ongoing cost for keeping equipment or services running after purchase.',
          whyItMaySeemRight: 'Buying servers involves maintenance, so a "maintenance fee" might seem relevant.',
          whyNotHere: 'The question describes the initial purchase of servers, not an ongoing maintenance contract. The spending is for acquiring assets, not for servicing them.',
          whenItWouldFit: 'A question about annual support contracts or recurring service fees.',
        },
      },
    ],
    correctOptionId: 'b',
    explanation: {
      simpleTerms:
        'Capital expenditure (CapEx) is spending money upfront on physical assets you own, like servers, buildings, or vehicles. It is a one-time investment that depreciates over time. This is the opposite of OpEx, which is ongoing, usage-based spending with no upfront cost. The key distinction: CapEx is buying an asset you own; OpEx is paying for a service you consume.',
      realLifeExample:
        'An Accra manufacturing company buys 20 servers for GHS 800,000 to build an on-premises data centre. That upfront purchase is CapEx — the company owns the hardware. If they had instead rented virtual machines from Azure for GHS 15,000 per month, that would be OpEx — ongoing usage-based spending with no owned hardware.',
    },
    signal: {
      phrase: 'one-time purchase',
      suggests:
        'The phrase "one-time purchase" of physical equipment signals CapEx.',
      steps: [
        {
          phrase: 'buys 20 physical servers',
          reasoning: 'Ask: "Is the company buying an asset or paying for a service?" Buying physical servers means acquiring owned hardware — that is a capital investment.',
        },
        {
          phrase: 'one-time purchase',
          reasoning: 'Ask: "Is this spending recurring or upfront?" A one-time purchase of an asset is CapEx. Ongoing, pay-as-you-go spending would be OpEx.',
        },
      ],
      conclusion:
        'A one-time purchase of physical equipment that the company owns is capital expenditure (CapEx). The question also says "on-premises data centre", reinforcing that the company owns the hardware.',
    },
  },

  // ── Azure Architecture and Services ─────────────────────────────
  {
    id: 'q-arch-availability-zones',
    topicId: 'azure-architecture',
    prompt:
      'An application must keep running even if an entire data centre fails. Which Azure feature is designed to protect against a single data centre outage?',
    options: [
      {
        id: 'a',
        text: 'An Availability Set',
        whyIncorrect: 'An Availability Set protects against a rack or server failure within a single data centre, not the whole data centre going down.',
        distractor: {
          whatItMeans: 'An Availability Set spreads VMs across multiple fault domains (separate power and network racks) and update domains within a single data centre.',
          whyItMaySeemRight: 'Both Availability Sets and Availability Zones are about availability, so they are easy to confuse. Both protect against failures.',
          whyNotHere: 'The question says "entire data centre fails" — all fault domains in an Availability Set are within one data centre, so a data centre failure takes them all down. Availability Sets protect at the rack level, not the data centre level.',
          whenItWouldFit: 'A question about protecting against a rack failure or a server reboot during updates, within one data centre.',
        },
      },
      {
        id: 'b',
        text: 'An Availability Zone',
        whyIncorrect: '',
      },
      {
        id: 'c',
        text: 'A resource group',
        whyIncorrect: 'A resource group is a container for managing resources together; it has nothing to do with data centre failure protection.',
        distractor: {
          whatItMeans: 'A resource group is a logical container that groups related Azure resources for lifecycle management.',
          whyItMaySeemRight: 'Grouping resources sounds like it could provide protection by keeping them organised.',
          whyNotHere: 'A resource group is about organisation and deployment, not about fault tolerance or data centre protection. It has no effect on availability.',
          whenItWouldFit: 'A question about deploying, managing, or deleting a set of related resources together.',
        },
      },
      {
        id: 'd',
        text: 'A region pair',
        whyIncorrect: 'A region pair protects against a whole region failing, which is a broader level than a single data centre. The question points to one data centre.',
        distractor: {
          whatItMeans: 'A region pair is two Azure regions within the same geography, paired for disaster recovery across an entire region.',
          whyItMaySeemRight: 'A region pair protects against major outages, and "entire data centre fails" sounds like a major outage.',
          whyNotHere: 'The question asks about a single data centre failing. A region pair protects against a whole region (containing multiple data centres) going down — that is a broader scope than what the question describes. Availability Zones protect at the data centre level within a region.',
          whenItWouldFit: 'A question about disaster recovery across an entire Azure region, or failover to a second region hundreds of miles away.',
        },
      },
    ],
    correctOptionId: 'b',
    explanation: {
      simpleTerms:
        'An Availability Zone is a separate physical data centre within an Azure region, with its own power, cooling, and networking. Spreading workloads across zones protects against one data centre failing. The three levels of protection: an Availability Set protects within a data centre (against rack failures); an Availability Zone protects across data centres within a region; a region pair protects across an entire region.',
      realLifeExample:
        'A Nigerian banking app deploys its API across two Availability Zones in the South Africa North Azure region. If one data centre experiences a power failure, the other zone keeps the app running with no interruption for customers in Lagos.',
    },
    signal: {
      phrase: 'if an entire data centre fails',
      suggests:
        'The phrase "entire data centre fails" points to Availability Zones, because each zone is a distinct data centre within a region.',
      steps: [
        {
          phrase: 'entire data centre fails',
          reasoning: 'Ask: "What level of failure is this?" A data centre failure is above the rack level (Availability Set) but below the region level (region pair). Availability Zones are distinct data centres within a region.',
        },
        {
          phrase: 'single data centre outage',
          reasoning: 'Ask: "Which feature protects at exactly this level?" Availability Sets protect within one data centre (too narrow). Region pairs protect across an entire region (too broad). Availability Zones protect across data centres within one region — exactly the right scope.',
        },
      ],
      conclusion:
        'If the question said "rack failure", an Availability Set would be the answer. If it said "entire region", a region pair would apply. "Entire data centre" points to Availability Zones.',
    },
  },
  {
    id: 'q-arch-resource-groups',
    topicId: 'azure-architecture',
    prompt:
      'A team needs to deploy, manage, and monitor a web app, its database, and its storage account together as a single lifecycle. What is the simplest way to organise these resources in Azure?',
    options: [
      {
        id: 'a',
        text: 'Place them in the same subscription',
        whyIncorrect: 'A subscription can hold many unrelated resources. It does not group resources that share a lifecycle.',
        distractor: {
          whatItMeans: 'A subscription is the billing and access boundary that contains all of an organisation\u2019s Azure resources.',
          whyItMaySeemRight: 'Putting resources in the same subscription does group them in a sense, and subscriptions are a well-known organising concept.',
          whyNotHere: 'A subscription is too broad — it can hold hundreds of unrelated resources. It does not provide the shared lifecycle grouping the question asks for.',
          whenItWouldFit: 'A question about billing boundaries, access scoping at a high level, or separating dev from production environments.',
        },
      },
      {
        id: 'b',
        text: 'Place them in the same resource group',
        whyIncorrect: '',
      },
      {
        id: 'c',
        text: 'Place them in the same management group',
        whyIncorrect: 'Management groups are for organising subscriptions and applying policy across them, not for grouping a single app\u2019s resources.',
        distractor: {
          whatItMeans: 'A management group is a container that organises multiple subscriptions so you can apply policy and access rules across them.',
          whyItMaySeemRight: 'Management groups are an organising tool in Azure, so they might seem like the right way to group resources.',
          whyNotHere: 'Management groups operate above the subscription level — they are for governing many subscriptions, not for grouping the resources of a single application.',
          whenItWouldFit: 'A question about applying the same policy to multiple subscriptions across an organisation.',
        },
      },
      {
        id: 'd',
        text: 'Tag them with the same cost tag',
        whyIncorrect: 'Tags help with reporting and billing, but they do not group resources for shared deployment and lifecycle management.',
        distractor: {
          whatItMeans: 'Tags are key-value labels applied to resources for categorisation, billing, and reporting.',
          whyItMaySeemRight: 'Tagging with the same label does associate resources, so it might seem like a way to group them.',
          whyNotHere: 'Tags are metadata for reporting — they do not create a deployment or lifecycle boundary. You cannot deploy or delete resources as a unit using a tag.',
          whenItWouldFit: 'A question about categorising resources for cost reporting or identifying which department owns a resource.',
        },
      },
    ],
    correctOptionId: 'b',
    explanation: {
      simpleTerms:
        'A resource group is a container that holds related resources so you can deploy, manage, and monitor them together. Resources in a group share a lifecycle — they are created, updated, and deleted as a unit. The hierarchy in Azure: management groups contain subscriptions; subscriptions contain resource groups; resource groups contain resources.',
      realLifeExample:
        'A Kigali agritech startup puts its web app, Azure SQL Database, and storage account in one resource group called "CropApp-Production". When they update the app, they redeploy the whole group. If they take the app offline, they can delete the group and remove all related resources at once.',
    },
    signal: {
      phrase: 'deploy, manage, and monitor \u2026 together as a single lifecycle',
      suggests:
        'The phrase "single lifecycle" is the signal for a resource group.',
      steps: [
        {
          phrase: 'deploy, manage, and monitor together as a single lifecycle',
          reasoning: 'Ask: "What Azure construct groups resources that share a lifecycle?" A resource group is specifically designed for resources that are created, updated, and deleted together.',
        },
        {
          phrase: 'simplest way to organise these resources',
          reasoning: 'Ask: "Is there a simpler option?" Subscriptions and management groups are higher-level containers — too broad for a single app. Tags are metadata, not a deployment boundary. A resource group is the simplest container that provides shared lifecycle management.',
        },
      ],
      conclusion:
        'Resources that share a lifecycle belong in one resource group. If the question mentioned organising multiple subscriptions, a management group would apply instead.',
    },
  },
  {
    id: 'q-arch-region-pairs',
    topicId: 'azure-architecture',
    prompt:
      'An Azure region in one part of the world is paired with another region at least 300 miles away so that, if the first region suffers a major outage, services can fail over to the second. What is this arrangement called?',
    options: [
      {
        id: 'a',
        text: 'An Availability Zone',
        whyIncorrect: 'Availability Zones are separate data centres inside a single region, not two regions hundreds of miles apart.',
        distractor: {
          whatItMeans: 'An Availability Zone is a distinct data centre within a single Azure region, with its own power and networking.',
          whyItMaySeemRight: 'Both Availability Zones and region pairs are about protecting against outages, so they are easy to confuse.',
          whyNotHere: 'The question describes two regions paired across a large distance — Availability Zones are within one region, not across two.',
          whenItWouldFit: 'A question about protecting against a single data centre failure within a region.',
        },
      },
      {
        id: 'b',
        text: 'A region pair',
        whyIncorrect: '',
      },
      {
        id: 'c',
        text: 'A resource group',
        whyIncorrect: 'A resource group groups resources for lifecycle management; it has nothing to do with pairing regions for disaster recovery.',
        distractor: {
          whatItMeans: 'A resource group is a logical container for managing related resources that share a lifecycle.',
          whyItMaySeemRight: 'A resource group pairs resources together, so "pair" might seem related.',
          whyNotHere: 'Resource groups are about deployment and lifecycle management of resources, not geographic pairing of regions for disaster recovery.',
          whenItWouldFit: 'A question about organising related resources for shared deployment.',
        },
      },
      {
        id: 'd',
        text: 'A scale set',
        whyIncorrect: 'A scale set automatically manages a group of identical VMs for load balancing, not regional pairing.',
        distractor: {
          whatItMeans: 'A virtual machine scale set is a group of identical VMs that can automatically grow or shrink to handle load.',
          whyItMaySeemRight: 'A scale set distributes workloads, which sounds like it could involve multiple locations.',
          whyNotHere: 'A scale set is about horizontal scaling of identical VMs within a region, not about pairing two regions for disaster recovery.',
          whenItWouldFit: 'A question about automatically adding VMs to handle increased traffic.',
        },
      },
    ],
    correctOptionId: 'b',
    explanation: {
      simpleTerms:
        'Azure pairs certain regions within the same geography, at least 300 miles apart, so one can serve as a disaster-recovery fallback for the other. This is the broadest level of protection: Availability Sets protect within a data centre; Availability Zones protect across data centres in one region; region pairs protect across an entire region.',
      realLifeExample:
        'A Cape Town insurance company hosts its customer portal in the South Africa North region. Azure pairs this with South Africa West, over 1,000 km away. If a major outage takes down South Africa North, the company can fail over to South Africa West and keep serving policyholders.',
    },
    signal: {
      phrase: 'paired with another region at least 300 miles away',
      suggests:
        'Two regions paired across a large distance for failover is the defining feature of a region pair.',
      steps: [
        {
          phrase: 'paired with another region',
          reasoning: 'Ask: "What level is being paired?" This is two entire Azure regions, not data centres within one region. Availability Zones are within a single region.',
        },
        {
          phrase: 'at least 300 miles away',
          reasoning: 'Ask: "Why the distance?" The 300-mile separation ensures a regional disaster (like a flood or earthquake) does not affect both regions. This is the specific design principle of a region pair.',
        },
      ],
      conclusion:
        'Two regions paired across a large distance for disaster recovery is a region pair. If the question described separate data centres within one region, the answer would be Availability Zones.',
    },
  },
  {
    id: 'q-arch-storage-redundancy',
    topicId: 'azure-architecture',
    prompt:
      'A company needs its Azure Storage data copied synchronously across three separate data centres within a single Azure region for the strongest protection against a single data centre failure. Which redundancy option should they choose?',
    options: [
      {
        id: 'a',
        text: 'Locally redundant storage (LRS)',
        whyIncorrect: 'LRS keeps three copies within a single data centre, so a data centre failure would still affect all copies.',
        distractor: {
          whatItMeans: 'LRS replicates data three times within a single data centre in one region.',
          whyItMaySeemRight: 'LRS also creates three copies, and the question mentions "three" — but the location of those copies is what matters.',
          whyNotHere: 'The question asks for copies across three separate data centres. LRS keeps all three copies in one data centre, so a single data centre failure could affect all of them.',
          whenItWouldFit: 'A question about the lowest-cost redundancy option where protecting against a single data centre failure is not required.',
        },
      },
      {
        id: 'b',
        text: 'Zone-redundant storage (ZRS)',
        whyIncorrect: '',
      },
      {
        id: 'c',
        text: 'Geo-redundant storage (GRS)',
        whyIncorrect: 'GRS replicates to a second region using asynchronous copies. The question asks for synchronous copies within one region.',
        distractor: {
          whatItMeans: 'GRS replicates data asynchronously to a second Azure region (the paired region) for regional disaster recovery.',
          whyItMaySeemRight: 'GRS provides strong protection and involves multiple data centres, so it might seem like the safest option.',
          whyNotHere: 'The question specifically asks for synchronous copies within a single region. GRS is asynchronous (there may be a small delay before data reaches the second region) and spans two regions, not three data centres within one.',
          whenItWouldFit: 'A question about protecting data against an entire region failure, where some delay in replication is acceptable.',
        },
      },
      {
        id: 'd',
        text: 'Read-access geo-redundant storage (RA-GRS)',
        whyIncorrect: 'RA-GRS adds read access to a second region but is still asynchronous, not synchronous within one region.',
        distractor: {
          whatItMeans: 'RA-GRS is GRS plus the ability to read from the secondary region at any time, not just during a failover.',
          whyItMaySeemRight: 'RA-GRS offers even more protection than GRS, so it might seem like the strongest option.',
          whyNotHere: 'Like GRS, RA-GRS replicates asynchronously across two regions, not synchronously within one region as the question requires. The question asks for synchronous copies across three data centres in one region.',
          whenItWouldFit: 'A question where you need read access to a replicated copy in a second region at all times.',
        },
      },
    ],
    correctOptionId: 'b',
    explanation: {
      simpleTerms:
        'Zone-redundant storage (ZRS) keeps three synchronous copies of your data across three different data centres (Availability Zones) in one region. If one zone goes down, your data is still safe and accessible. The key distinctions: LRS is three copies within one data centre; ZRS is three synchronous copies across three data centres in one region; GRS spans two regions asynchronously.',
      realLifeExample:
        'A Tanzanian health-tech company stores patient records in Azure Storage using ZRS in the South Africa North region. The data is synchronously copied across three data centres in that region. If one data centre has a power outage, patient records remain available from the other two — with no data loss.',
    },
    signal: {
      phrase: 'synchronously across three separate data centres within a single Azure region',
      suggests:
        'Three signals in the question point to ZRS: "synchronous", "three separate data centres", and "within a single region".',
      steps: [
        {
          phrase: 'synchronously',
          reasoning: 'Ask: "Does the timing matter?" Yes — synchronous means the data is written to all copies before the write is confirmed. This rules out GRS and RA-GRS, which are asynchronous.',
        },
        {
          phrase: 'three separate data centres within a single Azure region',
          reasoning: 'Ask: "Where are the copies?" Three data centres within one region means Availability Zones. This rules out LRS (one data centre) and GRS/RA-GRS (two regions). ZRS is the only option that places three synchronous copies across three data centres in one region.',
        },
      ],
      conclusion:
        '"Synchronous" rules out GRS and RA-GRS. "Three separate data centres" rules out LRS. "Within a single region" rules out any geo-replication option. ZRS is the only option that matches all three constraints.',
    },
  },
  {
    id: 'q-arch-paas-db',
    topicId: 'azure-architecture',
    prompt:
      'A development team wants to run a database in Azure without having to manage the underlying server, operating system, or backups. Which Azure service best fits this need?',
    options: [
      {
        id: 'a',
        text: 'A virtual machine running SQL Server',
        whyIncorrect: 'A VM running SQL Server is IaaS — you still manage the OS, patching, and backups yourself.',
        distractor: {
          whatItMeans: 'Running SQL Server on an Azure VM gives you full control over the database engine and the operating system.',
          whyItMaySeemRight: 'A VM running SQL Server is a database solution in Azure, so it might seem like the right choice.',
          whyNotHere: 'The question says the team does not want to manage the server, OS, or backups. A VM requires all of that — it is IaaS, not a managed service. In IaaS, the customer patches the OS and manages backups.',
          whenItWouldFit: 'A question where full control over the OS and database engine is needed, or where legacy SQL Server features require VM-level access.',
        },
      },
      {
        id: 'b',
        text: 'Azure SQL Database (PaaS)',
        whyIncorrect: '',
      },
      {
        id: 'c',
        text: 'Azure Storage accounts',
        whyIncorrect: 'Storage accounts store files and objects, not a relational database with query and backup management.',
        distractor: {
          whatItMeans: 'Azure Storage accounts hold blobs, files, tables, and queues — object and file storage, not relational database services.',
          whyItMaySeemRight: 'Storage accounts store data in Azure, and the question mentions a database (which stores data).',
          whyNotHere: 'The question asks for a database. Storage accounts are not relational databases and do not support SQL queries or managed backups.',
          whenItWouldFit: 'A question about storing unstructured data like images, documents, or backup files.',
        },
      },
      {
        id: 'd',
        text: 'Azure Container Instances',
        whyIncorrect: 'Container Instances run containerised apps, not a managed relational database service.',
        distractor: {
          whatItMeans: 'Azure Container Instances (ACI) run a containerised application without managing servers.',
          whyItMaySeemRight: 'ACI is a managed service where you do not manage servers, which matches part of the question.',
          whyNotHere: 'ACI runs application containers — it is not a managed database service with built-in backups and patching. The question specifically asks for a database.',
          whenItWouldFit: 'A question about running a single containerised application quickly without orchestration.',
        },
      },
    ],
    correctOptionId: 'b',
    explanation: {
      simpleTerms:
        'Azure SQL Database is a Platform as a Service offering: Microsoft manages the server, operating system, patching, and backups automatically. You just bring your data and run queries. The key distinction: a VM running SQL Server is IaaS (you manage the OS and backups); Azure SQL Database is PaaS (the provider manages the OS and backups). This is the same IaaS vs PaaS responsibility difference that applies to all services.',
      realLifeExample:
        'A Rwandan e-commerce startup needs a database for its product catalogue. The two-person dev team chooses Azure SQL Database so Microsoft handles backups, patching, and server maintenance. They focus on writing queries and building features instead of running a database server.',
    },
    signal: {
      phrase: 'without having to manage the underlying server, operating system, or backups',
      suggests:
        '"No server, OS, or backups to manage" signals a fully managed PaaS service.',
      steps: [
        {
          phrase: 'without having to manage the underlying server, operating system, or backups',
          reasoning: 'Ask: "Which cloud model shifts OS and backup management to the provider?" In IaaS, the customer manages the OS and backups. In PaaS, the provider manages the OS, platform, and backups. The desire to avoid all infrastructure management points to PaaS.',
        },
        {
          phrase: 'run a database in Azure',
          reasoning: 'Ask: "Which Azure database service is PaaS?" Azure SQL Database is the PaaS relational database offering. A VM running SQL Server would be IaaS.',
        },
      ],
      conclusion:
        'The desire to avoid managing the server, OS, and backups signals PaaS. Azure SQL Database is the PaaS managed database that handles all of that for you.',
    },
  },
  {
    id: 'q-arch-entra',
    topicId: 'azure-architecture',
    prompt:
      'A company needs a single identity service that lets employees sign in once and access multiple cloud and on-premises applications. Which Azure service provides this?',
    options: [
      {
        id: 'a',
        text: 'Azure Resource Manager',
        whyIncorrect: 'Resource Manager is the deployment and management service for Azure resources, not an identity provider.',
        distractor: {
          whatItMeans: 'Azure Resource Manager (ARM) is the deployment and management layer that handles requests to create, update, or delete Azure resources.',
          whyItMaySeemRight: 'ARM manages access to Azure resources, so it might seem related to identity and sign-in.',
          whyNotHere: 'ARM is about deploying and managing infrastructure, not about user authentication or single sign-on for employees.',
          whenItWouldFit: 'A question about deploying resources using templates or managing Azure infrastructure.',
        },
      },
      {
        id: 'b',
        text: 'Azure Key Vault',
        whyIncorrect: 'Key Vault stores secrets, keys, and certificates securely, but it does not provide user sign-in and single sign-on.',
        distractor: {
          whatItMeans: 'Azure Key Vault securely stores and manages secrets, encryption keys, and certificates.',
          whyItMaySeemRight: 'Key Vault deals with security and credentials, which sounds related to identity and sign-in.',
          whyNotHere: 'Key Vault is about safeguarding secrets for applications, not about managing user identities or providing single sign-on for employees.',
          whenItWouldFit: 'A question about storing passwords, API keys, or encryption keys securely.',
        },
      },
      {
        id: 'c',
        text: 'Microsoft Entra ID (formerly Azure AD)',
        whyIncorrect: '',
      },
      {
        id: 'd',
        text: 'Azure Information Protection',
        whyIncorrect: 'Information Protection classifies and protects documents, but it is not an identity and sign-in service.',
        distractor: {
          whatItMeans: 'Azure Information Protection (AIP) classifies and protects sensitive documents using labels and encryption.',
          whyItMaySeemRight: 'AIP is a security service that controls who can access documents, which sounds related to identity.',
          whyNotHere: 'AIP is about document protection and classification, not about identity management or single sign-on for employees.',
          whenItWouldFit: 'A question about labelling and protecting sensitive files or emails.',
        },
      },
    ],
    correctOptionId: 'c',
    explanation: {
      simpleTerms:
        'Microsoft Entra ID (formerly Azure Active Directory) is Azure\u2019s cloud-based identity and access management service. It supports single sign-on, so a user signs in once and can reach many applications — both cloud and on-premises — without re-entering credentials.',
      realLifeExample:
        'A Nairobi telecoms company uses Microsoft Entra ID for its 5,000 employees. A staff member signs in once in the morning and can open Office 365, the company HR portal, and an on-premises expense system without logging in again to each one.',
    },
    signal: {
      phrase: 'sign in once and access multiple \u2026 applications',
      suggests:
        'The phrase "sign in once" is the language of single sign-on, which is a core feature of Microsoft Entra ID.',
      steps: [
        {
          phrase: 'single identity service',
          reasoning: 'Ask: "Which Azure service provides identity management?" Microsoft Entra ID is Azure\u2019s identity and access management service. The other options are not identity providers.',
        },
        {
          phrase: 'sign in once and access multiple applications',
          reasoning: 'Ask: "What feature is described?" Signing in once to reach many applications is single sign-on (SSO), a core capability of Entra ID. This confirms it is the right service.',
        },
      ],
      conclusion:
        '"Identity service" narrows it to Entra ID, and "sign in once" confirms single sign-on. The other options handle deployment, secrets, or document protection — not identity.',
    },
  },

  // ── Azure Management and Governance ─────────────────────────────
  {
    id: 'q-mgmt-cost-management',
    topicId: 'azure-management',
    prompt:
      'A finance team wants to review last month\u2019s Azure spending broken down by department and set alerts when a department is likely to go over budget. Which Azure tool should they use?',
    options: [
      {
        id: 'a',
        text: 'The Pricing Calculator',
        whyIncorrect: 'The Pricing Calculator estimates the cost of a planned set of resources before you build them. It does not report on actual past spending.',
        distractor: {
          whatItMeans: 'The Pricing Calculator is a web tool that estimates the monthly cost of a planned Azure configuration before you deploy it.',
          whyItMaySeemRight: 'The Pricing Calculator is about Azure costs, so it might seem like the right tool for a finance team looking at spending.',
          whyNotHere: 'The finance team wants to review actual past spending and set alerts, not estimate future resource costs. The Pricing Calculator works before you deploy; Cost Management works after you deploy.',
          whenItWouldFit: 'A question about estimating the cost of a planned solution before deploying it.',
        },
      },
      {
        id: 'b',
        text: 'The TCO Calculator',
        whyIncorrect: 'The TCO Calculator compares the total cost of an on-premises setup against a cloud setup. It is not a live spending tracker.',
        distractor: {
          whatItMeans: 'The TCO Calculator compares the total cost of ownership of running a workload on-premises versus in Azure.',
          whyItMaySeemRight: 'The TCO Calculator is about Azure costs, so it might seem relevant to a finance team.',
          whyNotHere: 'The question is about monitoring actual Azure spending and setting budget alerts, not about comparing on-premises vs cloud costs. The TCO Calculator is a one-time comparison tool, not an ongoing spend tracker.',
          whenItWouldFit: 'A question about building a business case for migrating from on-premises to the cloud.',
        },
      },
      {
        id: 'c',
        text: 'Azure Cost Management',
        whyIncorrect: '',
      },
      {
        id: 'd',
        text: 'Azure Advisor',
        whyIncorrect: 'Azure Advisor gives best-practice recommendations, including some cost tips, but it is not a budgeting and spend-tracking tool.',
        distractor: {
          whatItMeans: 'Azure Advisor provides personalised recommendations to improve cost, security, reliability, performance, and operational excellence.',
          whyItMaySeemRight: 'Advisor includes cost recommendations, so it might seem like the right tool for a finance team.',
          whyNotHere: 'Advisor suggests improvements but does not provide the spend breakdown, budgets, and alerts the finance team needs. It gives tips; Cost Management gives actual data and budget alerts.',
          whenItWouldFit: 'A question about getting recommendations to optimise Azure resources across multiple categories.',
        },
      },
    ],
    correctOptionId: 'c',
    explanation: {
      simpleTerms:
        'Azure Cost Management shows you what you have already spent, breaks it down by resource or department, and lets you set budgets and spending alerts. The key distinction: the Pricing Calculator estimates future costs before you build; the TCO Calculator compares on-premises vs cloud costs; Cost Management tracks actual spending after you build.',
      realLifeExample:
        'A Lagos fintech uses Azure Cost Management to track its cloud spending across three departments: Engineering, Marketing, and Operations. The finance team sets a budget alert at 80% for each department, so they get an email before any team overspends.',
    },
    signal: {
      phrase: 'review last month\u2019s Azure spending \u2026 set alerts',
      suggests:
        '"Review actual past spending" plus "set alerts" signals a monitoring and budgeting tool.',
      steps: [
        {
          phrase: 'review last month\u2019s Azure spending',
          reasoning: 'Ask: "Is this about estimating future costs or tracking actual past spending?" "Review last month\u2019s spending" means looking at actual data after resources are running. This rules out the Pricing Calculator (estimates before deployment) and the TCO Calculator (compares on-premises vs cloud).',
        },
        {
          phrase: 'set alerts when a department is likely to go over budget',
          reasoning: 'Ask: "Which tool provides budgets and alerts?" Azure Cost Management provides budget thresholds and spending alerts. Azure Advisor gives recommendations but does not track budgets.',
        },
      ],
      conclusion:
        '"Review actual past spending" plus "set budget alerts" points to Azure Cost Management. Estimating before deployment would point to the Pricing Calculator; comparing on-premises vs cloud would point to the TCO Calculator.',
    },
  },
  {
    id: 'q-mgmt-resource-locks',
    topicId: 'azure-management',
    prompt:
      'An administrator wants to make sure no one accidentally deletes a production database, even if they have permission to do so. What is the most direct way to prevent this?',
    options: [
      {
        id: 'a',
        text: 'Apply a Delete lock to the database',
        whyIncorrect: '',
      },
      {
        id: 'b',
        text: 'Create an Azure Policy that denies deletion',
        whyIncorrect: 'Azure Policy can enforce rules, but it is a heavier, rules-based tool. A resource lock is the direct, purpose-built way to block a specific delete.',
        distractor: {
          whatItMeans: 'Azure Policy enforces compliance rules across resources, such as requiring tags or restricting resource types.',
          whyItMaySeemRight: 'Azure Policy can block actions, so it might seem like the right way to prevent deletion.',
          whyNotHere: 'Azure Policy can enforce rules broadly, but for protecting a single specific resource from accidental deletion, a resource lock is the simpler, purpose-built tool. The question asks for the "most direct" way.',
          whenItWouldFit: 'A question about enforcing organisation-wide rules, like requiring all resources to have a tag or restricting which regions can be used.',
        },
      },
      {
        id: 'c',
        text: 'Move the database into a separate subscription',
        whyIncorrect: 'Moving the database does not stop anyone with permissions from deleting it.',
        distractor: {
          whatItMeans: 'A subscription is the billing and access boundary for Azure resources.',
          whyItMaySeemRight: 'Putting the database in its own subscription isolates it, which might seem like it protects it.',
          whyNotHere: 'Moving a resource to a different subscription changes where it is billed, but does not prevent deletion by anyone with the right permissions. It does not block the delete action.',
          whenItWouldFit: 'A question about isolating billing or access for a set of resources.',
        },
      },
      {
        id: 'd',
        text: 'Remove delete permissions from all users',
        whyIncorrect: 'This can work, but it is hard to maintain and easy to miss people. A lock applies regardless of the user\u2019s role, making it the most direct safeguard.',
        distractor: {
          whatItMeans: 'Removing delete permissions means using role-based access control to revoke the delete action for every user.',
          whyItMaySeemRight: 'If no one has delete permission, no one can delete the database — this seems like a valid approach.',
          whyNotHere: 'While this can work, it is hard to maintain — you must track every user and role, and new people might gain delete access later. A lock applies regardless of role, making it more reliable and direct. The question asks for the "most direct" way.',
          whenItWouldFit: 'A question about controlling who can perform actions using role-based access control (RBAC).',
        },
      },
    ],
    correctOptionId: 'a',
    explanation: {
      simpleTerms:
        'A resource lock applies to a specific resource and blocks the action — even for owners. A Delete (CanNotDelete) lock stops the resource from being removed while still allowing it to be used and updated. The key distinction from Azure Policy: locks protect a specific resource directly and simply; Policy enforces rules broadly across many resources. The question asks for the "most direct" way, which is the purpose-built lock.',
      realLifeExample:
        'A Cape Town bank applies a CanNotDelete lock to its production customer database in Azure. Even a senior administrator with full owner permissions cannot accidentally delete it — the lock blocks the action regardless of role. The database still works normally for reads and writes.',
    },
    signal: {
      phrase: 'no one accidentally deletes',
      suggests:
        'The phrase "accidentally deletes" signals a resource lock, which is designed to protect individual resources from accidental changes.',
      steps: [
        {
          phrase: 'no one accidentally deletes',
          reasoning: 'Ask: "What Azure feature is specifically designed to prevent accidental deletion of a single resource?" A resource lock (CanNotDelete) is the purpose-built tool for this exact scenario.',
        },
        {
          phrase: 'even if they have permission to do so',
          reasoning: 'Ask: "Does the solution need to override permissions?" Yes — the lock works regardless of the user\u2019s role, even for owners. Removing permissions (option D) could work but is harder to maintain. A lock is the most direct and reliable approach.',
        },
      ],
      conclusion:
        '"Accidentally deletes" plus "even if they have permission" signals a resource lock. If the question described enforcing a rule across many resources, Azure Policy would be more appropriate.',
    },
  },
  {
    id: 'q-mgmt-azure-policy',
    topicId: 'azure-management',
    prompt:
      'A governance team requires that all Azure resources in every subscription carry an "Owner" tag, and any new resource missing the tag should be blocked from being created. Which Azure service should they use?',
    options: [
      {
        id: 'a',
        text: 'Azure Resource Locks',
        whyIncorrect: 'Resource locks block deletion or changes to a specific resource, but they cannot enforce tagging rules across subscriptions.',
        distractor: {
          whatItMeans: 'Resource locks prevent accidental deletion or modification of a specific resource.',
          whyItMaySeemRight: 'Locks prevent unwanted actions on resources, so they might seem like a governance tool that could enforce rules.',
          whyNotHere: 'Locks protect individual resources from deletion or changes — they cannot enforce tagging rules or block creation based on compliance. The question asks about enforcing a rule across all subscriptions.',
          whenItWouldFit: 'A question about protecting a specific production resource from accidental deletion.',
        },
      },
      {
        id: 'b',
        text: 'Azure Policy',
        whyIncorrect: '',
      },
      {
        id: 'c',
        text: 'Azure Blueprints',
        whyIncorrect: 'Blueprints bundle policies, roles, and templates for repeatable deployments, but the enforcement engine underneath is Azure Policy.',
        distractor: {
          whatItMeans: 'Azure Blueprints package policies, role assignments, and ARM templates into a repeatable deployment package.',
          whyItMaySeemRight: 'Blueprints can include policies, so they might seem like the right tool for enforcing a rule.',
          whyNotHere: 'Blueprints can include policies, but the actual enforcement of the tagging rule is done by Azure Policy. For a single rule applied across subscriptions, Azure Policy is the direct answer. Blueprints are for packaging multiple artefacts together.',
          whenItWouldFit: 'A question about deploying a standardised set of policies, roles, and templates as a package across multiple subscriptions.',
        },
      },
      {
        id: 'd',
        text: 'Microsoft Entra ID',
        whyIncorrect: 'Entra ID manages identities and sign-in, not resource compliance rules like required tags.',
        distractor: {
          whatItMeans: 'Microsoft Entra ID is Azure\u2019s identity and access management service for user authentication.',
          whyItMaySeemRight: 'Entra ID manages access to resources, which sounds like it could enforce who can create resources without tags.',
          whyNotHere: 'Entra ID manages who can sign in and what they can access — it does not enforce resource compliance rules like required tags. That is the job of Azure Policy.',
          whenItWouldFit: 'A question about user authentication, single sign-on, or identity management.',
        },
      },
    ],
    correctOptionId: 'b',
    explanation: {
      simpleTerms:
        'Azure Policy lets you create rules that resources must follow — like requiring a tag, restricting regions, or allowing only certain VM sizes. It can block non-compliant resources from being created. The key distinction from resource locks: locks protect a specific resource from accidental changes; Policy enforces standards across many resources. Blueprints can package policies, but the enforcement engine is Policy itself.',
      realLifeExample:
        'A pan-African bank with 15 Azure subscriptions uses Azure Policy to require an "Owner" tag on every resource. When a developer in the Nairobi office tries to create a storage account without the tag, Azure Policy blocks the creation and shows a message explaining the requirement.',
    },
    signal: {
      phrase: 'blocked from being created',
      suggests:
        'The phrase "enforce a rule across every subscription" plus "blocked from being created" signals Azure Policy.',
      steps: [
        {
          phrase: 'all Azure resources in every subscription carry an "Owner" tag',
          reasoning: 'Ask: "What tool enforces compliance rules across resources?" Azure Policy is the tool for enforcing standards like required tags, restricted regions, or allowed resource types. Resource locks cannot do this.',
        },
        {
          phrase: 'blocked from being created',
          reasoning: 'Ask: "Can the tool block creation?" Yes — Azure Policy has a "deny" effect that prevents non-compliant resources from being created. This is a specific Policy capability that locks and Entra ID do not provide.',
        },
      ],
      conclusion:
        'Enforcing a rule across subscriptions and blocking non-compliant creation signals Azure Policy. Locks protect existing resources; Policy enforces standards on new and existing ones.',
    },
  },
  {
    id: 'q-mgmt-advisor',
    topicId: 'azure-management',
    prompt:
      'A team wants personalised, best-practice recommendations to improve the reliability, security, performance, and cost of their Azure resources. Which Azure service provides this?',
    options: [
      {
        id: 'a',
        text: 'Azure Monitor',
        whyIncorrect: 'Azure Monitor collects and analyses telemetry and alerts you to issues, but it does not proactively suggest best-practice improvements across categories.',
        distractor: {
          whatItMeans: 'Azure Monitor collects telemetry data from your resources and applications, and lets you set alerts based on metrics and logs.',
          whyItMaySeemRight: 'Monitor tracks the health and performance of resources, which sounds like it could provide recommendations.',
          whyNotHere: 'Monitor tells you what is happening right now — it alerts you to problems but does not proactively suggest improvements across cost, security, reliability, and performance. The question asks for recommendations, not monitoring data.',
          whenItWouldFit: 'A question about collecting metrics, viewing dashboards, or setting alerts on application performance.',
        },
      },
      {
        id: 'b',
        text: 'Azure Service Health',
        whyIncorrect: 'Service Health tells you about Azure platform issues and outages affecting your resources, not best-practice recommendations.',
        distractor: {
          whatItMeans: 'Azure Service Health provides a personalised view of Azure platform issues and planned maintenance that affect your resources.',
          whyItMaySeemRight: 'Service Health is about the health of your resources, which might seem like it includes recommendations.',
          whyNotHere: 'Service Health reports on Azure platform problems — it does not provide best-practice recommendations for improving your resources.',
          whenItWouldFit: 'A question about being notified when an Azure region has an outage or planned maintenance.',
        },
      },
      {
        id: 'c',
        text: 'Azure Advisor',
        whyIncorrect: '',
      },
      {
        id: 'd',
        text: 'Azure Cost Management',
        whyIncorrect: 'Cost Management focuses on spend, budgets, and alerts — not reliability, security, and performance recommendations.',
        distractor: {
          whatItMeans: 'Azure Cost Management tracks spending, sets budgets, and provides cost alerts.',
          whyItMaySeemRight: 'The question mentions cost as one category, and Cost Management handles cost.',
          whyNotHere: 'Cost Management covers only the cost dimension. The question asks for recommendations across reliability, security, performance, AND cost. Cost Management does not provide security or reliability recommendations.',
          whenItWouldFit: 'A question specifically about tracking and reducing Azure spending.',
        },
      },
    ],
    correctOptionId: 'c',
    explanation: {
      simpleTerms:
        'Azure Advisor scans your Azure setup and gives tailored recommendations across five categories: cost, security, reliability, operational excellence, and performance. The key distinction from Azure Monitor: Monitor tells you what is happening now (alerts and metrics); Advisor proactively suggests how to improve (recommendations). The key distinction from Cost Management: Cost Management covers only cost; Advisor covers multiple categories.',
      realLifeExample:
        'An Accra startup running several Azure VMs opens Azure Advisor and sees recommendations to resize underused VMs (cost), enable backup on two VMs (reliability), and close open network ports (security). The team applies the suggestions and reduces its monthly bill by 30%.',
    },
    signal: {
      phrase: 'best-practice recommendations',
      suggests:
        'The phrase "best-practice recommendations" across multiple categories is the signature of Azure Advisor.',
      steps: [
        {
          phrase: 'personalised, best-practice recommendations',
          reasoning: 'Ask: "Which Azure service proactively suggests improvements?" Azure Advisor is the recommendation engine. Monitor shows metrics; Service Health shows platform issues; Cost Management shows spending. Only Advisor provides proactive recommendations.',
        },
        {
          phrase: 'reliability, security, performance, and cost',
          reasoning: 'Ask: "Which tool covers all these categories?" Advisor covers five categories: cost, security, reliability, operational excellence, and performance. Cost Management only covers cost; Monitor only shows metrics. The multi-category scope confirms Advisor.',
        },
      ],
      conclusion:
        '"Best-practice recommendations" across multiple categories (reliability, security, performance, cost) is the signature of Azure Advisor. Monitoring tools alert you to current problems; Advisor proactively suggests improvements.',
    },
  },
  {
    id: 'q-mgmt-cli-portal',
    topicId: 'azure-management',
    prompt:
      'A developer wants to automate the creation of several Azure resources using commands run from their local terminal. Which approach best suits this need?',
    options: [
      {
        id: 'a',
        text: 'Use the Azure portal',
        whyIncorrect: 'The Azure portal is a graphical web interface great for manual work, but it is not designed for repeatable, scriptable automation from a terminal.',
        distractor: {
          whatItMeans: 'The Azure portal is a web-based graphical interface for managing Azure resources through point-and-click actions.',
          whyItMaySeemRight: 'The portal is the most common way to manage Azure, so it might seem like the default choice for any management task.',
          whyNotHere: 'The question asks for automation from a local terminal using commands. The portal is a visual web interface — it is not scriptable or terminal-based.',
          whenItWouldFit: 'A question about manually managing resources through a visual interface, especially for beginners or one-off tasks.',
        },
      },
      {
        id: 'b',
        text: 'Use the Azure CLI',
        whyIncorrect: '',
      },
      {
        id: 'c',
        text: 'Use Azure Advisor',
        whyIncorrect: 'Advisor provides recommendations; it does not deploy or automate resource creation.',
        distractor: {
          whatItMeans: 'Azure Advisor provides best-practice recommendations for improving your Azure resources.',
          whyItMaySeemRight: 'Advisor helps manage Azure resources, so it might seem like a management tool that could automate tasks.',
          whyNotHere: 'Advisor suggests improvements — it does not create resources or run commands from a terminal. It is an advisory tool, not a deployment tool.',
          whenItWouldFit: 'A question about getting recommendations to optimise existing resources.',
        },
      },
      {
        id: 'd',
        text: 'Use Azure Service Health',
        whyIncorrect: 'Service Health reports platform issues; it does not create or manage resources.',
        distractor: {
          whatItMeans: 'Azure Service Health notifies you about Azure platform issues and planned maintenance.',
          whyItMaySeemRight: 'Service Health is a management-related service, so it might seem like it could be used for automation.',
          whyNotHere: 'Service Health is about platform status alerts, not about automating resource creation from a terminal.',
          whenItWouldFit: 'A question about being alerted when Azure has a platform outage or maintenance event.',
        },
      },
    ],
    correctOptionId: 'b',
    explanation: {
      simpleTerms:
        'The Azure CLI is a command-line tool that lets you create and manage Azure resources from a terminal or script. It is designed for repeatable automation — you write commands once and run them as many times as needed. The portal is great for manual, visual work but not for scripting from a terminal.',
      realLifeExample:
        'A Kigali startup developer writes a shell script using the Azure CLI to create a resource group, a web app, and a database in one go. Every time the team sets up a new environment, they run the same script from their terminal — no clicking through the portal each time.',
    },
    signal: {
      phrase: 'automate \u2026 using commands run from their local terminal',
      suggests:
        'The words "automate" and "from their local terminal" signal a command-line tool.',
      steps: [
        {
          phrase: 'automate the creation of several Azure resources',
          reasoning: 'Ask: "What kind of tool supports repeatable automation?" A scripting or command-line tool can be run multiple times. The portal is manual and visual — it is not designed for automation.',
        },
        {
          phrase: 'commands run from their local terminal',
          reasoning: 'Ask: "Which Azure tool runs from a terminal?" The Azure CLI is the command-line tool for Azure. It runs from any terminal and can be scripted. This eliminates the portal (web interface), Advisor (recommendations), and Service Health (alerts).',
        },
      ],
      conclusion:
        '"Automate" plus "from their local terminal" signals the Azure CLI. The portal is a graphical interface for manual work; the CLI is built for scripted, repeatable automation from a terminal.',
    },
  },
  {
    id: 'q-mgmt-service-health',
    topicId: 'azure-management',
    prompt:
      'An operations team wants to be alerted when an Azure platform issue — such as a regional outage or planned maintenance — affects their specific resources. Which Azure service should they use?',
    options: [
      {
        id: 'a',
        text: 'Azure Advisor',
        whyIncorrect: 'Advisor gives best-practice recommendations, not real-time alerts about platform issues affecting your resources.',
        distractor: {
          whatItMeans: 'Azure Advisor provides best-practice recommendations across cost, security, reliability, and performance.',
          whyItMaySeemRight: 'Advisor is about the health and improvement of your resources, so it might seem like it alerts you to issues.',
          whyNotHere: 'Advisor suggests improvements — it does not alert you about Azure platform outages or maintenance events. The question asks about platform issues, not recommendations.',
          whenItWouldFit: 'A question about getting recommendations to optimise Azure resources.',
        },
      },
      {
        id: 'b',
        text: 'Azure Service Health',
        whyIncorrect: '',
      },
      {
        id: 'c',
        text: 'Azure Monitor',
        whyIncorrect: 'Azure Monitor tracks the performance and health of your own applications and resources, but it does not report Azure-wide platform issues or planned maintenance.',
        distractor: {
          whatItMeans: 'Azure Monitor collects and analyses telemetry from your applications and Azure resources, with custom alerts and dashboards.',
          whyItMaySeemRight: 'Monitor alerts you to issues with your resources, so it might seem like the right tool for being alerted to problems.',
          whyNotHere: 'Monitor tracks the health of YOUR applications — it does not tell you about Azure platform-wide issues or planned maintenance. The question specifically mentions "Azure platform issue", which is the provider\u2019s infrastructure, not your application.',
          whenItWouldFit: 'A question about monitoring application performance, collecting metrics, or setting custom alerts on your own resources.',
        },
      },
      {
        id: 'd',
        text: 'Azure Cost Management',
        whyIncorrect: 'Cost Management tracks spending and budgets, not platform outages or maintenance events.',
        distractor: {
          whatItMeans: 'Azure Cost Management tracks spending, sets budgets, and provides cost alerts.',
          whyItMaySeemRight: 'Cost Management provides alerts, and the question asks about being alerted.',
          whyNotHere: 'Cost Management is about money — its alerts are for budgets and spending thresholds, not for platform outages or maintenance events.',
          whenItWouldFit: 'A question about tracking or reducing Azure spending.',
        },
      },
    ],
    correctOptionId: 'b',
    explanation: {
      simpleTerms:
        'Azure Service Health gives you a personalised view of Azure platform issues and planned maintenance that affect your specific resources. The key distinction from Azure Monitor: Monitor tracks the health of YOUR applications and resources (your code, your VMs); Service Health tracks the health of the Azure PLATFORM itself (Microsoft\u2019s infrastructure). The question mentions "Azure platform issue", which is the provider\u2019s side.',
      realLifeExample:
        'A Cape Town SaaS company relies on the South Africa North region. Azure Service Health alerts them when planned maintenance is scheduled for that region, so they can warn customers in advance. When a regional outage occurs, they get an immediate notification with the affected services and estimated recovery time.',
    },
    signal: {
      phrase: 'Azure platform issue \u2026 affects their specific resources',
      suggests:
        'The phrase "platform issue" and "affects their specific resources" signals Service Health.',
      steps: [
        {
          phrase: 'Azure platform issue',
          reasoning: 'Ask: "Is this about your application or about the Azure platform?" The question mentions a "regional outage or planned maintenance" — these are Azure platform events, not application-level issues. This rules out Azure Monitor, which tracks your own applications.',
        },
        {
          phrase: 'affects their specific resources',
          reasoning: 'Ask: "Which tool shows platform events personalised to your resources?" Azure Service Health provides a personalised view of platform issues that affect your specific subscriptions and resources. Advisor gives recommendations; Cost Management gives spending alerts. Only Service Health reports on platform events.',
        },
      ],
      conclusion:
        '"Platform issue" (Azure\u2019s infrastructure) plus "affects their specific resources" (personalised to your subscription) signals Service Health. If the question described monitoring your own application metrics, Azure Monitor would apply instead.',
    },
  },
];

export const QUESTIONS: PracticeQuestion[] = [
  ...EXISTING_QUESTIONS,
  ...CONVERTED_QUESTIONS,
];
