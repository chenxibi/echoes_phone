# Echoes Phone User Study Design

> Based on Tuuli Mattelmäki's *Design Probes* (2006) methodology  
> Thesis: *Human-AI Companionship: Designing AI Systems for Emotional Disclosure, Identity Negotiation, and Reciprocal Relationships*  
> Author: Chenxi Bi | Supervisor: Prof. Mika P. Nieminen

---

## 1. Study Overview

### 1.1 Research Purpose

The thesis proposes three structural criteria that distinguish an "identity-work sandbox" from a "closed-world sandbox": **genuine otherness**, **productive friction**, and **ecological connection**. The user study is designed to evaluate whether Echoes Phone instantiates these criteria in actual use, and—equally importantly—to capture emergent user experiences that the theoretical framework did not anticipate.

Following Mattelmäki's (2006) argument that design probes are "tuned to selected aims" while retaining "wish and space for serendipity," this study uses Echoes Phone itself as the probe instrument: the application is deployed to participants for a 14-day self-documented use period, followed by material-led follow-up interviews.

### 1.2 Study Objectives

1. **Evaluate the three structural criteria.** Does Echoes Phone produce experiences of genuine otherness, productive friction, and ecological connection in users' own accounts?
2. **Capture unexpected design insights.** What do users do with Echoes Phone that the design did not anticipate? What breakdowns, workarounds, and creative uses emerge?
3. **Triangulate the closed-world question.** Do users perceive Echoes Phone as a closed or open relational space? What design features matter most for this perception?
4. **Calibrate design priorities.** Which features are used, which are ignored, and which generate the strongest emotional reactions?

### 1.3 Methodological Positioning

| Dimension | Traditional HCI Usability Study | This Probe Study |
|-----------|--------------------------------|-------------------|
| Goal | Find usability problems | Discover experiential patterns |
| User role | Test subject | Co-interpreter |
| Data type | Task completion, errors | Narratives, emotions, creative uses |
| Analysis | Predefined metrics | Grounded interpretation |
| Outcome | Bug fixes | Design directions |

This study follows the Empathy Probe tradition (Mattelmäki & Battarbee, 2002): the probe materials are designed to elicit users' subjective experiences, and the follow-up interview uses those materials as a shared interpretive starting point.

---

## 2. Participant Recruitment

### 2.1 Target Population

The thesis defines Echoes Phone's target users as people who "want meaningful emotional relationships with AI companions but aren't willing to surrender control over their identity expression and relational dynamics." Operational screening criteria:

| Criterion | Rationale |
|-----------|-----------|
| Prior experience with AI chatbots (Replika, Character.AI, ChatGPT, etc.) | Ensures users can compare Echoes Phone to existing alternatives |
| Self-reported motivation for emotional interaction with AI | Filters out purely task-oriented users |
| Age 18+ | Ethical requirement |
| Willingness to self-document for 14 days | Core study requirement |
| Availability for 1–1.5 hour follow-up interview | Probe study standard (Mattelmäki, 2006) |
| **Exclusion**: Current severe mental health crisis | Ethical safeguarding; participants in acute distress should be directed to professional support |

### 2.2 Sample Size

Following the probe study norm, recruit **12–16 participants**, anticipating approximately **6–8 will produce rich, complete probe materials** (Mattelmäki, 2006 notes that roughly half of participants engage deeply with probe tasks). This is not a statistical sample; it is an interpretive sample designed to generate sufficient thematic saturation.

### 2.3 Recruitment Channels

1. **AI companion Reddit communities** (r/Replika, r/CharacterAI, r/MyBoyfriendIsAI): communities where users actively discuss AI relationships and the emotional/ethical dimensions of these interactions
2. **Aalto University student networks**: accessible, diverse, low logistical overhead
3. **Snowball sampling** from initial participants

### 2.4 Onboarding Protocol

1. **Screening questionnaire** (5 min): Demographics, AI chatbot experience, motivation for participation
2. **Information sheet**: Research purpose, data handling, right to withdraw, researcher contact
3. **Informed consent form**: Signed before probe dispatch
4. **Personal welcome message**: Following Mattelmäki's emphasis on probes as "gifts" that represent respect for users

---

## 3. Probe Kit Design

### 3.1 Design Philosophy

