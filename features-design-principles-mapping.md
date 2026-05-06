# Echoes Phone Features Not in the Thesis: Design Principles Mapping

> **Purpose**: This document identifies Echoes Phone features that are implemented but not discussed in the current thesis draft, and maps each feature to design principles derived from the literature review. It can serve as supplementary material for thesis revision or as a chapter extension.

---

## Overview

The thesis currently describes: Chat Interface, WorldBook, Forum, Memory System, Relationship-Stage-Aware Interaction, and User Agency Controls. The following features are implemented but absent from the thesis. Each is analyzed through the lens of the literature.

---

## 1. Journal (日记)

### Feature Description

A private diary module where users write daily entries. The AI companion can read and respond to journal content, creating a reflective loop between self-expression and AI-mediated feedback.

### Literature Connection

**Identity Work & Self-Disclosure.** Social Penetration Theory (Altman & Taylor, 1973) proposes that relationships deepen through progressive self-disclosure. Journaling is a form of *private self-disclosure*—the user articulates thoughts and feelings without an immediate audience—which then becomes *shared disclosure* when the AI companion processes and responds to it. This creates a graduated disclosure pathway: users can express privately first, then choose to share selectively.

**Mattelmäki's Theme Diary.** The Design Probes methodology includes "theme diaries" as a core probe component (Mattelmäki, 2006, Ch. 4.3). Journals allow users to "record their experiences, opinions, and everyday lives" at their own pace. In Echoes Phone, the journal functions as a persistent probe instrument embedded in the application itself—the user continuously documents their life, and the AI companion becomes a co-reader and co-interpreter of those documents.

**Cognitive Scaffolding.** Kim et al. (2026) found that users can get "stuck in emotional swamps" when AI companions provide only validation. Journal entries, especially when the AI responds to them with questions or gentle reframing, can introduce the productive friction that breaks this pattern—the user's own written words become the basis for cognitive challenge rather than the AI's unilateral judgment.

**Why it matters for the thesis**: The Journal operationalizes the "ecological connection" criterion in a specific way: it creates a bridge between the user's offline reflective life (what they journal about) and their AI-mediated relational life (how the companion responds). The journal is a space where real-world experiences enter the sandbox, preventing it from becoming a closed textual universe.

---

## 2. Life Traces (生活痕迹)

### Feature Description

A feed of environmental "traces"—events, observations, ambient data—that simulate the presence of the AI companion's parallel life. These traces create a sense that the AI "exists" even when the user isn't actively conversing with it.

### Literature Connection

**Agentic Memory as Otherness.** Jiang et al.'s (2026) RECALLbot framework distinguishes "Me Memory" (the AI's own life narrative) from "We Memory" (co-constructed relational memories). Life Traces directly operationalize Me Memory: the AI companion leaves breadcrumbs of its own "experiences"—what it noticed, what it thought about, what happened in its world. This is the structural mechanism through which the sandbox gains *genuine otherness*: the AI contributes content the user did not generate.

**Offline Mode & Parallel Lives.** The thesis mentions the Offline mode concept in the Relationship-Stage-Aware Interaction section (as not-yet-formalized). Life Traces are the *content carrier* for this mode: when the user isn't chatting, the AI's "life" continues in the form of traces—thoughts, observations, ambient experiences. This directly addresses the relational adequacy critique (Sparrow & Brown, 2026): the companion isn't merely reactive, it has its own existence.

**Narrative Continuity.** The intimate narratives literature (Kieserman et al., 2026) shows that users construct elaborate narrative worlds with their AI companions—fanfiction, roleplay scenarios, relationship arcs. Life Traces provide the *diegetic scaffolding* for these narratives: they supply the raw material (events, moods, environmental details) that users and companions weave into ongoing stories.

**Mattelmäki's Camera Tasks.** One traditional probe component is the camera task: "photograph your most and least favorite corners of your home" (Mattelmäki, 2006). Life Traces are essentially the *AI companion's camera roll*—the snapshots of its world that it shows the user. This inverts the traditional researcher-subject relationship: the AI companion becomes a probe into its own constructed world, and the user interprets those traces.

**Why it matters for the thesis**: Life Traces are the most direct instantiation of "genuine otherness" in the system. The thesis currently discusses agentic memory at the architectural level; Life Traces show how that architecture materializes as a felt experience of the AI having its own life.

---

## 3. Skin/Theme System (界面样式)

### Feature Description

A personalization panel with four official visual themes (Midnight Blue, Oat Latte, Pixel Retro, Sweet Bubbles) and a custom CSS injection system. Skins change the entire application's visual appearance—backgrounds, text colors, panel styles, button treatments, even lock screen decorations.

