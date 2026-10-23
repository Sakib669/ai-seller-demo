import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Subscriptions BD catalog, categories, inventory, and blog archive...");

  // Clean existing tables in reverse dependency order
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.inventoryItem.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.blogPost.deleteMany();

  // 1. Categories (8 main categories mapped from live reconnaissance)
  const catAI = await prisma.category.create({
    data: {
      name: "AI, Grammar and Writing Products",
      slug: "ai-grammer-and-writing-products",
      icon: "Sparkles",
      description: "Next generation LLMs, autonomous coding agents, and generative AI suites.",
      sortOrder: 1,
    },
  });

  const catStreaming = await prisma.category.create({
    data: {
      name: "Video Streaming & OTT",
      slug: "video-streaming",
      icon: "Film",
      description: "Premium streaming passes, 4K Ultra HD screens, and anime networks.",
      sortOrder: 2,
    },
  });

  const catKeys = await prisma.category.create({
    data: {
      name: "License Keys & OS",
      slug: "key",
      icon: "KeyRound",
      description: "Official lifetime digital licenses for Windows, Office, IDM, and security suites.",
      sortOrder: 3,
    },
  });

  const catEdu = await prisma.category.create({
    data: {
      name: "Educational Tools",
      slug: "educational-tools",
      icon: "GraduationCap",
      description: "Top global e learning platforms, research archives, and study subscriptions.",
      sortOrder: 4,
    },
  });

  const catUtils = await prisma.category.create({
    data: {
      name: "Utilities & Productivity",
      slug: "utilities",
      icon: "Cpu",
      description: "Creative design apps, video editors, cloud storage expansions, and developer tools.",
      sortOrder: 5,
    },
  });

  const catVPN = await prisma.category.create({
    data: {
      name: "VPN & Privacy",
      slug: "vpn",
      icon: "ShieldCheck",
      description: "Encrypted virtual private networks, zero log browsing, and geo unlockers.",
      sortOrder: 6,
    },
  });

  const catAudio = await prisma.category.create({
    data: {
      name: "Audio Streaming",
      slug: "audio-streaming",
      icon: "Headphones",
      description: "Lossless audio streaming, ad free music libraries, and podcast premium passes.",
      sortOrder: 7,
    },
  });

  const catApple = await prisma.category.create({
    data: {
      name: "Apple Products & Gift Cards",
      slug: "apple-products",
      icon: "CreditCard",
      description: "Official US App Store and iTunes digital balance codes with instant delivery.",
      sortOrder: 8,
    },
  });

  // 2. High Demand Products from SUBSCRIPTIONSBD-PRODUCT-CATALOG.md

  // --- AI Category ---
  // ChatGPT Plus
  const pChatGPT = await prisma.product.create({
    data: {
      title: "ChatGPT Plus Subscription",
      slug: "chatgpt-subscription-bd",
      shortDesc: "Official OpenAI GPT 4o, o1 reasoning models, DALL E 3, canvas, and advanced voice mode.",
      description: "Unlock full speed access to OpenAI latest model stack. Enjoy priority access during peak hours, high speed reasoning, real time search, and image generation. Activated directly on your personal OpenAI account or delivered as private VIP profile.",
      categoryId: catAI.id,
      badge: "BESTSELLER",
      isFeatured: true,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
      minPrice: 2799,
      maxPrice: 2799,
      requiresCredentials: true,
      credentialFields: "OpenAI Account Email, Account Password",
      faqs: JSON.stringify([
        { q: "Is this an official ChatGPT Plus subscription?", a: "Yes, this is an official OpenAI Plus subscription with full access to GPT 4o, o1 preview, and custom GPTs." },
        { q: "How long does activation take?", a: "Most orders are upgraded within 10 to 30 minutes during our standard support hours (10:30 AM to 12:30 AM BD time)." },
        { q: "Will I keep my existing chat history?", a: "Yes, when upgraded on your existing account, all previous conversation logs and custom GPT configurations remain intact." }
      ]),
      variants: {
        create: [
          {
            title: "1 Month - Personal Account Upgrade",
            duration: "1 Month",
            screenType: "Personal Account",
            price: 2799,
            originalPrice: 3200,
            stockCount: 50,
            isAvailable: true,
            inventory: {
              create: [
                { type: "SHARED_ACCOUNT", secretData: "ACTIVATION_TOKEN: GPT4O-BD-UPGRADE-2026-VIP" }
              ]
            }
          }
        ]
      }
    }
  });

  // Claude AI Personal
  await prisma.product.create({
    data: {
      title: "Claude AI Personal Subscription",
      slug: "claude-ai-subscription",
      shortDesc: "Anthropic Claude 3.5 Sonnet and Opus with 200K token context window and artifacts workspace.",
      description: "Gain superior reasoning, coding precision, and writing nuance with Anthropic Claude Pro. Upload long documents, codebases, and financial statements for instant analysis.",
      categoryId: catAI.id,
      badge: "POPULAR",
      isFeatured: true,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      minPrice: 2799,
      maxPrice: 2799,
      requiresCredentials: true,
      credentialFields: "Anthropic Claude Account Email",
      faqs: JSON.stringify([
        { q: "Can I use Artifacts with this plan?", a: "Yes, Claude 3.5 Sonnet Artifacts and Project workspaces are fully supported." }
      ]),
      variants: {
        create: [
          {
            title: "1 Month - Personal Mail Upgrade",
            duration: "1 Month",
            screenType: "Personal Account",
            price: 2799,
            originalPrice: 3100,
            stockCount: 25,
            isAvailable: true,
          }
        ]
      }
    }
  });

  // Google AI Pro / Ultra (Gemini)
  await prisma.product.create({
    data: {
      title: "Google AI Pro / Ultra | Gemini Advanced",
      slug: "gemini-advanced",
      shortDesc: "Gemini 1.5 Pro with 2M context window and 2TB Google One cloud storage integration.",
      description: "Harness Google most capable multimodal AI system. Integrate directly with Google Docs, Gmail, and Drive, plus enjoy 2TB of high speed cloud backup.",
      categoryId: catAI.id,
      badge: "FEATURED",
      isFeatured: false,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80",
      minPrice: 2999,
      maxPrice: 3500,
      requiresCredentials: true,
      credentialFields: "Google Account Email",
      faqs: JSON.stringify([
        { q: "Does this include Google One 2TB storage?", a: "Yes, the Gemini Advanced subscription includes the full 2TB Google One storage tier." }
      ]),
      variants: {
        create: [
          {
            title: "Google AI Pro 12 Months",
            duration: "12 Months",
            screenType: "Google Family / Individual",
            price: 2999,
            originalPrice: 3550,
            stockCount: 40,
            isAvailable: true
          },
          {
            title: "Google AI Ultra 1 Month",
            duration: "1 Month",
            screenType: "Individual VIP",
            price: 3500,
            originalPrice: 16000,
            stockCount: 15,
            isAvailable: true
          }
        ]
      }
    }
  });

  // Lovable Pro Plan
  await prisma.product.create({
    data: {
      title: "Lovable Pro Plan - 12 Months",
      slug: "lovable-price-in-bd",
      shortDesc: "Autonomous full stack web application builder powered by advanced AI and instant Supabase deploy.",
      description: "Build, iterate, and deploy full stack web applications in seconds with natural language prompts. Connect to GitHub and export clean React codebases effortlessly.",
      categoryId: catAI.id,
      badge: "NEW",
      isFeatured: true,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      minPrice: 5350,
      maxPrice: 5350,
      requiresCredentials: true,
      credentialFields: "Lovable Account Email, Lovable Account Password",
      variants: {
        create: [
          {
            title: "12 Months Pro Access",
            duration: "12 Months",
            screenType: "Personal Account",
            price: 5350,
            originalPrice: 7500,
            stockCount: 30,
            isAvailable: true
          }
        ]
      }
    }
  });

  // Manus Pro Plan
  await prisma.product.create({
    data: {
      title: "Manus Pro Plan - 12 Months",
      slug: "manus-pro-plan-price-in-bd",
      shortDesc: "General purpose autonomous AI agent capable of multi step research, browsing, and coding.",
      description: "Empower your workflow with Manus AI. Handles complex tasks autonomously from start to finish with sandboxed browser automation and API integration.",
      categoryId: catAI.id,
      badge: "HOT",
      isFeatured: false,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
      minPrice: 5490,
      maxPrice: 5490,
      requiresCredentials: true,
      credentialFields: "Manus Email, Manus Password",
      variants: {
        create: [
          {
            title: "12 Months Pro Membership",
            duration: "12 Months",
            screenType: "Personal Account",
            price: 5490,
            originalPrice: 8000,
            stockCount: 20,
            isAvailable: true
          }
        ]
      }
    }
  });

  // n8n Starter Plan
  await prisma.product.create({
    data: {
      title: "n8n Starter Plan - 12 Months",
      slug: "n8n-price-in-bd",
      shortDesc: "Fair code workflow automation platform for AI agents, webhooks, and database syncs.",
      description: "Build robust multi system automations, integrate AI LLM tool calling, and manage scheduled cron jobs without writing complex boilerplate.",
      categoryId: catAI.id,
      badge: "DEV",
      isFeatured: false,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      minPrice: 3999,
      maxPrice: 3999,
      requiresCredentials: true,
      credentialFields: "n8n Account Email, Password",
      variants: {
        create: [
          {
            title: "12 Months Cloud Plan",
            duration: "12 Months",
            screenType: "Cloud Hosted",
            price: 3999,
            originalPrice: 5900,
            stockCount: 20,
            isAvailable: true
          }
        ]
      }
    }
  });

  // --- Video Streaming Category ---
  // YouTube Premium
  await prisma.product.create({
    data: {
      title: "YouTube Premium Subscription",
      slug: "yt-premium",
      shortDesc: "Zero advertisements, background playback on mobile, YouTube Music Premium, and offline downloads.",
      description: "Enjoy uninterrupted video streaming on Smart TV, mobile, desktop, and tablets. Includes high bitrate YouTube Music streaming and picture in picture video playback.",
      categoryId: catStreaming.id,
      badge: "TOP SELLER",
      isFeatured: true,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1543536448-d209d2d13a1c?auto=format&fit=crop&w=800&q=80",
      minPrice: 1150,
      maxPrice: 1999,
      requiresCredentials: true,
      credentialFields: "Google Email for Family Group Invitation",
      faqs: JSON.stringify([
        { q: "Do I have to share my Google password?", a: "No! We send an official Google Family invitation link directly to your personal email address. You simply click accept." },
        { q: "Will other family group members see my search or watch history?", a: "Never. Google keeps every member account, history, playlist, and recommendations completely private and isolated." }
      ]),
      variants: {
        create: [
          {
            title: "6 Months - Personal Email Invitation",
            duration: "6 Months",
            screenType: "Family Invite",
            price: 1150,
            originalPrice: 1500,
            stockCount: 80,
            isAvailable: true,
            inventory: {
              create: [
                { type: "SHARED_ACCOUNT", secretData: "INVITE_URL: https://families.google.com/join/sbd-yt6m-9871" }
              ]
            }
          },
          {
            title: "12 Months - Personal Email Invitation",
            duration: "12 Months",
            screenType: "Family Invite",
            price: 1999,
            originalPrice: 2800,
            stockCount: 90,
            isAvailable: true,
            inventory: {
              create: [
                { type: "SHARED_ACCOUNT", secretData: "INVITE_URL: https://families.google.com/join/sbd-yt12m-4432" }
              ]
            }
          }
        ]
      }
    }
  });

  // Prime Video
  await prisma.product.create({
    data: {
      title: "Prime Video Subscription",
      slug: "prime-video-1-screen",
      shortDesc: "Amazon Prime Video streaming with 4K UHD resolution and HDR audio on your private screen profile.",
      description: "Watch thousands of blockbuster movies, award winning Amazon Originals, and live sports with personalized subtitles and individual screen PIN protection.",
      categoryId: catStreaming.id,
      badge: "VALUE",
      isFeatured: false,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=800&q=80",
      minPrice: 250,
      maxPrice: 450,
      variants: {
        create: [
          {
            title: "6 Months - 1 Private Screen",
            duration: "6 Months",
            screenType: "1 Screen PIN Protected",
            price: 250,
            originalPrice: 400,
            stockCount: 40,
            isAvailable: true
          },
          {
            title: "12 Months - 1 Private Screen",
            duration: "12 Months",
            screenType: "1 Screen PIN Protected",
            price: 450,
            originalPrice: 700,
            stockCount: 35,
            isAvailable: true
          }
        ]
      }
    }
  });

  // Crunchyroll
  await prisma.product.create({
    data: {
      title: "Crunchyroll Shared & Mega Fan Packages",
      slug: "crunchyroll-subscriptions",
      shortDesc: "World largest anime library with simulcasts direct from Japan, ad free viewing, and offline mode.",
      description: "Stream the newest episodes of Attack on Titan, Demon Slayer, Jujutsu Kaisen, and Solo Leveling one hour after broadcast in Japan with crisp 1080p audio.",
      categoryId: catStreaming.id,
      badge: "ANIME",
      isFeatured: false,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
      minPrice: 150,
      maxPrice: 750,
      variants: {
        create: [
          { title: "1 Month - Mega Fan", duration: "1 Month", screenType: "Shared Profile", price: 150, originalPrice: 250, stockCount: 50, isAvailable: true },
          { title: "3 Months - Mega Fan", duration: "3 Months", screenType: "Shared Profile", price: 300, originalPrice: 450, stockCount: 50, isAvailable: true },
          { title: "6 Months - Mega Fan", duration: "6 Months", screenType: "Shared Profile", price: 550, originalPrice: 800, stockCount: 50, isAvailable: true },
          { title: "12 Months - Mega Fan", duration: "12 Months", screenType: "Shared Profile", price: 750, originalPrice: 1200, stockCount: 50, isAvailable: true }
        ]
      }
    }
  });

  // --- License Keys & OS Category ---
  // Windows 11 Pro
  await prisma.product.create({
    data: {
      title: "Windows 11 Pro License Key - 1 PC Lifetime",
      slug: "windows-11-pro-product-key-bd",
      shortDesc: "Official Microsoft 25 digit digital activation key with lifetime validity and BitLocker encryption.",
      description: "Permanent digital license for Windows 11 Professional edition. Supports 32 bit and 64 bit architectures, multi language installations, and receives all future security updates directly from Microsoft servers.",
      categoryId: catKeys.id,
      badge: "LIFETIME",
      isFeatured: true,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
      minPrice: 600,
      maxPrice: 600,
      faqs: JSON.stringify([
        { q: "Is this genuine and permanent?", a: "Yes, this is an official OEM / Retail digital license with lifetime online activation directly on Microsoft servers." },
        { q: "Can I reinstall Windows on the same PC?", a: "Yes, the license binds to your motherboard hardware ID, allowing unlimited reinstallations on the same machine." }
      ]),
      variants: {
        create: [
          {
            title: "1 PC Lifetime Activation",
            duration: "Lifetime",
            screenType: "Retail / OEM Key",
            price: 600,
            originalPrice: 1800,
            stockCount: 100,
            isAvailable: true,
            inventory: {
              create: [
                { type: "LICENSE_KEY", secretData: "W269N-WFGWX-YVC9B-4J6C9-T83GX" },
                { type: "LICENSE_KEY", secretData: "NY6VG-PBM3B-9832H-XKY9X-B7G63" },
                { type: "LICENSE_KEY", secretData: "VK7JG-NPHTM-C97JM-9MPGT-3V66T" }
              ]
            }
          }
        ]
      }
    }
  });

  // Windows 10 Pro
  await prisma.product.create({
    data: {
      title: "Windows 10 Pro License Key - 1 PC Lifetime",
      slug: "windows-10-pro-license-key",
      shortDesc: "Permanent activation key for Windows 10 Pro with free upgrade eligibility to Windows 11.",
      description: "Activate your Windows 10 Professional PC instantly. Remove watermark, enable Remote Desktop, and get complete administrative control.",
      categoryId: catKeys.id,
      badge: "POPULAR",
      isFeatured: false,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
      minPrice: 500,
      maxPrice: 500,
      variants: {
        create: [
          {
            title: "1 PC Lifetime Key",
            duration: "Lifetime",
            screenType: "Retail Key",
            price: 500,
            originalPrice: 1500,
            stockCount: 60,
            isAvailable: true,
            inventory: {
              create: [
                { type: "LICENSE_KEY", secretData: "MH37W-N47XK-V7XM9-C7227-GCQG9" }
              ]
            }
          }
        ]
      }
    }
  });

  // Internet Download Manager (IDM)
  await prisma.product.create({
    data: {
      title: "Internet Download Manager (IDM) - Lifetime Licence",
      slug: "internet-download-manager-idm-lifetime-licence",
      shortDesc: "Official Tonec Internet Download Manager registration with 3 year free upgrades and lifetime validity.",
      description: "Accelerate download speeds up to 5x, resume broken transfers, and grab streaming video from YouTube, Vimeo, and Facebook with native browser integration.",
      categoryId: catKeys.id,
      badge: "VERIFIED",
      isFeatured: true,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      minPrice: 2150,
      maxPrice: 2150,
      variants: {
        create: [
          {
            title: "1 PC Lifetime License (3 Yrs Free Updates)",
            duration: "Lifetime",
            screenType: "Official Tonec Key",
            price: 2150,
            originalPrice: 2800,
            stockCount: 40,
            isAvailable: true,
            inventory: {
              create: [
                { type: "LICENSE_KEY", secretData: "IDM-LIVE-KEY-9874-XK21-BD33" }
              ]
            }
          }
        ]
      }
    }
  });

  // --- Utilities & Productivity ---
  // Canva Pro
  await prisma.product.create({
    data: {
      title: "Canva Pro Subscriptions",
      slug: "canva-pro-6-month",
      shortDesc: "Access 100M+ premium stock photos, magic studio AI tools, background remover, and brand kits.",
      description: "Create stunning social media graphics, client pitch decks, posters, and YouTube thumbnails effortlessly. Unlocks all premium templates, fonts, and animation presets.",
      categoryId: catUtils.id,
      badge: "MUST HAVE",
      isFeatured: true,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1572044160417-063f68449c25?auto=format&fit=crop&w=800&q=80",
      minPrice: 100,
      maxPrice: 4500,
      requiresCredentials: true,
      credentialFields: "Your Canva Email",
      variants: {
        create: [
          { title: "Edu Pro 1 Month", duration: "1 Month", screenType: "Team Invite", price: 100, originalPrice: 250, stockCount: 150, isAvailable: true },
          { title: "Edu Pro 6 Months", duration: "6 Months", screenType: "Team Invite", price: 220, originalPrice: 450, stockCount: 150, isAvailable: true },
          { title: "Individual 12 Months", duration: "12 Months", screenType: "Personal Account", price: 4500, originalPrice: 6500, stockCount: 20, isAvailable: true }
        ]
      }
    }
  });

  // CapCut Pro
  await prisma.product.create({
    data: {
      title: "CapCut Pro Subscription",
      slug: "capcut-pro-price-in-bd",
      shortDesc: "Remove backgrounds, auto generate high accuracy captions, unlock VIP effects and 4K 60fps exports.",
      description: "The ultimate video editing toolkit for TikTok creators, YouTube short producers, and Facebook reel editors. Use premium text templates, smooth slow motion, and cloud storage.",
      categoryId: catUtils.id,
      badge: "CREATOR PICK",
      isFeatured: true,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80",
      minPrice: 699,
      maxPrice: 3500,
      variants: {
        create: [
          {
            title: "1 Month - 1 Device VIP",
            duration: "1 Month",
            screenType: "Shared VIP Login",
            price: 699,
            originalPrice: 950,
            stockCount: 80,
            isAvailable: true,
            inventory: {
              create: [
                { type: "SHARED_ACCOUNT", secretData: "capcut_vip_01@subbd.com | Pass#CapCut2026!" }
              ]
            }
          },
          {
            title: "6 Months - 1 Device VIP",
            duration: "6 Months",
            screenType: "Shared VIP Login",
            price: 3500,
            originalPrice: 4500,
            stockCount: 30,
            isAvailable: true
          }
        ]
      }
    }
  });

  // Microsoft Office Professional Plus
  await prisma.product.create({
    data: {
      title: "Microsoft Office Professional Plus - 2019 / 2021 / 2024",
      slug: "microsoft-office-professional-plus",
      shortDesc: "Word, Excel, PowerPoint, Outlook, Access, and Publisher with permanent offline activation.",
      description: "Complete productivity suite for corporate work, financial spreadsheets, academic thesis, and business presentations. Genuine product key activated over internet or phone.",
      categoryId: catUtils.id,
      badge: "OFFICIAL",
      isFeatured: true,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      minPrice: 550,
      maxPrice: 799,
      variants: {
        create: [
          { title: "Professional Plus 2019", duration: "Lifetime", screenType: "1 PC Key", price: 650, originalPrice: 1200, stockCount: 60, isAvailable: true },
          { title: "Professional Plus 2021", duration: "Lifetime", screenType: "1 PC Key", price: 650, originalPrice: 1500, stockCount: 80, isAvailable: true },
          { title: "Professional Plus 2024", duration: "Lifetime", screenType: "1 PC Key", price: 799, originalPrice: 1800, stockCount: 70, isAvailable: true }
        ]
      }
    }
  });

  // GitHub Copilot
  await prisma.product.create({
    data: {
      title: "GitHub Copilot for 12 Months",
      slug: "github-copilot",
      shortDesc: "Your AI pair programmer in VS Code, IntelliJ, and Neovim with fast code completions and chat.",
      description: "Speed up software engineering with GitHub Copilot. Suggests whole lines, multi function implementations, and unit tests directly in your IDE.",
      categoryId: catUtils.id,
      badge: "DEVELOPER",
      isFeatured: false,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
      minPrice: 2999,
      maxPrice: 2999,
      requiresCredentials: true,
      credentialFields: "GitHub Username / Email",
      variants: {
        create: [
          {
            title: "12 Months Student / Org Invite",
            duration: "12 Months",
            screenType: "Personal Account",
            price: 2999,
            originalPrice: 4500,
            stockCount: 40,
            isAvailable: true
          }
        ]
      }
    }
  });

  // --- Educational Tools ---
  // Duolingo Super
  await prisma.product.create({
    data: {
      title: "Duolingo Super Subscription",
      slug: "duolingo-plus-subscription",
      shortDesc: "Learn languages faster with unlimited hearts, practice mistakes review, and ad free lessons.",
      description: "Master English, German, French, Spanish, Japanese, or Arabic at your own pace. Unlimited mistakes let you practice without waiting for hearts to refill.",
      categoryId: catEdu.id,
      badge: "EDUCATION",
      isFeatured: true,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80",
      minPrice: 1050,
      maxPrice: 1699,
      variants: {
        create: [
          { title: "6 Months Super Plan", duration: "6 Months", screenType: "Family Plan Slot", price: 1050, originalPrice: 1600, stockCount: 40, isAvailable: true },
          { title: "12 Months Super Plan", duration: "12 Months", screenType: "Family Plan Slot", price: 1699, originalPrice: 2500, stockCount: 50, isAvailable: true }
        ]
      }
    }
  });

  // Coursera Plus
  await prisma.product.create({
    data: {
      title: "Coursera Personal Subscription",
      slug: "shop-coursera-premium-account",
      shortDesc: "Unlimited access to 7,000+ world class courses, professional certificates, and university specializations.",
      description: "Earn accredited certificates from Google, IBM, Meta, Stanford, and University of London. Download lecture videos and complete graded peer reviews.",
      categoryId: catEdu.id,
      badge: "CAREER",
      isFeatured: false,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
      minPrice: 999,
      maxPrice: 6500,
      variants: {
        create: [
          { title: "1 Month Coursera Plus", duration: "1 Month", screenType: "Personal Mail", price: 999, originalPrice: 1500, stockCount: 20, isAvailable: true },
          { title: "6 Months Coursera Plus", duration: "6 Months", screenType: "Personal Mail", price: 2999, originalPrice: 4500, stockCount: 25, isAvailable: true },
          { title: "12 Months Coursera Plus", duration: "12 Months", screenType: "Personal Mail", price: 6500, originalPrice: 9500, stockCount: 15, isAvailable: true }
        ]
      }
    }
  });

  // --- VPN Category ---
  // ExpressVPN
  await prisma.product.create({
    data: {
      title: "ExpressVPN 1 Year Subscription",
      slug: "expressvpn-premium-account",
      shortDesc: "High speed ultra secure VPN with Lightway protocol across 105 countries worldwide.",
      description: "Protect your privacy on public Wi Fi, bypass geo restrictions, and stream international content at lightning speeds. Works on Windows, Mac, iOS, Android, and routers.",
      categoryId: catVPN.id,
      badge: "SECURITY",
      isFeatured: true,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      minPrice: 1000,
      maxPrice: 1000,
      variants: {
        create: [
          {
            title: "1 Year Shared License",
            duration: "12 Months",
            screenType: "Shared Account",
            price: 1000,
            originalPrice: 1800,
            stockCount: 30,
            isAvailable: true,
            inventory: {
              create: [
                { type: "SHARED_ACCOUNT", secretData: "express_bd_vip@subbd.com | Pass#VpnExpress2026" }
              ]
            }
          }
        ]
      }
    }
  });

  // NordVPN
  await prisma.product.create({
    data: {
      title: "NordVPN 1 Year Subscription",
      slug: "nord-vpn-subscriptions",
      shortDesc: "Next gen encryption with Threat Protection Pro, double VPN hops, and NordLynx protocol.",
      description: "Block malware, intrusive trackers, and malicious advertisements automatically while securing your digital footprint with 6,000+ servers worldwide.",
      categoryId: catVPN.id,
      badge: "POPULAR",
      isFeatured: false,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80",
      minPrice: 850,
      maxPrice: 850,
      variants: {
        create: [
          {
            title: "1 Year Premium Account",
            duration: "12 Months",
            screenType: "Shared Account",
            price: 850,
            originalPrice: 1400,
            stockCount: 40,
            isAvailable: true
          }
        ]
      }
    }
  });

  // 3. Populate Blog Archive from SUBSCRIPTIONSBD-PAGES-AND-BLOGS.md
  console.log("Seeding editorial blog posts...");

  const blogPostsData = [
    {
      title: "ChatGPT Free vs Plus in 2026: Which Plan Is Worth It in Bangladesh?",
      slug: "chatgpt-free-vs-plus-in-2026-which-plan-is-worth-it-in-bangladesh",
      summary: "An in-depth breakdown comparing the free tier of ChatGPT against ChatGPT Plus for Bangladeshi students, freelancers, and software developers.",
      category: "Artificial Intelligence",
      readTime: "6 min read",
      author: "Tanvir Hasan",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
      content: `
# ChatGPT Free vs Plus in 2026: Which Plan Is Worth It in Bangladesh?

With artificial intelligence becoming central to education, freelancing, and business productivity in Bangladesh, choosing the right AI tier is an important financial decision.

## 1. What Does the Free Version Offer?
OpenAI provides free access to standard GPT 4o with rate limits. During peak traffic hours in Bangladesh (evenings and late afternoons), free users frequently encounter temporary cooldown timers and fall back to lightweight models.

## 2. Why Upgrade to ChatGPT Plus?
Subscribing to ChatGPT Plus gives you:
- **Priority access** to OpenAI newest reasoning models (o1 preview and canvas).
- Up to **5x higher messaging capacity** with GPT 4o.
- High resolution **DALL E 3 image generation** directly within the chat interface.
- Native **Advanced Voice Mode** for natural audio conversations in Bengali and English.
- Dedicated custom GPT creation without requiring any programming knowledge.

## 3. How to Pay with bKash and Nagad
Because international dual currency credit cards have strict bank endorsement limits in Bangladesh, Subscriptions BD enables seamless activation using instant bKash, Nagad, or Rocket mobile banking with verified local invoices.
      `
    },
    {
      title: "Why CapCut Pro Is Worth It for Bangladeshi Content Creators",
      slug: "why-capcut-pro-is-worth-it-for-bangladeshi-content-creators",
      summary: "How video creators on YouTube and Facebook can multiply their production output using CapCut Pro automated AI tools and 4K exports.",
      category: "Video Editing",
      readTime: "5 min read",
      author: "Rafiqul Islam",
      imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80",
      content: `
# Why CapCut Pro Is Worth It for Bangladeshi Content Creators

Video editing software was historically expensive and demanding on computer hardware. CapCut Pro has revolutionized the creator economy across Bangladesh by offering studio grade capabilities on both mobile and PC.

## Key Features That Make CapCut Pro Essential:
1. **Accurate Auto Captions**: Generates synchronized subtitles for short videos in seconds, dramatically increasing audience watch time.
2. **AI Video Enhancement**: Upscales low light footage and stabilizes handheld smartphone clips.
3. **Smart Background Removal**: Replaces messy backgrounds without requiring a physical green screen setup.
4. **Commercial Music Library**: Access thousands of copyright cleared sound effects and audio tracks safely for monetization.
      `
    },
    {
      title: "How to Buy & Activate Microsoft Office 365 in Bangladesh with bKash",
      slug: "how-to-buy-activate-microsoft-office-365-in-bangladesh-with-bkash",
      summary: "Step by step guide to securing official Microsoft Office license keys with lifetime genuine activation and OneDrive storage.",
      category: "Software & OS",
      readTime: "4 min read",
      author: "Engineering Team",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      content: `
# How to Buy & Activate Microsoft Office 365 in Bangladesh with bKash

Many computer owners in Bangladesh unknowingly use unverified cracked versions of Microsoft Office that expose their computers to ransomware, crypto miners, and data theft.

## Why Genuine Microsoft Activation Matters
- **Zero Virus Risk**: Clean official setup files downloaded directly from \`setup.office.com\`.
- **Automatic Updates**: Regular security patches and performance fixes directly from Microsoft.
- **Permanent Stability**: No sudden deactivations or popup warnings interrupting your important spreadsheets or essays.

## Quick 3 Step Activation:
1. Order your license key on Subscriptions BD and complete payment via bKash.
2. Receive your genuine 25 character product key immediately on screen.
3. Visit \`setup.office.com\`, log in with your Microsoft account, enter your key, and install!
      `
    },
    {
      title: "Claude Pro Deep Dive: Features, Limits, and When to Upgrade",
      slug: "claude-pro-deep-dive-features-limits-and-when-to-upgrade",
      summary: "An analysis of Anthropic Claude 3.5 Sonnet, context window capabilities, and why coders prefer it over other models.",
      category: "Artificial Intelligence",
      readTime: "7 min read",
      author: "Tanvir Hasan",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      content: `
# Claude Pro Deep Dive: Features, Limits, and When to Upgrade

Anthropic Claude 3.5 Sonnet has set a new benchmark in software engineering, complex logic synthesis, and natural conversational writing.

## The Power of Artifacts
Artifacts allow Claude to render dynamic React web apps, SVG diagrams, and HTML previews side by side with the conversation. For frontend designers and students learning full stack web development, this creates an interactive playground unlike anything else.
      `
    },
    {
      title: "Is YouTube Premium Worth It in 2026? An Honest Look",
      slug: "is-youtube-premium-worth-it-in-2026-an-honest-look",
      summary: "Evaluating ad free YouTube, background mobile listening, and YouTube Music Premium for Bangladeshi households.",
      category: "Streaming & OTT",
      readTime: "4 min read",
      author: "Editorial Team",
      imageUrl: "https://images.unsplash.com/photo-1543536448-d209d2d13a1c?auto=format&fit=crop&w=800&q=80",
      content: `
# Is YouTube Premium Worth It in 2026? An Honest Look

With YouTube increasing unskippable commercial frequency on Smart TVs and smartphones, constant advertisements disrupt learning, music listening, and leisure entertainment.

## What You Get with YouTube Premium:
- **Completely Ad Free**: Across all devices including Android, iOS, Apple TV, Android TV, and desktop browsers.
- **Background Playback**: Audio continues playing even when your phone screen is turned off or when switching apps.
- **YouTube Music Included**: Millions of songs in high quality streaming, replacing the need for a separate Spotify subscription.
      `
    }
  ];

  for (const post of blogPostsData) {
    await prisma.blogPost.create({
      data: post
    });
  }

  console.log("Database seeded successfully with all products, categories, licenses, and blog archives!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