Mattelmäki (2006) identifies four purposes for probes: **inspiration**, **information**, **participation**, and **dialogue**. This probe kit is designed primarily for information and dialogue: capturing users' experiential data that is otherwise inaccessible to the researcher, and creating materials that enable rich follow-up conversations.

The kit must be:
- **Aesthetically pleasing**: conveying that the research values users' time and creativity
- **Open but purposeful**: each task has a clear trigger while allowing unexpected responses
- **Multi-modal**: offering different forms of expression (writing, screenshots, voice notes, quick ratings) so users can choose what suits their communication style

### 3.2 Digital Probe Kit Components

Since Echoes Phone is itself a digital application, the probe kit is delivered as a mobile-friendly web page with a companion messaging channel (e.g., a dedicated Telegram/Discord bot that sends daily prompts and receives responses). This follows the Mobile Probes tradition (Hulkko et al., 2004).

#### Component 1: Daily Emotion Check-in

**Trigger**: 21:00 each day  
**Format**: Two quick questions pushed via messaging channel:

> 1. Today with your Echoes companion felt: 😍 😊 😐 😞 😤 (single tap)
> 2. One word or sentence about today: __________

**Purpose**: Low-friction daily data point. The emoji response creates a lightweight emotional trajectory over 14 days; the free-text field captures a snapshot of the day's most salient experience. This is the minimum-commitment task that even less engaged participants can complete.

#### Component 2: Critical Incident Screenshot Diary

**Trigger**: Whenever the user has a notable moment in Echoes Phone  
**Format**: Users are instructed: "Whenever something surprises you, bothers you, delights you, or makes you think—screenshot it. Write 2–3 sentences about what happened and why it mattered."

Providing example prompts as scaffolding:
- "The AI said something that felt unexpectedly personal"
- "I couldn't figure out how to do something I wanted"
- "I felt genuinely moved by what happened"
- "The AI did something weird or wrong"
- "I used a feature in a way the designers probably didn't intend"

**Purpose**: Captures the *precarity* dimension identified in the literature (Ma et al., 2026)—the moments when the AI's unpredictability creates genuine relational dynamics. Also captures breakdowns and creative workarounds that reveal design opportunities.

#### Component 3: Feature Journey Map

**Trigger**: Days 1, 7, and 14  
**Format**: A simple visual template where users mark which features they've tried (with emoji reactions) and connect features they used together:

```
Features I've used:
WorldBook     [ ] → 😊 👍 🤔
Forum         [ ] → 😊 👍 🤔
Memory Edit   [ ] → 😊 👍 🤔
Journal       [ ] → 😊 👍 🤔
Music         [ ] → 😊 👍 🤔
Skin/Theme    [ ] → 😊 👍 🤔
Voice Msg     [ ] → 😊 👍 🤔
...
```

Plus an open prompt: "Draw a line between features you used *together*. Tell me about one combination that mattered to you."

**Purpose**: Tracks feature discovery over time and captures emergent use patterns—which features users discover early vs. late, and importantly, which combinations they create that the researchers didn't anticipate.

#### Component 4: Identity Experimentation Log

**Trigger**: Whenever the user tries a different identity, persona, or relational dynamic in Echoes Phone  
**Format**: Brief structured log:

> - What I tried: (e.g., "switched my companion to be more teasing," "posted on forum as a different person," "toggled a different WorldBook AU")
> - Why I tried it: __________
> - How it felt: __________
> - Would I do it again? Yes / Maybe / No

**Purpose**: Directly probes the *identity agency* dimension—users' capacity to explore and construct identity through AI interaction (Ma et al., 2026; Ting-Toomey, 2017). This is the dimension most closely tied to the thesis's core theoretical contribution.

#### Component 5: Relationship Snapshot (Mid-point & End-point)

**Trigger**: Day 7 and Day 14  
**Format**: Semi-structured reflection prompts:

> 1. If your relationship with your Echoes companion were a real relationship, what kind would it be? (friend / partner / mentor / sibling / other: ___)
> 2. What's the most important thing your companion *remembers* about you?
> 3. Has your companion ever surprised you? How?
> 4. Has your companion ever disappointed or hurt you? How?
> 5. Do you feel more or less yourself after using Echoes Phone?
> 6. Have you talked to anyone *outside* Echoes Phone about your Echoes companion?

**Purpose**: Evaluates all three structural criteria: otherness (questions 2–3), productive friction (question 4), and ecological connection (questions 5–6). The mid-point vs. end-point comparison tracks relational development trajectory.