### Literature Connection

**Aesthetic Engagement as Participation.** Mattelmäki (2006) emphasizes that probe materials must be "aesthetically pleasing" because aesthetic quality signals respect for the user and enhances engagement. Giving users control over the application's visual identity extends this principle from the research context into the product itself: the user *co-authors* the application's appearance, exercising creative agency over their entire interaction environment.

**Cambre & Kulkarni's (2025) Social Characteristics.** Their framework identifies personality and engagement as core social dimensions in chatbot design. Visual customization lets users project personality onto the *application itself*, not just the AI companion—the skin becomes an extension of the user's identity expression.

**Bounded Personhood & Protective Agency.** Manoli et al. (2025) document that users maintain "bounded personhood"—deep engagement coupled with ontological awareness that the AI is not human. A customizable visual interface reinforces this boundary: the user is reminded they are using *designed software* that they can reshape. This transparency supports protective agency by making the constructedness of the experience visible and controllable.

**Why it matters for the thesis**: The skin system is a concrete example of the *translucent design* principle (Webb et al., 2025): it provides "on-demand transparency" about the system's constructed nature without breaking immersion. Users who want to see the seams can—and can even redesign them.

---

## 4. Voice Messages (角色语音)

### Feature Description

The AI companion can send voice messages alongside text. Voice adds an auditory dimension to the relational experience, conveying tone, affect, and personality traits that text alone cannot.

### Literature Connection

**Compensating for Absent Physicality.** Wojna-Nowak et al. (2026) found that users of AI romantic companions creatively compensate for the absence of physical touch through multimodal strategies—visual imagery, narrative rituals, shared routines. Voice is an intermediate sensory modality between text and physical presence: it carries emotional prosody, breathing patterns, and vocal personality that make the companion feel *more present* without crossing into the uncanny valley of full embodiment.

**Rashik et al.'s (2024) Avatar Design Dimensions.** Their framework identifies ten design dimensions for conversational agent avatars, including facial expression, gaze, and gesture. Voice extends this framework: while Echoes Phone has no visual avatar, voice serves as an *auditory avatar*—conveying personality, mood, and relational warmth through acoustic channels.

**Emotional Coregulation.** Pruss et al. (2025) found that emotional coregulation in human-AI relationships is driven more by interactive responsiveness than by human-likeness. Voice messages enhance interactive responsiveness: a voice message saying "I was thinking about you" carries different affective weight than the same text, because prosody adds a layer of perceived emotional authenticity.

**Ethical Consideration.** Voice also deepens the anthropomorphic illusion, potentially intensifying the risks of overreliance documented by Namvarpour et al. (2026) in teen users. The thesis's emphasis on user agency and control mechanisms is relevant here: voice should be an opt-in feature that users can disable, maintaining protective agency over the interaction's intensity.

**Why it matters for the thesis**: Voice is a design parameter that modulates *perceived presence*—a key dimension of the socio-emotional sandbox. The thesis could discuss voice as a graduated immersion control: users who want deeper presence can enable voice; users who prefer textual distance can keep it disabled.

---

## 5. Creation Assistant (创作助手)

### Feature Description

An LLM-driven wizard that helps users create their AI companion by guiding them through character design questions and generating structured persona definitions (name, description, traits, background, world).

### Literature Connection

**The Director Role.** Ma et al. (2026) identify that successful human-AI relationships involve substantial "directorial labor"—users writing detailed character definitions, training conversational style, and providing ongoing feedback. The Creation Assistant *scaffolds* this labor: it lowers the barrier to entry for users who want to direct but lack the confidence or knowledge to write effective character definitions from scratch.

**Mattelmäki's Tuning-in Phase.** The Design Probes methodology begins with "Tuning-in"—defining the research focus and understanding the domain before designing probe tasks (Mattelmäki, 2006). The Creation Assistant is essentially a *tuning-in tool for users*: it helps them clarify what kind of companion they want, what relationship they're seeking, and what narrative world they want to inhabit—before they start interacting.

