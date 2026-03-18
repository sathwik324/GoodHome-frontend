# GoodHome — Brand Guidelines

## Brand Identity

### Mission
GoodHome brings families closer together through a private, shared digital space — warm, safe, and exclusively theirs.

### Brand Personality
- **Warm** — feels like home, not corporate
- **Modern** — clean and contemporary, not outdated
- **Trustworthy** — private and secure
- **Intimate** — built for close relationships, not the public

### Tone of Voice
- Friendly and welcoming
- Simple and clear — no jargon
- Warm but not childish
- Personal — uses the user's name where possible

---

## Visual Identity

### Color Palette

#### Primary (Dark Theme — default)
```
Background:        #0d0f1a   (deep navy black)
Surface:           #13162b   (card backgrounds)
Surface Elevated:  #1a1d35   (modals, dropdowns)
Border:            rgba(255,255,255,0.08)
```

#### Accent Colors
```
Primary Accent:    #6366f1   (indigo-purple — buttons, active states)
Accent Hover:      #4f46e5   (darker on hover)
Accent Glow:       rgba(99,102,241,0.15)  (subtle glow behind accent elements)

Success:           #10b981   (green — online, success states)
Warning:           #f59e0b   (amber — warnings)
Danger:            #ef4444   (red — delete, errors)
```

#### Text
```
Primary Text:      #f1f5f9   (near white)
Secondary Text:    #94a3b8   (muted, subtitles)
Disabled Text:     #475569   (placeholders)
```

#### Member Avatar Colors (cycling by index)
```
0: linear-gradient(135deg, #6366f1, #8b5cf6)
1: linear-gradient(135deg, #10b981, #059669)
2: linear-gradient(135deg, #f59e0b, #d97706)
3: linear-gradient(135deg, #ef4444, #dc2626)
4: linear-gradient(135deg, #3b82f6, #2563eb)
```

---

### Typography

#### Font Stack
```css
--font-primary: 'Inter', 'DM Sans', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace; /* invite codes */
```

#### Scale
```
Display:    2rem   / 700 weight  — page titles
Heading:    1.5rem / 600 weight  — section headings
Subheading: 1.1rem / 500 weight  — card titles
Body:       0.95rem / 400 weight — default text
Small:      0.8rem / 400 weight  — timestamps, labels
Micro:      0.7rem / 500 weight  — badges
```

---

### Spacing & Layout

#### Sidebar
- Width (expanded): 260px
- Width (collapsed): 68px
- Background: #0d0f1a with subtle right border

#### Content Area
- Padding: 24px–32px
- Max width: unconstrained (full remaining width)
- Card gap: 16px–20px

#### Border Radius
```
Cards:    12px
Buttons:  8px
Inputs:   8px
Avatars:  50% (circle)
Badges:   999px (pill)
Modals:   16px
```

#### Shadows
```
Card:   0 4px 24px rgba(0,0,0,0.3)
Modal:  0 8px 40px rgba(0,0,0,0.5)
Glow:   0 0 20px rgba(99,102,241,0.2)
```

---

### Components

#### Buttons
```
Primary:   bg #6366f1, text white, hover #4f46e5, border-radius 8px
Secondary: bg transparent, border 1px solid rgba(255,255,255,0.15), text #f1f5f9
Danger:    bg #ef4444, text white, hover #dc2626
Ghost:     bg transparent, text #94a3b8, hover text #f1f5f9
```

#### Cards
```
bg: #13162b
border: 1px solid rgba(255,255,255,0.08)
border-radius: 12px
padding: 20px–24px
hover: border-color rgba(99,102,241,0.3), transform translateY(-2px)
transition: all 0.2s ease
```

#### Inputs
```
bg: rgba(255,255,255,0.05)
border: 1px solid rgba(255,255,255,0.1)
border-radius: 8px
padding: 10px 14px
focus border: #6366f1
focus outline: none
color: #f1f5f9
placeholder: #475569
```

#### Sidebar Nav Items
```
default:  text #94a3b8, bg transparent
hover:    text #f1f5f9, bg rgba(255,255,255,0.06)
active:   text #6366f1, bg rgba(99,102,241,0.12), left border 3px solid #6366f1
```

#### Avatar
```
Size SM: 32px circle
Size MD: 40px circle
Size LG: 48px circle
Font:    bold uppercase first letter
Colors:  cycle through accent gradients by user index
```

#### Badges / Pills
```
Member count: bg #6366f1, text white, font-size 0.7rem, padding 2px 7px
Online dot:   8px circle, bg #10b981
```

---

### Motion & Animation

#### Principles
- Fast and subtle — 150ms–300ms transitions
- Ease-out for enter, ease-in for exit
- No bouncy animations — this is a family app, not a game

#### Common Transitions
```css
Hover states:   transition: all 0.2s ease
Modal open:     fade + scale from 0.95 to 1, 200ms
Page enter:     fade in, 200ms
Sidebar:        width transition 0.25s ease
Message appear: slide up + fade in
```

---

### Icons
- Library: **lucide-react**
- Size default: 18px–20px
- Sidebar icons: 20px
- Action icons: 16px
- Color: inherit from text color

---

### Logo
- Icon: house/home symbol (🏠 or custom SVG)
- Text: "GoodHome" — bold, primary accent color or white
- Usage: top of sidebar, always visible

---

### What NOT to do
- No light mode (dark theme is the default and only theme)
- No toggle for dark/light mode
- No bright white backgrounds
- No small, hard-to-read text
- No generic purple gradient on white (the classic "AI app" look)
- No unnecessary animations that slow the user down
- No fake/placeholder data visible to real users
- No lorem ipsum text anywhere