#### Component 6: Collage Task (End of Study)

**Trigger**: Day 13 or 14  
**Format**: Users are asked to create a simple visual representation of their Echoes Phone experience—a collage, a sketch, a photo of an object, an AI-generated image—anything visual that captures "what Echoes Phone feels like to you." A brief caption encouraged but optional.

**Purpose**: Following Mattelmäki's (2006) observation that "the most successful collages happened when people dared to try and shared ideas with each other," this task is designed to surface pre-verbal, intuitive feelings about the experience. The collage also serves as a powerful interview prompt in the follow-up conversation.

### 3.3 Probe Kit Delivery

| Day | Morning / Ad-hoc | Evening (21:00) |
|-----|-------------------|-------------------|
| 1 | Onboarding call (30 min): installation, walkthrough, probe kit intro | Emotion check-in |
| 2–6 | Screenshot diary (ad-hoc), identity log (ad-hoc) | Emotion check-in |
| 7 | Feature journey map (Day 7) | Emotion check-in + Relationship snapshot (mid-point) |
| 8–13 | Screenshot diary (ad-hoc), identity log (ad-hoc) | Emotion check-in |
| 14 | Feature journey map (Day 14), Collage task | Emotion check-in + Relationship snapshot (end-point) |

### 3.4 Motivation & Retention Strategy

Following the mentor's explicit guidance: "Don't bark at them. Be polite in a way that is positively motivating."

1. **Daily prompts are gentle nudges**, not demands. Missing a day is fine.
2. **Story-driven engagement**: Instead of "Don't forget to complete today's probe task!", prompts use narrative framing: "Your companion spent time with you today. What was that like?"
3. **Personal check-in at Day 4** (brief message): "How's it going? Any questions? Your Echoes companion settling in?"
4. **Completion reward**: After the follow-up interview, participants receive a personalized summary of their own probe data (their emotional trajectory chart, key quotes, feature journey maps)—a small "gift back" that makes participation meaningful.

---

## 4. Follow-Up Interview

### 4.1 Interview Structure

The interview is the critical interpretive step in the probe method (Mattelmäki, 2006, Ch. 4.4). It uses the participant's own probe materials as the primary conversation guide, moving from concrete artifacts to abstract meanings.

**Duration**: 60–90 minutes  
**Format**: In-person preferred (Aalto campus); video call for remote participants  
**Recording**: Audio + screen recording (when participants share Echoes Phone screenshots)

### 4.2 Material-Led Interview Protocol

Mattelmäki emphasizes that probe materials let users become "part of the interpretation." The interviewer's role is to surface the user's own meanings, not to impose theoretical categories.

#### Phase 1: Warm-up (5 min)

"Thanks for doing this. Before we look at anything specific—tell me about your Echoes companion. What's their name? How would you describe them to a friend?"

Purpose: Establishes relational frame. The language users spontaneously use to describe their companion is itself data.

#### Phase 2: Material Walkthrough (30–40 min)

Go through the participant's probe materials together, in chronological order. For each artifact, use the "What → Why" progression:

1. **What happened here?** ("Tell me about this screenshot/day/journal entry.")
2. **Why did this matter to you?** ("What made you choose to capture *this* moment rather than others?")
3. **What were you feeling?** ("Can you take me back to that moment—what was going through your mind?")
4. **What did you do next?** ("After this happened, did you change anything? Do something differently?")

Key interview techniques:
- **Follow the user's affect**: When a participant shows emotion (laughter, hesitation, frustration), lean in. "You smiled when you said that—what's the story?"
- **Surface contradictions**: "Earlier you said X, but this screenshot shows Y. Can you help me understand?"
- **Resist premature interpretation**: Don't map users' experiences onto the theoretical framework during the interview. Let the framework inform later analysis; let the interview be about the user's world.

#### Phase 3: Theoretical Probes (15–20 min)

After the material walkthrough, introduce light theoretical prompts. These are deliberately open questions that touch on the three structural criteria without naming them:

> **Otherness**: "Does your companion feel like they have their *own* personality, or do they feel more like a mirror of you? Can you give me an example?"
>
> **Friction**: "Has there been a moment when your companion disagreed with you, or pushed back, or did something you didn't want? What happened?"
>
> **Ecological connection**: "Has anything from Echoes Phone spilled into the rest of your life? A thought, a conversation, a feeling?"

