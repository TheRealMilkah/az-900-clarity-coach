import type { PracticeQuestion } from '@/types';

function q(
  id: string,
  topicId: string,
  prompt: string,
  options: [string, string, string, string],
  correctIndex: number,
  distractors: [string, string, string], // 3 distractor explanations for the 3 wrong options
  simpleTerms: string,
  realLifeExample: string,
  signalPhrase: string,
  signalSuggests: string,
  steps?: { phrase: string; reasoning: string }[],
  conclusion?: string,
): PracticeQuestion {
  const letters = ['a', 'b', 'c', 'd'];
  return {
    id,
    topicId,
    prompt,
    options: options.map((text, i) => {
      if (i === correctIndex) {
        return { id: letters[i], text, whyIncorrect: '' };
      }
      return {
        id: letters[i],
        text,
        whyIncorrect: distractors[i < correctIndex ? i : i - 1],
        distractor: parseDistractor(distractors[i < correctIndex ? i : i - 1]),
      };
    }),
    correctOptionId: letters[correctIndex],
    explanation: { simpleTerms, realLifeExample },
    signal: { phrase: signalPhrase, suggests: signalSuggests, steps, conclusion },
  };
}

function parseDistractor(text: string) {
  return {
    whatItMeans: text,
    whyItMaySeemRight: 'This option is related to the topic and may sound like a plausible answer at first glance.',
    whyNotHere: text,
    whenItWouldFit: 'This option would fit a different scenario than the one described in the question.',
  };
}