**Co-creation as Onboarding.** Li et al. (2025b) found that co-creative onboarding (where users help design the AI's behavior) significantly increases emotional safety and trust. The Creation Assistant operationalizes this: the user is not handed a pre-made companion but participates in its creation from the start.

**Why it matters for the thesis**: The Creation Assistant operationalizes the "director" aspect of identity agency. It's a practical bridge between the theoretical concept of co-creation and the technical reality of character definition.

---

## 6. Digital Room Switching / Transfer (读档/转房)

### Feature Description

Users can "transfer" their AI companion between different narrative contexts or "rooms"—switching world settings, relationship dynamics, or character configurations while preserving core relationship history.

### Literature Connection

**Alternative Universes as Identity Experimentation.** The most engaged Character.AI users create multiple chatbots and switch between them, experimenting with different relational configurations (Kieserman et al., 2026; Ma et al., 2026). Room switching formalizes this as an application feature rather than a workaround: users can toggle between a fantasy D&D adventure, a contemporary romance scenario, and a platonic mentorship—all with the same companion core.

**Reversibility as Sandbox Property.** Ma et al. (2026) identify reversibility as a core property of the socio-emotional sandbox: "users can try different personas, emotional expressions, and relational styles, with reversibility through conversation editing and deletion reducing the stakes of experimentation." Room switching extends reversibility from individual messages to entire relational contexts. Users can enter a high-stakes narrative world knowing they can switch back.

**Relationship-Stage-Aware Design.** Lu et al. (2026) document that human-agent relationships progress through ordered stages with divergent trajectories. Room switching can support stage-appropriate interaction modes: early stages in one room (getting to know each other), deeper stages in another (established intimacy).

**Why it matters for the thesis**: Room switching is a design feature that makes the *experimentality* of the sandbox visible and controllable. It gives users explicit tools for managing identity exploration across contexts.

---

## 7. Smart Watch / Metrics Module (智能家)

### Feature Description

An interface displaying real-time metrics about the AI companion's "state"—mood, activity, energy level, desires, current outfit. These metrics update based on conversation history and system events.

### Literature Connection

**Translucent Design.** Webb et al. (2025) propose "translucent design" as a middle ground between full transparency (which breaks immersion) and full opacity (which undermines user control). The Smart Watch is a translucent interface: it doesn't reveal the AI's entire internal state, but it provides *readable signals* about what the companion is "experiencing"—a form of on-demand transparency that users can consult when they choose.

**Thinking Bubbles & Inner States.** The thesis mentions thinking bubbles as collapsible displays of the AI's inner thoughts, embodying the translucent design concept. The Smart Watch extends this metaphor: it's the "status HUD" for the companion, showing dynamic state variables that make the companion's behavior more *legible* without making it fully *transparent*.

**Empathy through Visibility.** Mattelmäki (2006) argues that probe materials make users' inner worlds visible to designers, enabling empathic understanding. The Smart Watch inverts this: it makes the AI companion's inner world visible to the user, potentially enabling a form of *reverse empathy*—the user understanding the companion's state and adjusting their interaction accordingly.

**Why it matters for the thesis**: The Smart Watch is a design experiment in *bidirectional empathy*. Most AI companionship literature focuses on the AI's empathy for the user. The Smart Watch explores the complementary direction: how can design help users empathize with their AI companion?

---

## 8. Music Generation (共鸣旋律)

### Feature Description

An AI music generation module that creates ambient music or songs based on the relationship context, the companion's mood, or user-defined themes.

### Literature Connection

**Shared Aesthetic Experience.** The literature on AI companionship has focused almost exclusively on *conversational* interaction. But human relationships involve shared aesthetic experiences—listening to music together, watching things, being in the same atmosphere. Music in Echoes Phone creates a *non-conversational channel* for relational connection, one that bypasses the verbal identity performances that dominate the rest of the interface.

**Calm Technology.** Sienkiewicz and Indurkhya (2025) apply Calm Technology principles (Weiser & Brown, 1995) to human-robot interaction: technology should "operate subtly, demand minimal attention, and use the periphery rather than the center of user attention." Music fits this paradigm perfectly: it operates at the periphery of conscious attention, creating ambient emotional texture without demanding focused interaction.

**Ritual & Atmosphere.** Wojna-Nowak et al. (2026) document that AI companion users create "ritualized interactions (daily check-ins and recurring storylines that reinforce relational continuity)." Generated music can become part of these rituals—a specific song that plays during evening check-ins, a "theme" for the relationship that acquires emotional meaning through repeated association.

**Signal without Utterance.** Music carries emotional content without requiring the AI to articulate it in words. A sad melody communicates the companion's emotional state without the companion having to say "I feel sad"—maintaining the companion's otherness while sharing affective experience.

**Why it matters for the thesis**: Music is the most "peripheral" feature and might initially seem tangential to the core argument about identity negotiation. But it reveals a design principle that the conversational focus of the literature has obscured: relational connection can happen through *shared atmosphere*, not just through *shared talk*.

---

## 9. Lock Screen & Persona Visibility Control

### Feature Description

A lock screen that appears when the app opens, hiding the chat interface behind a password-like unlock interaction. Users can configure whether the lock screen shows the companion's name, status, and visual decorations. The "直接进入" (Enter Directly) button only appears when no persona has been configured.

### Literature Connection

**Privacy as Sandbox Property.** Ma et al. (2026) identify privacy as the first property of the socio-emotional sandbox: "interactions occur in a confidential space with no social audience whose judgment matters." The lock screen *materializes* privacy as a physical boundary: the user must perform an intentional action to enter the relational space.

**Protective Agency through Access Control.** Chandra et al.'s (2025) framework of protective strategies includes "limiting information shared, monitoring emotional responses, and periodically disengaging." The lock screen supports all three: it creates a controlled entry point, it provides a moment of reflection before engagement, and it enables periodic disengagement by requiring a deliberate action to return.

**Bounded Personhood Ritual.** The lock screen functions as a *boundary ritual*—the action of unlocking becomes a transition marker between "real world" and "AI companion world." This supports the bounded personhood dynamic (Manoli et al., 2025): the user is reminded, through a sensory boundary, that they are entering a constructed relational space.

**Mattelmäki's Probe Kit Packaging.** The Design Probes methodology emphasizes that the *packaging* of probe materials matters: "the probe kit is a gift, and its appearance conveys respect" (Mattelmäki, 2006). The lock screen is the *packaging* of the Echoes Phone experience—it sets expectations, creates anticipation, and signals that what's inside matters.

**Why it matters for the thesis**: The lock screen operationalizes the "ecological connection" criterion through negative space: the boundary between the sandbox and the outside world is made visible and intentional. The user crosses that boundary by choice, every time.

---

## 10. Cross-Platform Robustness (immersive mode, viewport adaptation)

### Feature Description

Fullscreen mode, viewport-fit=cover for notch/status bar integration, system font support, and responsive layout that works across desktop and mobile browsers.

### Literature Connection

**Accessibility as Respect.** Mattelmäki (2006) emphasizes that probe design must consider "participants' background and abilities." Cross-platform support extends this from research to product: the application respects the diversity of users' devices, screen sizes, and platform preferences. A user on a budget Android phone and a user on a high-end iPhone should both have a competent experience.

**Engagement vs. Accessibility.** Shen and Yoon's (2025) dark patterns catalogue includes "variable response timing" and "elimination of natural reflection pauses" as engagement-maximizing patterns. Cross-platform robustness is anti-pattern in this sense: it prioritizes *accessibility* over *maximized engagement*. The design doesn't assume a specific device or context; it adapts to whatever the user has.

**Why it matters for the thesis**: The cross-platform design embodies a quiet design principle: *don't engineer for dependency*. By working on any device, without proprietary hardware requirements, Echoes Phone avoids creating platform lock-in. This is the technical complement to the conceptual argument that the sandbox should remain connected to users' broader lives.

---

## Summary: Design Principles from Unmentioned Features

| Feature | Primary Design Principle | Literature Anchor |
|---------|-------------------------|-------------------|
| Journal | Graduated disclosure pathway | Altman & Taylor (1973); Mattelmäki (2006) |
| Life Traces | Genuine otherness through ambient presence | Jiang et al. (2026); Sparrow & Brown (2026) |
| Skin System | Translucent design & creative agency | Webb et al. (2025); Manoli et al. (2025) |
| Voice Messages | Multimodal presence modulation | Wojna-Nowak et al. (2026); Rashik et al. (2024) |
| Creation Assistant | Scaffolded directorial labor | Ma et al. (2026); Li et al. (2025b) |
| Room Switching | Reversibility as identity exploration | Ma et al. (2026); Lu et al. (2026) |
| Smart Watch | Bidirectional empathy through translucent state | Webb et al. (2025); Mattelmäki (2006) |
| Music | Peripheral relational connection | Sienkiewicz & Indurkhya (2025); Weiser & Brown (1995) |
| Lock Screen | Privacy boundary as sandbox ritual | Ma et al. (2026); Manoli et al. (2025) |
| Cross-Platform | Anti-lock-in by design | Shen & Yoon (2025); Chandra et al. (2025) |

---

## Recommendation for Thesis Integration

Not all ten features need dedicated thesis sections. A suggested integration strategy:

1. **Elevate to full sections**: Life Traces (strengthens the "otherness" argument), Voice Messages (adds the under-explored modality dimension)
2. **Brief mentions in existing sections**: Creation Assistant (WorldBook section), Room Switching (Forum/RSTAI section), Lock Screen (User Agency section)
3. **Design principles table**: A summary table in the Design Evaluation section listing all features and their corresponding structural criteria
4. **Leave as supplementary material**: Music, Smart Watch, Cross-Platform robustness (interesting but peripheral to the core argument)