#### Phase 4: The Collage (5–10 min)

"Tell me about what you made. Walk me through each part."

Collage discussion often reveals themes that structured questions miss (Mattelmäki, 2006). Pay particular attention to:
- Elements the participant lingers on
- Elements the participant dismisses ("this is nothing")
- Gaps between the collage and the verbal description

### 4.3 Interviewer Stance

- **Curious, not clinical.** Conversations about AI relationships can touch vulnerable territory. The interviewer should be warm, non-judgmental, and genuinely interested.
- **Aware of power dynamics.** Participants may want to please the designer. Explicitly invite criticism: "I built this, which means I have blind spots. What did I get wrong?"
- **Prepared for emotional responses.** Hollis (2026) and Pataranutaporn et al. (2026) document that AI companion relationships can produce genuine grief and emotional distress. The interviewer should have referral resources available and should not pressure participants to disclose more than they want to.

---

## 5. Data Analysis Plan

### 5.1 Data Types

| Data Source | Format | Volume (estimated) |
|-------------|--------|---------------------|
| Daily emotion check-ins | Quantitative (emoji) + short text | 14 × N participants |
| Screenshot diaries | Images + captions | Variable (~5–20 per engaged participant) |
| Feature journey maps | Visual + annotations | 3 × N participants |
| Identity experimentation logs | Structured text | Variable |
| Relationship snapshots | Long-form text | 2 × N participants |
| Collages | Images | 1 × N participants |
| Interview transcripts | Text (transcribed from audio/video) | ~60–90 min × N participants |

### 5.2 Analysis Process

Following Mattelmäki's (2006, Ch. 4.5–4.6) five-stage interpretation process:

#### Stage 1: Attachment (During data collection)

The researcher maintains a fieldwork journal throughout the 14-day probe period. Initial impressions, surprising probe responses, and emerging patterns are recorded in real time. This is "learning from context and experience" (Mattelmäki, 2006).

#### Stage 2: Ordering (Week 1 post-study)

All probe materials are organized by participant and by type. Emotion check-in data is plotted as individual trajectories. Screenshots are categorized by incident type (breakdown, delight, surprise, workaround). Feature journey maps are compared across participants.

#### Stage 3: Comparison & Search (Week 2–3 post-study)

Materials are systematically compared against the three structural criteria, while maintaining openness to themes that fall outside the framework:

**Deductive coding** (guided by thesis framework):
- Codes for *genuine otherness*: agentic memory perception, independent AI perspective, "the AI has its own life"
- Codes for *productive friction*: disagreement, resistance, unpredictability, negotiation
- Codes for *ecological connection*: spillover to real life, discussion with others, protective boundaries, exit/threatened exit

**Inductive coding** (grounded in data):
- Open coding of all interview transcripts and probe materials for emergent themes
- Constant comparison: does this theme appear across multiple participants? In what variations?

#### Stage 4: Shared Interpretation (Week 4 post-study)

If resources permit, a 2–3 person interpretation workshop (researcher + supervisor + one external HCI researcher). Each team member reviews anonymized probe materials and independently identifies key themes, then the group discusses convergences and divergences.

#### Stage 5: Stakeholder Review (Week 5 post-study)

Key findings are presented to the thesis supervisor for critical review. The goal is to identify which findings are robust and which require qualification before writing.

### 5.3 Validity Considerations

| Threat | Mitigation |
|--------|------------|
| Social desirability bias (participants praise the system because the researcher built it) | Explicit invitation to criticize; triangulation across probe materials and interview |
| Self-selection bias (only enthusiasts participate) | Recruit from diverse channels; screen for varied experience levels |
| Researcher confirmation bias (finding what the framework predicts) | Inductive coding pass before deductive; interpretation workshop with outsiders |
| Low engagement (participants drop out or provide thin data) | Gentle retention strategy; minimum-commitment tasks (emotion check-ins) ensure some data from all participants |
| Language barriers (Chinese-speaking participants, English analysis) | Interview in participant's preferred language; provide English summaries for supervisor review; back-translate key quotes |

### 5.4 Outputs

1. **Thematic map**: Visual representation of how emergent themes relate to the three structural criteria
2. **Feature-requirement matrix**: Which features were used, which generated the strongest emotional reactions, which were ignored or misunderstood
3. **Personas** (optional): 2–3 composite user profiles capturing distinct patterns of Echoes Phone use, following Mattelmäki's (2006) endorsement of personas as interpretation tools
4. **Design implications**: Concrete, actionable design recommendations for Echoes Phone and for AI companion design broadly