export const CONVERTED_QUESTIONS: PracticeQuestion[] = [
  // az900-001 — Compute — ACI
  q('json-az900-001', 'compute',
    'A farmer in Eldoret wants to run a single container quickly to test his app, no orchestration, pay only while it runs. Which service has the least administrative effort?',
    ['Azure Container Instances', 'Azure Kubernetes Service (AKS)', 'Virtual Machines', 'Azure App Service'],
    0,
    [
      'AKS is for managing hundreds of containers with orchestration, auto-scaling, and self-healing. It is too complex for a single test container.',
      'Virtual Machines require you to manage the operating system, networking, and the container runtime yourself — far more administrative effort than just running a container.',
      'Azure App Service is a managed platform for hosting web applications. While it can run containers, it is designed for always-on web apps, not quick throwaway container tests.',
    ],
    'Azure Container Instances (ACI) lets you run a single container in Azure without managing any servers or orchestration. You pay only while the container is running, and it starts in seconds. This is the simplest way to run one container for a quick test.',
    'A farmer in Eldoret wants to test a new app that predicts maize prices. He packages it as a container and runs it in ACI for 10 minutes during market hours. He pays only for those 10 minutes — no servers to manage, no Kubernetes cluster to configure.',
    'Single container; quick test; no orchestration; minimal administration',
    'The words "single container", "quick test", and "no orchestration" point to ACI, which is designed for running one container with zero infrastructure management.',
    [
      { phrase: 'single container', reasoning: 'Ask: "How many containers?" Just one. AKS is for managing fleets of containers, not a single one.' },
      { phrase: 'no orchestration', reasoning: 'Ask: "Do I need orchestration?" No. AKS provides orchestration (scheduling, scaling, self-healing), which is overkill for one test container.' },
      { phrase: 'pay only while it runs', reasoning: 'Ask: "How should I pay?" Pay-per-execution is a serverless trait. ACI charges per second of container run time — perfect for a short test.' },
    ],
    'Single container + no orchestration + pay while running = Azure Container Instances. AKS is for fleets, VMs need OS management, App Service is for always-on web apps.'),

  // az900-002 — Compute — AKS
  q('json-az900-002', 'compute',
    'You need to manage 100 containers with auto-scaling, self-healing, and rolling updates. Which service should you use?',
    ['Azure Container Instances', 'Azure Kubernetes Service', 'Azure Functions', 'Azure App Service'],
    1,
    [
      'ACI runs individual containers but cannot manage a fleet of 100 containers with auto-scaling or self-healing. It has no built-in orchestration.',
      'Azure Functions runs small pieces of code triggered by events — it does not manage containers at all.',
      'Azure App Service hosts web applications. It cannot orchestrate 100 containers with rolling updates and self-healing.',
    ],
    'Azure Kubernetes Service (AKS) is a managed Kubernetes service that orchestrates large numbers of containers. It handles auto-scaling (adding or removing container instances based on load), self-healing (restarting failed containers automatically), and rolling updates (updating containers one at a time without downtime). ACI cannot do any of these for a fleet.',
    'A Lagos food delivery platform runs 100 microservices as containers. During lunch rush, AKS automatically scales up to handle more orders. If a container crashes, AKS restarts it. When they deploy a new version, AKS rolls it out gradually — one container at a time — so no customers see downtime.',
    'Many containers; orchestration; autoscaling; self-healing; rolling updates',
    'The words "100 containers", "auto-scaling", "self-healing", and "rolling updates" all describe container orchestration, which is exactly what AKS provides.',
    [
      { phrase: 'manage 100 containers', reasoning: 'Ask: "How many containers?" 100 — this is a fleet. ACI handles single containers, not fleets.' },
      { phrase: 'auto-scaling, self-healing, and rolling updates', reasoning: 'Ask: "What features are these?" These are orchestration features. Only Kubernetes (AKS) provides all three for container fleets.' },
    ],
    '100 containers + orchestration features (auto-scaling, self-healing, rolling updates) = AKS. ACI is for single containers, Functions is for event-driven code, App Service is for web apps.'),

  // az900-003 — Compute — App Service
  q('json-az900-003', 'compute',
    'You need to host a custom web API with autoscaling and built-in continuous deployment, without managing the operating system. Which service is the best fit?',
    ['Virtual Machines', 'Azure App Service', 'Azure Container Instances', 'AKS'],
    1,
    [
      'Virtual Machines require you to manage the operating system, patching, and networking yourself. This contradicts the requirement to avoid OS management.',
      'Azure Container Instances runs individual containers but does not provide built-in continuous deployment or autoscaling for web APIs.',
      'AKS can host containers but requires managing the Kubernetes cluster itself — more complexity than needed for a single web API.',
    ],
    'Azure App Service is a managed Platform as a Service (PaaS) offering for hosting web applications and APIs. Microsoft manages the underlying operating system, so you focus only on your application code. It includes built-in autoscaling and supports continuous deployment from GitHub or other source repositories.',
    'An Accra fintech builds a payment API and deploys it to Azure App Service. Microsoft handles the Windows Server updates and security patches. When the developer pushes new code to GitHub, App Service automatically deploys it. During peak transaction hours, the service scales out automatically.',
    'Managed web API hosting; autoscaling; continuous deployment; no OS management',
    'The phrases "no OS management" and "web API" point to a PaaS web hosting service. "Autoscaling" and "continuous deployment" are built-in App Service features.',
    [
      { phrase: 'without managing the operating system', reasoning: 'Ask: "Which model avoids OS management?" PaaS handles the OS for you. This eliminates Virtual Machines (IaaS), where you manage the OS.' },
      { phrase: 'web API with autoscaling and continuous deployment', reasoning: 'Ask: "Which PaaS service hosts web APIs with these features?" App Service is the managed web hosting platform with built-in autoscaling and continuous deployment.' },
    ],
    'No OS management (PaaS) + web API + autoscaling + continuous deployment = Azure App Service. VMs need OS management, ACI is for single containers, AKS is for container fleets.'),

  // az900-004 — Compute — Azure Functions
  q('json-az900-004', 'compute',
    'You need code that runs ONLY when a file is uploaded to Blob storage, with no servers to manage and pay per execution. Which service fits?',
    ['Azure Virtual Machines', 'Azure Functions', 'Azure App Service', 'AKS'],
    1,
    [
      'Virtual Machines run continuously — you pay for them even when idle. They do not start automatically when a file is uploaded.',
      'App Service runs web applications that are always on. It does not execute code only in response to a blob upload event.',
      'AKS orchestrates container fleets. It is not designed for single-event-triggered code execution with pay-per-use billing.',
    ],
    'Azure Functions is a serverless compute service that runs code only when triggered by an event — such as a file being uploaded to Blob storage. You pay only for the time your code runs, not for idle servers. This is called event-driven, serverless computing.',
    'A Dar es Salaam media company uploads video files to Azure Blob Storage. Each upload triggers an Azure Function that automatically creates a thumbnail image. The company pays only for the few seconds the function runs per upload — no servers to maintain.',
    'Code starts when a blob is uploaded; event trigger; pay per execution',
    'The words "ONLY when a file is uploaded", "no servers", and "pay per execution" describe serverless, event-driven computing — the signature of Azure Functions.',
    [
      { phrase: 'runs ONLY when a file is uploaded', reasoning: 'Ask: "What triggers the code?" A blob upload is an event. This is event-driven computing, not always-on hosting.' },
      { phrase: 'no servers, pay per execution', reasoning: 'Ask: "How do I pay?" Pay-per-execution with no server management is serverless. Azure Functions is the serverless option that supports blob trigger.' },
    ],
    'Event trigger (blob upload) + no servers + pay per execution = Azure Functions. VMs are always running, App Service is always-on web hosting, AKS is for container fleets.'),

  // az900-005 — Compute — VMs for OS control
  q('json-az900-005', 'compute',
    'You need full control of the operating system and the ability to install custom software on Windows Server. Which service should you use?',
    ['Azure App Service', 'Azure Functions', 'Virtual Machines', 'Azure Container Instances'],
    2,
    [
      'App Service is a PaaS offering where Microsoft manages the OS. You cannot install custom software on the operating system or control Windows Server directly.',
      'Azure Functions runs small event-driven code snippets. You have no access to the underlying operating system at all.',
      'Azure Container Instances runs containers, not full Windows Server. You cannot install custom software at the OS level.',
    ],
    'Virtual Machines give you full control over the operating system. You can install any custom software, configure Windows Server however you need, and manage patches yourself. This is IaaS — the provider manages the hardware, but you manage everything inside the VM including the OS.',
    'A Kampala logistics company needs to run a legacy Windows Server application that requires custom middleware installed at the OS level. They use an Azure VM running Windows Server, install their middleware, and configure the registry exactly as their on-premises setup requires.',
    'Full guest operating-system control and custom software installation',
    'The phrase "full control of the operating system" and "install custom software" point to IaaS — specifically Virtual Machines, where you manage the OS yourself.',
    [
      { phrase: 'full control of the operating system', reasoning: 'Ask: "Which model gives OS control?" In IaaS (VMs), you manage the OS. In PaaS (App Service, Functions) and containers, the provider or runtime manages the OS — you cannot control it.' },
      { phrase: 'install custom software on Windows Server', reasoning: 'Ask: "Do I need OS-level installation?" Yes. Only VMs allow installing software directly on the Windows Server operating system.' },
    ],
    'Full OS control + custom software installation = Virtual Machines (IaaS). PaaS services hide the OS, and containers do not give OS-level access.'),

  // az900-006 — Networking — NSG
  q('json-az900-006', 'networking',
    'You need to block IP range 197.248.0.0/24 from reaching a single subnet with the least cost. What should you use?',
    ['Azure Firewall', 'Network Security Group (NSG)', 'DDoS Protection Standard', 'Azure Bastion'],
    1,
    [
      'Azure Firewall is a centralized, managed firewall for an entire virtual network. It supports FQDN filtering and threat intelligence, but it is more expensive than an NSG and is overkill for filtering traffic to a single subnet.',
      'DDoS Protection Standard protects against distributed denial-of-service attacks at the network edge. It does not filter specific IP ranges from reaching a subnet.',
      'Azure Bastion provides secure RDP/SSH access to VMs through the Azure portal without a public IP. It is not a traffic filtering tool.',
    ],
    'A Network Security Group (NSG) is a simple, free filtering tool that lets you allow or deny traffic to a subnet or individual VM based on IP address, port, and protocol. For blocking a specific IP range from a single subnet, an NSG is the most cost-effective and direct solution. Azure Firewall is more powerful but costs more and is designed for whole-virtual-network protection.',
    'A Nairobi startup needs to block a suspicious IP range from accessing its application subnet. An engineer adds a deny rule to the subnet NSG for IP range 197.248.0.0/24. The rule takes effect immediately at no additional cost — no need to deploy an expensive firewall.',
    'Block an IP range at a subnet; network-layer filtering',
    'The words "block IP range", "single subnet", and "least cost" point to an NSG — the simple, free, subnet-level traffic filter.',
    [
      { phrase: 'block IP range from reaching a single subnet', reasoning: 'Ask: "What level of filtering?" Filtering one IP range at one subnet is a simple network-layer task. An NSG handles this directly and at no cost.' },
      { phrase: 'least cost', reasoning: 'Ask: "Which is cheapest?" NSGs are free. Azure Firewall is a paid managed service designed for more complex scenarios. For a single subnet IP block, the NSG is the least-cost option.' },
    ],
    'Block IP at a subnet + least cost = NSG. Azure Firewall is for centralized VNet-level filtering with FQDN support and costs money. DDoS Protection and Bastion serve different purposes entirely.'),

  // az900-007 — Networking — Azure Firewall
  q('json-az900-007', 'networking',
    'You need outbound application rules that allow traffic only to specified Microsoft domain names from a virtual network, with threat-intelligence filtering. Which service is the best fit?',
    ['NSG', 'Azure Firewall', 'Network Security Group', 'DDoS Protection'],
    1,
    [
      'NSG (Network Security Group) filters traffic by IP address, port, and protocol at the network layer. It cannot filter by domain name (FQDN) in application rules.',
      'This is the same as option A — an NSG cannot do FQDN-based application filtering or threat-intelligence filtering.',
      'DDoS Protection protects against volumetric denial-of-service attacks. It does not provide outbound application rules or FQDN filtering.',
    ],
    'Azure Firewall is a managed, centralized network firewall that supports application-level rules allowing outbound traffic to specific fully qualified domain names (FQDNs). It also includes threat-intelligence filtering to block traffic to known malicious IPs. NSGs only filter by IP, port, and protocol — they cannot filter by domain name.',
    'A Cape Town bank needs to restrict its virtual network so servers can only connect to specific Microsoft update domains. They deploy Azure Firewall with an application rule allowing only *.update.microsoft.com. The firewall also blocks connections to known malicious IP addresses using threat-intelligence filtering.',
    'Outbound FQDN/application rules plus threat-intelligence filtering',
    'The words "application rules", "domain names" (FQDNs), and "threat-intelligence filtering" are all features of Azure Firewall, not NSGs.',
    [
      { phrase: 'outbound application rules that allow traffic only to specified domain names', reasoning: 'Ask: "Can this filter by domain name?" FQDN filtering is an application-layer feature. NSGs work at the network layer (IP/port/protocol) and cannot filter by domain name. Azure Firewall supports application rules with FQDN filtering.' },
      { phrase: 'threat-intelligence filtering', reasoning: 'Ask: "Which tool has built-in threat intelligence?" Azure Firewall includes threat-intelligence-based filtering. NSGs and DDoS Protection do not.' },
    ],
    'FQDN application rules + threat-intelligence filtering = Azure Firewall. NSGs cannot filter by domain name. DDoS Protection is for attack mitigation, not outbound filtering.'),

  // az900-008 — Networking — DDoS Protection
  q('json-az900-008', 'networking',
    'You need to protect Azure resources from large volumetric DDoS attacks. Which service should you use?',
    ['Network Security Group (NSG)', 'Azure Firewall', 'Azure DDoS Protection', 'Azure Bastion'],
    2,
    [
      'NSGs filter traffic by IP, port, and protocol. They are not designed to absorb or mitigate large-scale volumetric DDoS attacks that flood a network with traffic.',
      'Azure Firewall controls and filters traffic, but it is not specifically designed to handle volumetric DDoS attacks that can overwhelm network capacity.',
      'Azure Bastion provides secure RDP/SSH access to VMs through the portal. It is not a DDoS protection tool.',
    ],
    'Azure DDoS Protection is designed to protect public-facing Azure resources from distributed denial-of-service attacks. It automatically detects and mitigates volumetric attacks at the Azure network edge before they reach your resources. NSGs and Firewalls control traffic flow but are not built to absorb massive flood attacks.',
    'An Accra e-commerce site experiences a 10 Gbps DDoS attack during a major sale. Azure DDoS Protection automatically detects the attack and absorbs the malicious traffic at the Azure network edge. Customers continue shopping without interruption while the attack is neutralised.',
    'Large distributed denial-of-service attack; DDoS protection',
    'The words "large volumetric DDoS attacks" directly point to Azure DDoS Protection, which is purpose-built for this scenario.',
    [
      { phrase: 'large volumetric DDoS attacks', reasoning: 'Ask: "What type of attack is this?" A volumetric DDoS attack floods the network with massive traffic. NSGs and Firewalls cannot absorb this volume. Azure DDoS Protection is specifically designed for this.' },
    ],
    'Volumetric DDoS attack = Azure DDoS Protection. NSGs and Firewalls filter traffic but cannot mitigate flood attacks. Bastion is for secure remote access.'),

  // az900-009 — Networking — Bastion
  q('json-az900-009', 'networking',
    'You need to securely RDP to a VM from the Azure portal WITHOUT a public IP on the VM. Which service should you use?',
    ['Azure Firewall', 'Azure Bastion', 'VPN Gateway', 'ExpressRoute'],
    1,
    [
      'Azure Firewall controls traffic flow in and out of a virtual network. It is not a remote desktop access tool.',
      'VPN Gateway connects networks over an encrypted tunnel. It does not provide RDP access through the Azure portal.',
      'ExpressRoute provides a private dedicated connection to Azure through a connectivity provider. It is not a portal-based RDP tool.',
    ],
    'Azure Bastion provides secure RDP and SSH access to your VMs directly from the Azure portal, without assigning a public IP address to the VM. Bastion acts as a secure jump host — you connect to Bastion over HTTPS (port 443), and Bastion connects to your VM internally. This means your VM is never exposed to the public internet.',
    'A Kigali startup has a VM with no public IP address. An administrator opens the Azure portal, clicks "Bastion", enters their credentials, and gets an RDP session to the VM — all through the browser. The VM remains completely hidden from the public internet.',
    'RDP through the Azure portal without a public IP on the VM',
    'The phrases "secure RDP", "from the Azure portal", and "WITHOUT a public IP" describe Azure Bastion, which is specifically designed for this purpose.',
    [
      { phrase: 'securely RDP from the Azure portal', reasoning: 'Ask: "How do I access the VM?" Through the Azure portal using RDP. Bastion provides browser-based RDP/SSH access directly from the portal.' },
      { phrase: 'WITHOUT a public IP on the VM', reasoning: 'Ask: "Does the VM need a public IP?" No. Bastion connects to the VM internally, so the VM never needs a public IP. This is the key feature that distinguishes Bastion from other access methods.' },
    ],
    'RDP from portal + no public IP on VM = Azure Bastion. Firewall controls traffic, VPN Gateway connects networks, ExpressRoute is a private dedicated line.'),

  // az900-010 — Networking — Point-to-Site VPN
  q('json-az900-010', 'networking',
    'A single developer working from home wants to connect their laptop securely to an Azure VNet over the internet. Which VPN type fits?',
    ['Site-to-Site VPN', 'Point-to-Site VPN', 'ExpressRoute', 'VNet Peering'],
    1,
    [
      'Site-to-Site VPN connects an entire on-premises network to an Azure VNet through a VPN device. It is for connecting whole offices, not individual laptops.',
      'ExpressRoute provides a private dedicated connection through a connectivity provider — not an internet-based VPN for a single laptop.',
      'VNet Peering connects two Azure VNets together. It does not connect a remote laptop to a VNet.',
    ],
    'Point-to-Site (P2S) VPN connects a single client device (a "point") to an Azure virtual network (the "site") over an encrypted tunnel through the internet. It is designed for individual remote users — like a developer working from home — who need secure access to Azure resources without connecting an entire office network.',
    'A developer in Nakuru works from home and needs to access a test database inside an Azure VNet. She installs a VPN client on her laptop, enters the Azure gateway address, and connects. Her laptop now has secure access to the VNet — as if she were in the office.',
    'One remote laptop connects to a virtual network; individual client connection',
    'The words "single developer" and "laptop" point to an individual client connection — a Point-to-Site VPN.',
    [
      { phrase: 'single developer working from home', reasoning: 'Ask: "How many devices?" One laptop. Site-to-Site connects an entire office network, not a single device.' },
      { phrase: 'connect laptop securely to an Azure VNet over the internet', reasoning: 'Ask: "Which VPN type connects one device?" Point-to-Site (P2S) VPN connects one client device to a VNet over an encrypted internet tunnel.' },
    ],
    'One laptop → VNet = Point-to-Site VPN. Site-to-Site is for whole networks. ExpressRoute is private and dedicated. VNet Peering connects two Azure VNets.'),

  // az900-011 — Networking — Site-to-Site VPN
  q('json-az900-011', 'networking',
    'Your entire office network must connect securely to an Azure virtual network over the internet using an encrypted tunnel. Which VPN type fits?',
    ['Point-to-Site VPN', 'Site-to-Site VPN', 'Azure Bastion', 'ExpressRoute with public internet'],
    1,
    [
      'Point-to-Site VPN connects a single client device, not an entire office network. It is for individual remote workers, not office-wide connectivity.',
      'Azure Bastion provides secure RDP/SSH access to individual VMs through the portal. It does not connect an office network to Azure.',
      'ExpressRoute provides a private, dedicated connection through a connectivity provider — not an internet-based encrypted VPN tunnel. The option says "with public internet" which contradicts ExpressRoute purpose.',
    ],
    'A Site-to-Site (S2S) VPN connects an entire on-premises network to an Azure virtual network through an encrypted tunnel over the public internet. It requires a VPN device at the on-premises location. This is the right choice when a whole office needs secure access to Azure resources.',
    'A Lusaka manufacturing company connects its entire headquarters network to Azure using a Site-to-Site VPN. All 200 employees in the office can access Azure-hosted applications through the encrypted tunnel without installing any VPN software on their individual computers.',
    'An entire office network connects through an encrypted VPN tunnel',
    'The phrases "entire office network" and "encrypted tunnel" over the internet point to a Site-to-Site VPN.',
    [
      { phrase: 'entire office network', reasoning: 'Ask: "How many devices?" The whole office. Point-to-Site is for one device. Site-to-Site connects the entire on-premises network to Azure.' },
      { phrase: 'over the internet using an encrypted tunnel', reasoning: 'Ask: "Is this over the internet or a private line?" Over the internet with encryption = VPN. ExpressRoute uses a private dedicated line, not the internet.' },
    ],
    'Entire office network → Azure over encrypted internet tunnel = Site-to-Site VPN. Point-to-Site is for one device. ExpressRoute is private and dedicated. Bastion is for single VM access.'),

  // az900-012 — Networking — ExpressRoute
  q('json-az900-012', 'networking',
    'You need a private, dedicated connection from your organization through a connectivity provider to Azure, without sending traffic over the public internet. Which service fits?',
    ['Site-to-Site VPN', 'ExpressRoute', 'Point-to-Site VPN', 'Azure Bastion'],
    1,
    [
      'Site-to-Site VPN sends traffic over the public internet through an encrypted tunnel. The question specifically says "without sending traffic over the public internet."',
      'Point-to-Site VPN also sends traffic over the public internet. It connects a single device, not an organization-wide private connection.',
      'Azure Bastion provides secure RDP/SSH access to VMs from the portal. It is not a private connectivity service for an organization.',
    ],
    'ExpressRoute provides a private, dedicated connection between your organization and Microsoft cloud services through a connectivity provider. Unlike VPN, ExpressRoute traffic does not travel over the public internet — it uses a private connection through a telecom provider, giving you more reliability, lower latency, and higher security.',
    'A Dakar bank needs a highly secure, low-latency connection to Azure for its core banking system. They use ExpressRoute through a local telecom provider. The connection is private — no traffic goes over the public internet — giving them guaranteed bandwidth and compliance with banking regulations.',
    'Private dedicated connectivity through a provider, not the public internet',
    'The phrases "private, dedicated connection", "through a connectivity provider", and "without the public internet" are the signature of ExpressRoute.',
    [
      { phrase: 'private, dedicated connection', reasoning: 'Ask: "Is this over the internet?" No — it is private and dedicated. VPN (both Site-to-Site and Point-to-Site) sends traffic over the public internet. ExpressRoute uses a private line.' },
      { phrase: 'through a connectivity provider, without the public internet', reasoning: 'Ask: "How is it delivered?" Through a telecom/connectivity provider on a private circuit. This confirms ExpressRoute — VPNs use the public internet.' },
    ],
    'Private + dedicated + no public internet + through a provider = ExpressRoute. VPNs use encrypted internet tunnels. Bastion is for single VM access.'),

  // az900-013 — Networking — VNet Peering
  q('json-az900-013', 'networking',
    'You need to connect two VNets in the same region with low latency and no gateway required. Which should you use?',
    ['VPN Gateway', 'VNet Peering', 'ExpressRoute', 'Azure Bastion'],
    1,
    [
      'VPN Gateway creates an encrypted tunnel over the internet. It requires a gateway and adds latency — it is not the simplest or lowest-latency way to connect two VNets in the same region.',
      'ExpressRoute is a private dedicated connection to Azure through a provider. It is not for connecting two VNets within Azure.',
      'Azure Bastion provides secure RDP/SSH access to VMs. It does not connect VNets together.',
    ],
    'VNet Peering connects two Azure virtual networks directly within the Azure backbone. Traffic between peered VNets stays on the Azure network — no gateway, no VPN, and very low latency. This is the simplest and fastest way to connect two VNets in the same region.',
    'An Addis Ababa tech company has two VNets in the same Azure region — one for its web app and one for its database. They peer the two VNets, and the web app can communicate with the database with minimal latency, as if they were on the same network. No gateway needed, no internet traffic.',
    'Connect virtual networks directly with low latency and no gateway',
    'The phrases "connect two VNets", "low latency", and "no gateway" point to VNet Peering.',
    [
      { phrase: 'connect two VNets in the same region', reasoning: 'Ask: "What am I connecting?" Two Azure VNets. VPN Gateway connects an on-premises network to Azure, not two Azure VNets within the same region.' },
      { phrase: 'low latency, no gateway', reasoning: 'Ask: "Do I need a gateway?" No. VNet Peering connects VNets directly on the Azure backbone without a gateway, giving the lowest possible latency. VPN Gateway requires a gateway and routes traffic through an encrypted tunnel.' },
    ],
    'Two VNets + same region + low latency + no gateway = VNet Peering. VPN Gateway needs a gateway and adds latency. ExpressRoute is for private on-premises connectivity.'),

  // az900-014 — Governance — Azure Policy
  q('json-az900-014', 'governance',
    'You need to prevent resources from being created in East US across 20 subscriptions. Which service should you use, and where can you assign it to cover all 20 subscriptions?',
    ['Resource Lock', 'RBAC', 'Azure Policy', 'Management Group lock'],
    2,
    [
      'A Resource Lock prevents deletion or modification of a specific resource. It cannot prevent resources from being created in a specific region.',
      'RBAC (Role-Based Access Control) controls who can perform actions. While you could restrict who can create resources, it does not enforce a rule about which regions are allowed.',
      'A Management Group lock is not a standard Azure feature. Management groups organize subscriptions, but you use Azure Policy (not locks) to enforce creation rules.',
    ],
    'Azure Policy lets you create rules that resources must follow — such as restricting which Azure regions can be used. You can assign a policy at a management group scope, and it automatically applies to all subscriptions beneath that management group. This is the most efficient way to enforce a region restriction across 20 subscriptions.',
    'A pan-African bank has 20 Azure subscriptions under one management group. A governance administrator assigns an Azure Policy at the management group level that denies resource creation in East US. The policy automatically applies to all 20 subscriptions — no need to configure each one individually.',
    'Prevent deployments by location across many subscriptions; policy scope matters',
    'The words "prevent resources from being created" and "across 20 subscriptions" point to Azure Policy assigned at a management group scope.',
    [
      { phrase: 'prevent resources from being created in East US', reasoning: 'Ask: "What kind of rule?" A rule about where resources can be created. Resource Locks prevent deletion, not creation. Azure Policy can deny resource creation based on location.' },
      { phrase: 'across 20 subscriptions', reasoning: 'Ask: "How do I cover all 20?" Assign the policy at a management group that contains all 20 subscriptions. Azure Policy inherits down the management group hierarchy automatically.' },
    ],
    'Prevent creation by region + 20 subscriptions = Azure Policy at management group scope. Resource Locks protect existing resources. RBAC controls who can act, not what can exist.'),

  // az900-015 — Governance — CanNotDelete Lock
  q('json-az900-015', 'governance',
    'You want to prevent accidental deletion of a Production Resource Group but still allow changes inside it. What should you do?',
    ['Reader RBAC role', 'CanNotDelete Resource Lock', 'Azure Policy', 'Deny Assignment'],
    1,
    [
      'The Reader RBAC role only allows viewing — it blocks all changes, including updates and modifications. The question says you still want to allow changes inside the resource group.',
      'Azure Policy enforces compliance rules (like required tags or allowed regions). It does not specifically prevent accidental deletion while allowing modifications.',
      'A Deny Assignment blocks specific actions for all users, but it is more complex to set up than a lock and is typically used for protecting system-level resources, not for simple accidental deletion prevention.',
    ],
    'A CanNotDelete resource lock prevents the resource group from being deleted while still allowing you to update, modify, and use the resources inside it. Even an owner cannot delete the locked resource group — the lock overrides permissions. This is the simplest, most direct way to prevent accidental deletion without blocking changes.',
    'A Nairobi startup applies a CanNotDelete lock to their "Production" resource group. A junior developer tries to delete it by mistake — Azure blocks the deletion. But the developer can still update the web app, change settings, and deploy new code inside the resource group.',
    'Prevent deletion while still allowing other changes',
    'The words "prevent accidental deletion" combined with "allow changes inside" point to a CanNotDelete resource lock.',
    [
      { phrase: 'prevent accidental deletion', reasoning: 'Ask: "What needs protecting?" The resource group from being deleted. A CanNotDelete lock is the purpose-built tool for this.' },
      { phrase: 'but still allow changes inside', reasoning: 'Ask: "Should changes be blocked?" No — only deletion. A Reader role would block all changes (too restrictive). A CanNotDelete lock allows modifications but blocks deletion.' },
    ],
    'Prevent deletion + allow changes = CanNotDelete lock. Reader blocks everything. Policy enforces rules, not deletion prevention. Deny Assignment is more complex.'),

  // az900-016 — Governance — RBAC custom role
  q('json-az900-016', 'governance',
    'You need to give an intern the ability to restart VMs but NOT delete or create them. What should you use?',
    ['Azure Policy', 'RBAC with custom role', 'Resource Lock', 'Management Group'],
    1,
    [
      'Azure Policy controls what resources can exist (like allowed regions or required tags). It does not control which actions a specific person can perform.',
      'A Resource Lock prevents deletion or modification of a resource. It does not grant specific permissions to specific people.',
      'A Management Group organizes subscriptions for governance. It does not assign specific action permissions to individual users.',
    ],
    'RBAC (Role-Based Access Control) lets you control who can do what. A custom RBAC role can grant exactly the permissions you want — like the ability to restart VMs — without granting delete or create permissions. This is the right tool when you need to give a specific person a specific set of actions.',
    'A Kigali tech company creates a custom RBAC role called "VM Operator" that includes only the "restart virtual machine" action. They assign this role to their intern. The intern can restart VMs when needed but cannot create new ones or delete existing ones — exactly the permissions they need.',
    'Grant a person specific actions; permissions answer who can do what',
    'The words "give intern ability" and specific action control (restart but not delete/create) point to RBAC with a custom role.',
    [
      { phrase: 'give intern ability to restart VMs but NOT delete or create', reasoning: 'Ask: "What am I controlling?" Which actions a specific person can perform. This is a permissions question — RBAC controls who can do what.' },
      { phrase: 'restart but not delete or create', reasoning: 'Ask: "Do built-in roles fit?" Built-in roles like "Virtual Machine Contributor" include delete and create. A custom role lets you pick exactly the actions needed — just restart.' },
    ],
    'Control who can do what = RBAC with custom role. Policy controls what can exist, not who can act. Locks prevent actions on resources, not person-level permissions.'),

  // az900-017 — Governance — Management Groups
  q('json-az900-017', 'governance',
    'You have 50 subscriptions. You want to apply the same Policy and RBAC to all dev subscriptions at once. What groups subscriptions for this purpose?',
    ['Resource Groups', 'Management Groups', 'Availability Sets', 'Azure Blueprints'],
    1,
    [
      'Resource Groups group resources within a single subscription. They do not group multiple subscriptions together.',
      'Availability Sets protect VMs from rack failures within a data centre. They have nothing to do with organising subscriptions.',
      'Azure Blueprints package policies, roles, and templates for repeatable deployments. While Blueprints can be applied at management group scope, the thing that groups subscriptions together is the management group itself.',
    ],
    'Management Groups are containers that organise multiple subscriptions so you can apply governance (like Azure Policy and RBAC) across all of them at once. You place all your dev subscriptions under one management group, then assign policies and role assignments at the management group level — they inherit down to every subscription beneath it.',
    'A pan-African enterprise has 50 Azure subscriptions — 20 for development and 30 for production. They place all 20 dev subscriptions under a "Dev" management group. When they assign a policy at the management group level, it automatically applies to all 20 dev subscriptions — no need to configure each one individually.',
    'Group subscriptions so governance can be applied across them',
    'The words "50 subscriptions" and "apply same Policy and RBAC" to multiple subscriptions at once point to Management Groups.',
    [
      { phrase: '50 subscriptions', reasoning: 'Ask: "What am I organising?" Multiple subscriptions. Resource Groups group resources within one subscription — they cannot group subscriptions.' },
      { phrase: 'apply same Policy and RBAC to all dev subscriptions at once', reasoning: 'Ask: "How do I apply governance across subscriptions?" Management Groups let you assign policies and RBAC at a scope that inherits to all subscriptions beneath it.' },
    ],
    'Group subscriptions + apply governance across them = Management Groups. Resource Groups are for resources within one subscription. Blueprints package deployments but the grouping structure is Management Groups.'),

  // az900-018 — Governance — Resource Groups
  q('json-az900-018', 'governance',
    'You want to group virtual machines by department within one subscription so they can be managed together as a shared lifecycle. Which Azure structure fits?',
    ['Management Groups', 'Resource Groups', 'Availability Zones', 'Subscriptions'],
    1,
    [
      'Management Groups organise subscriptions, not resources within a subscription. They are too high-level for grouping VMs by department.',
      'Availability Zones protect VMs across data centres within a region. They are about availability, not organisation or lifecycle management.',
      'Subscriptions are billing and access boundaries. Using a separate subscription per department is possible but is too broad for simple lifecycle grouping within one subscription.',
    ],
    'A Resource Group is a logical container that groups resources sharing the same lifecycle. You can deploy, manage, monitor, and delete all resources in a resource group together. For grouping VMs by department within one subscription, resource groups are the right structure. Note: for cost reporting by department, use tags (like Department=Finance) rather than relying on resource groups alone.',
    'A Lagos company creates separate resource groups for each department: "Finance-VMs", "HR-VMs", and "IT-VMs" within one subscription. When the Finance team migrates to a new system, they can delete the entire "Finance-VMs" resource group to remove all related resources at once. For cost reporting, they add a Department tag to each VM.',
    'Resources managed together as one lifecycle; tags are better for department cost reporting',
    'The words "group", "within one subscription", and "managed together as a shared lifecycle" point to resource groups.',
    [
      { phrase: 'group virtual machines by department within one subscription', reasoning: 'Ask: "What level am I grouping?" Resources within one subscription. Management Groups are above subscriptions — too high. Subscriptions are billing boundaries — too broad.' },
      { phrase: 'managed together as a shared lifecycle', reasoning: 'Ask: "What feature is this?" Resources that share a lifecycle (deployed, updated, deleted together) belong in a resource group.' },
    ],
    'Group resources within a subscription + shared lifecycle = Resource Groups. Management Groups are for subscriptions. Tags are better for department cost reporting.'),

  // az900-019 — Governance — Azure Policy auto-tag
  q('json-az900-019', 'governance',
    'You want to automatically add the tag "CostCenter=101" to every new VM created. What should you use?',
    ['Resource Lock', 'Azure Policy', 'RBAC', 'Cost Management'],
    1,
    [
      'A Resource Lock prevents deletion or modification of a specific resource. It cannot add tags to new resources automatically.',
      'RBAC controls who can perform actions. It does not automatically modify resources or add tags when they are created.',
      'Cost Management tracks spending and budgets. It does not add tags to resources or enforce tagging rules.',
    ],
    'Azure Policy can enforce rules that automatically add or modify tags when resources are created. Using the "modify" effect, a policy can append a tag like CostCenter=101 to every new VM — even if the creator did not include the tag. This ensures consistent tagging across all resources without relying on people to remember.',
    'A Cape Town company assigns an Azure Policy with a "modify" effect that adds CostCenter=101 to every new VM. When a developer creates a VM and forgets the tag, Azure Policy automatically adds it. The finance team can then generate cost reports by cost centre without any missing tags.',
    'Automatically enforce or append a tag when resources are created',
    'The word "automatically" combined with "add tag" to new resources points to Azure Policy with a modify effect.',
    [
      { phrase: 'automatically add tag', reasoning: 'Ask: "What can automatically modify resources?" Azure Policy can use a "modify" effect to append tags. Locks, RBAC, and Cost Management cannot do this.' },
      { phrase: 'every new VM created', reasoning: 'Ask: "When should it happen?" At creation time. Azure Policy evaluates resources when they are created and can automatically add missing tags.' },
    ],
    'Automatically add tags to new resources = Azure Policy (modify effect). Locks prevent actions, RBAC controls permissions, Cost Management tracks spending.'),

  // az900-020 — Pricing — Cost Management
  q('json-az900-020', 'pricing',
    'Your CEO asks: "We already spend in Azure, where are we overspending THIS MONTH?" Which tool should you use?',
    ['Pricing Calculator', 'TCO Calculator', 'Cost Management + Billing', 'Azure Advisor'],
    2,
    [
      'The Pricing Calculator estimates costs for resources before you deploy them. It cannot show what you are already spending on running resources.',
      'The TCO Calculator compares on-premises total costs with Azure costs. It is a one-time comparison tool, not a live spending tracker.',
      'Azure Advisor gives recommendations including cost tips, but it does not show a detailed breakdown of current spending by resource or department.',
    ],
    'Azure Cost Management + Billing shows you what you are actually spending in Azure right now. It breaks down costs by resource, resource group, subscription, or department. You can see where you are overspending this month, set budgets, and configure alerts. The key distinction: Pricing Calculator estimates before you build; Cost Management tracks after you are running.',
    'A Nairobi startup CEO wants to know why the Azure bill jumped this month. The finance team opens Cost Management and sees that a test VM was left running over the weekend, adding $200 in unexpected compute costs. They set a budget alert to catch this earlier next time.',
    'Review actual current Azure spending',
    'The words "already spend" and "overspending THIS MONTH" point to a tool that tracks actual spending — Cost Management.',
    [
      { phrase: 'already spend in Azure', reasoning: 'Ask: "Are resources already deployed?" Yes — they are already running. The Pricing Calculator estimates before deployment, not after. Cost Management tracks actual spend on running resources.' },
      { phrase: 'where are we overspending THIS MONTH', reasoning: 'Ask: "What do I need?" A breakdown of current spending. Cost Management provides spend analysis, budgets, and alerts for resources already running.' },
    ],
    'Already running + current spend analysis = Cost Management. Pricing Calculator is for pre-deployment estimates. TCO compares on-prem vs cloud. Advisor gives recommendations.'),

  // az900-021 — Pricing — Pricing Calculator
  q('json-az900-021', 'pricing',
    'You are planning a migration of 10 VMs from on-premises to Azure and need to estimate your monthly Azure bill. Which tool should you use first?',
    ['Cost Management', 'Pricing Calculator', 'TCO Calculator', 'Azure Monitor'],
    1,
    [
      'Cost Management tracks spending on resources that are already running. You are still planning the migration — nothing is deployed yet.',
      'The TCO Calculator compares the total cost of on-premises infrastructure vs Azure over time. It is for building a business case, not for estimating the specific monthly Azure bill for a known set of resources.',
      'Azure Monitor tracks the performance and health of running resources. It does not estimate costs.',
    ],
    'The Pricing Calculator lets you select specific Azure resources (like 10 VMs with known sizes), configure them, and see the estimated monthly cost before you deploy anything. It is the right tool when you know what resources you need and want to forecast the bill. Cost Management only works after resources are running.',
    'An Accra company plans to migrate 10 VMs to Azure. An architect uses the Pricing Calculator to select 10 D-series VMs, adds storage and networking, and sees the estimated monthly cost of $3,200. This helps the finance team approve the budget before migration begins.',
    'Estimate Azure costs before migration or deployment',
    'The words "planning migration" and "estimate monthly bill" point to the Pricing Calculator, which forecasts costs before deployment.',
    [
      { phrase: 'planning migration', reasoning: 'Ask: "Are resources deployed?" No — this is planning. Cost Management only works after deployment. The Pricing Calculator estimates costs before you build.' },
      { phrase: 'estimate monthly Azure bill', reasoning: 'Ask: "What do I need?" A cost forecast for specific Azure resources. The Pricing Calculator lets you pick VMs, storage, and networking and shows the estimated monthly cost.' },
    ],
    'Planning + estimate monthly Azure bill = Pricing Calculator. Cost Management is for after deployment. TCO is for on-prem vs cloud comparison. Monitor is for performance.'),

  // az900-022 — Pricing — TCO Calculator
  q('json-az900-022', 'pricing',
    'You want to compare the total cost of your Nakuru data centre (power, cooling, staff) versus Azure over 3 years. Which tool should you use?',
    ['Pricing Calculator', 'TCO Calculator', 'Cost Management', 'Azure Advisor'],
    1,
    [
      'The Pricing Calculator estimates the cost of specific Azure resources. It does not include on-premises costs like power, cooling, and staff.',
      'Cost Management tracks spending on Azure resources that are already running. It does not compare on-premises vs cloud costs.',
      'Azure Advisor gives recommendations to optimise Azure resources. It does not compare total on-premises vs cloud costs.',
    ],
    'The TCO (Total Cost of Ownership) Calculator compares the full cost of running your on-premises data centre — including hidden costs like electricity, cooling, rent, and IT staff — against the cost of running the same workloads in Azure over a period of time. It is designed for building a business case for cloud migration.',
    'A Nakuru manufacturing company wants to decide whether to move its data centre to Azure. The CFO uses the TCO Calculator to enter their current costs: server hardware, electricity, cooling, building rent, and 3 IT staff salaries. The tool shows they would save 40% over 3 years by moving to Azure.',
    'Compare on-premises total ownership costs with Azure costs',
    'The words "compare total cost", "power, cooling, staff", and "over 3 years" point to the TCO Calculator.',
    [
      { phrase: 'compare total cost of data centre (power, cooling, staff) vs Azure', reasoning: 'Ask: "What am I comparing?" The full cost of owning and running an on-premises data centre vs Azure. The Pricing Calculator only estimates Azure resource costs — it does not include on-premises costs like electricity and staff.' },
      { phrase: 'over 3 years', reasoning: 'Ask: "What timeframe?" Multi-year total cost of ownership. The TCO Calculator is designed for this long-term comparison.' },
    ],
    'Compare on-prem total cost (power, cooling, staff) vs Azure = TCO Calculator. Pricing Calculator estimates Azure-only costs. Cost Management tracks running spend.'),

  // az900-023 — Pricing — Azure Advisor
  q('json-az900-023', 'pricing',
    'You want Azure recommendations to reduce costs, like deleting unused disks. Which free tool should you use?',
    ['Cost Management', 'Azure Advisor', 'Pricing Calculator', 'TCO Calculator'],
    1,
    [
      'Cost Management tracks spending and budgets but does not proactively suggest specific cost-saving actions like deleting unused disks.',
      'The Pricing Calculator estimates costs before deployment. It does not analyse your running resources and suggest improvements.',
      'The TCO Calculator compares on-premises vs Azure costs. It does not provide recommendations for optimising existing Azure resources.',
    ],
    'Azure Advisor is a free tool that analyses your Azure resources and gives personalised best-practice recommendations across five categories: cost, security, reliability, operational excellence, and performance. For cost, it might suggest resizing underused VMs, deleting unattached disks, or buying reserved instances to save money.',
    'A Kigali startup opens Azure Advisor and sees a recommendation to delete 8 unattached managed disks costing $120/month. They also see a suggestion to resize 3 VMs that are using less than 10% CPU. Following these recommendations saves them $400 per month.',
    'Get recommendations to improve cost, security, reliability, or performance',
    'The words "recommendations" and "reduce costs" point to Azure Advisor, the free recommendation engine.',
    [
      { phrase: 'recommendations to reduce cost', reasoning: 'Ask: "Which tool gives recommendations?" Azure Advisor provides actionable recommendations across cost, security, reliability, and performance. The other tools track or estimate costs but do not suggest improvements.' },
      { phrase: 'like deleting unused disks', reasoning: 'Ask: "What type of recommendation?" A specific, actionable cost-saving tip. Advisor identifies underused resources and suggests removing or resizing them.' },
    ],
    'Recommendations to optimise Azure resources = Azure Advisor. Cost Management tracks spend. Pricing Calculator estimates. TCO compares on-prem vs cloud.'),

  // az900-024 — Availability — Availability Sets
  q('json-az900-024', 'availability',
    'You need 3 VMs to survive a single rack failure inside ONE data centre. What should you use?',
    ['Availability Zones', 'Availability Sets with Fault Domains', 'Region Pairs', 'Scale Sets'],
    1,
    [
      'Availability Zones protect against an entire data centre failure by spreading VMs across separate data centres within a region. This is broader than the question asks — it says "inside ONE data centre".',
      'Region Pairs protect against an entire region failure by pairing two regions hundreds of miles apart. This is far broader than a single rack failure.',
      'Scale Sets automatically manage a group of identical VMs for load balancing and auto-scaling. They are about capacity, not about protecting against rack failures.',
    ],
    'An Availability Set spreads VMs across multiple fault domains within a single data centre. A fault domain is a group of hardware that shares a power source and network switch — essentially a rack. If one rack fails, VMs in other fault domains keep running. This is the right tool when you need to protect against a rack failure within one data centre.',
    'A Lagos bank runs 3 VMs for its core banking app in one data centre. They place the VMs in an Availability Set with 3 fault domains. Each VM is on a different rack with separate power. When a rack power supply fails, only one VM goes down — the other two keep serving customers.',
    'Protect VMs from a rack-level failure within a datacenter; fault domains',
    'The words "single rack failure" and "inside ONE data centre" point to Availability Sets with fault domains.',
    [
      { phrase: 'single rack failure', reasoning: 'Ask: "What level of failure?" A rack failure. A fault domain in an Availability Set represents a rack. If one rack fails, VMs on other racks survive.' },
      { phrase: 'inside ONE data centre', reasoning: 'Ask: "Is this across data centres or within one?" Within one. Availability Zones span multiple data centres — too broad. Availability Sets protect within one data centre.' },
    ],
    'Rack failure + within one data centre = Availability Sets with Fault Domains. Availability Zones protect across data centres. Region Pairs protect across regions.'),

  // az900-025 — Availability — Availability Zones
  q('json-az900-025', 'availability',
    'Your application must remain available if one availability zone in an Azure region experiences an outage. Which Azure capability is designed for this?',
    ['Availability Set', 'Availability Zones', 'Region Pairs', 'Resource Groups'],
    1,
    [
      'An Availability Set protects against rack failures within a single data centre. It does not protect against an entire availability zone (data centre) outage.',
      'Region Pairs protect against an entire region failing, which is a broader scope than a single zone outage within a region.',
      'Resource Groups are containers for organising resources. They have no availability protection function.',
    ],
    'Availability Zones are separate groups of data centres within an Azure region, each with independent power, cooling, and networking. By spreading your application across multiple zones, if one zone goes down, the other zones keep running. Note: the workload must be configured to use multiple zones — choosing a zone alone does not automatically make an application highly available.',
    'An Accra e-commerce platform deploys its web servers across two availability zones in the South Africa North region. When one zone experiences a power outage, the web servers in the other zone continue serving customers with no interruption.',
    'Survive an availability-zone outage; the workload must use multiple zones',
    'The words "availability zone" and "outage" point to using multiple Availability Zones for protection.',
    [
      { phrase: 'one availability zone experiences an outage', reasoning: 'Ask: "What level of failure?" A zone (data centre) outage within a region. Availability Sets protect at the rack level — too narrow. Region Pairs protect at the region level — too broad.' },
      { phrase: 'remain available', reasoning: 'Ask: "How?" By deploying across multiple zones. The workload must be configured to use multiple zones — choosing a zone alone does not guarantee availability.' },
    ],
    'Zone outage within a region = deploy across multiple Availability Zones. Availability Sets protect racks within one data centre. Region Pairs protect across entire regions.'),

  // az900-026 — Availability — Region Pairs
  q('json-az900-026', 'availability',
    'You are designing disaster recovery for a workload in case its entire Azure region becomes unavailable. Which concept helps identify a paired region for geo-redundancy when replication and failover are configured?',
    ['Availability Zones', 'Region Pairs', 'Availability Sets', 'Scale Sets'],
    1,
    [
      'Availability Zones protect against a single data centre failure within a region. The question describes the entire region becoming unavailable — zones are within one region, so they would all be affected.',
      'Availability Sets protect against rack failures within a single data centre. They are the narrowest protection level and cannot help when an entire region goes down.',
      'Scale Sets manage groups of identical VMs for auto-scaling. They are about capacity, not regional disaster recovery.',
    ],
    'Azure Region Pairs identify specific paired regions within the same geography for disaster recovery. If one region fails, you can fail over to its paired region. Note: a region pair by itself does not automatically replicate resources or fail over applications — you must configure replication and failover for the specific services you are using.',
    'A Cape Town insurance company hosts its customer portal in South Africa North. Azure pairs this region with South Africa West, over 1,000 km away. The company configures geo-redundant storage and a failover plan. If South Africa North goes down entirely, they fail over to South Africa West and keep serving policyholders.',
    'Regional disaster recovery; paired region plus configured replication and failover',
    'The words "entire Azure region" and "paired region" point to Region Pairs for geo-redundancy.',
    [
      { phrase: 'entire Azure region becomes unavailable', reasoning: 'Ask: "What level of failure?" The entire region. Availability Zones and Sets are within one region — they would all be affected. You need a second region.' },
      { phrase: 'paired region for geo-redundancy', reasoning: 'Ask: "How do I identify the second region?" Region Pairs identify the specific paired region for disaster recovery. You must then configure replication and failover for your services.' },
    ],
    'Entire region failure = Region Pairs. The pair identifies the target region, but you must configure replication and failover. Availability Zones and Sets are within one region.'),

  // az900-027 — Cloud Concepts — Elasticity
  q('json-az900-027', 'cloud-concepts',
    'Your e-commerce app needs to add 5 VMs when CPU goes above 80% during a sale, and remove them at night automatically. Which cloud benefit is this?',
    ['High Availability', 'Elasticity', 'Fault Tolerance', 'Geo-distribution'],
    1,
    [
      'High Availability is about keeping services running with minimal downtime. It is not about automatically adding and removing resources based on demand.',
      'Fault Tolerance is about a system continuing to work even when components fail. It is not about adjusting capacity in response to load.',
      'Geo-distribution is about deploying resources in multiple geographic regions. It is not about automatic scaling.',
    ],
    'Elasticity is the ability to automatically add resources when demand increases and remove them when demand decreases. The key difference from scalability: scalability is the ability to grow (or shrink) resources; elasticity is the automatic, two-way adjustment in real time. Here, the system adds 5 VMs during a sale and removes them at night — that is elasticity.',
    'A Lagos e-commerce app runs a Black Friday sale. When CPU usage exceeds 80%, Azure automatically adds 5 VMs to handle the traffic. After midnight when traffic drops, the 5 VMs are automatically removed. The company pays only for the extra VMs during the sale hours — not 24/7.',
    'Resources scale out and back in as demand changes; elasticity',
    'The words "add 5 VMs", "automatically", and "remove them at night" describe elasticity — automatic two-way scaling.',
    [
      { phrase: 'add 5 VMs when CPU > 80%', reasoning: 'Ask: "Is this growing capacity?" Yes — adding VMs when load increases. But scalability also includes growing. The word "automatically" is the key.' },
      { phrase: 'remove them at night automatically', reasoning: 'Ask: "Does it also shrink?" Yes — automatic removal when demand drops. This two-way automatic adjustment (grow and shrink) is what distinguishes elasticity from scalability.' },
    ],
    'Automatic add AND remove based on demand = Elasticity. Scalability is the ability to scale (can be manual). High Availability is about uptime. Fault Tolerance is about surviving failures.'),

  // az900-028 — Storage — Archive tier
  q('json-az900-028', 'storage',
    'You need to store database backups for 10 years, rarely accessed, with the lowest storage cost. Higher retrieval cost is acceptable. Which storage tier should you use?',
    ['Hot', 'Cool', 'Archive', 'Premium'],
    2,
    [
      'The Hot tier is for frequently accessed data with the lowest access cost but the highest storage cost. For rarely accessed 10-year backups, Hot is too expensive.',
      'The Cool tier is for infrequently accessed data (at least 30 days). It has lower storage cost than Hot but higher than Archive. For 10-year backups that are rarely accessed, Archive is cheaper.',
      'Premium is the highest-performance tier for SSD-based storage with very low latency. It is the most expensive option and is designed for active workloads, not long-term backups.',
    ],
    'The Archive tier offers the lowest storage cost of all Azure Blob Storage tiers, making it ideal for long-term data like backups that are rarely accessed. The trade-off is that retrieval takes longer (hours) and costs more. For 10-year backups that you almost never access, Archive is the most cost-effective choice.',
    'A Dar es Salaam bank stores 10 years of transaction backups in the Archive tier. The storage cost is very low — just a few dollars per terabyte per month. If auditors request a specific backup, retrieval takes several hours and costs more, but this happens so rarely that the overall savings are significant.',
    'Rarely accessed long-term blob data; lowest storage cost with slower, costly retrieval',
    'The words "rarely accessed", "lowest storage cost", and "higher retrieval cost acceptable" point to the Archive tier.',
    [
      { phrase: 'rarely accessed', reasoning: 'Ask: "How often is this data accessed?" Rarely. Hot is for frequent access. Cool is for infrequent access (at least 30 days). Archive is for very rarely accessed data.' },
      { phrase: 'lowest storage cost, higher retrieval cost OK', reasoning: 'Ask: "Which tier optimises for storage cost over access cost?" Archive has the lowest storage cost but the highest retrieval cost and slowest retrieval time. This matches the question exactly.' },
    ],
    'Rarely accessed + lowest storage cost + retrieval cost OK = Archive tier. Hot is for frequent access. Cool is for infrequent access. Premium is for high performance.'),

  // az900-029 — Storage — Hot tier
  q('json-az900-029', 'storage',
    'You need storage for frequently accessed website images with the lowest access cost. Which storage tier should you use?',
    ['Hot', 'Cool', 'Archive', 'Cold'],
    0,
    [
      'The Cool tier is for infrequently accessed data. It has lower storage cost but higher access cost than Hot. For frequently accessed images, the access costs would add up.',
      'The Archive tier is for rarely accessed long-term data. Retrieval takes hours and costs the most. This is completely unsuitable for website images that users view constantly.',
      '"Cold" is not a standard Azure Blob Storage tier name. The standard tiers are Hot, Cool, and Archive.',
    ],
    'The Hot tier is designed for data that is accessed frequently. It has the lowest access cost (cheapest to read from) but a higher storage cost than Cool or Archive. For website images that users view all the time, the low access cost of Hot makes it the most economical choice — even though the per-GB storage cost is higher, you save on the frequent read operations.',
    'A Nairobi news website stores thousands of article images in the Hot tier. Readers view these images constantly throughout the day. Because access is frequent, the low read cost of the Hot tier makes it cheaper overall than Cool, even though the storage cost per GB is slightly higher.',
    'Frequently accessed blob data; lower access costs',
    'The words "frequently accessed" and "lowest access cost" point to the Hot tier.',
    [
      { phrase: 'frequently accessed', reasoning: 'Ask: "How often is this data accessed?" Frequently — users view website images constantly. The Hot tier is designed for frequent access with the lowest read cost.' },
      { phrase: 'lowest access cost', reasoning: 'Ask: "Which tier has the lowest access cost?" Hot. Cool and Archive have lower storage costs but higher access costs. For frequently accessed data, the access cost matters more than the storage cost.' },
    ],
    'Frequently accessed + lowest access cost = Hot tier. Cool is for infrequent access. Archive is for rare long-term access. "Cold" is not a standard tier.'),

  // az900-030 — Storage — GRS
  q('json-az900-030', 'storage',
    'Which Azure Storage redundancy option copies data to a secondary region for regional-failure protection, without adding zone redundancy within the primary region?',
    ['LRS', 'ZRS', 'GRS', 'GZRS'],
    2,
    [
      'LRS (Locally Redundant Storage) keeps three copies within a single data centre. It does not copy data to a secondary region.',
      'ZRS (Zone-Redundant Storage) keeps three synchronous copies across three data centres within one region. It does not copy data to a secondary region.',
      'GZRS (Geo-Zone-Redundant Storage) copies data to a secondary region AND adds zone redundancy within the primary region. The question says "without adding zone redundancy", which rules out GZRS.',
    ],
    'GRS (Geo-Redundant Storage) replicates data locally within the primary region (using LRS) and then asynchronously copies it to a secondary paired region. This protects against a regional failure. GZRS also copies to a secondary region but adds zone redundancy (ZRS) in the primary region — the question says "without adding zone redundancy", which distinguishes GRS from GZRS.',
    'A Kampala health-tech company stores patient records using GRS in the South Africa North region. Data is replicated three times within the primary data centre, then asynchronously copied to South Africa West. If the entire South Africa North region fails, the company can fail over to the secondary region. They chose GRS (not GZRS) because they did not need zone redundancy within the primary region.',
    'Copy data to a secondary region; distinguish GRS from GZRS',
    'The words "secondary region" plus "without adding zone redundancy" point to GRS, not GZRS.',
    [
      { phrase: 'copies data to a secondary region', reasoning: 'Ask: "Which options copy to a secondary region?" GRS and GZRS both do. LRS and ZRS do not — they keep data within one region.' },
      { phrase: 'without adding zone redundancy within the primary region', reasoning: 'Ask: "Does the primary region have zone redundancy?" GRS uses LRS in the primary (no zone redundancy). GZRS uses ZRS in the primary (zone redundancy). The question says no zone redundancy, so GRS is the answer.' },
    ],
    'Secondary region + no zone redundancy in primary = GRS. GZRS adds zone redundancy in the primary region. LRS and ZRS do not copy to a secondary region.'),

  // az900-031 — Security — Storage Blob Data Reader
  q('json-az900-031', 'security',
    'A storage account contains containers named "invoices" and "photos". You need a user to read blobs only in the "invoices" container. Which approach gives access at the required scope?',
    ['Assign Reader at the subscription scope', 'Assign Storage Blob Data Reader at the invoices container scope', 'Apply a resource lock to the invoices container', 'Share the storage account key'],
    1,
    [
      'Assigning Reader at the subscription scope gives read access to all resources in the entire subscription, not just the invoices container. This is far broader than needed and violates least-privilege.',
      'A resource lock prevents deletion or modification of a resource. It does not grant data access permissions to users.',
      'Sharing the storage account key gives full access to all data in the entire storage account — including the photos container. This is much broader than needed and is a security risk.',
    ],
    'Assigning the "Storage Blob Data Reader" role at the invoices container scope gives the user read access to blob data only within that specific container. This follows the principle of least privilege — the user can read invoices but cannot access the photos container or any other data. The Reader role at subscription scope is too broad, and sharing the storage account key gives full access to everything.',
    'A Nairobi auditor needs to review invoice files in Azure Storage. The admin assigns the Storage Blob Data Reader role scoped to the "invoices" container only. The auditor can read all invoice blobs but cannot see or access the "photos" container — least privilege applied correctly.',
    'Only one container; least-privilege data role at container scope',
    'The words "read blobs only in the invoices container" point to a data-role assignment scoped to that specific container.',
    [
      { phrase: 'read blobs only in the invoices container', reasoning: 'Ask: "What scope?" Just one container. Reader at subscription scope is far too broad. A storage account key gives access to everything. The right approach is a data role scoped to the container.' },
      { phrase: 'least privilege', reasoning: 'Ask: "Which role gives read-only blob access?" Storage Blob Data Reader is the data-plane role for reading blob data. Assigning it at the container scope ensures the user can only access that one container.' },
    ],
    'Read only one container = Storage Blob Data Reader at container scope. Reader at subscription is too broad. Account key gives full access. Locks do not grant access.'),

  // az900-032 — Security — Key Vault
  q('json-az900-032', 'security',
    'Which Azure service provides centralized secret storage for API keys, certificates, and passwords?',
    ['Azure Storage', 'Azure Key Vault', 'Azure Information Protection', 'Microsoft Defender'],
    1,
    [
      'Azure Storage stores files, blobs, tables, and queues. It is not designed for storing secrets like API keys and certificates securely.',
      'Azure Information Protection classifies and protects sensitive documents using labels and encryption. It is not a secret storage service.',
      'Microsoft Defender for Cloud is a cloud security posture management and threat protection service. It does not store secrets, keys, or certificates.',
    ],
    'Azure Key Vault is a centralized cloud service for securely storing and managing secrets, encryption keys, and certificates. Applications can retrieve secrets from Key Vault at runtime instead of hardcoding them in code. Key Vault also handles key rotation, access policies, and audit logging.',
    'A Lagos fintech stores its payment gateway API key in Azure Key Vault. The payment application retrieves the key from Key Vault at startup — the key is never stored in the application code or configuration files. When the API key needs rotating, an admin updates it in Key Vault without changing the application.',
    'Central place for secrets, keys, and certificates',
    'The words "centralized secret storage" for "API keys, certificates, and passwords" point directly to Azure Key Vault.',
    [
      { phrase: 'centralized secret storage for API keys, certificates, passwords', reasoning: 'Ask: "Which service stores secrets centrally?" Key Vault is the purpose-built service for secrets, keys, and certificates. Storage is for files, Information Protection is for document classification, Defender is for threat protection.' },
    ],
    'Secrets, keys, certs = Azure Key Vault. Storage is for files. Information Protection is for document protection. Defender is for security posture.'),

  // az900-033 — Security — Conditional Access
  q('json-az900-033', 'security',
    'You need to enforce MFA for all Global Admins. Where do you configure this?',
    ['Azure Policy', 'Microsoft Entra ID (Azure AD) Conditional Access', 'Resource Lock', 'NSG'],
    1,
    [
      'Azure Policy enforces compliance rules on Azure resources (like tags and regions). It does not control identity security policies like MFA.',
      'A Resource Lock prevents deletion or modification of a specific resource. It has nothing to do with identity or MFA.',
      'An NSG filters network traffic by IP, port, and protocol. It is a networking tool, not an identity security tool.',
    ],
    'Microsoft Entra ID (formerly Azure AD) Conditional Access lets you create identity-based security policies, such as requiring MFA for specific roles. You can configure a policy that says: "If the user is a Global Admin, require MFA before access is granted." This is the right tool for identity security rules, as opposed to Azure Policy which handles resource compliance.',
    'A Cape Town bank requires all Global Admins to use MFA. The identity admin creates a Conditional Access policy in Microsoft Entra ID: "If user role = Global Admin, require MFA." When a Global Admin signs in, they must approve the login on their phone before gaining access.',
    'Require MFA using identity-based Conditional Access policies',
    'The words "enforce MFA" and "Global Admins" point to Conditional Access in Microsoft Entra ID — the identity-based security policy tool.',
    [
      { phrase: 'enforce MFA for all Global Admins', reasoning: 'Ask: "Is this about resources or identities?" Identities — specifically Global Admins. Azure Policy handles resource compliance, not identity security. Conditional Access is the identity policy engine in Entra ID.' },
      { phrase: 'MFA', reasoning: 'Ask: "Which tool configures MFA policies?" Conditional Access policies in Microsoft Entra ID can require MFA based on user, role, location, or risk level.' },
    ],
    'MFA for identities = Conditional Access in Entra ID. Azure Policy is for resource compliance. Locks protect resources. NSGs filter network traffic.'),

  // az900-034 — Cloud Concepts — SaaS shared responsibility
  q('json-az900-034', 'cloud-concepts',
    'In the shared responsibility model, what is Microsoft responsible for in a SaaS deployment like Microsoft 365?',
    ['Only physical datacenter', 'Physical, network, OS, application', 'Customer manages everything', 'Only data'],
    1,
    [
      'Microsoft does not manage only the physical data centre in SaaS — they also manage the network, operating system, and the application itself. This answer is too narrow.',
      'The customer does not manage everything in SaaS — Microsoft manages the infrastructure and the application. The customer manages their own data, identities, and access configuration.',
      'Microsoft is not responsible for "only data" — in SaaS, data is one of the customer responsibilities, not a provider responsibility.',
    ],
    'In SaaS (Software as a Service), the cloud provider manages the entire stack: the physical data centre, networking, operating system, and the application itself. The customer is responsible for their own data, user identities and access, and service configuration. Exact responsibilities depend on the specific service and how it is configured.',
    'A Nairobi company uses Microsoft 365 (SaaS) for email and productivity. Microsoft manages the data centres, network, Windows Server updates, and the Exchange and SharePoint applications. The company is responsible for its data (emails, documents), user accounts, and who can access what.',
    'SaaS provider manages the application and infrastructure; customer still manages data and access responsibilities',
    'The word "SaaS" signals that the provider manages the most — including the application layer.',
    [
      { phrase: 'SaaS deployment like Microsoft 365', reasoning: 'Ask: "Which model is this?" SaaS. In SaaS, the provider manages the most: physical, network, OS, and the application. This is the key difference from IaaS (customer manages OS) and PaaS (provider manages OS but not the customer application).' },
      { phrase: 'what is Microsoft responsible for', reasoning: 'Ask: "What does the provider manage in SaaS?" Everything below the data: physical data centre, network, operating system, and the application itself. The customer retains responsibility for data, identities, and access.' },
    ],
    'SaaS = provider manages physical + network + OS + application. Customer manages data, identities, and access. In IaaS, customer also manages OS. In PaaS, provider manages OS but not the customer application.'),

  // az900-035 — Cloud Concepts — IaaS OS patching
  q('json-az900-035', 'cloud-concepts',
    'In IaaS (Virtual Machines), who patches the guest operating system?',
    ['Microsoft', 'Customer', 'Shared', 'No one'],
    1,
    [
      'Microsoft manages the physical hardware and virtualisation layer, but in IaaS the customer is responsible for the guest operating system, including patching.',
      'Patching is not a shared responsibility in IaaS — the guest OS is entirely the customer responsibility. The provider handles the physical infrastructure only.',
      'Patching is not "no one" — it is clearly the customer responsibility in IaaS. Failing to patch leaves the VM vulnerable.',
    ],
    'In IaaS (Infrastructure as a Service), the customer is responsible for patching the guest operating system. Microsoft manages the physical hardware, networking, and virtualisation layer, but everything inside the VM — the OS, middleware, applications, and data — is the customer responsibility. This is the key difference from PaaS, where Microsoft patches the OS, and SaaS, where Microsoft manages even more.',
    'An Eldoret startup runs a VM in Azure. Microsoft keeps the physical server and network running, but the startup IT team must install Windows updates, apply security patches, and update the antivirus on the VM themselves. If they moved to a PaaS service like App Service, Microsoft would handle the OS patching for them.',
    'IaaS virtual machine; guest OS is customer-managed',
    'The word "IaaS" signals that the customer manages the operating system, including patching.',
    [
      { phrase: 'IaaS (Virtual Machines)', reasoning: 'Ask: "Which model is this?" IaaS. In IaaS, the provider manages physical hardware and virtualisation. The customer manages everything inside the VM, including the guest OS.' },
      { phrase: 'patches the guest operating system', reasoning: 'Ask: "Who is responsible for the OS in IaaS?" The customer. In PaaS, the provider patches the OS. In SaaS, the provider manages the OS and the application. IaaS is the only model where the customer patches the OS.' },
    ],
    'IaaS = customer patches the guest OS. PaaS = provider patches the OS. SaaS = provider manages OS and application. Physical hardware is always the provider responsibility.'),

  // az900-036 — Cloud Concepts — PaaS SQL DB
  q('json-az900-036', 'cloud-concepts',
    'Azure SQL Database is a PaaS service. What does the customer manage?',
    ['Physical hardware', 'OS patching', 'Data and access', 'Network'],
    2,
    [
      'Microsoft manages the physical hardware in all cloud models, including PaaS. The customer never touches the physical servers.',
      'In PaaS, Microsoft manages the operating system, including patching. The customer does not patch the OS in a PaaS service.',
      'Microsoft manages the underlying network infrastructure. The customer does not manage the network in a PaaS database service.',
    ],
    'Azure SQL Database is a PaaS (Platform as a Service) offering. Microsoft manages the physical infrastructure, networking, operating system, and database engine — including patching and backups. The customer remains responsible for their own data, access controls (who can read or write to the database), and database/application configuration. This is the same responsibility split for all PaaS services.',
    'A Kigali startup uses Azure SQL Database for its product catalogue. Microsoft handles server maintenance, OS patches, and automatic backups. The startup manages its data (product listings, prices), decides who can access the database, and configures query performance settings.',
    'Managed PaaS database; customer retains data and access responsibilities',
    'The word "PaaS" signals that the provider manages the infrastructure and OS, while the customer manages data and access.',
    [
      { phrase: 'Azure SQL Database is a PaaS service', reasoning: 'Ask: "Which model is this?" PaaS. In PaaS, the provider manages physical hardware, network, OS, and the platform (database engine). The customer manages data and access.' },
      { phrase: 'what does the customer manage', reasoning: 'Ask: "What remains the customer job in PaaS?" Data and access. The customer decides what data to store, who can access it, and how the application uses it. Everything below that is the provider responsibility.' },
    ],
    'PaaS = customer manages data and access. Provider manages hardware, network, OS, and platform. In IaaS, customer also manages OS. In SaaS, provider manages the application too.'),

  // az900-037 — Databases — Azure SQL Database
  q('json-az900-037', 'databases',
    'You need a relational database with full SQL support, managed automatically (auto-patching, no OS access needed). Which service should you use?',
    ['SQL Server on VM', 'Azure SQL Database', 'Cosmos DB', 'Table Storage'],
    1,
    [
      'SQL Server on a VM is IaaS — you manage the operating system, patching, and backups yourself. The question asks for a managed service with auto-patching and no OS access.',
      'Cosmos DB is a NoSQL database, not a relational SQL database. The question specifically asks for "full SQL support" and a "relational database".',
      'Table Storage is a simple key-value NoSQL store, not a relational database with full SQL query support.',
    ],
    'Azure SQL Database is a fully managed PaaS relational database service. Microsoft handles the server, operating system, patching, backups, and high availability. You get full T-SQL support without managing any infrastructure. This is different from SQL Server on a VM (IaaS), where you manage the OS and patching yourself.',
    'An Accra startup needs a relational database for its inventory system. They choose Azure SQL Database so Microsoft handles patching, backups, and server maintenance. The developers write standard SQL queries and focus on building features — no one on the team needs to be a database administrator.',
    'Managed relational SQL database without OS administration',
    'The words "relational database", "full SQL", "managed", and "auto-patching" point to Azure SQL Database (PaaS).',
    [
      { phrase: 'relational database with full SQL support', reasoning: 'Ask: "What type of database?" Relational with full SQL. Cosmos DB is NoSQL. Table Storage is key-value. Only SQL Database and SQL Server on VM offer full SQL.' },
      { phrase: 'managed, auto-patching, no OS access', reasoning: 'Ask: "PaaS or IaaS?" The desire for auto-patching and no OS access means PaaS. Azure SQL Database is the PaaS option. SQL Server on VM is IaaS — you manage OS and patching.' },
    ],
    'Relational SQL + managed + auto-patching = Azure SQL Database (PaaS). SQL on VM is IaaS (you manage OS). Cosmos DB and Table Storage are NoSQL.'),

  // az900-038 — Databases — Cosmos DB
  q('json-az900-038', 'databases',
    'You need a globally distributed NoSQL database with low-latency access across regions and multi-region writes. Which Azure service fits?',
    ['Azure SQL Database', 'Azure Cosmos DB', 'Blob Storage', 'MySQL on VM'],
    1,
    [
      'Azure SQL Database is a relational database, not a NoSQL database. The question specifically asks for NoSQL.',
      'Blob Storage stores unstructured file data, not a NoSQL database with multi-region writes and low-latency query capability.',
      'MySQL on a VM is a relational database that you manage yourself (IaaS). It is not NoSQL and is not globally distributed by default.',
    ],
    'Azure Cosmos DB is a globally distributed NoSQL database service. It supports low-latency access across multiple regions and can be configured for multi-region writes. It is designed for applications that need fast, globally distributed data access with automatic replication.',
    'A Lagos social media app uses Cosmos DB to store user profiles and posts. Users in Nigeria, Ghana, and Kenya all experience low latency because Cosmos DB replicates data to Azure regions across Africa. When a user in Accra posts an update, it is written to the West Africa region and automatically replicated to other regions.',
    'Globally distributed NoSQL database; multi-region writes must be configured',
    'The words "globally distributed", "NoSQL", and "multi-region writes" point to Azure Cosmos DB.',
    [
      { phrase: 'globally distributed NoSQL database', reasoning: 'Ask: "What type?" NoSQL, not relational. This eliminates Azure SQL Database and MySQL on VM. Blob Storage is not a database.' },
      { phrase: 'low-latency access across regions with multi-region writes', reasoning: 'Ask: "Which NoSQL service does this?" Cosmos DB is the globally distributed NoSQL database in Azure, designed for multi-region low-latency access. Multi-region writes must be configured — they are not automatic.' },
    ],
    'Globally distributed + NoSQL + multi-region writes = Azure Cosmos DB. SQL Database is relational. Blob Storage is file storage. MySQL on VM is IaaS and relational.'),

  // az900-039 — Analytics — HDInsight
  q('json-az900-039', 'analytics',
    'You need to run big data analytics with Hadoop clusters on demand, paying per job. Which Azure service should you use?',
    ['HDInsight', 'Azure Functions', 'App Service', 'AKS'],
    0,
    [
      'Azure Functions runs small event-driven code snippets triggered by events. It is not designed for big data analytics with Hadoop clusters.',
      'App Service hosts web applications and APIs. It is not a big data analytics platform.',
      'AKS orchestrates container fleets. While you could run Hadoop in containers, AKS is not a managed Hadoop/Spark analytics service.',
    ],
    'Azure HDInsight is a managed big data analytics service that supports Hadoop, Spark, Kafka, and other big data frameworks. You can create clusters on demand, run your analytics jobs, and then delete the cluster — paying only for the time the cluster was running. This is more cost-effective than running a permanent Hadoop cluster.',
    'A Nakuru agricultural research firm needs to analyse 5 TB of crop yield data once a quarter. They create an HDInsight Spark cluster, run their analysis in 3 hours, then delete the cluster. They pay only for those 3 hours of cluster time — no need to maintain a permanent Hadoop installation.',
    'Managed Hadoop/Spark big-data analytics service',
    'The words "big data analytics", "Hadoop clusters", and "on demand" point to Azure HDInsight.',
    [
      { phrase: 'big data analytics with Hadoop clusters', reasoning: 'Ask: "Which service runs managed Hadoop?" HDInsight is the managed Hadoop/Spark service in Azure. Functions, App Service, and AKS are not big data analytics platforms.' },
      { phrase: 'on demand, paying per job', reasoning: 'Ask: "Can I create and delete clusters as needed?" Yes. HDInsight lets you create clusters on demand and delete them after the job, paying only for the time used.' },
    ],
    'Big data + Hadoop + on demand = HDInsight. Functions is for small event-driven code. App Service is for web hosting. AKS is for container orchestration.'),

  // az900-040 — Monitoring — Azure Monitor + Log Analytics
  q('json-az900-040', 'monitoring',
    'You need to query and analyze logs collected from multiple Azure resources to troubleshoot an issue. Which tool combination is the best fit?',
    ['Azure Advisor', 'Azure Monitor + Log Analytics', 'Cost Management', 'Service Health'],
    1,
    [
      'Azure Advisor provides best-practice recommendations for improving resources. It does not collect or query logs from multiple resources.',
      'Cost Management tracks spending and budgets. It does not collect or query application logs.',
      'Service Health reports on Azure platform issues and outages. It does not collect logs from your individual resources for troubleshooting.',
    ],
    'Azure Monitor collects telemetry data (metrics and logs) from your Azure resources and applications. Log Analytics is the tool within Azure Monitor that lets you write queries (using Kusto Query Language) to search and analyse log data from multiple resources. Together, they let you collect, query, and visualise logs to troubleshoot issues across your Azure environment.',
    'A Dar es Salaam company notices its web app is slow. An engineer uses Azure Monitor to collect logs from the app service, the database, and the network. In Log Analytics, they write a query to find all error logs from the last hour across all three resources, identify a database connection timeout, and fix it.',
    'Collect and query logs from multiple Azure resources',
    'The words "query and analyze logs" from "multiple Azure resources" point to Azure Monitor + Log Analytics.',
    [
      { phrase: 'query and analyze logs', reasoning: 'Ask: "Which tool lets you write log queries?" Log Analytics within Azure Monitor. Advisor gives recommendations, not log queries. Cost Management tracks money. Service Health reports platform issues.' },
      { phrase: 'collected from multiple Azure resources', reasoning: 'Ask: "Can it aggregate logs from many resources?" Yes. Azure Monitor collects logs from multiple sources, and Log Analytics lets you query across all of them in one place.' },
    ],
    'Query logs from multiple resources = Azure Monitor + Log Analytics. Advisor gives recommendations. Cost Management tracks spend. Service Health reports platform outages.'),

  // az900-041 — Monitoring — Service Health
  q('json-az900-041', 'monitoring',
    'You need to know if an Azure region has an outage affecting your VMs. Which tool should you check first?',
    ['Azure Monitor', 'Azure Service Health', 'Azure Advisor', 'Cost Management'],
    1,
    [
      'Azure Monitor tracks the performance and health of your own applications and resources. It does not tell you about Azure platform-wide outages or region-level issues.',
      'Azure Advisor provides best-practice recommendations for improving resources. It does not report on Azure platform outages.',
      'Cost Management tracks spending and budgets. It does not report on platform outages or service issues.',
    ],
    'Azure Service Health gives you a personalised view of Azure platform issues that affect your specific resources. If an Azure region has an outage, Service Health shows you which of your resources are affected, the current status, and estimated recovery time. The key distinction: Azure Monitor tracks YOUR applications; Service Health tracks the Azure PLATFORM itself.',
    'A Kampala startup notices its VMs in South Africa North are unreachable. An engineer checks Azure Service Health and sees that the region is experiencing a platform outage. They see the affected services, the current status, and an estimated recovery time — so they can inform their customers instead of guessing what is wrong.',
    'Azure platform incident or outage affecting your subscription',
    'The words "Azure region has an outage" point to Azure Service Health, which reports platform-level issues.',
    [
      { phrase: 'Azure region has an outage', reasoning: 'Ask: "Is this about your app or the Azure platform?" The platform. Azure Monitor tracks your applications. Service Health reports on Azure platform incidents and outages that affect your resources.' },
      { phrase: 'affecting your VMs', reasoning: 'Ask: "Which tool personalises platform issues to your resources?" Service Health shows you which of your specific resources are affected by a platform incident. Monitor shows your app metrics, not platform status.' },
    ],
    'Azure platform outage = Service Health. Monitor tracks your apps. Advisor gives recommendations. Cost Management tracks spending.'),

  // az900-042 — IaC — ARM templates/Bicep
  q('json-az900-042', 'iac',
    'You want to deploy the same set of 20 resources (VNet, VMs, DB) repeatedly for each client, exactly the same way each time. What is the most efficient approach?',
    ['Create manually in portal', 'ARM templates / Bicep', 'Copy-paste', 'Azure Policy'],
    1,
    [
      'Creating resources manually in the portal for each client is time-consuming, error-prone, and not repeatable. If you have many clients, this approach does not scale.',
      'Copy-pasting is not a feature of Azure. Even if you duplicate configuration, it is manual and error-prone — not a proper automation approach.',
      'Azure Policy enforces compliance rules on resources. It does not deploy resources — it validates or blocks what you try to create, but it does not create the resources for you.',
    ],
    'ARM templates (and the newer Bicep language) are Infrastructure as Code (IaC) tools that let you define your Azure resources in a text file. You deploy the template once, and Azure creates all 20 resources automatically in the correct order. To deploy the same setup for a new client, you just run the same template again — every time, the resources are created exactly the same way. This is the most efficient and repeatable approach.',
    'A Nairobi consulting firm onboards a new client every month. Each client needs the same 20 Azure resources. Instead of clicking through the portal for 2 hours each time, they use a Bicep template that deploys all 20 resources in 5 minutes — identically every time, with no manual errors.',
    'Repeatable infrastructure deployment from templates/code',
    'The words "same set", "repeatedly", and "exactly the same way" point to Infrastructure as Code — ARM templates or Bicep.',
    [
      { phrase: 'same set of 20 resources, repeatedly, exactly the same way', reasoning: 'Ask: "What enables repeatable, identical deployments?" ARM templates/Bicep define resources in code. You run the template and Azure creates everything in the right order, identically each time.' },
      { phrase: 'most efficient', reasoning: 'Ask: "Which approach scales?" Manual portal clicks do not scale. Copy-paste is not automation. Policy enforces rules but does not deploy. ARM/Bicep templates are the most efficient for repeatable deployments.' },
    ],
    'Repeatable identical deployments = ARM templates / Bicep. Manual portal creation does not scale. Policy enforces rules, does not deploy.'),

  // az900-043 — Cloud Concepts — NOT a cloud benefit
  q('json-az900-043', 'cloud-concepts',
    'Which of the following is NOT a benefit of cloud computing?',
    ['High availability', 'Elasticity', 'Need to buy physical servers upfront (CapEx)', 'Agility'],
    2,
    [
      'High availability is a cloud benefit — the cloud is designed to keep services running with minimal downtime through redundancy and failover.',
      'Elasticity is a cloud benefit — the cloud automatically scales resources up and down based on demand.',
      'Agility is a cloud benefit — the cloud lets you provision and deploy resources quickly, often in minutes rather than weeks.',
    ],
    'Buying physical servers upfront (CapEx) is an on-premises disadvantage, not a cloud benefit. Cloud computing uses a consumption-based model (OpEx) where you pay for what you use, when you use it — no large upfront investment. The other three options (high availability, elasticity, agility) are all genuine cloud benefits.',
    'A Nakuru company considers moving to Azure. Instead of buying 10 servers upfront for KES 5 million (CapEx), they can rent VMs and pay monthly based on usage (OpEx). The ability to avoid upfront hardware purchases is a key cloud advantage — so needing to buy servers upfront is NOT a cloud benefit.',
    'Identify an on-premises cost or responsibility that is not a cloud benefit',
    'The words "NOT a benefit" and "CapEx" (buying upfront) point to the on-premises cost model, which is the opposite of cloud computing.',
    [
      { phrase: 'NOT a benefit of cloud computing', reasoning: 'Ask: "Which option is an on-premises characteristic?" Buying physical servers upfront (CapEx) is an on-premises model. Cloud uses OpEx (pay-as-you-go) — no upfront hardware purchase needed.' },
      { phrase: 'buy physical servers upfront (CapEx)', reasoning: 'Ask: "Is this how the cloud works?" No. Cloud avoids upfront hardware purchases. CapEx is the traditional on-premises model. The other options (high availability, elasticity, agility) are all cloud benefits.' },
    ],
    'CapEx (buy upfront) is an on-premises model, not a cloud benefit. Cloud uses OpEx (pay-as-you-go). High availability, elasticity, and agility are all cloud benefits.'),

  // az900-044 — Cloud Concepts — CapEx to OpEx
  q('json-az900-044', 'cloud-concepts',
    'Changing from buying servers (CapEx) to paying monthly for Azure (OpEx) is which benefit?',
    ['Scalability', 'Shift from CapEx to OpEx', 'Geo-distribution', 'Fault tolerance'],
    1,
    [
      'Scalability is about adding or removing resources to handle changing demand. It is not about the payment model.',
      'Geo-distribution is about deploying resources in multiple geographic regions. It is not about the billing model.',
      'Fault tolerance is about a system continuing to work when components fail. It is not about how you pay for infrastructure.',
    ],
    'Shifting from CapEx (buying physical assets upfront) to OpEx (paying for services as you use them) is one of the key financial benefits of cloud computing. Instead of a large one-time investment in servers, you pay a monthly fee based on actual usage. This improves cash flow and reduces the risk of over-provisioning. Note: some Azure services may have upfront commitments (like reserved instances), but the core model is OpEx.',
    'An Accra startup was going to buy servers for GHS 500,000 upfront (CapEx). Instead, they move to Azure and pay GHS 8,000 per month based on usage (OpEx). This shift from a large upfront investment to a predictable monthly cost is the "shift from CapEx to OpEx" benefit — freeing up cash for other business needs.',
    'Shift from purchasing physical servers to consumption-based operating costs; avoid assuming every service has no upfront cost',
    'The words "CapEx" and "OpEx" in the question directly name the benefit — the shift from CapEx to OpEx.',
    [
      { phrase: 'changing from buying servers (CapEx) to paying monthly for Azure (OpEx)', reasoning: 'Ask: "What is this change called?" Moving from capital expenditure (buying assets upfront) to operational expenditure (paying as you use) is the CapEx-to-OpEx shift. The answer is literally in the question.' },
    ],
    'CapEx → OpEx = "Shift from CapEx to OpEx". Scalability is about capacity. Geo-distribution is about regions. Fault tolerance is about surviving failures.'),

  // az900-045 — Pricing — Pricing Calculator (before build)
  q('json-az900-045', 'pricing',
    'You need to estimate the cost of running an app with 2 App Services, 1 SQL Database, and 100 GB storage. Before building, which tool should you use?',
    ['TCO Calculator', 'Pricing Calculator', 'Cost Management', 'Azure Advisor'],
    1,
    [
      'The TCO Calculator compares on-premises total costs vs Azure costs over time. It is for building a business case, not for estimating the cost of specific Azure resources before deployment.',
      'Cost Management tracks spending on resources that are already running. You have not built anything yet — there is nothing to track.',
      'Azure Advisor gives recommendations for existing resources. It does not estimate costs for resources that have not been deployed yet.',
    ],
    'The Pricing Calculator lets you select specific Azure resources (2 App Services, 1 SQL Database, 100 GB storage), configure them, and see the estimated monthly cost before you deploy. It is the right tool when you know exactly what resources you need and want to forecast the bill. Cost Management only works after resources are running.',
    'A Kigali startup plans to build an app with 2 App Services, 1 SQL Database, and 100 GB of storage. An architect uses the Pricing Calculator to configure these resources and sees an estimated cost of $450 per month. The team presents this estimate to investors before building anything.',
    'Estimate expected costs before deployment',
    'The words "before building" and "estimate the cost" point to the Pricing Calculator.',
    [
      { phrase: 'before building', reasoning: 'Ask: "Are resources deployed?" No — this is pre-deployment. Cost Management only works after resources are running. The Pricing Calculator estimates costs before you build.' },
      { phrase: 'estimate the cost of running an app with specific resources', reasoning: 'Ask: "Which tool estimates specific Azure resource costs?" The Pricing Calculator lets you add specific resources and see the estimated monthly cost. TCO is for on-prem vs cloud comparison, not specific resource estimation.' },
    ],
    'Before deployment + estimate specific resources = Pricing Calculator. TCO compares on-prem vs cloud. Cost Management tracks running spend. Advisor optimises existing resources.'),

  // az900-046 — Compute — App Service continuous deployment
  q('json-az900-046', 'compute',
    'A developer pushes code to GitHub, and the application hosted in Azure App Service should deploy the changes automatically. Which capability fits?',
    ['Azure Policy', 'App Service continuous deployment through Deployment Center', 'Resource Lock', 'Azure Bastion'],
    1,
    [
      'Azure Policy enforces compliance rules on resources. It does not deploy application code from GitHub.',
      'A Resource Lock prevents deletion or modification of a resource. It does not deploy code from source control.',
      'Azure Bastion provides secure RDP/SSH access to VMs. It is not a code deployment tool.',
    ],
    'Azure App Service supports continuous deployment through its Deployment Center. You connect your App Service to a source code repository (like GitHub), and whenever you push new code, App Service automatically builds and deploys the update. Note: deployment slots are a separate feature used for staging and swapping application versions — they are not the same as continuous deployment.',
    'An Accra startup developer pushes new code to GitHub. App Service Deployment Center detects the push, builds the code, and deploys it to the live website automatically — no manual steps. The team uses deployment slots to test the new version in a staging environment before swapping it into production.',
    'Automatically deploy source-code changes; continuous deployment, not deployment slots alone',
    'The words "pushes code to GitHub" and "deploy automatically" point to App Service continuous deployment via Deployment Center.',
    [
      { phrase: 'pushes code to GitHub', reasoning: 'Ask: "Where is the source code?" In GitHub. App Service Deployment Center integrates with GitHub to pull and deploy code automatically.' },
      { phrase: 'deploy the changes automatically', reasoning: 'Ask: "Which feature does this?" Continuous deployment through Deployment Center. Deployment slots are a separate feature for staging and swapping — they do not automatically pull from GitHub.' },
    ],
    'Push to GitHub → automatic deployment = App Service continuous deployment (Deployment Center). Deployment slots are for staging/swapping, a separate feature. Policy, Locks, and Bastion are not deployment tools.'),

  // az900-047 — Compute — Azure Functions Timer Trigger
  q('json-az900-047', 'compute',
    'You need a serverless job that runs on a schedule every five minutes to perform a cleanup task. Which option fits?',
    ['Virtual Machine Scale Sets', 'Azure Functions with Timer Trigger', 'App Service', 'AKS'],
    1,
    [
      'VM Scale Sets automatically scale groups of identical VMs based on load. They are not serverless and are not designed for scheduled small tasks — you would pay for the VMs even when idle.',
      'App Service hosts always-on web applications. It is not designed for scheduled serverless tasks that run briefly every 5 minutes.',
      'AKS orchestrates container fleets. It is not a serverless scheduled-task tool and requires managing a Kubernetes cluster.',
    ],
    'Azure Functions with a Timer Trigger runs code on a schedule — like every 5 minutes — without managing any servers. You pay only for the execution time. This is the serverless option for scheduled tasks. Note: if the requirement were to process queue messages as they arrive, a queue trigger would be more appropriate than a timer trigger.',
    'A Lagos e-commerce company needs to clean up expired shopping carts every 5 minutes. They create an Azure Function with a timer trigger that runs at a 5-minute interval. The function runs for about 2 seconds each time, removes expired carts from the database, and stops. The company pays only for those 2 seconds of execution — no servers to manage.',
    'Scheduled execution every five minutes; timer trigger',
    'The words "serverless", "schedule", and "every five minutes" point to Azure Functions with a Timer Trigger.',
    [
      { phrase: 'serverless job', reasoning: 'Ask: "Which options are serverless?" Only Azure Functions is serverless. VM Scale Sets, App Service, and AKS all require running and managing servers continuously.' },
      { phrase: 'runs on a schedule every five minutes', reasoning: 'Ask: "Which trigger type?" A timer trigger runs code on a schedule. If the requirement were to process messages as they arrive, a queue trigger would be better. For a scheduled cleanup, a timer trigger is the right choice.' },
    ],
    'Serverless + scheduled = Azure Functions with Timer Trigger. Scale Sets and App Service are always-on. AKS is for container fleets. If processing queue messages, use a queue trigger instead.'),

  // az900-048 — Availability — Update Domains
  q('json-az900-048', 'availability',
    'You have 2 VMs in the same Availability Set. What does Azure do during a platform update?',
    ['Updates both at same time', 'Updates one at a time using Update Domains', 'Deletes both', 'Moves to different region'],
    1,
    [
      'Azure does not update both VMs at the same time during planned maintenance — that would cause downtime. The purpose of an Availability Set is to prevent this.',
      'Azure does not delete VMs during a platform update. The VMs are updated in place, not destroyed.',
      'Azure does not move VMs to a different region during a platform update. The VMs stay in their original region and data centre.',
    ],
    'An Availability Set uses Update Domains to sequence planned maintenance. When Azure needs to update the underlying platform, it updates VMs one update domain at a time — never all at once. This means at least one of your 2 VMs stays running while the other is being updated. Fault Domains protect against rack failures; Update Domains protect against simultaneous reboots during maintenance.',
    'A Cape Town bank has 2 VMs in an Availability Set with 2 update domains. During a planned Azure platform update, Azure reboots the VM in update domain 1 first. The VM in update domain 2 keeps serving customers. After the first VM comes back online, Azure updates the second VM. At no point are both VMs down simultaneously.',
    'Planned maintenance is sequenced across update domains',
    'The words "platform update" and the question about what Azure does point to Update Domains, which sequence maintenance.',
    [
      { phrase: 'platform update', reasoning: 'Ask: "What is this?" Planned maintenance by Azure on the underlying platform. Availability Sets protect against this using update domains.' },
      { phrase: '2 VMs in the same Availability Set', reasoning: 'Ask: "How does the Availability Set help?" It uses update domains to sequence the updates. Azure updates one VM at a time — never both simultaneously. This ensures at least one VM stays running during maintenance.' },
    ],
    'Platform update + Availability Set = update one VM at a time using Update Domains. Fault Domains protect against rack failures. Update Domains protect against simultaneous reboots.'),

  // az900-049 — Support — Professional Direct
  q('json-az900-049', 'support',
    'Which Azure support plan offers a response time of one hour or less for high-severity cases and also includes advisory guidance for planning deployments, migrations, reliability, and security?',
    ['Developer', 'Standard', 'Professional Direct', 'Basic'],
    2,
    [
      'The Developer plan is for individual developers and trial use. It does not include a one-hour response target for high-severity cases or advisory guidance.',
      'The Standard plan does include a one-hour response target for critical (Sev A) cases. However, it does not include the advisory guidance (architecture and planning consultations) that the question asks for. The advisory guidance is the distinguishing feature.',
      'The Basic plan is free and includes billing and subscription support only. It does not include technical support, response time targets, or advisory guidance.',
    ],
    'The Professional Direct (ProDirect) support plan includes a one-hour-or-less initial response for high-severity (Sev A) cases AND advisory services for planning deployments, migrations, reliability, and security. The Standard plan also has a one-hour response target for Sev A cases, but it does not include advisory guidance — so the advisory requirement is the distinguishing clue that points to Professional Direct.',
    'A Nairobi enterprise runs mission-critical workloads in Azure. They purchase Professional Direct support so that if a Sev A incident occurs, they get a response within one hour. They also use the advisory services to get architecture guidance from Microsoft engineers when planning a complex migration.',
    'One-hour high-severity response plus advisory guidance distinguishes Professional Direct',
    'The words "one hour or less" AND "advisory guidance" together point to Professional Direct. Standard also has one-hour response but lacks advisory.',
    [
      { phrase: 'one hour or less for high-severity cases', reasoning: 'Ask: "Which plans have 1-hour response?" Both Standard and Professional Direct have a one-hour target for Sev A cases. This alone does not distinguish them.' },
      { phrase: 'advisory guidance for planning deployments, migrations, reliability, and security', reasoning: 'Ask: "Which plan includes advisory services?" Professional Direct includes advisory guidance. Standard does not. The advisory requirement is the distinguishing clue.' },
    ],
    '1-hour response + advisory guidance = Professional Direct. Standard has 1-hour response but no advisory. Developer is for individuals. Basic is free with billing support only.'),

  // az900-050 — Compliance — Service Trust Portal
  q('json-az900-050', 'compliance',
    'You need to find Microsoft compliance reports and certificates, including documentation related to ISO 27001. Where should you look first?',
    ['Azure Advisor', 'Microsoft Service Trust Portal', 'Cost Management', 'Azure Policy'],
    1,
    [
      'Azure Advisor provides best-practice recommendations for optimising Azure resources. It does not store compliance reports or certificates.',
      'Cost Management tracks spending and budgets. It does not contain compliance documentation or audit reports.',
      'Azure Policy enforces compliance rules on Azure resources. While its name includes "compliance", it does not store Microsoft compliance reports or certificates — it is a rule enforcement tool, not a document library.',
    ],
    'The Microsoft Service Trust Portal is the central repository for Microsoft compliance documentation, audit reports, and certifications. It includes reports for standards like ISO 27001, SOC, GDPR, and HIPAA. You can download compliance reports to share with your own auditors or customers. Azure Policy enforces rules on your resources — it is not the place to find Microsoft compliance documentation.',
    'A Cape Town bank needs to prove to its auditors that Azure meets ISO 27001 security standards. The compliance officer visits the Microsoft Service Trust Portal, searches for ISO 27001, and downloads the latest audit report. They share this with their auditors to demonstrate that their cloud provider meets international security standards.',
    'Find Microsoft compliance reports and certificates',
    'The words "compliance reports", "certificates", and "ISO 27001" point to the Microsoft Service Trust Portal, the central compliance documentation library.',
    [
      { phrase: 'compliance reports and certificates, including ISO 27001', reasoning: 'Ask: "Where are Microsoft compliance documents stored?" The Service Trust Portal is the central repository for compliance documentation, audit reports, and certificates. Advisor, Cost Management, and Policy are not document libraries.' },
    ],
    'Compliance reports + certificates + ISO 27001 = Microsoft Service Trust Portal. Azure Policy enforces rules but does not store compliance documents. Advisor gives recommendations. Cost Management tracks spend.'),

  // az900-051 — Security — Microsoft Sentinel
  q('json-az900-051', 'security',
    'You need to protect your Azure environment with SIEM and threat detection across resources. Which service should you use?',
    ['Microsoft Defender for Cloud', 'Microsoft Sentinel', 'Azure Firewall', 'NSG'],
    1,
    [
      'Microsoft Defender for Cloud is a cloud security posture management and workload protection service. It assesses your security posture and protects workloads, but it is not a SIEM (Security Information and Event Management) system that correlates security events across data sources.',
      'Azure Firewall is a managed network firewall that controls and filters traffic. It does not provide SIEM capabilities or security event correlation.',
      'An NSG filters network traffic by IP, port, and protocol. It is a simple network filter, not a security information and event management platform.',
    ],
    'Microsoft Sentinel is a cloud-native SIEM (Security Information and Event Management) solution. It collects security data from many sources (Azure resources, on-premises systems, third-party tools), analyses it for threats, and provides detection, investigation, and response capabilities. The key distinction: Sentinel is SIEM (log collection, correlation, threat detection across resources); Defender for Cloud is security posture management (assessing and protecting individual workloads).',
    'A Nairobi bank uses Microsoft Sentinel to collect security logs from its Azure VMs, on-premises servers, and Office 365. Sentinel analyses the combined data and detects a suspicious login pattern — an employee account being accessed from two countries within an hour. The security team investigates and responds before any damage occurs.',
    'SIEM and security-event correlation; distinguish Sentinel from Defender for Cloud',
    'The word "SIEM" directly points to Microsoft Sentinel, the SIEM solution in Azure.',
    [
      { phrase: 'SIEM and threat detection across resources', reasoning: 'Ask: "Which service is SIEM?" Microsoft Sentinel is the SIEM (Security Information and Event Management) platform. Defender for Cloud is posture management, not SIEM. Firewall and NSGs are network filtering tools.' },
      { phrase: 'across resources', reasoning: 'Ask: "Does it correlate data from multiple sources?" Yes. Sentinel collects and correlates security events from many resources and systems. Defender for Cloud focuses on assessing and protecting individual workloads, not cross-resource event correlation.' },
    ],
    'SIEM + threat detection across resources = Microsoft Sentinel. Defender for Cloud = posture management and workload protection. Firewall = traffic filtering. NSG = simple IP/port filtering.'),
];