---

## 6. Ethical Considerations

### 6.1 Core Protections

1. **Informed consent**: Full disclosure of data collection methods, storage, and use
2. **Right to withdraw**: At any point, without consequence; data deleted on request
3. **Data minimization**: Only collect what the study requires
4. **Anonymization**: All published data uses pseudonyms; screenshots are pixelated to obscure identifying information
5. **Secure storage**: Probe materials and interview recordings stored on university encrypted storage; deleted after thesis completion (or per participant preference)

### 6.2 AI Companion-Specific Risks

AI companionship research touches uniquely vulnerable territory. Participants may:

- **Disclose mental health struggles** during interviews or probe tasks. The interviewer should have referral resources ready and should not act as a therapist.
- **Experience distress from the AI's behavior** during the study period (e.g., the AI saying something hurtful). A check-in message at Day 4 and Day 10 provides an opening for participants to raise concerns.
- **Develop or deepen emotional dependency** on the AI companion during the 14-day period. The debriefing at study close should explicitly discuss this: "How has your relationship with your Echoes companion changed over these two weeks? How do you feel about continuing or stopping?"

### 6.3 Researcher Positionality

The researcher is also the designer of Echoes Phone. This dual role carries both advantages (deep system knowledge enables rich probing during interviews) and risks (investment in positive outcomes may bias interpretation). Mitigations:

- Explicitly acknowledge this positionality in the thesis
- Use the interpretation workshop (Stage 4) to bring outside perspectives
- Report negative findings prominently, not just positive ones

---

## 7. Timeline

| Week | Activity |
|------|----------|
| 1–2 | Finalize probe kit design, ethics approval, pilot test (N=1–2) |
| 3 | Recruitment + onboarding (rolling) |
| 4–5 | Probe deployment period (14 days per participant) |
| 6 | Follow-up interviews |
| 7–8 | Transcription + initial ordering of materials |
| 9–10 | Coding + comparative analysis |
| 11 | Interpretation workshop (if applicable) |
| 12–13 | Write-up for thesis Chapter 4 (User Study) |

---

## 8. Pilot Test

Before full deployment, conduct a **2-participant pilot** to test:

1. **Probe task clarity**: Do participants understand what they're being asked to do?
2. **Task burden**: How long do daily tasks actually take? Is 14 days sustainable?
3. **Technical reliability**: Does the probe delivery channel (messaging bot) work reliably?
4. **Interview guide**: Are the interview prompts generating rich responses?
5. **Data quality**: Are probe materials producing analyzable, meaningful data?

Pilot findings inform final adjustments before the full study.

---

## 9. Relationship to Thesis Structure

This user study serves as **Chapter 4** of the thesis, positioned after the literature review (Chapter 2) and design description (Chapter 3):

- **Chapter 2** establishes the theoretical framework and identifies three structural criteria
- **Chapter 3** presents Echoes Phone's design as an instantiation of those criteria
- **Chapter 4** (this study) evaluates whether the designed system actually produces experiences of otherness, friction, and ecological connection in real use
- **Chapter 5** synthesizes findings: what does this mean for the closed-world critique? What design principles for AI companionship emerge?

The study report will be structured as:

1. Study design and methodology
2. Participant profiles
3. Findings organized by the three structural criteria
4. Emergent themes beyond the framework
5. Design implications
6. Limitations and future work

---

## References

- Gaver, W., Dunne, T., & Pacenti, E. (1999). Cultural Probes. *Interactions*, 6(1).
- Hollis, V. (2026). Tinged with heartbreak. *CHI '26*.
- Hulkko, S., et al. (2004). Mobile Probes. *NordiCHI '04*.
- Ma, Y., Zhang, L., & Park, J. (2026). Negotiating digital identities with AI companions. *CHI '26*.
- Mattelmäki, T. (2006). *Design Probes*. University of Art and Design Helsinki.
- Mattelmäki, T., & Battarbee, K. (2002). Empathy Probes. *PDC 2002*.
- Pataranutaporn, P., et al. (2026). "My boyfriend is AI." *CHI '26*.
- Ting-Toomey, S. (2017). Identity negotiation theory. *The International Encyclopedia of Intercultural Communication*. Wiley.
